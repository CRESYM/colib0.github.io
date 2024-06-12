---
layout: page 
title: EMT Grid Following Voltage Source Converter 
tags: [Opensource, EMT, voltage source, converter, wind, pv, hdvc, dynawo, STEPSS ] 
date: 05/06/2024 
last-updated: 05/06/2024
id: #163
---

# EMT Grid Following Voltage Source Converter

## Context

Voltage Source Converters (VSC) are widely used in power systems for a variety of applications, such as wind and photovoltaic generation, High Voltage Direct Current (HVDC) transmission, and Flexible AC Transmission Systems (FACTS). The model described here is a detailed Electromagnetic Transient (EMT) model of a grid-following VSC, which is a type of VSC that is connected to the grid and uses its frequency as a reference. This model is useful for studying the fast-dynamics of the VSC and its interaction with the grid.

## Model use, assumptions, validity domain and limitations

The model described allows performing EMT studies of the dynamics of a grid-following voltage source converter. It is specially useful in applications where there are fast-transients to be studied, being able to describe phenomena ranging from short-circuits to switching events or even lightning [[1]](#1). 

The assumptions made are:

* The grid to which the converter is connected is modeled as a Thevenin equivalent, with a three-phase voltage $$v_{g}^{abc}$$.
* The DC side of the converter is considered as a DC voltage-source $$E_{DC}$$.
* The AC-side of the converter is connected to the grid through an AC filter formed by a resistance $$R$$ and an inductance $$L$$. The AC voltage in the converter side is $$v_{c}^{abc}$$.
* The synchronization between converter and grid is assumed to suffer small deviation during transients, allowing the linearization of the trigonometric functions involved in the PLL dynamics.
<!-- * The switching process of the IGBTs that generate the AC wave from the modulation of the DC voltage is considered.-->
<!-- * The transformer dynamics have been neglected. -->

Although it can be used for low-frequency phenomena such as transient stability or inter-area oscillations, it is too slow to be competent against other methods such as the Phasor modeling approach, also known as RMS models, which make some assumptions that reduce the execution times in one or two orders of magnitude by increasing the time step, since they neglect the fast dynamics of the converter.

## Model description

The model can be described with the following schematic:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/EMT_GF_VSC_scheme.svg' | relative_url }}"
     alt="EMT GF VSC scheme"
     style="float: center; margin-right: 10px; width: 500px;" />
</div>
<div align = 'center'>
Figure 1: EMT Grid Following VSC scheme <a href="#1">[1]</a>
</div>
<br>

As it can be seen, there are several control blocks that act over the converter to determine the operating point. For a Grid Following VSC, these are:

* The Transformation blocks, which convert the electrical variables into the *\alpha\beta* and *dq0* reference frames.
* The Phase-Lock Loop (commonly referred to as PLL), which tracks the grid voltage and synchronizes the converter with the grid rotation.
* The Outer Loop, which provide active and reactive power control by setting a current reference from a power reference.
* The Inner Loop, or Current Loop, which corrects the converter voltage to provide the reference current.
* Modulation block, which models the switching of the IGBTs that create an AC voltage from a DC source using Pulse-Width Modulation (PWM).

A detailed explanation of each block is provided in the following subsections.

### Clarke and Park transformations

Assuming a three-phase balanced system, the electrical variables can be expressed in the *abc* reference frame as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ x_{abc} = \begin{bmatrix} x_a \\ x_b \\ x_c \end{bmatrix} = \begin{bmatrix} \sqrt{2} X \cos(\theta) \\ \sqrt{2}X \cos(\theta - \frac{2\pi}{3}) \\ \sqrt{2}X \cos(\theta + \frac{2\pi}{3}) \end{bmatrix} $$

</div>

where $$X$$ is the amplitude of the voltage or current, $$\theta$$ is the angle of the voltage or current. The Clarke transformation is used to convert the three-phase variables into an orthogonal reference frame. The transformation matrix is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ T_{\text{Clarke}} = \frac{1}{3} \begin{bmatrix} 2 & -1 & -1 \\ 0 & \sqrt{3} & -\sqrt{3} \end{bmatrix} $$
</div>

which applied to the *abc* variables, results in the *$$\alpha\beta$$* variables:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ x_{\alpha\beta} = \begin{bmatrix} x_{\alpha} \\ x_{\beta} \end{bmatrix} = \begin{bmatrix} \sqrt{2} X \cos(\theta) \\ - \sqrt{2}X \sin(\theta) \end{bmatrix} $$
</div>

where $$x_0 = 0$$ since it is a balanced system. The Park transformation is used to convert the *$$\alpha\beta$$* variables into a rotating reference frame. The transformation matrix is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ T_{\text{Park}}(\hat{\theta}) = \begin{bmatrix} \cos(\hat{\theta}) & -\sin(\hat{\theta}) \\ \sin(\hat{\theta}) & \cos(\hat{\theta}) \end{bmatrix} $$

</div>

which applied to the *$$\alpha\beta$$* variables, results in the *$$dq0$$* variables:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ x_{qd0} = \begin{bmatrix} x_{q} \\ x_{d} \end{bmatrix} = \begin{bmatrix} \sqrt{2} X \cos(\theta - \hat{\theta})  \\ \sqrt{2} X \sin(\theta - \hat{\theta}) \end{bmatrix} $$

</div>

As it can be seen, the Park transformation is dependent of the angle $$\hat{\theta}$$, which is the angle of the rotating reference frame, and it can be different to the angle of the voltage or current $$\theta$$. If the electrical variable is synchronized with the rotating reference frame, then $$\theta = \hat{\theta}$$ and $$x_d = 0$$.

### PLL

The goal of the PLL is to track the grid frequency and angle, as it is needed to establish the operating points of the converter using the control loops. As stated earlier, when the a voltage is synchronized with the reference frame (in this case, the grid), $$v_d = 0$$. To perform this tracking, the control applied considers a PI controller, yielding the following control structure:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/PLL_ControlDiagram.svg' | relative_url }}"
     alt="PLL Control Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 2: PLL Control Diagram <a href="#1">[1]</a>
</div>
<br>

Using the Park transformation over the grid measured voltages, and assuming a small phase difference between the output of the converter and the grid voltage, the linearization $$ v^g_d = E_m \sin(\delta) \approx E_m \delta $$ can be applied, where $$E_m$$ is the peak value of the grid voltage and $$\delta = \theta - \hat{\theta}$$ is the angle difference between the measured and the reference frame angle. The linearized control structure is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/LinearPLLBlock.svg' | relative_url }}"
     alt="PLL Control Diagram"
     style="float: center; margin-right: 10px; width: 800px;" />
</div>
<div align = 'center'>
Figure 3: Linearized PLL Control Diagram <a href="#1">[1]</a>
</div>
<br>

Now, the PI controller needs to be tuned in order to provide the desired response. The following second-order system models the response of the PLL:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{\hat{\theta}(s)}{\theta(s)}  = \frac{2 \zeta \omega_n s + \omega_n^2} {s^2 + 2\zeta\omega_n + \omega_n^2} $$

</div>

where $$\hat{\theta}(s)$$ is the estimated grid angle, $$\theta(s)$$ is the real grid angle, $$\zeta$$ is the damping factor, $$\omega_n$$ is the natural frequency. The PI controller block function is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ G_{PI}(s) = K_p + \frac{K_i}{s} = k_p \frac{1 + s\tau_{PLL}}{s\tau_{PLL}} $$
</div>

where $$k_p$$ and $$\tau_{PLL}$$ denoting the gains of the proportional gain and the PLL time constant, respectively. These parameters can be computed using the following expressions, obtained after working with the expressions of the closed loop transfer functions:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \omega_n = \sqrt{\frac{k_p E_m}{\tau_{PLL}}} $$
$$ \zeta = \frac{\sqrt{\tau_{PLL} k_p E_m}}{2} $$
</div>

A typical value for the damping ratio is $$\zeta = \frac{1}{\sqrt{2}}$$, PLL natural frequency could be set to a given frequency (i.e, 50 Hz, or 1 kHz). It is a choice of the user to set the desired values of the controller, setting exactly two of the four parameters ($$\omega_n$$, $$\tau_{PLL}$$, $$\zeta$$, $$k_p$$). The peak voltage $$E_m$$ is a parameter given by the utility characteristics.


### d-q current control

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v_{c}^{abc} - v_{g}^{abc} = R i_c^{abc} + L \frac{d}{dt} i_c^{abc} $$

</div>

which can be transformed into the *qd* frame to obtain the following equation:	

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v_{c}^{qd} - v_{g}^{qd} =\begin{bmatrix} R & L \omega\\ -L \omega & R \end{bmatrix} i_c^{qd} + L \frac{d}{dt} i_c^{qd} $$
</div>

where $$\omega$$ is the angular frequency of the grid obtained in the PLL, and $$v_{g}^d = 0$$. As it can be seen, there are couplings between the *q* and *d* components. This coupling can be dealt by the controller by designing a two dimension controller, or by decoupling the components and independently controlling each component. The later approach is the chosen in this model, using the following expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{v}^{q} \\ \hat{v}^{d} \end{bmatrix} = \begin{bmatrix} v_{c}^{q} - v_g^{q} + L\omega i_d  \\ v_{c}^{d} - L\omega i_q \end{bmatrix} $$

</div>

where $$\hat{v}^{q}$$ and $$\hat{v}^{d'}$$ are the controller output voltages. The equations are now decoupled using the expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{v}^{q} \\ v^{d} \end{bmatrix} = \begin{bmatrix} R & 0\\ 0 & R \end{bmatrix} \begin{bmatrix} i_q \\ i_d \end{bmatrix} + L \frac{d}{dt} \begin{bmatrix}  i_q \\ i_d \end{bmatrix} $$
</div>

Applying the Laplace transformation and reordering, the following relation holds:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{q}(s)}{\hat{v}^{q}(s)} = \frac{1}{R + sL} $$
$$ \frac{i^{d}(s)}{\hat{v}^{d}(s)} = \frac{1}{R + sL} $$

</div>

To obtain the current loop, the error with respect to the current setpoint is calculated, and a PI controller is used to obtain the closed loop. This relation can be represented by the following block diagram:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/CurrentErrorVSC.svg' | relative_url }}"
     alt="Current Error Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 4: Current Error Diagram <a href="#1">[1]</a>
</div>
<br>

The transfer function of this block diagram, considering $$G_c = K^{icl}_p + \frac{K^{icl}_i}{2}$$ is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{q}(s)}{i^{q*}(s)} = \frac{G_c(s)}{Ls + R + G_c(s)} $$

