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

Voltage Source Converters (VSC) are widely used in power systems for a variety of applications, such as wind and photovoltaic generation, High Voltage Direct Current (HVDC) transmission, and Flexible AC Transmission Systems (FACTS). The model described here is a detailed Electromagnetic Transient (EMT) model of a grid-forming VSC, which is a type of VSC that, compared to the Grid Following (which follows the grid rotation) are capable of imposing a determined angle and frequency. This model, obtained from the many works developed at CITCEA-UPC (Centre d'Innovació Tecnològica en Convertidors Estàtics i Accionaments) such as [[1]](#1), [[2]](#2) and [[3]](#3), is useful for studying the fast-dynamics of the VSC and its interaction with the grid.
    
## Model use, assumptions, validity domain and limitations

The model use is to perform EMT studies involving Grid Forming VSCs. The model is valid for the study of the fast dynamics of the VSC and its interaction with the grid. The model is based on the following assumptions:

* The system is balanced and sinusoidal.
* The VSC is represented by three equivalent voltage sources. 
* Frequency and angle reference are obtained using a reference frequency and an active power droop control in order to provide grid support.
* The voltage setpoint is obtained from the reactive power droop control.
* The Voltage Controller provides a current reference from a voltage reference.
* The Current Controller provides the converter voltage.

The model is valid for high-frequency phenomena studies, such as short-circuit calculations, energization studies, switching transients, traveling waves or lightning events. Lower frequency studies can be performed, but since there is a limitation over the time-step size due to convergence issues (it has to be a couple of orders of magnitude smaller than the lowest time-constant of all the controllers), they are much slower than using a phasor-based model. The model is not valid for harmonic studies, since it does not consider the switching process, and the output voltage is considered to be sinusoidal.


## Model description

The model can be described with the following schematic:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/EMT_GFM_VSC.svg' | relative_url }}"
     alt="EMT GF VSC scheme"
     style="float: center; margin-right: 10px; width: 500px;" />
</div>
<div align = 'center'>
Figure 1: EMT Grid Forming VSC scheme <a href="#1">[1]</a> 
</div>
<br>

It is important to note that the currents are measured both at the point of connection of the capacitor filter $$v_f$$ and at the grid side $$v_g$$, while the currents are measured before the filter at converter side $$i_c$$ and after the filter at the grid side $$i_g$$. Starred notation, such as $$v_c^{qd*}$$, is used to denote setpoints, in this case the voltage for the equivalent sources of the converter.

The existence of modelling this type of filter (an LCL rather than the single L filter used in Grid Following) is due to the usage of a Grid Forming VSC, which can blackstart a network for example. The more complex filter is used to reduce the harmonic distortion of the output voltage and increase the robustness of the control, which is important in this type of application. 

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

$$ x_{\alpha\beta0} = T_{Clarke} x_{abc} = \begin{bmatrix} x_{\alpha} \\ x_{\beta} \\ x_0 \end{bmatrix} = \begin{bmatrix} \sqrt{2} X \cos(\theta) \\ - \sqrt{2}X \sin(\theta)  \\ 0\end{bmatrix} $$
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

Here there are two of the main used synchronization loops for the Grid Forming VSC, which determine the voltage magnitude and angle that the grid forming will use to operate. There are other alternatives, although the most studied are the ones presented in this model. The droop control method is simpler and it has been proven to be a special case of the virtual synchronous machine method, while the second one produces slower rates of change of the frequency due to the existence of virtual inertia in stand-alone situations.

#### Droop control

In the present model, the frequency of the VSC is determined using a synchronization loop that involves an active power droop. Considering a reference grid frequency $$\omega^*$$ (normally 50 Hz), the converter frequency will be adjusted around this value considering the active power error, since active power and voltage phases are related in largely inductive grids as in the transmission system. The droop equation is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ K_{\Delta P} = \frac{\Delta \omega}{\Delta P}$$

</div>

where the droop constant $$K_{\Delta P}$$ is the slope of the droop curve, normally determined by grid codes. In addition to this droop control, it is common to apply a low-pass filter to the power measurement: $$\frac{1}{\tau_{\Delta P} s + 1}$$, with $$\tau_{\Delta P} = \frac{1}{\omega_{\Delta P}}$$ and $$\omega_{\Delta P}$$ the bandwith of the filter. This avoids having higher harmonics in the frequency signal. The block diagram of the synchronization loop is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/SynchronizationLoopGFM.svg' | relative_url }}"
     alt="Synchronization Loop Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 2: Synchronization Loop Diagram
</div>

Similar to the controls applied over the active power, the reactive power output of the converter is related to the voltage magnitude. In this case, the droop equation is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ K_{\Delta Q} = \frac{\Delta Q}{\Delta V} $$

</div>

where the droop constant $$K_{\Delta Q}$$ is the slope of the droop curve. Again, the reactive power measurement is filtered to avoid including high-frequency harmonics, applying a low-pass filter with a bandwidth $$\omega_{\Delta Q}$$, and a time constant $$\tau_{\Delta Q} = \frac{1}{\omega_{\Delta Q}}$$. The block diagram of the reactive power droop control is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/ReactiveDroopGFM.svg' | relative_url }}"
     alt="Reactive Power Droop Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 3: Reactive Power Droop Diagram 
</div>

#### Virtual Synchronous Machine (VSM)

Another alternative to the droop control is the Virtual Synchronous Machine (VSM) control, which is a control strategy that emulates the electromechanical behavior of a synchronous machine. This type of control emulates the swing equation of a synchronous machine:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ J \omega_0 \frac{d\omega_r}{dt} + D_p\omega_r = P_m - P_e $$
</div>

where $$J$$ is the inertia of the machine, $$\omega_r$$ is the angular frequency of the rotor, $$D_p$$ is a damping constant, $$P_m$$ is the mechanical power, and $$P_e$$ is the electrical power. The control law applied to replicate this equation is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ K_{vsm} = \frac{\Delta \omega}{\Delta P} $$ = \frac{1}{D_p + k_m} \frac{1}{\frac{J\omega_0}{D_p + k_m}s + 1} $$

</div>

where $$k_m$$ is the controller constant. Both this constant and the damping constant $$D_p$$ are tuned to obtain the desired response, while $$J$$ is chosen to have the desired virtual inertia. The block diagram of the VSM control is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/VSMGFM.svg' | relative_url }}"
     alt="VSM Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 4: VSM Synchronization Loop Diagram
</div>
<br>

Considering the *qd0* reference frame in which $$v^{d*} = 0$$, the voltage setpoint $$v^{q*}$$ is equal to the module obtained from the reactive power droop control. The following section shows the voltage control droops applied to these references.

### Voltage control

The voltage control is used to determine the current setpoints that will be used to control the converter. Using Kirchhoff current law and neglecting the parasite resistance $$R_{cap}$$ of the capacitors, the differential equations that model the relationship between voltage and currents in the Grid Forming VSC are the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ i^{qd*}_c - i^{qd}_g = \begin{bmatrix} 0 & -\omega C_f \\ \omega{C_f} & 0 \end{bmatrix} v^{qd}_f + \frac{d}{dt} \begin{bmatrix} v^d_f \\ v^q_f\end{bmatrix}$$

</div>

where $$C_f$$ are the capacitance of the filter, $$i^{qd*}_c$$ are the current setpoints at the converter side, $$i^{qd}_g$$ are the current measurements at the grid side after the capacitor, and $$v^{qd}_f$$ are the voltages measured at the filter. A change of variables that considers the coupling can be used to simplify the expressions, as well as using the Laplace transformation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{i^d} \\ \hat{i^q} \end{bmatrix} = \begin{bmatrix} i^d_c - i^d_g + \omega C_f v^q_f \\ i^q_c - i^q_g - \omega C_f v^d_f \end{bmatrix} = \begin{bmatrix} sC_f v^d_f \\ sC_f v^q_f\end{bmatrix} $$

</div>

With the following block diagram representing the above relationship, and including a PI controller, forming the open-loop block diagram:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/VoltageControlGFM.svg' | relative_url }}"
     alt="Voltage Control Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 5: Voltage Control Diagram
</div>
<br>

From the previous section, the setpoints are decided to be $$v^{q*}_f = V$$ and $$v^{d*}_f = 0$$. To close the loop, the following plant is proposed which relates the decoupling current variables with the voltages:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{v^d_f}{\hat{i^d}} = \frac{1}{sC_f} $$
$$ \frac{v^q_f}{\hat{i^q}} = \frac{1}{sC_f} $$

</div>

with the following block diagram:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/VoltageErrorGFM.svg' | relative_url }}"
     alt="Voltage Closed-Loop Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 6: Voltage Closed-Loop Diagram
</div>
<br>

The closed-loop transfer function of the voltage control can be obtained by adding a PI controller to the open-loop transfer function. The PI controller is designed to have a second-order response, with the following transfer function:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{v^{qd}_f}{v^{qd*}} = \frac{sK^{vcl}_p + K^{vcl}_i}{s^2 C_f +sK^{vcl}_p + K^{vcl}_i} $$	

</div>

The tuning of the control parameters will be so that the denominator adopts the form $$s^2 + 2\xi \omega_n C_f s + \omega_n^2$$. With this, the values are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ K^{vcl}_p = 2\xi \omega_n C_f $$
$$ K^{vcl}_i = \omega_n^2 C_f $$

</div>

with a damping factor $$\xi$$ often between 0.5 and 1 ($$\frac{\sqrt{2}}{2}$$ is a common value) and a natural frequency $$\omega_n$$. 

Over these current setpoints, a current control equivalent to the one from the grid-following can be applied.


### Current control

The current control is used to determine the converter voltage that has to be applied in order to maintain the current at the setpoint. The model presented uses the Internal Model Control method (IMC), described in [[7]](#7) as in the Grid Following model, providing PI controllers tuned in terms of the machine parameters (in this case $$R_f$$ and $$L_f$$) with the desired response. The control is based on the electric relationship between the variables:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v_c^{abc*} - v_{f}^{abc} = R_f i_c^{abc} + L_f \frac{d}{dt} i_c^{abc} $$

</div>

which can be transformed into the *qd* frame to obtain the following equation:	

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v_c^{qd*} - v_{f}^{qd} =\begin{bmatrix} R_f & L_f \omega\\ -L_f \omega & R_f \end{bmatrix} i_c^{qd} + L_f \frac{d}{dt} i_c^{qd} $$
</div>

where $$\omega$$ is the angular frequency of the grid obtained in the synchronization loop, and $$v^{d*} = 0$$. The block diagram associated to this system is the following:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/generations/Sources/VSC/EMTGridFormingVSC/CurrentControlGFM.svg' | relative_url }}"
     alt="Current Control Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 7: Current Control Diagram <a href="#3">[3]</a>
</div>
<br>

As it can be seen, there is a coupling between the *q* and *d* components. This can be dealt by the controller by designing a two dimension controller, or by decoupling the components and independently controlling each component. The later approach is the chosen in this model, using the following expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{v}^{q} \\ \hat{v}^{d} \end{bmatrix} = \begin{bmatrix} v^{q*} - v_f^{q} + L_f \omega i^d_c  \\ v^{d*} - L_f \omega i^q_c \end{bmatrix} $$

</div>

where $$\hat{v}^{q}$$ and $$\hat{v}^{d}$$ are the controller output voltages. The equations are now decoupled using the expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{v}^{q} \\ v^{d} \end{bmatrix} = \begin{bmatrix} R_f & 0\\ 0 & R_f \end{bmatrix} \begin{bmatrix} i^q_c \\ i^d_c \end{bmatrix} + L_f \frac{d}{dt} \begin{bmatrix}  i^q_c \\ i^d_c \end{bmatrix} $$

</div>

Applying the Laplace transformation and reordering, the following relation holds:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{qd*}_c(s)}{\hat{v}^{qd}(s)} = \frac{1}{R_f + sL_f} $$

</div>

The closed-loop transfer function, considering $$G_c = K^{icl}_p + \frac{K^{icl}_i}{s}$$ is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{qd}_s(s)}{i^{qd*}_s(s)} = \frac{G_c(s)}{(L_f + L_c)s + (R_f + R_c) + G_c(s)} $$

