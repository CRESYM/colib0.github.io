---
layout: page 
title: EMT STATCOM (Grid Following mode)
tags: ["Opensource", "EMT", "voltage source", "converter", "STATCOM", "wind", "pv", "hvdc", "following"] 
date: 22/07/2024 
last-updated: 24/07/2024
id: #188
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

Static Synchronous Compensators (STATCOMs) are devices that belong to Flexible AC Transmission Systems (FACTS). These devices, as their name indicates, are used to provide reactive power compensation to an AC grid, as well as improving the stability of the system and provide some voltage control in the buses they are connected. The STATCOM is formed by a Voltage Source Converter (VSC) that is connected to the grid through a transformer at its AC side, and at its DC side it has capacitors instead of a DC power source. The model described here uses a similar structure to the one described at the [EMT Grid Following model](../../4-%20HVDC/VSC/GridFollowingConverter/EMTGridFollowingVSC/), but with some modifications to adapt it to the STATCOM characteristics.
    
## Model use, assumptions, validity domain and limitations

The model is valid to perform EMT studies of STATCOM devices, specially suited for high-frequency transients and dynamic studies, such as lightning events, switching transients, energization studies, or short-circuits for example. The model is based on the following assumptions:

* The STATCOM is modelled as a Grid Following VSC, although instead of having a DC voltage source, it has a capacitor at the DC side. This means that it can provide small amounts of active power at the exchange of discharging the capacitor, and viceversa.
* The system is considered to be balanced, and the separation in positive and negative sequence are not considered (i.e. only the positive sequence is considered).
* The synchronization with the grid is controlled by a PLL, and it is done by imposing that the $$v_d = 0$$. This design criteria allows to relate active and reactive power with one of the components of the current. It only considers the fundamental frequency.
* The VSC is assumed to be a 2-level converter, meaning that there are 2 IGBTs per phase.
* The internal controls are the same as the proposed in the [Grid Following model](../../4-%20HVDC/VSC/GridFollowingConverter/EMTGridFollowingVSC/), except instead of having an active power reference, there is a control over the voltage of the capacitor to track a reference. 
* As in the Grid Following model, modulation can be considered or not, depending on the study.

It is not suited for low-frequency studies (<10 Hz) event though is still accurate, since EMT models are computationally expensive and require a lot of time because greater time steps lead to convergence errors of the simulation. Phasor models exchange some accuracy for much faster simulation times.

The model is not valid either for harmonic studies, as it only considers the fundamental frequency.

## Model description

The following block diagram shows the main components of the STATCOM model:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'EMT_STATCOM_scheme.svg'}}"
      alt="STATCOM schematic."
      style="float: center; margin-right: 10px; width: 900px;" />
 </div>
 <div align = 'center'>
Figure 1: Schematic of the EMT STATCOM model. <a href="#1">[1]</a>
</div>

Notice how it follows the same structure as the Grid Following model, with the addition of the DC Voltage regulation. This control is explained in the following subsection, while the rest can be consulted in the [Grid Following page](../../4-%20HVDC/VSC/GridFollowingConverter/EMTGridFollowingVSC/).

### DC Voltage control

The following control is added to the typical Grid Following control scheme in order to maintain the voltage level at the capacitor [[2]](#2). This ensures that it is not being overcharged or discharged. For a capacitor with a capacitance value $$C$$, the following equation relates the power $$P_{dc}$$ and its energy:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ P_{dc} = V_{DC} I_{DC} = V_{DC} C  \frac{dV_{DC}}{dt} $$

</div>

Applying the Laplace transformation, the equation is transformed to the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ P_{dc} = V_{DC} C (s V_{DC}) = sCV_{DC}^2 $$

</div>

The following control structure represents the open-loop of the DC voltage control to obtain an active power reference:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'DCVoltageControlSTATCOM.svg'}}"
      alt="STATCOM DC Voltage Control open-loop diagram block."
      style="float: center; margin-right: 10px; width: 600px;" />
 </div>