</div>

where $$i^{q*}(s)$$ is the reference current, $$i^{q}(s)$$ is the measured current. The controller gains can be selected as $$K^{icl}_p = \frac{L}{\tau_c}$$ and $$K^{icl}_i = \frac{R}{\tau_c}$$, where $$\tau_c$$ is the time constant of the current loop, such that the complete closed-loop transfer function is represented as the following first-order response:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{q}(s)}{i^{q*}(s)} = \frac{1}{\tau_c s + 1} $$
</div>

The complete system including the decoupling can be expressed as: 

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/CurrentControlDiagram.svg' | relative_url }}"
     alt="Current Control Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 5: Current Control Diagram <a href="#1">[1]</a>
</div>
<br>

with the PI controller

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ G_{c}(s) = K_p + \frac{K_i}{s} = \frac{L}{\tau_c} + \frac{R}{\tau_c s} $$

</div>

The converter voltage setpoint obtained from this loop ($$v_c^{qd}$$) is then used to modulate the IGBTs and generate the AC voltage from the DC source. However, the modulation block can be omitted in some simplified models, and it can be considered to be directly the actual converter voltage, thus why the notation does not directly use the star notation. In latter section, this modulation will be explained.


### Active and reactive power control

The previous section made use of the current setpoints to control the converter. These setpoints can be determined directly by the user, or they can be obtained from the power setpoints (P*, Q*), which would still come from the user. To derive the controls, firstly the instantaneous power theory is described briefly for the synchronous frame *dq0*.