</div>

where $$i^{qd*}_c(s)$$ is the reference current for *q* or *d* axis at the converter side, and $$i^{qd}_c(s)$$ is the measured current. The controller gains can be selected as $$K^{icl}_p = \frac{L_f}{\tau_c}$$ and $$K^{icl}_i = \frac{R_f}{\tau_c}$$, where $$\tau_c$$ is the time constant of the current loop, such that the complete closed-loop transfer function is represented as the following first-order response:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i^{qd}_c(s)}{i^{qd*}_c(s)} = \frac{1}{\tau_c s + 1} $$
</div>

The resulting PI controller is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ G_{c}(s) = K_p + \frac{K_i}{s} = \frac{L_f}{\tau_c} + \frac{R_f}{\tau_c s} $$

</div>


### Limitations of current

The technical constraints of the VSC can be included in the controls using saturation blocks. Depending on the desired operation mode, the converter can be set to prioritize one of the current components. These operation modes are typically defined by the grid codes, although a possible implementation could be the following:

* **Normal operation**: The converter will follow the $$i^q$$ component setpoint, prioritizing the active power, and then $$i^d$$ will be limited by the operational limits of the converter $$i^d_{max} = \sqrt{I_{max}^2 - \max{i^q, i^{q*}}} $$.
* **Transient or fault operation**: The converter will now prioritize the $$i^d$$ component, which will follow its reference, and $$i^q_{max} = \sqrt{I_{max}^2 - \max{i^d, i^{d*}}^2} $$.


### Modulation

As in the [EMT Grid Following Model](../EMTGridFollowingVSC/), the converter voltage setpoint obtained can be considered directly the converter voltage, in what is called an Averaged Model, since it does not consider the switching process. However, a more complete EMT simulation will model the modulation performed to obtain the sinusoidal voltage from the DC source. The details can be consulted in Section 3.6 of the said model.


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


