---
layout: page 
title: RMS grid following voltage source converter 
tags: [Opensource, RMS, phasor, TMRL2, voltage source, converter, wind, pv, hdvc, dynawo, STEPSS ] 
date: 17/05/2024 
last-updated: 17/05/2024
id: #131
---

# RMS grid following voltage source converter

## Context

This grid following voltage source converter is a generic RMS model that doesn't aim at embedding the “best” design and/or tuning of VSC controls, but rather encompass many variants from the literature by its genericity.
It has been developed by Professor Thierry Van Cutsem in 2021 with a view to building test cases to study the impact of converters on stability of power networks.

## Model use, assumptions, validity domain and limitations

This RMS model is an MMC-type converter connected to grid through transformer without LC filter, and no DC side model ($$v_c$$ is considered constant). Hence, only the AC dynamics of the model can be taken into account.
However, the dynamics in the transformer are taken into account in order to capture fast dynamics of converter.

It can be used for voltage, frequency, transient, and slow interaction converter stability studies, but not in EMT studies.
As it is generic, it can't be used for the study of a specific behavior of a real-life converter.

## Model description

The model is constituted of :

- a physical part that includes a MMC-type converter represented by a voltage injector, in serie with a resistance ($$R_{pr}$$) and reactance ($$L_{pr}$$) and an ideal transformer before its connection to the point of common coupling.
- some classical converter controls : a PLL, a current control loop, an active power and a reactive power loops, and a current limiter.

### Physical part

The physical part is presented on the following figure:
![Grid following converter](./img/grid_following_vsc_model.png)

The reference frame of the network $$(x,y)$$ is different from the one of the converter $$(d,q)$$ and their relationship can be represented by:
![vsc control reference frames](./img/vsc_control_reference_frame.png)

 where:

- $$(𝑥,𝑦)$$ axes are rotating at angular speed $$𝜔_{𝑟𝑒𝑓}$$ in (rad/s)
- $$𝑣_𝑥, 𝑣_𝑦$$ are the rectangular components of PCC voltage phasor $$\bar{𝑉}$$
- $$(𝑑,𝑞)$$ axes are tracking the voltage phasor and are given by the Phase Locked Loop
- $$𝑣_𝑑, 𝑣_𝑞$$ are the $$𝑑,𝑞$$ components of $$\bar{𝑉}$$
- $$𝛿_𝑔$$ are phase angle of  $$\bar{𝑉}$$ with regard to $$𝑥$$ (in rad)
- $$\tilde{𝛿}_𝑔$$ is the angle between $$𝑑$$ and $$𝑥$$ (in rad). In steady-state, there is : $$\tilde{𝛿}_𝑔= 𝛿_𝑔$$
- $$\tilde{𝜔}_𝑔$$ is the angular speed of $$(𝑑,𝑞)$$ axes (in pu/s)
- $$\omega_N$$ is the nominal angular speed (in rad/s)

The equations of the physical part are the following :

**Change in the reference from $$(x,y)$$  to $$(d,q)$$ representation :**
<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ v_d = v_x * cos(\tilde{\delta}_g) + v_y * sin(\tilde{\delta}_g) $$
$$ i_d = r * i_x * cos(\tilde{\delta}_g) + r* i_y * sin(\tilde{\delta}_g) $$
</div>

**Dynamics of current in transformer in $$(𝑑,𝑞)$$ reference frame:**
<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ L_{pr} \frac{di_d}{dt} = \omega_N* ( v_{md} - \frac{v_d}{r} - R_{pr} i_d + \tilde{\omega}_g L_{pr} i_q)$$
$$ L_{pr} \frac{di_q}{dt} = \omega_N* ( v_{mq} - \frac{v_q}{r} - R_{pr} i_q + \tilde{\omega}_g L_{pr} i_d)$$
</div>

### PLL

The PLL has the following diagram:

![PLL](./img/PLL.png)

