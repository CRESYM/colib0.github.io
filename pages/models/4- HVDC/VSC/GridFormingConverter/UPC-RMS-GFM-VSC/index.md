---
layout: page 
title: Generic Phasor Grid Forming Voltage Source Converter 
tags: ["Opensource", "Phasor", "voltage source", "converter", "wind", "pv", "hvdc", "Droop Control", "Virtual Synchronous Machine", "grid forming", "PSTess"] 
date: 18/07/2024 
last-updated: 22/07/2024
id: #180
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---


## Context

Voltage Source Converters (VSC) are widely used in power systems for a variety of applications, such as wind and photovoltaic generation, High Voltage Direct Current (HVDC) transmission, and Flexible AC Transmission Systems (FACTS). The model described here is a Phasor model of a grid-forming VSC, which is a type of VSC that, compared to the Grid Following (which follows the grid rotation) are capable of imposing a determined angle and frequency. This model, obtained from the many works developed at CITCEA-UPC (Centre d'Innovació Tecnològica en Convertidors Estàtics i Accionaments) such as [[1]](#1), is useful for studying the medium to low-frequency dynamics of the VSC and its interaction with the grid.
    
## Model use, assumptions, validity domain and limitations

The model use is to perform EMT studies involving Grid Forming VSCs. It is valid for the study of the fast dynamics of the VSC and its interaction with the grid. The model is based on the following assumptions:

* The system is balanced and sinusoidal.
* The VSC is represented by three equivalent current sources. 
* Frequency and angle reference are obtained using a reference frequency and a synchronization loop, which can be a virtual synchronous machine or a droop control.
* The voltage setpoint is obtained from the reactive power droop control.
* The Voltage Controller provides a current reference from a voltage reference.
* Calculations of power have been done following the instantaneous power theory [[2]](#2).

The model is valid for medium to low-frequency phenomena studies ($$<1$$ kHz), such as inter-area oscillations, steady-state power flows, setpoint tracking, short-circuit studies and some lower frequency control dynamics. 

Higher frequency studies will not have all of its dynamics correctly captured, being the EMT studies more suitable for this purpose. For cases with high values ($$>5%$$) of the droop constant in the synchronization loop, the Phasor analysis has also been found to perform poorly [[3]](#3), yielding overly optimistic results for stability studies.

The model is not valid for harmonic studies, since it does not consider the switching process, and the output voltage is considered to be sinusoidal.

## Model description

The model can be described with the following schematic:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'Phasor_GFM_VSC.svg'}}"
     alt="_Phasor Grid Forming VSC scheme"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 1: Phasor Grid Forming VSC scheme <a href="#1">[1]</a> 
</div>
<br>

It is important to note that the currents are measured both at the point of connection of the capacitor filter $$v_f$$ and at the grid side $$v_g$$, while the currents are measured before the filter at converter side $$i_c$$ and after the filter at the grid side $$i_g$$. Starred notation, such as $$v_c^{qd*}$$, is used to denote setpoints, in this case the voltage for the equivalent sources of the converter.

The existence of modelling this type of filter (an LCL rather than the single L filter used in Grid Following) is due to the usage of a Grid Forming VSC, which can blackstart a network for example. The more complex filter is used to reduce the harmonic distortion of the output voltage and increase the robustness of the control, which is important in this type of application. 

### Transformation blocks

Since we are dealing with phasors that rotate at the grid frequency, instead of instantaneous values, the transformation from the *abc* reference frame to the *qd0* reference frame can be performed by cancelling or applying the rotation of the phasor.

Assuming we have a complex electrical variable $$x = Xe^{j\theta}$$, where $$X$$ is the amplitude and $$\theta$$ is the angle of the variable, the transformation to the *qd0* reference can be done by multiplying by $$e^{-j\theta}$$.

For the *abc* variables, the phasors will be:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ x_{abc} = \begin{bmatrix} x_a \\ x_b \\ x_c \end{bmatrix} = \begin{bmatrix} Xe^{j\theta} \\ Xe^{j(\theta - \frac{2\pi}{3})} \\ Xe^{j(\theta + \frac{2\pi}{3})} \end{bmatrix} $$

</div>

where $$X$$ is the amplitude of the voltage or current, $$\theta$$ is the angle of the voltage or current. 
Considering a balanced system, the transformation can be calculated using the deviation of angle of the $$a$$-phase measurement with respect to the phase that it would have operating in nominal frequency, which will be referred as $$\theta_s$$. The real and imaginary parts of the product of $$v_a e^{-j\theta_s}$$ will give the $$v^q$$ and $$v^d$$ components of the voltage, respectively.

In case of an unbalanced system, the method of symmetrical components would have to be used in order to obtain the positive an negative sequence components.

Inversely, the transformation from *qd0* reference frame to *abc* can be done by performing the following operation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ v^a = (v^q + j v^d)e^{j\theta_s} $$
$$ v^b = v^a e^{-j\frac{2\pi}{3}} $$
$$ v^c = v^a e^{j\frac{2\pi}{3}} $$

</div>

In the case of a Grid Forming VSC, the angle $$\theta_s$$ is the angle obtained from the synchronization loop.

### Synchronization loop

In this section, the two main synchronization loop methods for the Grid Forming VSC, the droop control method [[4]](#4) and the Virtual Synchronous Machine [[5]](#5) are presented. These controls determine the voltage magnitude and angle that the grid forming will use to operate. There are other alternatives [[4]](#4), although the most studied are the ones presented in this model. The droop control method is simpler and it has been proven to be a special case of the virtual synchronous machine method [[6]](#6), while the second one produces slower rates of change of the frequency due to the existence of virtual inertia in stand-alone situations.

#### Droop control

In the present model, the frequency of the VSC is determined using a synchronization loop that involves an active power droop. Considering a reference grid frequency $$\omega^*$$ (normally 50 Hz), the converter frequency will be adjusted around this value considering the active power error, since active power and voltage phases are related in largely inductive grids as in the transmission system. The droop equation is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ K_{\Delta P} = \frac{\Delta \omega}{\Delta P}$$

</div>

where the droop constant $$K_{\Delta P}$$ is the slope of the droop curve, normally determined by grid codes in terms of the percentual variation of the frequency with respect to a variation of the active power. In addition to this droop control, it is common to apply a low-pass filter to the power measurement: $$\frac{1}{\tau_{\Delta P} s + 1}$$, with $$\tau_{\Delta P} = \frac{1}{\omega_{\Delta P}}$$ and $$\omega_{\Delta P}$$ the bandwith of the filter. This avoids having higher harmonics in the frequency signal. The block diagram of the synchronization loop is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'SynchronizationLoopPhasorGFM.svg'}}"
     alt="Synchronization Loop Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 2: Synchronization Loop Diagram
