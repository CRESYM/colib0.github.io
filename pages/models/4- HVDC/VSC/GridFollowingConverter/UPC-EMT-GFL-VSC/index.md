---
layout: page 
title: UPC generic EMT Grid Following Voltage Source Converter
tags: ["Opensource", "EMT", "voltage source", "converter", "wind", "pv", "hvdc", "following", "NREL", "PSCAD", "DPSIM", "SimplusGrid", "Matlab"] 
date: 05/06/2024 
last-updated: 03/07/2024
id: #163
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---


## Context

Voltage Source Converters (VSC) are widely used in power systems for a variety of applications, such as wind and photovoltaic generation, High Voltage Direct Current (HVDC) transmission, and Flexible AC Transmission Systems (FACTS). The model described here is a detailed Electromagnetic Transient (EMT) model of a grid-following VSC, which is a type of VSC that is synchronized with the grid, using its frequency and phase. This model, obtained from the many works developed at CITCEA-UPC (Centre d'Innovació Tecnològica en Convertidors Estàtics i Accionaments) such as [[1]](#1), [[2]](#2) and [[3]](#3), is useful for studying the fast-dynamics of the VSC and its interaction with the grid.
    
## Model use, assumptions, validity domain and limitations

The model described allows performing EMT studies of the dynamics of a grid-following voltage source converter. It is specially useful in applications where there are fast-transients to be studied, being able to describe phenomena ranging from short-circuits to switching events or even lightning [[1]](#1). 

The assumptions made are:

* The DC side of the converter is considered as an ideal DC voltage source $$E_{DC}$$.
* The AC-side of the converter is connected to the grid through an AC filter formed by a resistance $$R$$ and an inductance $$L$$. The AC voltage in the converter side is $$v_{c}^{abc}$$.
* The system is considered to be balanced, and the positive and negative sequence are not considered.
* The synchronization with the grid is controlled by a PLL, and it is done by imposing that the $$v_d = 0$$. This design criteria allows to relate active and reactive power with one of the components of the current. It only considers the fundamental frequency.
* The VSC is assumed to be a 2-level converter, meaning that there are 2 IGBTs per phase.

Although it can be used for low-frequency phenomena such as transient stability or inter-area oscillations, the number of calculations to capture the dynamics is much greater than Phasor models, and result in much higher execution times. 
It is not useful to calculate unbalanced situation as the model is based on the positive sequence. It does not consider harmonics, as it uses a simplified PLL that only takes the fundamental frequency.


## Model description

The model can be described with the following schematic:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'EMT_GF_VSC_scheme.svg'}}"
      alt="EMT GF VSC scheme"
      style="float: center; margin-right: 10px; width: 500px;" />
 </div>
<div align = 'center'>
Figure 1: EMT Grid Following VSC scheme <a href="#1">[1]</a>
</div>
<br>

As it can be seen, there are several control blocks that act over the converter to determine the operating point. For a Grid Following VSC, these are:

* The Clarke/Park transformation blocks, which convert the electrical variables into the *$$\alpha\beta$$* and *qd0* reference frames.
* The Phase-Lock Loop (commonly referred to as PLL), which tracks the grid voltage and synchronizes the converter with the grid angle.
* The Outer Loop, which provides active and reactive power control by setting a current reference from a power reference.
* The Inner Loop, or Current Loop, which corrects the converter voltage to provide the reference current.
* The modulation block, which in more simplified models is not applied. In the case of the present model, since other harmonic elements are not considered, it can be omitted.

A detailed explanation of each block is provided in the following subsections.

### Clarke and Park transformations

Assuming a three-phase balanced system, the electrical variables can be expressed in the *abc* reference frame as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ x_{abc} = \begin{bmatrix} x_a \\ x_b \\ x_c \end{bmatrix} = \begin{bmatrix} \sqrt{2} X \cos(\theta) \\ \sqrt{2}X \cos(\theta - \frac{2\pi}{3}) \\ \sqrt{2}X \cos(\theta + \frac{2\pi}{3}) \end{bmatrix} $$

</div>