The voltage and current phasors can be expressed in the *dq0* frame as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v^{qd} = \frac{v^q - jv^d}{\sqrt{2}} $$
$$ i^{qd} = \frac{i^q - ji^d}{\sqrt{2}} $$

</div>

The complex power phasor, as well as the active and reactive power values, can now be obtained with:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ S = 3 v^{qd}(i^{qd})^* = 3 (\frac{v^q - jv^d}{\sqrt{2}})(\frac{i^q + ji^d}{\sqrt{2}})$$
$$ P = \Re(S) = \frac{3}{2} (v^q i^q + v^d i^d) $$
$$ Q = \Im(S) = \frac{3}{2} (v^q i^d - v^d i^q) $$
</div>

Considering $$v_d = 0$$, the setpoints for current could be extracted substituting in the previous equation and using directly the grid voltage measurement $$v_q$$ obtained from the Park transformation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ i^{q*} = \frac{2}{3} \frac{P^*}{v^q} $$
$$ i^{d*} = \frac{2}{3} \frac{Q^*}{v^q} $$
</div>

However, it is not suitable to use this direct calculation under transient conditions or perturbations, and a PI controller is proposed to provide the desired response. The following block diagram shows the current setpoints output using the power setpoints:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/PowerLoopVSC.svg' | relative_url }}"
     alt="Power Control Diagram"
     style="float: center; margin-right: 10px; height: 180px;" />