where the following gains are in per unit on the Snom base (nominal apparent power of converter):
<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
 $$K_{p\omega} = \frac{10}{T_{pll} \omega_N}$$
 $$K_{i\omega} = \frac{25}{T_{pll}^2 \omega_N}$$
</div>

 $$T_{pll}$$ is the time constant of the PLL in s;  typical value can be 100 ms.

The PLL can be blocked/unblocked for low voltage by defining $$V_{pll1}$$ and  $$V_{pll2}$$ (typical values can be 0.4 pu and 0.5pu)

### d-q current control

The d-q current control loop has the following diagram:

![dq current control](./img/dq_current_control.png)

where:

- $$K_{i}= R_{pr} \omega_c$$ is the gain of the integrator in pu/s 
- $$K_{p}= L_{pr} \frac{\omega_c}{\omega_N}$$ is the proportional gain in $$\Omega$$

### Active power control

The active power control has the following diagram:

![active power control](./img/active_power_control.png)

where:

- $$T_{LPF} = \frac{1}{\omega_{LPF}}$$ is the time constant of the low pass filter in s
- $$𝐾_{𝑝𝑝}= \frac{𝐾_{𝑖𝑝}}{𝜔_{𝐿𝑃𝐹}}$$ is the proportional gain in pu
- $$I_max$$ is the maximum allowed current in pu
- $$K_{ip}$$ is the integral gain in $$pu/s$$

The lower block-diagram aims at limiting the rate of recovery of  $$𝐼_𝑑^{𝑚𝑎𝑥}$$ after it has been decreased by an increase of $$𝑖_𝑞$$, as the priority is given to the reactive current.
$$T$$ is the a small time constant in s for this purpose and the value of $$\frac{di_q}{dt}_{max}$$ depends on the type of generation (wind turbine or HVDC).

### Reactive power control

The reactive power control loop has the following diagram:

![reactive power control](./img/reactive_power_control.png)

When $$vqswitch=1$$, the reactive power control is in voltage control mode, whereas when $$vqswitch =0$$ the conrol is in reactive power control mode.

The lower block-diagram is a dynamic voltage support in case of important voltage drop below $$V_{s2}$$. Dynamic voltage support can be discarded  by putting $$𝑖_{𝑞2}=0$$.

Variables and parameters are:

- $$𝑄$$ is the reactive power injected into the grid  (in pu)
- $$vqswitch$$ to select the control mode
- $$T_{LPF}$$ is the time constant of the low pass filter in s
- $$𝑉_{𝑐𝑜𝑚𝑝}$$ is the compensated voltage :
  $$ V_{comp}= | \frac{\bar{V}}{r}$$
  $$ + (R_c + j X_c) r \bar{I} | $$
- $$R_c$$ is equal to $$R_pr$$
- $$X_c$$ is equal to $$L_{pr}$$
- $$I^{q1}_{max}$$ is equal to $$I_{max}$$
- $$V_{s1}$$ and $$V_{s2}$$ are respectively the upper and lower bound of the voltage support (in pu).
- $$K_{pv}$$ and K_{iv} are the proportional and integral gain of the control.

### Limitations of current

The current limitations can be explained with the following scheme:

![id current limitations](./img/iqmax_limitations.png)

Three modes can be selected:

- either full reactive current can be used: $$I_{q1max}= I_{max}$$
- either the reactive current is limited by the initial current in the converter: $$I^{q1}_{max}= \sqrt{I^2_{max}- i_{P0}^2}$$ where $$i_{P0}$$ is the initial active current
- either the ratio between the reactive current and the nominal power is set to a specific value:  $$𝐼_{𝑞1}^{𝑚𝑎𝑥}=tan⁡(\phi_{𝑛𝑜𝑚}) P_{nom}$$

## Open source implementations (if any)

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| STEPSS | [Link](https://github.com/CRESYM/BiGER/tree/main/testModels/gridFollowing/STEPPS) | txt | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 17/05/2024 | - |
| dynawo | [Link](https://github.com/dynawo/dynawo/compare/master...3093_GFL_VSC) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 17/05/2024 | - |

## Table of references