where $$X$$ is the amplitude of the voltage or current, $$\theta$$ is the angle of the voltage or current. The Clarke transformation [[4]](#4) is used to convert the three-phase variables into an orthogonal reference frame. The transformation matrix is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ T_{\text{Clarke}} = \frac{1}{3} \begin{bmatrix} 2 & -1 & -1 \\ 0 & \sqrt{3} & -\sqrt{3} \\ 1 & 1 & 1 \end{bmatrix} $$
</div>

which applied to the *abc* variables in balanced conditions, results in the *$$\alpha\beta0$$* variables:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ x_{\alpha\beta0} = \begin{bmatrix} x_{\alpha} \\ x_{\beta} \\ x_0 \end{bmatrix} = \begin{bmatrix} \sqrt{2} X \cos(\theta) \\ - \sqrt{2}X \sin(\theta)  \\ 0\end{bmatrix} $$
</div>

noting that $$x_0 = 0$$ since it is a balanced system. The electrical variables in this new reference are still sinusoidal. It is desirable to have constant valued variables to be able to implement typical PI control over the signal more easily. This is done using the Park transformation [[5]](#5), converting the *$$\alpha\beta$$* variables into a rotating reference frame. The transformation matrix is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ T_{\text{Park}}(\hat{\theta}) = \begin{bmatrix} \cos(\hat{\theta}) & -\sin(\hat{\theta}) \\ \sin(\hat{\theta}) & \cos(\hat{\theta}) \end{bmatrix} $$

</div>

which applied to the *$$\alpha\beta$$* variables, results in the *$$dq0$$* variables:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ x_{qd0} = \begin{bmatrix} x_{q} \\ x_{d} \end{bmatrix} = \begin{bmatrix} \sqrt{2} X \cos(\theta - \hat{\theta})  \\ \sqrt{2} X \sin(\theta - \hat{\theta}) \end{bmatrix} $$

</div>

As it can be seen, the Park transformation is dependent of the angle $$\hat{\theta}$$, which is the angle of the rotating reference frame, and it can be different to the angle of the voltage $$\theta$$. If the electrical variable is synchronized with the rotating reference frame, then $$\theta = \hat{\theta}$$ and $$x_d = 0$$.

### PLL

The goal of the PLL is to track the grid frequency and angle, as it is needed to establish the operating points of the converter using the control loops. The design of this controller is detailed in [[6]](#6). As stated earlier, when the voltage is synchronized with the reference frame (in this case, the grid), $$v_d = 0$$. To perform this tracking, the control applied considers a PI controller, yielding the following control structure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PLL_ControlDiagram.svg'}}"
      alt="PLL Control Diagram"
      style="float: center; margin-right: 10px; width: 700px;" />
 </div>
<div align = 'center'>
Figure 2: PLL Control Diagram <a href="#3">[3]</a>
</div>
<br>

Using the Park transformation over the grid measured voltages, and assuming a small phase difference between the output of the converter and the grid voltage, the linearization $$ v^g_d = E_m \sin(\delta) \approx E_m \delta $$ can be applied in order to simplify the closed-loop transfer function for the tunning of the controller. $$E_m$$ is the peak value of the grid voltage and $$\delta = \theta - \hat{\theta}$$ is the angle difference between the measured and the reference frame angle. The linearized control structure is the following:


 <div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'LinearPLLBlock.svg'}}"
      alt="PLL Control Diagram"
      style="float: center; margin-right: 10px; width: 800px;" />
 </div>
<div align = 'center'>
Figure 3: Linearized PLL Control Diagram 
</div>
<br>

Now, the PI controller needs to be tuned in order to provide the desired response. The following closed-loop transfer function models the response of the PLL:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{\hat{\theta}(s)}{\theta(s)}  = \frac{2 \zeta \omega_n s + \omega_n^2} {s^2 + 2\zeta\omega_n + \omega_n^2} $$

</div>

which corresponds to a second-order response, where $$\hat{\theta}(s)$$ is the estimated grid angle, $$\theta(s)$$ is the voltage angle, $$\zeta$$ is the damping factor, $$\omega_n$$ is the natural frequency. The PI controller block function is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ G_{PI}(s) = K_p + \frac{K_i}{s} = k_p \frac{1 + s\tau_{PLL}}{s\tau_{PLL}} $$
</div>

where $$k_p$$ and $$\tau_{PLL}$$ denoting the gains of the proportional gain and the PLL time constant, respectively. These parameters can be computed using the following expressions, obtained after working with the expressions of the closed loop transfer functions:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \omega_n = \sqrt{\frac{k_p E_m}{\tau_{PLL}}} $$
$$ \zeta = \frac{\sqrt{\tau_{PLL} k_p E_m}}{2} $$
</div>

A typical value for the damping ratio is $$\zeta = \frac{1}{\sqrt{2}}$$, PLL natural frequency could be set to a given frequency (i.e, 50 Hz, or 1 kHz), depending on the desired response (the higher the frequency, the more aggressive). It is a choice of the user to set the desired values of the controller, setting exactly two of the four parameters ($$\omega_n$$, $$\tau_{PLL}$$, $$\zeta$$, $$k_p$$). The peak voltage $$E_m$$ is a parameter given by the utility characteristics.


### Current control

The current control is used to determine the converter voltage that has to be applied in order to maintain the current at the setpoint. The model presented uses the Internal Model Control method (IMC), described in [[7]](#7), which provides PI controllers tuned in terms of the machine parameters (in this case $$R$$ and $$L$$) with the desired response. The control is based on the electric relationship between the variables:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v_{c}^{abc} - v_{g}^{abc} = R i_c^{abc} + L \frac{d}{dt} i_c^{abc} $$

</div>

which can be transformed into the *qd* frame to obtain the following equation:	

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v_{c}^{qd} - v_{g}^{qd} =\begin{bmatrix} R & L \omega\\ -L \omega & R \end{bmatrix} i_c^{qd} + L \frac{d}{dt} i_c^{qd} $$
</div>

where $$\omega$$ is the angular frequency of the grid obtained in the PLL, and $$v_{g}^d = 0$$. The block diagram associated to this system is the following:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'CurrentControlDiagram.svg'}}"
      alt="Current Control Diagram"
      style="float: center; margin-right: 10px; width: 700px;" />
 </div>