</div>
<div align = 'center'>
Figure 6: Power Control Diagram <a href="#1">[1]</a>
</div>
<br>

To determine the PI controller parameters, we propose the complete power loop computing the error response, including the current loop dynamics with the obtained transfer function. The following block diagram shows the complete power loop:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/ErrorPowerLoopVSC.svg' | relative_url }}"
     alt="Power Control Diagram"
     style="float: center; margin-right: 10px; height: 280px;" />
</div>
<div align = 'center'>
Figure 7: Closed-Loop Power Control Diagram <a href="#1">[1]</a>
</div>
<br>

Following a similar procedure to the one of the current loop, the closed-loop transfer function of the power loop can be modelled as a first-order system:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{P(s)}{P^*(s)} = \frac{Q(s)}{Q^*(s)} = \frac{1}{\tau_p s + 1} $$
</div>

where $$\tau_p$$ is the time constant of the power loop. The PI controller can be obtained with the use of the time constant of the current loop as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$K^{ipl}_p = \frac{2\tau_c}{3V_{peak}\tau_p}$$ 
$$K^{ipl}_i = \frac{2}{3V_{peak}\tau_p}$$
</div>


### Limitations of current


### Modulation

As explained in the current loop section, the converter voltage setpoint obtained is considered directly the converter voltage. However, this sinusoidal voltage is obtained from a DC source, and to generate the AC voltage, the IGBTs are modulated using Pulse-Width Modulation (PWM). To determine the position of the IGBTs, the Space Vector PWM (SVPWM) technique is used. It is based with the projection of the AC side converter voltages in a space vector. Considering the possible configurations of the IGBTs, there are a total of $$2^3 = 8$$ possible states, the resulting voltages of which can be represented in a hexagon in the $$\alpha\beta$$ reference frame:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/SVPWM.svg' | relative_url }}"
     alt="SVPWM Diagram"
     style="float: center; margin-right: 10px; width: 500px;" />
</div>
<div align = 'center'>
Figure 8: SVPWM Voltages Vector Space <a href="#1">[1]</a>
</div>
<br>

The values of the voltages for each switching state can be seen in the following table:

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
     <th style="border-left:2px solid black; text-align:center;">Vector</th>
     <th style="border-left:2px solid black; text-align:center;">q1</th>
     <th style="text-align:center;">q2</th>
     <th style="text-align:center;">q3</th>
     <th style="border-left:2px solid black; text-align:center;">Va</th>
     <th style="text-align:center;">Vb</th>
     <th style="border-right:2px solid black; text-align:center;">Vc</th>
