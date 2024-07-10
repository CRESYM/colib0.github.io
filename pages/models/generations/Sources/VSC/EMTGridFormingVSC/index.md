---
layout: page 
title: Generic EMT Grid Forming Voltage Source Converter 
tags: [Opensource, EMT, voltage source, converter, wind, pv, hdvc, dynawo, STEPSS, grid following] 
date: 03/07/2024 
last-updated: 03/07/2024
id: #175
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---


## Context

Voltage Source Converters (VSC) are widely used in power systems for a variety of applications, such as wind and photovoltaic generation, High Voltage Direct Current (HVDC) transmission, and Flexible AC Transmission Systems (FACTS). The model described here is a detailed Electromagnetic Transient (EMT) model of a grid-forming VSC, which is a type of VSC that generates its own angle and frequency reference. This model, obtained from the many works developed at CITCEA-UPC (Centre d'Innovació Tecnològica en Convertidors Estàtics i Accionaments) such as [[1]](#1), [[2]](#2) and [[3]](#3), is useful for studying the fast-dynamics of the VSC and its interaction with the grid.
    
## Model use, assumptions, validity domain and limitations

The model use is to perform EMT studies involving Grid Forming VSCs. The model is valid for the study of the fast dynamics of the VSC and its interaction with the grid. The model is based on the following assumptions:

* The system is balanced and sinusoidal.
* The VSC is represented by three equivalent voltage sources. 
* Frequency and angle reference are obtained using a reference frequency and an active power droop control in order to provide grid support.
* The voltage setpoint is obtained from the reactive power droop control.
* The Voltage Controller provides a current reference from a voltage reference.
* The current controller provides the converter voltage.
* No modulation is considered, meaning this is an averaged model of the VSC. 

The model is valid for high-frequency phenomena studies, such as short-circuit calculations, energization studies, switching transients, traveling waves or lightning events. Lower frequency studies can be performed, but since there is a limitation over the time-step size due to convergence issues (it has to be a couple of orders of magnitude smaller than the lowest time-constant of all the controllers), they are much slower than using a phasor-based model. The model is not valid for harmonic studies, since it does not consider the switching process, and the output voltage is considered to be sinusoidal.


## Model description

The model can be described with the following schematic:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/EMT_GFM_VSC_scheme.svg' | relative_url }}"
     alt="EMT GF VSC scheme"
     style="float: center; margin-right: 10px; width: 500px;" />
</div>
<div align = 'center'>
Figure 1: EMT Grid Forming VSC scheme <a href="#1">[1]</a> 
</div>
<br>


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


### Synchronization loop

In the present model, the frequency of the VSC is determined using a synchronization loop that involves an active power droop. Considering a reference grid frequency (normally 50 Hz), the converter frequency will be adjusted around this value considering the active power error, since active power and voltage phases are related. The droop equation is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

%% K_{P,droop} = \frac{\Delta \omega}{\Delta P}$$

</div>

where the droop constant $$K_{P, droop}$$ is the slope of the droop curve, normally determined by grid codes. In addition to this droop control, it is common to apply a low-pass filter to the power measurement: $$\frac{1}{\tau_{P, droop} s + 1}$$, with $$\tau_{P, droop} = \frac{1}{\omega_{P, droop}}$$ and $$\omega_{P, droop}$$ the bandwith of the filter. This avoids having higher harmonics in the frequency signal. The block diagram of the synchronization loop is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/SynchronizationLoopVSC.svg' | relative_url }}"
     alt="Synchronization Loop Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 2: Synchronization Loop Diagram </a>
</div>


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
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/CurrentControlDiagram.svg' | relative_url }}"
     alt="Current Control Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 5: Current Control Diagram <a href="#3">[3]</a>
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
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/CurrentErrorVSC.svg' | relative_url }}"
     alt="Current Error Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 4: Current Error Diagram
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

The converter voltage setpoint obtained from this loop ($$v_c^{qd}$$) is then used to modulate the IGBT pulses and generate the AC voltage from the DC source. However, the modulation block can be omitted in some simplified models, and it can be considered to be directly the actual converter voltage, maintaining the notation without the setpoint indicator ($$*$$). This modulation will be explained in [Section 3.6](#modulation).


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
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/PowerLoopVSC.svg' | relative_url }}"
     alt="Power Control Diagram"
     style="float: center; margin-right: 10px; height: 180px;" />
</div>
<div align = 'center'>
Figure 6: Power Control Diagram <a href="#3">[3]</a>
</div>
<br>

In order to tune the PI controller parameters, the closed-loop of the system is considered. In order to have the feedback loop, the power output is calculated including the current loop dynamics and the conversion from current to power using the instantaneous power theory. The following block diagram shows the complete power loop:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/ErrorPowerLoopVSC.svg' | relative_url }}"
     alt="Power Control Diagram"
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

### Limitations of current

The technical constraints of the VSC can be included in the controls using saturation blocks. Depending on the desired operation mode, the converter can be set to prioritize one of the current components. These operation modes are typically defined by the grid codes, although a possible implementation could be the following:

* **Normal operation**: The converter will follow the $$i^q$$ component setpoint, prioritizing the active power, and then $$i^d$$ will be limited by the operational limits of the converter $$i^d_{max} = \sqrt{I_{max}^2 - \max{i^q, i^{q*}}} $$.
* **Transient or fault operation**: The converter will now prioritize the $$i^d$$ component, which will follow its reference, and $$i^q_{max} = \sqrt{I_{max}^2 - \max{i^d, i^{d*}}^2} $$.


### Modulation

As explained in the current loop section, the converter voltage setpoint obtained can be considered directly the converter voltage, in what is called an Averaged Model, since it does not consider the switching process. However, a more complete EMT simulation will model the modulation performed to obtain the sinusoidal voltage from the DC source. The modulation will determine the switching state of the 3 pairs of IGBTs (as it is assumed to be a 2-level VSC) in order to produce a given voltage. To do so, the technique used is the Space Vector Pulse-Width Modulation (SVPWM) [[9]](#9), which can be modelled with the following block diagram:


<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/ModulationVSC.svg' | relative_url }}"
     alt="Modulation VSC"
     style="float: center; margin-right: 10px; width: 100%;" />
</div>
<div align = 'center'>
Figure 8: Block diagram of the modulation
</div>
<br>

This technique projects the AC voltage that is desired to generate (which is the setpoint obtained from the control loops) into the $$\alpha\beta$$ reference frame. Then, it determines in which of the 6 regions delimited by the voltage vectors of the $$2^3 = 8$$ possible configurations of the IGBTs it is enclosed. Since two of the positions correspond to a short-circuit on all the phases, their output voltage will be 0, and they are at the center of the resulting hexagon, belonging to of all the regions. The complete hexagon with a vector projected into it can be seen in the following figure:


<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/SVPWM.svg' | relative_url }}"
     alt="SVPWM Diagram"
     style="float: center; margin-right: 10px; width: 500px;" />
</div>
<div align = 'center'>
Figure 9: SVPWM Voltages Vector Space <a href="#9">[9]</a>
</div>
<br>

As it can be seen, the voltage $$v^{\alpha\beta}$$ can be obtained by adding fractions of two of the vectors that delimit the region. The fraction is commonly known as duty cycle $$D_i = \frac{T_i}{T_z}$$. The duty cycle of the zero-voltage states can be calculated using the remaining time of the PWM as $$D_0 = D_7 = \frac{1 - D_i - D_j}{2}$$, while the other duty cycles have their own formulas to be calculated. Considering the symmetry of the regions, the duty cycles can be calculated referring always to the first region. Let $$D_1$$ be the duty cycle of the state with lower angle than $$v^{\alpha\beta}$$, and $$D_2$$ the duty cycle of the state with higher angle, the following calculations are made starting from the decomposition of the setpoint voltage:


<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V_{svm} = \sqrt{V_{\alpha}^2 + V_{\beta}^2} $$
$$ \theta_{svm} = \arctan(\frac{V_{\beta}}{V_{\alpha}}) $$
$$ \theta_{sec1} = \theta_{svm} - \frac{\pi}{3}(n - 1)$$
$$ n = \text{floor}(\frac{\theta_{svm}}{\frac{\pi}{3}}) + 1 $$
</div>

where the floor operation determines the sector of the hexagon depending on the angle of the voltage. The duty cycles can be calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ D_1 = \frac{\sqrt{3}V_{svm} \sin(\frac{\pi}{3} - \theta_{sec1})}{2E_{DC}} $$
$$ D_2 = \frac{V_{svm} \sin(\theta_{sec1} - \frac{\pi}{3})}{E_{DC}} $$
</div>

where $$D_1$$ and $$D_2$$ are the duty cycles of the vectors that limit the sector. Now, $$D_0$$ and $$D_7$$ can be easily calculated. 

The switching order is important, since it is desirable to have a resulting sine-like wave, while minimizing switching losses. A symmetrical pattern that starts and ends at the ⓪-state is chosen, since it helps to transition between two adjacent periods that have the voltage at two different regions, for instance. To minimize losses, the order of states will be the one that results in a single switch between states, meaning that from the state with switch positions $$000$$, the next state will have $$1$$ in a single switch, and the other two switches at $$0$$. The following table shows all the switching states with their output voltage:

<table style="table-layout: fixed; width: 50%; margin-left: auto; margin-right: auto;">
  <colgroup>
    <col style="width: 10%;">
    <col style="width: 10%;">
    <col style="width: 10%;">
    <col style="width: 10%;">
    <col style="width: 20%;">
    <col style="width: 20%;">
    <col style="width: 20%;">
  </colgroup>
<tr style="border-top:2px solid black;">
     <th style="border-left:2px solid black; text-align:center;">State ID</th>
     <th style="border-left:2px solid black; text-align:center;">q1</th>
     <th style="text-align:center;">q2</th>
     <th style="text-align:center;">q3</th>
     <th style="border-left:2px solid black; text-align:center;">Va</th>
     <th style="text-align:center;">Vb</th>
     <th style="border-right:2px solid black; text-align:center;">Vc</th>
</tr>
<tr style="border-top:2px solid black;">
     <td style="border-left:2px solid black;">$$⓪$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td style="border-right:2px solid black;">$$0$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$①$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$0$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$\frac{2E_{DC}}{3}$$</td>
     <td>$$-\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$②$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$1$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
     <td>$$\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$-\frac{2E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$③$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$1$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
     <td>$$\frac{2E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$④$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$1$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$-\frac{2E_{DC}}{3}$$</td>
     <td>$$\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$⑤$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
     <td>$$-\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$\frac{2E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$⑥$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$0$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
     <td>$$-\frac{2E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
</tr>
<tr style="border-bottom:2px solid black;">
     <td style="border-left:2px solid black;">$$⑦$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$1$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td style="border-right:2px solid black;">$$0$$</td>
</tr>
</table>

For instance, if the voltage setpoint is located in the region delimited by states $$⓪/⑦-①-⑥$$ as in Figure 9, the switching order would be $$000 \rightarrow 100 \rightarrow 101 \rightarrow 111 \rightarrow 101 \rightarrow 100 \rightarrow 000$$, or, if we use state identifiers, $$ ⓪ \rightarrow ① \rightarrow  ⑥ \rightarrow  ⑦  \rightarrow  ⑥ \rightarrow  ① \rightarrow  ⓪ $$. This means that the duty cycles are split in two for all the states except the ⑦-state. The following figure represents state ⑥ of the mentioned pattern:


<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/SVPWM_figs.svg' | relative_url }}"
     alt="SVPWM Switching State"
     style="float: center; margin-right: 10px; width: 900px;" />
</div>
<div align = 'center'>
Figure 10: Schematics of the instantaneous switching state ⑥. (a) shows the positions of the switches, as well as the whole pattern, (b) represents the IGBT pairs and which of them is on, and (c) shows the equivalent grid for the state.
</div>
<br>

As it can be seen in Figure 10(a), the pattern needed to generate the $$v^{\alpha\beta}$$ AC voltage shown in Figure 9 will change the state of one of its switches at a time and starts and ends at 0 voltage. The states $$000$$ and $$111$$ are those where all the switches are closed on the same side, short-circuiting the three phases, while for the rest of the cases, there is a voltage division between the isolated phase and the short-circuited couple, as can be seen from the grid equivalent in Figure 10(c).

The result of the algorithm would determine the state of the switches of the converter, and would send to each IGBT the appropiate signal (check Figure 10(b)). This corresponds to the hardware integration, but since the model is used to simulate the system, the averaged output voltage of the converter during a PWM period can be directly calculated using the duty times:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v_{c}^{\alpha\beta} = D_1 V_1 + D_2 V_2$$
</div>

where, for the given example, $$V_1 = E_{DC} e^{j0}$$ and $$V_2 = E_{DC} e^{j\frac{\pi}{3}}$$, and $$D_1$$ and $$D_2$$ are the duty cycles calculated for the given voltage setpoint. The output voltage can be then transformed to the *abc* frame.


## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| PSTess | [Link](https://github.com/sandialabs/snl-pstess/blob/master/pstess/gfma.m) | MATLAB | Copyright 2021 National Technology & Engineering Solutions of Sandia, LLC
(NTESS) | 09/07/2024 | -------- |

## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)



<a id="4">[4]</a> Clarke, E., "Circuit Analysis Of A-c Power System Vol I", John Wiley and Sons, 1941

<a id="5">[5]</a> Park, R. H., "Two-reaction theory of synchronous machines generalized method of analysis-part I", AIEE Transactions, Vol. 48, Issue 3, July 1929. DOI: [10.1109/T-AIEE.1929.5055275](https://doi.org/10.1109/T-AIEE.1929.5055275) 

<a id="7">[7]</a> Harnefors, L.; Nee, H. P. "Model-Based Current Control of AC Machines Using the Internal Model Control Method". IEEE Transactions on Industrial Applications, Vol. 34, No. 1, January/February 1998, DOI: [10.1109/28.658735](https://doi.org/10.1109/28.658735)

<a id="8">[8]</a> Akagi, H., Watanabe, E., Aredes, M.: "Instantaneous power theory and Applications to power conditioning". Wiley, Chichester (2007)