<div align = 'center'>
Figure 4: Current Control Diagram <a href="#3">[3]</a>
</div>
<br>

As it can be seen, there is a coupling between the *q* and *d* components. This can be dealt by the controller by designing a two dimension controller, or by decoupling the components and independently controlling each component. The later approach is the chosen in this model, using the following expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{v}^{q} \\ \hat{v}^{d} \end{bmatrix} = \begin{bmatrix} v_{c}^{q} - v_g^{q} + L\omega i_d  \\ v_{c}^{d} - L\omega i_q \end{bmatrix} $$

</div>

where $$\hat{v}^{q}$$ and $$\hat{v}^{d'}$$ are the controller output voltages. The equations are now decoupled using the expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{v}^{q} \\ v^{d} \end{bmatrix} = \begin{bmatrix} R & 0\\ 0 & R \end{bmatrix} \begin{bmatrix} i_q \\ i_d \end{bmatrix} + L \frac{d}{dt} \begin{bmatrix}  i_q \\ i_d \end{bmatrix} $$
</div>

Applying the Laplace transformation and reordering, the following relation holds:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{qd}(s)}{\hat{v}^{qd}(s)} = \frac{1}{R + sL} $$

</div>

The following schematic represents the closed-loop block diagram for the current loop:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'CurrentErrorVSC.svg'}}"
      alt="Current Error Diagram"
      style="float: center; margin-right: 10px; width: 700px;" />
 </div>
<div align = 'center'>
Figure 5: Current Error Diagram
</div>
<br>

The transfer function of this block diagram, considering $$G_c = K^{icl}_p + \frac{K^{icl}_i}{s}$$ is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{qd}(s)}{i^{qd*}(s)} = \frac{G_c(s)}{Ls + R + G_c(s)} $$

</div>

where $$i^{qd*}(s)$$ is the reference current for *q* or *d* axis, $$i^{qd}(s)$$ is the measured current. The controller gains can be selected as $$K^{icl}_p = \frac{L}{\tau_c}$$ and $$K^{icl}_i = \frac{R}{\tau_c}$$, where $$\tau_c$$ is the time constant of the current loop, such that the complete closed-loop transfer function is represented as the following first-order response:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{qd}(s)}{i^{qd*}(s)} = \frac{1}{\tau_c s + 1} $$
</div>

The resulting PI controller is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ G_{c}(s) = K_p + \frac{K_i}{s} = \frac{L}{\tau_c} + \frac{R}{\tau_c s} $$

</div>

The converter voltage setpoint obtained from this loop ($$v_c^{qd}$$) is then used to modulate the IGBT pulses and generate the AC voltage from the DC source. However, the modulation block can be omitted in some simplified models such as this one, and it can be considered to be directly the actual converter voltage, maintaining the notation without the setpoint indicator ($$*$$). 


### Active and reactive power control