</tr>
<tr style="border-top:2px solid black;">
     <td style="border-left:2px solid black;">$$0$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td style="border-right:2px solid black;">$$0$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$0$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$\frac{2E_{DC}}{3}$$</td>
     <td>$$-\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$2$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$1$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
     <td>$$\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$-\frac{2E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$3$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$1$$</td>
     <td>$$0$$</td>
     <td style="border-left:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
     <td>$$\frac{2E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$4$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$1$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$-\frac{2E_{DC}}{3}$$</td>
     <td>$$\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$5$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$-\frac{E_{DC}}{3}$$</td>
     <td>$$-\frac{E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$\frac{2E_{DC}}{3}$$</td>
</tr>
<tr>
     <td style="border-left:2px solid black;">$$6$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$0$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
     <td>$$-\frac{2E_{DC}}{3}$$</td>
     <td style="border-right:2px solid black;">$$\frac{E_{DC}}{3}$$</td>
</tr>
<tr style="border-bottom:2px solid black;">
     <td style="border-left:2px solid black;">$$7$$</td>
     <td style="border-left:2px solid black;">$$1$$</td>
     <td>$$1$$</td>
     <td>$$1$$</td>
     <td style="border-left:2px solid black;">$$0$$</td>
     <td>$$0$$</td>
     <td style="border-right:2px solid black;">$$0$$</td>
</tr>
</table>

To generate the set AC voltage, the modulation block will determine in which region of the hexagon the voltage is, and it will decompose it into the 2 limiting vectors of the region. This will make possible to construct the voltage using the possible switching states. To do so, the module and angle of the voltage in the $$\alpha\beta$$ reference frame are calculated as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V_{svm} = \sqrt{V_{\alpha}^2 + V_{\beta}^2} $$
$$ \theta_{svm} = \arctan(\frac{V_{\beta}}{V_{\alpha}}) $$
</div>

Using the appropiate duty cycle for each vector component, it is possible to reconstruct the setpoint voltage. To minimize the switching losses, each region will have a specific switching order such that only one of the IGBTs is switched at a time, thus why it is useful to include two options to represent the 0-valued voltage in the hexagon (vectors $$0$$ and $$7$$). Since all the regions have the same angles, a vector in the n-th sector can be reduced to the first sector for simplicity:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ \theta_{sec1} = \theta_{svm} - \frac{\pi}{3}(n - 1)$$
$$ n = \text{floor}(\frac{\theta_{svm}}{\frac{\pi}{3}}) + 1 $$
</div>

where the floor operation determines the sector of the hexagon depending on the angle of the voltage. The duty cycles can be calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ D_1 = \frac{\sqrt{3}V_{svm} \sin(\frac{\pi}{3} - \theta_{sec1})}{2V_{DC}} $$
$$ D_2 = \frac{V_{svm} \sin(\theta_{sec1} - \frac{\pi}{3})}{V_{DC}} $$
</div>

where $$D_1$$ and $$D_2$$ are the duty cycles of the vectors with lower and higher value of angle than the setpoint voltage, respectively. The rest of the duty times will correspond to the zero-valued vectors, which will have their times distributed as $$D_{v0} = D_{v7} = \frac{1 - D_1 - D_2}{2}$$. The total time of the PWM cycle is $$T_{PWM} = \frac{1}{f_{PWM}}$$, where $$f_{PWM}$$ is the frequency of the PWM. The time of each vector is then calculated as $$T_{v} = D_{v}T_{PWM}$$.

The complete block diagram of the modulation block can be seen in the following figure: 

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFollowingVSC/ModulationVSC.svg' | relative_url }}"
     alt="Modulation VSC"
     style="float: center; margin-right: 10px; width: 100%;" />
</div>
<div align = 'center'>
Figure 6: Modulation Control Blocks 
</div>
<br>

## Open source implementations (if any)

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| STEPSS | [Link](https://github.com/CRESYM/BiGER/tree/main/testModels/gridFollowing/STEPPS) | txt | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 17/05/2024 | - | -->
<!-- | dynawo | [Link](https://github.com/dynawo/dynawo/) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 17/05/2024 | - | -->

## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor Modeling Approaches and Simulation Guidelines of Voltage-Source Converters in Grid-Integration Studies", May 2022, IEEE Access, DOI: [10.1109/ACCESS.2022.3174958](https://doi.org/10.1109/ACCESS.2022.3174958)

<a id="2">[2]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)

<a id="3">[3]</a> Egea, A.; Junyent-Ferré, A.; Gomis-Bellmunt, O. "Active and reactive power control of grid connected distributed generation systems". Part of: "Modeling and control of sustainable power systems". 2012, p. 47-81. 

<a id="4">[4]</a> Chung, Se-Kyo. "A phase tracking system for three phase utility interface inverters". IEEE Transactions on Power Electronics, Vol. 15, No.3, May 2000, DOI: [10.1109/63.844502](https://doi.org/10.1109/63.844502)