</div>
<br>

Notice that, differently to the [EMT Grid Forming model](../EMTGridFormingVSC/), the integration block is applied to the difference of frequency, and not to the whole value. This is due to the phasorial nature of the model, in which the interest lies on the deviation of the angle with respect to the value it would have operating at nominal frequency. Similar to the controls applied over the active power, the reactive power output of the converter is related to the voltage magnitude. In this case, the droop equation is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ K_{\Delta Q} = \frac{\Delta Q}{\Delta V} $$

</div>

where the droop constant $$K_{\Delta Q}$$ is the slope of the droop curve. Again, the reactive power measurement is filtered to avoid including high-frequency harmonics, applying a low-pass filter with a bandwidth $$\omega_{\Delta Q}$$, and a time constant $$\tau_{\Delta Q} = \frac{1}{\omega_{\Delta Q}}$$. The block diagram of the reactive power droop control is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'ReactiveDroopGFM.svg'}}"
     alt="Reactive Power Droop Diagram"
     style="float: center; margin-right: 10px; width: 700px;" />
</div>
<div align = 'center'>
Figure 3: Reactive Power Droop Diagram 
</div>

#### Virtual Synchronous Machine (VSM)

Another alternative to the droop control is the Virtual Synchronous Machine (VSM) control [[5]](#5), which is a control strategy that emulates the electromechanical behavior of a synchronous machine. This type of control emulates the swing equation of a synchronous machine:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ J \frac{d\omega}{dt} = P_r^* - P_e - P_d$$

</div>

where $$J$$ is the inertia of the machine, $$\omega$$ is the angular frequency of the machine, $$P_r^*$$ is the virtual input power (which emulates the mechanical power), and $$P_e$$ is the electrical power and $$P_d$$ is the damping power of the virtual machine. The input power is calculated as the sum of the setpoint power and the droop power deviation $$P_r^* = P^* + k_{\omega}(\omega^*-\omega)$$, the electrical power is the measure of the active power, and the damping power is obtained from simulating the damping using the relationship $$P_d = k_d (\omega - \omega_g)$$, where $$\omega_g$$ is the measure of the grid frequency, that has to be measured using a PLL, which can be the same as in the [EMT Grid Following model](../EMTGridFollowingVSC/). The full control diagram is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'VSM_PhasorGFM.svg'}}"
     alt="VSM Diagram"
     style="float: center; margin-right: 10px; width: 850px;" />