The previous section made use of the current setpoints to control the converter. These setpoints can be determined directly by the user, or they can be obtained from the power setpoints (P*, Q*), which would still come from the user. To derive the controls, firstly the instantaneous power theory [[8]](#8) is described briefly for the synchronous frame *dq0*.

The voltage and current phasors can be expressed in the *dq0* frame as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v^{qd} = \frac{v^q - jv^d}{\sqrt{2}} $$
$$ i^{qd} = \frac{i^q - ji^d}{\sqrt{2}} $$

</div>

The complex power phasor, as well as the active and reactive power values, can now be obtained with:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \underline{S} = 3 v^{qd}(i^{qd})^* = 3 (\frac{v^q - jv^d}{\sqrt{2}})(\frac{i^q + ji^d}{\sqrt{2}})$$
$$ P = \Re(S) = \frac{3}{2} (v^q i^q + v^d i^d) $$
$$ Q = \Im(S) = \frac{3}{2} (v^q i^d - v^d i^q) $$
</div>

As a design choice of the PLL, $$v_d = 0$$ to track the grid angle. Then, the expressions for current setpoints can be extracted substituting in the previous equation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ i^{q*} = \frac{2}{3} \frac{P^*}{v^q} $$
$$ i^{d*} = \frac{2}{3} \frac{Q^*}{v^d} $$
</div>

This relationship can be used to calculate directly the current setpoint for a given value of $$v^q$$, which could be considered constant if the grid voltage is stable, or it can come directly from the voltage measurements. However, it is not robust when there are transient phenomena or perturbations in the grid voltage. To have a smoother response, a power loop is designed to control the current setpoints using a PI controller. The following block diagram represents the open-loop power control:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PowerLoopVSC.svg'}}"
      alt="Power Control Diagram"
      style="float: center; margin-right: 10px; height: 180px;" />
 </div>
<div align = 'center'>
Figure 6: Power Control Diagram <a href="#3">[3]</a>
</div>
<br>

In order to tune the PI controller parameters, the closed-loop of the system is considered. In order to have the feedback loop, the power output is calculated including the current loop dynamics and the conversion from current to power using the instantaneous power theory. The following block diagram shows the complete power loop:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'ErrorPowerLoopVSC.svg' }}"
      alt="Error power loop"
      style="float: center; margin-right: 10px; height: 280px;" />
 </div>
<div align = 'center'>
Figure 7: Closed-Loop Power Control Diagram
</div>
<br>

As it can be seen, the peak voltage is used as it assumes that the deviations with respect to the nominal will be small, and this is only to have an appropriate tuning of the controller.

Following a similar procedure to the one of the current loop, the closed-loop transfer function of the power loop can be modelled as a first-order system:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{P(s)}{P^*(s)} = \frac{Q(s)}{Q^*(s)} = \frac{1}{\tau_p s + 1} $$
</div>

where $$\tau_p$$ is the time constant of the power loop. The PI controller can be obtained with the use of the time constant of the current loop as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$K^{ipl}_p = \frac{2\tau_c}{3V_{peak}\tau_p}$$ 
$$K^{ipl}_i = \frac{2}{3V_{peak}\tau_p}$$
</div>

The time constant $$\tau_p$$ will be larger than $$\tau_c$$, since the power loop is designed to have a slower response than the current loop.

### Limitations of current and anti-windup control

The physical limitations of the converter have to be included in the modelling, in order to simulate the saturation of current and voltage. This allows the simulation of faults using this model.