<div align = 'center'>
Figure 2: STATCOM DC Voltage Control open-loop diagram block.
</div>

It is important to note that, in case of an overvoltage, the setpoint obtained will be negative since the capacitor would want to discharge to lower the voltage. Depending on the sign convention used in the AC side, which is typically positive for power injection, a sign change might be necessary. It can be added as a gain as in the figure above (marked in red), but it may not be necessary.

To tune the control, the following closed-loop scheme is obtained by considering the relationship between the DC voltage and the DC power derived above as the plant:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'DCControlErrorSTATCOM.svg' }}"
      alt="STATCOM DC Voltage Control closed-loop diagram block."
      style="float: center; margin-right: 10px; width: 700px;" />
 </div>
 <div align = 'center'>
Figure 3: STATCOM DC Voltage Control closed-loop diagram block.
</div>

Which has the following transfer function:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ \frac{V_{DC}}{V_{DC}^*} = \frac{1}{1 + s \frac{C}{2 G_{DC}(s)}} $$
</div>

There are two main control designs:

* A proportional control $$G_{DC(s)} = K_{DC}$$, tuned as $$K_{pDC} = \frac{C}{2\tau_{DC}}$$, with $$\tau_{DC}$$ being the desired DC voltage response time constant.
* A PI controller $$G_{DC(s)} = K_{pDC} + \frac{K_{iDC}}{s}$$, tuned as $$K_{pDC} = C\xi_{DC}\omega_{DC}$$ and $$K_{iDC} = \frac{C\omega_{DC}^2}{2}$$, with $$\xi_{DC}$$ being the desired DC voltage response damping factor and $$\omega_{DC}$$ the desired response frequency of the loop.

In both cases, the DC voltage loop must be slower than the internal current control loop to ensure a stable response.

## Current limitation

You can visit the [Grid Following page](../../4-%20HVDC/VSC/GridFollowingConverter/EMTGridFollowingVSC/), which has a dedicated section on this topic.

## Parameter tuning 

The following table shows possible values for the parameters of the controllers using the tuning proposed:


| Parameter | Value | Units |
| --------- | ----- | ----- |
| $$V_{DC}$$ | $$2500$$ | V |
| $$R_{f}$$ | $$0.03$$ | $$\Omega$$ |
| $$L_{f}$$ | $$0.001$$ | $$H$$ |
| $$C_{DC}$$ | $$1.5$$ | $$F$$ |
| $$\omega_n^{PLL}$$ | $$2\pi 1000$$ | rad/s |
| $$\zeta^{PLL}$$ | $$0.707$$ | - |
| $$K^{PLL}_p$$ | $$3.55$$ | - |
| $$K^{PLL}_i$$ | $$1.58 \cdot 10^4$$ | - |
| $$\tau^{PLL}$$ | $$0.225$$ | ms |
| $$\tau^c$$ | $$1$$ | ms |
| $$K^{icl}_p$$ | $$1$$ | - |
| $$K^{icl}_i$$ | $$30$$ | - |
| $$\tau_p$$ | $$15$$ | ms |
| $$K^{ipl}_p$$ | $$1.778 \cdot 10^{-5}$$ | - |
| $$K^{ipl}_i$$ | $$1.778 \cdot 10^{-2}$$ | - |
| $$\omega_{DC}$$ | $$ 2\pi 5 $$ | rad/s |
| $$\xi_{DC}$$ | $$ 0.707 $$ | - |
| $$K^{DC}_p$$ | $$ 333.17 $$ | - |
| $$K^{DC}_i$$ | $$ 74022 $$ | - |

## Open source implementations

No open-source implementations found.

## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)

<a id="2">[2]</a> Egea, A.; Junyent-Ferré, A.; Gomis-Bellmunt, O. "Active and reactive power control of grid connected distributed generation systems". Part of: "Modeling and control of sustainable power systems". 2012, p. 47-81. 