</div>
<div align = 'center'>
Figure 4: VSM Synchronization Loop Diagram
</div>
<br>

As it can be seen, the leftmost part of the control corresponds to the droop control part of the synchronization loop, meaning that the droop control method can be related to a particular case of the VSM method. As before, the integrator block to get the phase is applied to the difference of frequency. The reactive power control will be the same as in the droop control method. 

Considering the *qd0* reference frame in which $$v^{d*} = 0$$, the voltage setpoint $$v^{q*}$$ is equal to the module obtained from the reactive power droop control. The following section shows the voltage control droops applied to these references.

### Voltage control

The voltage control is used to determine the current setpoints that will be used to control the converter. The tuning of this control has been done using the Internal Model Control method (IMC) [[7]](#7), which provides PI controllers tuned in terms of the machine parameters (in this case $$C_f$$) with the desired response. Using Kirchhoff current law and neglecting the parasite resistance $$R_{cap}$$ of the capacitors, the differential equations that model the relationship between voltage and currents in the Grid Forming VSC are the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ i^{qd*}_c - i^{qd}_g = \begin{bmatrix} 0 & -\omega C_f \\ \omega{C_f} & 0 \end{bmatrix} v^{qd}_f + \frac{d}{dt} \begin{bmatrix} v^d_f \\ v^q_f\end{bmatrix}$$

</div>

where $$C_f$$ are the capacitance of the filter, $$i^{qd*}_c$$ are the current setpoints at the converter side, $$i^{qd}_g$$ are the current measurements at the grid side after the capacitor, and $$v^{qd}_f$$ are the voltages measured at the filter. A change of variables that considers the coupling can be used to simplify the expressions, as well as using the Laplace transformation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \begin{bmatrix} \hat{i^d} \\ \hat{i^q} \end{bmatrix} = \begin{bmatrix} i^d_c - i^d_g + \omega C_f v^q_f \\ i^q_c - i^q_g - \omega C_f v^d_f \end{bmatrix} = \begin{bmatrix} sC_f v^d_f \\ sC_f v^q_f\end{bmatrix} $$

</div>

With the following block diagram representing the above relationship, and including a PI controller, forming the open-loop block diagram:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'VoltageControlGFM.svg'}}"
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
<img src="{{ 'VoltageErrorGFM.svg'}}"
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

The output of this control can be directly be considered to be the current input of the equivalent current sources of the VSC, after transformation in phasor form using the transformation with the obtained angle.


### Limitations of current

The technical constraints of the VSC can be included in the controls using saturation blocks. In section 3.5 of the [EMT Grid Following Model](../EMTGridFollowingVSC/), there is an example of implementation of the anti-windup controls for the transformer.