To avoid overshooting the current or voltages, an anti-windup control is added to the PI controllers present in the model. The proposed controller is based on the tracking of the difference between the output of the PI controller and the saturation limit [[10]](#10). The control signal is then modified to avoid the overshooting. The block diagram of the anti-windup control is the following:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PI_antiwindup.svg' }}"
      alt="Anti-Windup Control Diagram"
      style="float: center; margin-right: 10px; width: 700px;" />
 </div>
<div align = 'center'>
Figure 8: Anti-Windup Control Diagram
</div>
<br>

with a gain $$G$$ between 0 and 1.

An alternative approach to implement this anti-windup control is detailed in [[11]](#11), where the integral part of the controller is substituted by a low-pass filter that follows the PI signal. The following block diagram shows the implementation of this alternative anti-windup control:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PI_antiwindup_alternative.svg'}}"
      alt="Anti-Windup Control Diagram"
      style="float: center; margin-right: 10px; width: 700px;" />
 </div>
<div align = 'center'>
Figure 9: Alternative Anti-Windup Control Diagram
</div>
<br>

Where $$\tau_{i} = \frac{K_p}{K_i}$$. 

To decide the saturation limits for the current components, the operation mode of the converter has to be considered, which will determine which current component is prioritized. These operation modes are typically defined by the grid codes, although a possible implementation could be the following:

* **Normal operation**: The converter will follow the $$i^q$$ component setpoint, prioritizing the active power, and then $$i^d$$ will be limited by the operational limits of the converter $$i^d_{max} = \sqrt{I_{max}^2 - \max{(i^q, i^{q*})}^2} $$.
* **Transient or fault operation**: The converter will now prioritize the $$i^d$$ component, which will follow its reference, and $$i^q_{max} = \sqrt{I_{max}^2 - \max{(i^d, i^{d*})}^2} $$.


## Parameter tuning 

The following table shows possible values for the parameters of the controllers using the tuning proposed:

| Parameter | Value | Units |
| --------- | ----- | ----- |
| $$R_{f}$$ | $$0.03$$ | $$\Omega$$ |
| $$L_{f}$$ | $$0.001$$ | $$H$$ |
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


## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| NREL | [Link](https://github.com/NREL/PyPSCAD) | PSCAD | - | 17/05/2024 | Described in [10.1109/KPEC51835.2021.9446243](https://doi.org/10.1109/KPEC51835.2021.9446243) | 
| SimplusGrid| [Link](https://github.com/Future-Power-Networks/Simplus-Grid-Tool/blob/master/%2BSimplusGT/%2BClass/GridFollowingVSI.m) | Matlab | [BSD 3-clause](https://opensource.org/licenses/BSD-3-Clause) | 14/06/2024 | -------- |
| DPSim | [Link](https://github.com/sogno-platform/dpsim/blob/master/dpsim-models/src/EMT/EMT_Ph3_AvVoltageSourceInverterDQ.cpp) | C++ | [MPL-2.0](https://opensource.org/licenses/MPL-2.0) | 14/06/2024 | -------- |


## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor Modeling Approaches and Simulation Guidelines of Voltage-Source Converters in Grid-Integration Studies", May 2022, IEEE Access, DOI: [10.1109/ACCESS.2022.3174958](https://doi.org/10.1109/ACCESS.2022.3174958)

<a id="2">[2]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)

<a id="3">[3]</a> Egea, A.; Junyent-Ferré, A.; Gomis-Bellmunt, O. "Active and reactive power control of grid connected distributed generation systems". Part of: "Modeling and control of sustainable power systems". 2012, p. 47-81. 

<a id="4">[4]</a> Clarke, E. "Circuit Analysis Of A-c Power System Vol I", John Wiley and Sons, 1941

<a id="5">[5]</a> Park, R. H. "Two-reaction theory of synchronous machines generalized method of analysis-part I", AIEE Transactions, Vol. 48, Issue 3, July 1929. DOI: [10.1109/T-AIEE.1929.5055275](https://doi.org/10.1109/T-AIEE.1929.5055275) 

<a id="6">[6]</a> Chung, Se-Kyo. "A phase tracking system for three phase utility interface inverters". IEEE Transactions on Power Electronics, Vol. 15, No.3, May 2000, DOI: [10.1109/63.844502](https://doi.org/10.1109/63.844502)

<a id="7">[7]</a> Harnefors, L.; Nee, H. P. "Model-Based Current Control of AC Machines Using the Internal Model Control Method". IEEE Transactions on Industrial Applications, Vol. 34, No. 1, January/February 1998, DOI: [10.1109/28.658735](https://doi.org/10.1109/28.658735)

<a id="8">[8]</a> Akagi, H.; Watanabe, E.; Aredes, M. "Instantaneous power theory and Applications to power conditioning". Wiley, Chichester (2007)

<a id="9">[9]</a> Kazmierkowski, M.P.; Krishnan, R.; Blaabjerg, F. Control in power electronics. Elsevier, Amsterdam (2002)

<a id="10">[10]</a> Espina, J.; Arias, A.; Balcells, J.; Ortega, C. "Speed Anti-Windup PI strategies review for Field Oriented Control of Permanent Magnet Synchronous Machines"[Link](https://upcommons.upc.edu/bitstream/handle/2117/9767/05156047.pdf)

<a id="11">[11]</a> IEEE. " Std. 421.5-2016: IEEE Recommended Practice for Excitation System Models for Power System Stability Studies" DOI: [10.1109/IEEESTD.2016.7553421](https://doi.org/10.1109/IEEESTD.2016.7553421)