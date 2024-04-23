---
layout: page
title: Synchronous Machine Model
tags: ["#110","Synchronous machine", "RMS", "EMT", "Phasorial", "Rotor", "Stator", "Dynawo", "Opensource", "GENROU", "GENSAL"]
date: 10/04/2024 
last-updated: 23/04/2024
---

# Synchronous Machine Model

## Context

The synchronous machine is one of the most studied component of a power system, being its main source of electrical energy. It is the most common type of generators, and it is present in power plants as an interface between the mechanical energy and electrical energy. The mathematical model presented develops the dynamic equations of synchronous machines.[[1]](#1)

## Model use, assumptions, validity domain and limitations

The model corresponds to a balanced three-phase synchronous machine, considering both the round-rotor model (GENROU) and the salient-pole model (GENSAL) without saturation.

This model assumes that the rotation of the magnetic field is sinusoidal, a separation of 120º between each of the three phases poles, similar characteristics for each of the three phase windings and a conservative coupling field between the windings reflected by the relationship between the flux linkages and currents of the windings. 

Firstly, the model is developed for the simpler case of round-rotor machines in the abc reference frame, where some of the inductances do not depend on the rotor's position as the geometry assumes a uniform air gap between rotor and stator. This simplifies the expressions of the differential equations obtained for the generation currents. 

Later on, the model expands for a more general case that also considers salient pole synchronous machines, used in lower speed applications such as hydro power.

The resulting model is described in the dq0 reference frame and scaled to a *per unit* model, and it allows for transient studies of the generation.
## Model description

The following schematic shows all the components that participate in the model:
<p align="center">
<img src="{{'/pages/models/generations/SM1/SM1_model_scheme.svg' | relative_url }}"
     alt="Operation of a Synchronous Machine schematic"
     style="float: center; width: 600px;" />

</p>
<div style="text-align:center">
Figure 1: Synchronous machine model schematic
</div>

### Physical parts of a Synchronous Machine

A synchronous machine is formed by the following parts:

#### Rotor

The rotor is the moving part of the generator. It is at the end of the rotation axis of the turbine, which is the component that transfers the energy of a moving fluid (normally steam) into mechanical energy.
As the name indicates, the mechanical energy corresponds to the rotational kinetic energy of the body composed by the blades and axis of the turbine. 

It can be round rotor, commonly used in high rotation speed application, or salient pole, used in lower speed applications (i.e. hydro generation) where multiple pair of poles are needed to work at the grid frequency.[[2]](#2) Both of them will have at least one winding revolving around an axis perpendicular to the rotating axis. The direction of the field produced by the DC excitation will rotate at the same rate as the rotor, pointing in the perpendicular direction of the rotating axis. 

#### Exciter

The exciter is the source of power that generates the current flowing through the rotor winding. It applies a DC voltage that generates a current in the rotor winding, creating an electromagnet. It is important for voltage control as increasing the current supplied to the rotor winding increases the induced voltage in the stator winding, providing the ability to apply control loops that ensure the terminal voltage keeps at a setpoint.

This electromagnet can be replaced by a permanent magnet, in which case there would be no need to have a DC excitation to create a rotating field. These types of generators (PMSG), which can be found in newer models of wind turbines, have better efficiency as there are no losses associated with the excitation circuit, and lowers the maintenance needed since all the excitation parts are substituted by a single element. As a downside, there is no possibility to control the field by changing the level of excitation.
The field magnitude will remain constant value, with a value dependant on the geometry and material of the magnet.

#### Stator

It is the static part of the machine, as its name indicates. This structure gives physical support to the whole machine, while it typically contains the armature winding. It is a three-phase winding distributed in a circular cavity 120º apart one from each other. The uniform rotation of the magnetic field created by the rotor winding will generate currents at each winding 120º apart in the phasorial space. The instantaneous value for each phase is noted as $$i_a$$, $$i_b$$, and $$i_c$$. The following Figure [[2]](#2)
shows the structure of the synchronous machine, including the windings.

<p align="center">
<img src="{{'/pages/models/generations/SM1/SM_rot_stat.svg' | relative_url }}"
     alt="Stator-rotor of a Synchronous Machine schematic"
     style="float: center; width: 400px;" />
</p>
<div style="text-align:center">
Figure 2: Synchronous machine part diagram
</div>

#### Governor

The governor is the controller of the speed of the motor. It's primary function is to maintain the speed of the rotor, and hence the frequency of the electrical output of the generator. It is necessary for adapting to load changes, since a sudden increase or decrease of the load would decelerate or accelerate the generator if no actions are taken.
Since it is connected to the prime mover of the generator (generally a turbine), the control will adjust the amount of energy entering in the turbine, increasing or decreasing the rate of energy as if it needs to accelerate or decelerate the rotation. 

### Operational principles

#### Swing equation of the synchronous machine

The dynamic equation that governs the system relates the mechanical torque applied by the turbine and the electrical torque applied by the grid[[3]](#3):

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$J\frac{2}{p_f}  \frac{d\omega_m}{dt} = T_m - T_e - T_{fw} \quad (1)$$
</div>

where $$J$$ is the inertia of the rotating body in $$kgm^2$$, $$T_m$$ is the mechanical torque, $$T_e$$ is the electrical torque and $$T_{fw}$$ is the friction and windage torque, all in $$Nm$$.

#### Round-rotor synchronous machine in *abc* reference frame

Regarding the electrical part of the model, the rotor winding is magnetized by the exciter current, creating a magnetic field that will rotate with the rotor's angular velocity. As it spins, the stator windings will be subjected to a variable magnetic flux caused by the rotation of the produced magnetic field which, according to Faraday's Law, will induce an electromotive force in the windings.

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$e_{emf} = \frac{d\psi}{dt}$$
</div>

The rotational speed of the rotor of a synchronous machine is proportional to the grid frequency times the number of poles (i.e. number of different three-phase windings). The induced field in each phase $$e_{ir}$$ will lead the terminal voltage $$v_i$$ by a load angle denoted as $$\delta$$.

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$n = \frac{120f}{p_f} \quad (2)$$

</div>

where $$n$$ is the rotational speed in $rev/min$, $$f$$ is the stator currents frequency in $Hz$, and $$p_f$$ is the number of field poles.

The coupling between the rotor and the stator windings can be modelled using the terminal voltage equations:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
v_a = R_a i_a + \frac{d\psi_a}{dt} \quad (3)\\
v_b = R_b i_b + \frac{d\psi_b}{dt} \quad (4)\\
v_c = R_c i_c + \frac{d\psi_c}{dt} \quad (5)\\
v_f = R_f i_f + \frac{d\psi_f}{dt} \quad (6)
\end{equation}
</div>

where $$\psi_i$$ is the magnetic flux passing through the $$i$$ phase in $$Wb$$, or rotor in case of the subindex $$r$$, $$R_i$$ is the resistance of the associated circuit in $$\Omega$$, $$v_i$$ is the terminal voltage in $$V$$ and $$i_i$$ is the current in $$A$$.

The total fluxes are calculated taking into account all the present windings in the synchronous machine, which are the three stator windings and the rotor winding.
The fluxes for one phase and for the rotor are calculated as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \psi_a = \mathcal{L}_{aa} i_a + \mathcal{L}_{ab} i_b +\mathcal{L}_{ac} i_c + \mathcal{L}_{af} i_f \quad (7)$$

$$ \psi_f = \mathcal{L}_{af} i_a + \mathcal{L}_{br} i_b +\mathcal{L}_{cr} i_c + \mathcal{L}_{ff} i_f \quad (8)$$

</div>

with $$\mathcal{L}_{pp}$$ being the self inductance of the winding and $$\mathcal{L}_{pp'}$$ the mutual inductance between winding $$p$$ and winding $$p'$$, both in henrys. 

The inductance values expressed using the notation $$\mathcal{L}$$ express a general dependency with respect to the rotor position $$\theta_{shaft} = \omega t + \theta_0$$ [[4]](#4).

For cylindrical rotor, some of the inductances are independent of this angle due to the uniformity of the air gap. 
For instance, $$\mathcal{L}_{ff} = L_{ff} = L_{rr0} + L_{rl}$$ where the first term corresponds to the portion of the inductance due to the air gap, and the second term corresponds to the leakage flux.
$$\mathcal{L}_{aa} = \mathcal{L}_{bb} = \mathcal{L}_{cc} = L_{aa} = L_{aa0} + L_{al}$$ are the self-inductance of the stator windings, which assuming that all three windings have the same characteristics can be considered to have the same inductances. Again, the first term corresponds to the component coming from the air gap, and the second component corresponds to the armature leakage flux.

The mutual inductances, considering a perfect 120º separation between windings, and having $$\cos(120º) = -1/2$$ take the values $$\mathcal{L}_{ab} = \mathcal{L}_{ba} = \mathcal{L}_{ac} = \mathcal{L}_{ca} = \mathcal{L}_{bc} = \mathcal{L}_{cb} = -\frac{1}{2} L_{aa0}$$.

Meanwhile, the stator-rotor inductance depend on the electrical angle $$\theta_{me}$$ between the rotor winding axis and the stator winding axis. The value of this inductance for phase $$a$$ can be calculated with the expression $$\mathcal{L}_{af} = \mathcal{L}_{fa} = L_{af}\cos(\theta_{me})$$, while the same expression can be applied for phase $$b$$ and $$c$$ but replacing $$\theta_{me}$$ with $$\theta_{me} - 120º$$ and $$\theta_{me} + 120º$$ respectively. This angle can be calculated as a function of the rotor position angle expression seen before as $$\theta_{me} = \frac{p_f}{2}\theta_{shaft} = \omega_e t + \theta_{e0}$$.

For a balanced system and considering $$t=0$$ the instant where $$i_a$$ is maximum, a sinusoidal field distribution over time and a 120º separation between, we have:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$i_a = I_m\cos(\omega_e t) \quad (9)$$

$$i_b = I_m\cos(\omega_e t - \frac{2\pi}{3}) \quad (10)$$

$$i_c = I_m\cos(\omega_e t + \frac{2\pi}{3}) \quad (11)$$

$$i_a + i_b + i_c = 0 \quad (12)$$
</div>

where $$I_m$$ corresponds to the peak intensity.

The flux expression for phase $$a$$ can be rewritten as:
<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
\psi_a = (L_{aa0} + L_{al}) i_a - \frac{1}{2} L_{aa0} (i_b + i_c) + \psi_{af} = (\frac{3}{2} L_{aa0} + L_{al}) i_a + \psi_{af} \quad (13)
\end{equation}
</div>

We can define the synchronous inductance as $$L_s = \frac{3}{2} L_{aa0} + L_{al}$$, and then substitute the flux expression, as well as $$i_b + i_c = -i_a$$ using equation (12),  in the terminal voltage equation (3):

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
v_a = R_a i_a + \frac{d\psi_a}{dt} =  R_a i_a + L_s \frac{di_a}{dt} + \frac{d\psi_{af}}{dt} \quad (14)
\end{equation}
</div>

Since the excitation of the rotor winding comes from a DC source, the current $$i_f$$ is independent of time. 

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
e_{af} = \frac{d\psi_{af}}{dt} = \frac{d\mathcal{L}_{af}}{dt} i_f = L_{af} \omega_e I_f \sin(\theta_{me}) \quad (15)
\end{equation}
</div>

Where $$e_{af}$$ stands for the electromotive force that is induced in the stator due to this change of flux. The differential equation for the current of phase $$a$$ can be expressed as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
v_a =  R_a i_a + L_s \frac{di_a}{dt} + e_{af} \quad (16)
\end{equation}
</div>

The same procedure can be applied to the other two phases.

This equivalent circuit of the round-rotor synchronous machine is [[2]](#2):

<p align="center">
<img src="{{'/pages/models/generations/SM1/SM1equiv.svg' | relative_url }}"
     alt="Operation of a Synchronous Machine schematic"
     style="float: center; width: 400px;" />
</p>
<div style="text-align:center">
Figure 3: Equivalent circuit of a round-rotor synchronous machine
</div>
<br>

with the phasorial expression being[[4]](#4): 

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$v_a =  R_a i_a + j X_s i_a + e_{af} \quad (17)$$
</div>

where $$v_a$$ is the voltage at the terminals of the stator winding $$a$$, $$e_f$$ is the induced electromotive force by the magnetic field rotation, $$X_s = X_a + X_l = \omega_e L_s$$ is the total reactance of the generator, which is obtained by adding the armature and the leakage inductance as shown before and multiplied by the electrical rotation speed, $$R_a$$ is the series resistance, and $$i_a$$ is the current through the $$a$$ winding.

This phasorial equation corresponds to the differential equation obtained previously.

#### Salient poles synchronous machine in *dq0* reference representation

The previous section contains the differential equations that completely model a round-rotor synchronous machine in the *abc* reference frame. As explained, some simplifications over the values of the inductances could be made by assuming an uniform air gap.
In machines with salient poles rotors, the magnetic flux will have a preferred direction which will correspond to the salient part of the rotor. In the *abc* system, this preferred direction will be rotating alongside the rotor. This would translate in all the inductance values to be dependant on the position of the rotor as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$\mathcal{L}_{aa} = L_{al} + L_{aa0} + L_{g2}\cos(2\theta_{me}) $$
$$\mathcal{L}_{ab} = -\frac{1}{2}L_{aa0} + L_{g2}\cos(2\theta_{me}) $$
</div>

with the expressions for the other phases displaced by 120º for the trigonometric part, and the value of the rotor-stator inductance defined as for the round-rotor synchronous machine. Applying this new inductance values to the flux equations yield a much more complicated form that cannot be simplified (the complete flux equations can be seen in Kundur's book [[1]](#1)).

In order to have simpler equations for the salient poles machines (and simplify even more the previous round-rotor model) there is a transformation to a reference frame that rotates with the rotor called the *dq0 reference frame*, also called the *Park transformation*. This reference frame is formed by the *direct axis (d)*, which is the polar axis in which the permeance to the magnetic field is greater than the permeance along the interpolar axis, called *quadrature axis (q)*. In this reference frame, inductance expressions no longer are a function of the rotor position, yielding much simpler flux expressions.

The following diagram shows the convention for the reference frame as described in [[6]](#6), which is the most common convention used.

<p align="center">
<img src="{{'/pages/models/generations/SM1/SMSalientPoleScheme.svg' | relative_url }}"
     alt="Operation of a Synchronous Machine schematic"
     style="float: center; width: 400px;" />
</p>
<div style="text-align:center">
Figure 4: Salient pole synchronous machine schematic
</div>
<br>

As it can be seen, in addition to the field winding, the model considers three more windings $$(1d, 1q, 2q)$$ that act as dampers, and do not have electrical connections. The transformation for stator currents is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$\begin{bmatrix} i_d \\\ i_q \\\ i_0 \end{bmatrix} = \frac{2}{3} \begin{bmatrix} \cos(\theta_{me}) & \cos(\theta_{me} - \frac{2\pi}{3}) & \cos(\theta_{me} + \frac{2\pi}{3}) \\\ -\sin(\theta_{me}) & -\sin(\theta_{me} - \frac{2\pi}{3}) & -\sin(\theta_{me} + \frac{2\pi}{3}) \\\ \frac{1}{2} & \frac{1}{2} & \frac{1}{2} \end{bmatrix} \times \begin{bmatrix} i_a \\\ i_b \\\ i_c \end{bmatrix}$$
</div>

an expression that is applicable to all the stator quantities such as voltage or flux. The *zero-sequence* current is always 0 in three-phase balanced conditions.

The transformation can be applied to the stator currents and fluxes in equations (7) and (8) while using the new inductance values. This derivation is omitted as it is laborious (it can be consulted in [[1]](#1) or [[5]](#5)). The flux expressions in the dq0 reference frame are:


<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\psi_d = L_d i_d + L_{af} i_f $$
$$\psi_q = L_q i_q $$
$$\psi_f = \frac{3}{2} L_{af} i_d + L_{ff} i_f $$
$$\psi_0 = L_0 i_0 $$
</div>

with new inductance terms $$L_d = L_{al} + \frac{3}{2}(L_{aa0} + L_{g2})$$,  $$L_q = L_{al} + \frac{3}{2}(L_{aa0} - L_{g2})$$ and  $$L_0 = L_{al}$$, all of them independent from the rotor position in this reference frame. 

Now, the voltage equations for the dq0 reference frame are also transformed into:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$v_d = R_a i_d + \frac{d\psi_d}{dt} - \omega_{me} \psi_q $$
$$v_q = R_a i_q + \frac{d\psi_q}{dt} + \omega_{me} \psi_d $$
$$v_0 = R_a i_0 + \frac{d\psi_0}{dt}$$
$$v_f = R_f i_f + \frac{d\psi_f}{dt}$$
$$v_{1d} = R_{1d} i_{1d} + \frac{d\psi_{1d}}{dt}$$
$$v_{1q} = R_{1q} i_{1q} + \frac{d\psi_{1q}}{dt}$$
$$v_{2q} = R_{2q} i_{2q} + \frac{d\psi_{2q}}{dt}$$
</div>

The expressions for instantaneous power and torque in this reference frame are [[1]](#1):

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$p_s (t) = \frac{3}{2}(v_d i_d + v_q i_q + 2v_0 i_0)$$
$$T_{mech} = \frac{3}{2}(\psi_d i_q + \psi_q i_d)\frac{p_f}{2}$$
</div>

The full model of the synchronous generation can be written in a per unit system as defined in Sauer an Pai book [[6]](#6). Firstly, the displacement with respect to the synchronous speed is defined as $$\delta = \frac{p_f}{2} \theta_{shaft} - \omega_s t$$, where $$\omega_s = 2\pi f$$ is the synchronous speed. If the rotor is rotating at the same speed as the grid, this angle will be constant. The displacement is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\frac{d\delta}{dt} = \omega_m - \omega_s$$
</div>

Then, all the variables are scaled with respect to the rated values as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V_{abc} = \frac{v_{abc}}{V_{BABC}}$$
$$ I_{abc} = \frac{-i_{abc}}{I_{BABC}}$$
$$ \Psi_{abc} = \frac{\psi_{abc}}{\psi_{BABC}}$$
$$ V_{dq0} = \frac{v_{dq0}}{V_{BDQ}}$$
$$ I_{dq0} = \frac{-i_{dq0}}{I_{BDQ}}$$
$$ \Psi_{dq0} = \frac{\psi_{dq0}}{\psi_{BDQ}}$$
</div>

where V_{BABC} and V_{BDQ} are the rated RMS phase to neutral voltage and peak phase to neutral voltage respectively, $$I_{ABC} = \frac{S_B}{3V_{ABC}}$$, $$ I_{BDQ} = \frac{2S_B}{3V_{BDQ}}$$ with S_{B} the rated three-phase apparent power, and
$$\psi_{BABC} = \frac{V_{BABC}}{\omega_B}$$, $$\psi_{BDQ} = \frac{V_{BDQ}}{\omega_B}$$ with $$\omega_B = \omega_s$$.

The rest of parameters can also be scaled as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ R_{a} = \frac{r_{a}}{Z_{BDQ}}$$
$$ R_{f} = \frac{r_{f}}{Z_{BFD}}$$
$$ R_{1d} = \frac{r_{1d}}{Z_{B1D}}$$
$$ R_{1q} = \frac{r_{1q}}{Z_{B1Q}}$$
$$ R_{2q} = \frac{r_{2q}}{Z_{B2Q}}$$
</div>

The resulting equations for the synchronous machine model in the *dq0* reference frame describe the GENSAL synchronous machine model without saturation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{1}{\omega_s} \frac{d\Psi_d}{dt} = R_s I_d + \frac{\omega_m}{\omega_s} \psi_q + V_d$$
$$ \frac{1}{\omega_s} \frac{d\Psi_q}{dt} = R_s I_q - \frac{\omega_m}{\omega_s} \psi_d + V_q$$
$$ \frac{1}{\omega_s} \frac{d\Psi_0}{dt} = R_s I_0 + V_0$$
$$ T'_{d0} \frac{dE'_q}{dt} = -E'_q - (X_d - X'_d)[I_d - \frac{X'_d - X''_d}{(X'_d - X_{ls})^2} (\Psi_{1d} + (X'_d - X_{ls})I_d - E'_q)] + E_{fd}$$
$$ T''_{d0} \frac{d\Psi_{1d}}{dt} = -\Psi_{1d} + E'_q - (X'_d - X_{ls})I_d$$
$$ T'_{q0} \frac{dE'_d}{dt} = -E'_d + (X_q - X'_q)[I_q - \frac{X'_q - X''_q}{(X'_q - X_{ls})^2} (\Psi_{2q} + (X'_q - X_{ls})I_q + E'_d)]$$
$$ T''_{q0} \frac{d\Psi_{2q}}{dt} = -\Psi_{2q} - E'_d - (X'_q - X_{ls})I_q$$
$$ \frac{d\delta}{dt} = \omega_m - \omega_s$$
$$ \frac{2H}{\omega_s} \frac{d\omega_m}{dt} = T_m - (\Psi_d I_q - \Psi_q I_d) - T_{fw}$$
$$ \Psi_d = -X''_d I_d + (\frac{X'_d - X_{ls}}{X'_d - X_{ls}}) E'_q + (\frac{X'_d - X''_d}{X'_d - X_{ls}}) \Psi_{1d}$$
$$ \Psi_q = -X''_q I_q - (\frac{X'_q - X_{ls}}{X'_q - X_{ls}}) E'_d + (\frac{X'_q - X''_q}{X'_q - X_{ls}}) \Psi_{2q}$$
$$ \Psi_0 = -X_{ls} I_0$$

</div>


### Operational limits

Depending on the difference in phase between the rotor and grid rotation, the power transferred will be composed of active ($$P$$) and reactive ($$Q$$) power.

These generated powers are limited by the heat limits of the components of the generator. The limits considered are the Armature and field current limit, due to Joule effect heating of both windings, and end region heating limit, which occurs due to currents in the structure of the stator when the field is underexcited.

The following charts show the capability and compound curves for different power factors[[1]](#1). 

<p float="center">
<img src="{{'/pages/models/generations/SM1/SM_CapCurve.svg' | relative_url }}"
     alt="Capability curve of a Synchronous Generator"
     width="350px"/>
<img src="{{'/pages/models/generations/SM1/SM_CompCurves.svg' | relative_url }}"
     alt="Compound curves of a Synchronous Generator"
     width="400px"/>
</p>
<div style="text-align:center">
Figures 5 and 6: Capability and compound curves of a synchronous machine
</div>
<br>

The left chart shows the $$P$$ and $$Q$$ maximum values for different limit curves, which depend on the refrigerator used, while the right chart shows the dependency on exciter current and apparent power for different values of the power factor.

## Open source implementations

This model has been successfully implemented in :


| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
|Dynawo|[Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Machines/OmegaRef/GeneratorSynchronous.mo)| modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 23/04/2024 | no comment |

## Table of references

<a id="1">[1]</a>  Kundur, Prabha. "Power System Stability and Control" New York, USA, 1994, McGraw-Hill.

<a id="2">[2]</a>  Kothari, D. P.; Nagrath, I. J. "Modern Power System Analysis", 4th ed., New Delhi, India, 2011, Tata McGraw-Hill.

<a id="3">[3]</a>  PowerWorld Corporation. "ECE 310 Synchronous Machine Modeling".

<a id="4">[4]</a>  Fitzgerald, A. E.; Kingsley, C.; Umans, S. D. "Electric Machinery", New York, USA, 6th ed., 2002, McGraw-Hill.

<a id="5">[5]</a>  Krause, P.; Wasynczuk, O.; Sudhoff, S.; Pekarek, S. "Analysis of Electric Machinery and Drive Systems", 3rd ed., New Jersey, USA, 2013, Wiley.

<a id="6">[6]</a>  Sauer, P.W.; Pai, M. A. "Power System Dynamics and Stability", Urbana, IL, USA, 2006.