## Parameter tuning

The following table shows possible values for the parameters of the controllers using the tuning proposed:

- **Static data for the lines**

| Line/Cable  | Nominal Voltage (kV) |  R ($$\Omega$$) |  L ($$H$$)  |
| ----------- | -------------------- | --------- | ---------- |
| Converter - grid filter (grid connection)   |    $$2.45$$ kV              |   $$0.0326$$     | $$0.001038$$     |
| Converter - capacitor (GFM)   |    $$2.45$$ kV              |   $$0.0048913$$     | $$0.00031139$$     |

- **Control parameters**

| Parameter | Value | Units |
| --------- | ----- | ----- |
| $$C$$     | $$1.63 \cdot 10^{-4}$$ |  F  |
| $$\omega_n^{PLL}$$ | $$2\pi 1000$$ | rad/s |
| $$\zeta^{PLL}$$ | $$0.707$$ | - |
| $$K^{PLL}_p$$ | $$3.55$$ | - |
| $$K^{PLL}_i$$ | $$1.58 \cdot 10^4$$ | - |
| $$\tau^{PLL}$$ | $$0.225$$ | ms |
| $$\tau^c$$ | $$1$$ | ms |
| $$K^{icl}_p$$ | $$0.13494$$ | - |
| $$K^{icl}_i$$ | $$100$$ | - |
| $$K^{vcl}_p$$ | $$5$$ | - |
| $$K^{vcl}_i$$ | $$500$$ | - |
| $$K^{Droop}_p$$ | $$2\pi 50$$ | - |


## Open source implementations

This model has been successfully implemented in :

| Software | URL | Language | Open-Source License | Last consulted date | Comments |
|----------|-----|----------|---------------------|---------------------|----------|
| PSTess   | [Link](https://github.com/sandialabs/snl-pstess/blob/master/pstess/gfma.m) | MATLAB | Copyright 2021 National Technology & Engineering Solutions of Sandia, LLC (NTESS) | 09/07/2024 | Droop control version, equivalent to REGFM_A1 from WECC accepted dynamic models|

## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)

<a id="2">[2]</a> Akagi, H., Watanabe, E., Aredes, M.: "Instantaneous power theory and Applications to power conditioning". Wiley, Chichester (2007)

<a id="3">[3]</a> Du, W.; et al. "Comparison of Electromagnetic Transient and Phasor-based Simulation for the Stability of Grid-Forming-Inverter-based Microgrids," 2021 IEEE Power & Energy Society Innovative Smart Grid Technologies Conference (ISGT), Washington, DC, USA, 2021, pp. 1-5DOI: [10.1109/ISGT49243.2021.9372242](https://doi.org/10.1109/ISGT49243.2021.9372242)

<a id="4">[4]</a> Rathnayake, D. B., et al. "Grid forming inverter modeling, control, and applications." IEEE Access, 9, 114781-114807 (2021).

<a id="5">[5]</a> D’Arco, S.; Suul, J.A.; Fosso, O.B. "A Virtual Synchronous Machine implementation for distributed control of power converters in SmartGrids", Electric Power Systems Research, Volume 122, 2015, Pages 180-197, DOI: [10.1016/j.epsr.2015.01.001](https://doi.org/10.1016/j.epsr.2015.01.001)

<a id="6">[6]</a> S. D'Arco and J. A. Suul, "Equivalence of Virtual Synchronous Machines and Frequency-Droops for Converter-Based MicroGrids," in IEEE Transactions on Smart Grid, vol. 5, no. 1, pp. 394-395, Jan. 2014, DOI: [10.1109/TSG.2013.2288000](https://doi.org/10.1109/TSG.2013.2288000)

<a id="7">[7]</a> Harnefors, L.; Nee, H. P. "Model-Based Current Control of AC Machines Using the Internal Model Control Method". IEEE Transactions on Industrial Applications, Vol. 34, No. 1, January/February 1998, DOI: [10.1109/28.658735](https://doi.org/10.1109/28.658735)



