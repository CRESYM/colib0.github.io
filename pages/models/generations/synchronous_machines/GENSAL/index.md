---
layout: page
title: GENROU/GENSAL Salient-pole/round-rotor synchronous machine without saturation
tags: ["#110","Synchronous machine", "RMS", "EMT", "Phasorial", "Rotor", "Stator", "Dynawo", "Opensource", "GENROU", "GENSAL"]
date: 10/04/2024 
last-updated: 24/05/2024
id: #110
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

The model presented is derived from the general model [Synchronous Machine model](../), transforming the equations to the *dq0* reference frame. It describes the dynamic behavior of synchronous machines with no saturation effects. The model is suitable for transient stability analysis.

## Model use, assumptions, validity domain and limitations

The model can be used to perform transient stability analysis for both salient-pole and round-rotor synchronous machines in the *dq0* reference frame.

The assumptions made in this model are:

* The three-phase system is balanced
* The air gap between the stator and rotor is non-uniform, but the relationships between the flux linkages and currents are independent of the position of the rotor when expressed in the *dq0* reference frame.
* The magnetic circuit is considered to be linear, neglecting saturation effects.

The model is exactly the same for round-rotor and salient-pole in this case with no magnetic saturation. A more detailed model is required to consider such effects, which are different in salient-pole machines (there is saturation in *d*-axis) and in round-rotor machines (the saturation is considered both in *d* and *q* axis, as there is no preferred direction for the flux).

It is not suitable for EMT studies as it does not consider the fast dynamics of the machine.

## Model Description

### Parameters

| Parameter | Description | Unit |
| --- | --- | --- |
| $$\omega_s$$ | Synchronous speed | $$rad/s$$ |
| $$R_s$$ | Stator resistance | $$\Omega$$ |
| $$X_d$$ | Direct-axis synchronous reactance | $$\Omega$$ |
| $$X'_d$$ | Direct-axis transient reactance | $$\Omega$$ |
| $$X_q$$ | Quadrature-axis synchronous reactance | $$\Omega$$ |
| $$X'_q$$ | Quadrature-axis transient reactance | $$\Omega$$ |
| $$X''_d$$ | Direct-axis subtransient reactance | $$\Omega$$ |
| $$X''_q$$ | Quadrature-axis subtransient reactance | $$\Omega$$ |
| $$X_{ls}$$ | Stator leakage reactance | $$\Omega$$ |
| $$T'_{d0}$$ | Direct-axis transient time constant | $$s$$ |
| $$T''_{d0}$$ | Direct-axis subtransient time constant | $$s$$ |
| $$T'_{q0}$$ | Quadrature-axis transient time constant | $$s$$ |
| $$T''_{q0}$$ | Quadrature-axis subtransient time constant | $$s$$ |
| $$H$$ | Inertia constant | $$s$$ |

### Variables

| Variable | Description | Unit |
| --- | --- | --- |
| $$\Psi_d$$ | d-axis flux linkage | $$Wb$$ |
| $$\Psi_q$$ | q-axis flux linkage | $$Wb$$ |
| $$\Psi_0$$ | Zero-sequence flux linkage | $$Wb$$ |
| $$\Psi_{1d}$$ | Flux linkage associated with $$X''_d$$ | $$Wb$$ |
| $$\Psi_{2q}$$ | Flux linkage associated with $$X''_q$$ | $$Wb$$ |
| $$I_d$$ | d-axis current | $$A$$ |
| $$I_q$$ | q-axis current | $$A$$ |
| $$I_0$$ | Zero-sequence current | $$A$$ |
| $$V_d$$ | d-axis voltage | $$V$$ |
| $$V_q$$ | q-axis voltage | $$V$$ |
| $$V_0$$ | Zero-sequence voltage | $$V$$ |
| $$E_{fd}$$ | Field voltage | $$V$$ |
| $$E'_q$$ | Transient voltage behind transient reactance in d-axis | $$V$$ |
| $$E'_d$$ | Transient voltage behind transient reactance in q-axis | $$V$$ |
| $$\delta$$ | Rotor angle | $$rad$$ |
| $$\omega$$ | Electrical rotational speed | $$rad/s$$ |
| $$T_m$$ | Mechanical torque | $$Nm$$ |
| $$T_{fw}$$ | Windage and friction torque | $$Nm$$ |

### Equations

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{1}{\omega_s} \frac{d\Psi_d}{dt} = R_s I_d + \frac{\omega_m}{\omega_s} \Psi_q + V_d$$
$$ \frac{1}{\omega_s} \frac{d\Psi_q}{dt} = R_s I_q - \frac{\omega_m}{\omega_s} \Psi_d + V_q$$
$$ \frac{1}{\omega_s} \frac{d\Psi_0}{dt} = R_s I_0 + V_0$$
$$ T'_{d0} \frac{dE'_q}{dt} = -E'_q - (X_d - X'_d)[I_d - \frac{X'_d - X''_d}{(X'_d - X_{ls})^2} (\Psi_{1d} + (X'_d - X_{ls})I_d - E'_q)] + E_{fd}$$
$$ T''_{d0} \frac{d\Psi_{1d}}{dt} = -\Psi_{1d} + E'_q - (X'_d - X_{ls})I_d$$
$$ T'_{q0} \frac{dE'_d}{dt} = -E'_d + (X_q - X'_q)[I_q - \frac{X'_q - X''_q}{(X'_q - X_{ls})^2} (\Psi_{2q} + (X'_q - X_{ls})I_q + E'_d)]$$
$$ T''_{q0} \frac{d\Psi_{2q}}{dt} = -\Psi_{2q} - E'_d - (X'_q - X_{ls})I_q$$
$$ \frac{d\delta}{dt} = \omega - \omega_s$$
$$ \frac{2H}{\omega_s} \frac{d\omega}{dt} = T_m - (\Psi_d I_q - \Psi_q I_d) - T_{fw}$$
$$ \Psi_d = -X''_d I_d + (\frac{X''_d - X_{ls}}{X'_d - X_{ls}}) E'_q + (\frac{X'_d - X''_d}{X'_d - X_{ls}}) \Psi_{1d}$$
$$ \Psi_q = -X''_q I_q - (\frac{X''_q - X_{ls}}{X'_q - X_{ls}}) E'_d + (\frac{X'_q - X''_q}{X'_q - X_{ls}}) \Psi_{2q}$$
$$ \Psi_0 = -X_{ls} I_0$$

</div>

## Operational principles

The general synchronous machine model contains the differential equations that completely model a round-rotor synchronous machine in the *abc* reference frame.
In machines with salient poles rotors, the magnetic flux will have a preferred direction which will correspond to the salient part of the rotor. In the *abc* system, this preferred direction will be rotating alongside the rotor. This would translate in all the inductance values to be dependent on the position of the rotor as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\mathcal{L}_{pp} = L_{pl} + L_{pp0} + L_{g2}\cos(p_f\theta_{shaft}) $$
$$\mathcal{L}_{pp'} = -\frac{1}{2}L_{pp0} + L_{g2}\cos(p_f\theta_{shaft}) $$
$$\mathcal{L}_{pf} = \mathcal{L}_{fp} = L_{pf}\cos(\frac{p_f}{2}\theta_{shaft} + \phi_p)$$
</div>

with $$p$$ and $$p'$$ being two differen phases, and $$\phi_p$$ being the associated displacement for each phase. Applying these new inductance values to the flux equations yield a much more complicated form that cannot be simplified (the complete flux equations can be seen in Kundur's book [[1]](#1)).

In order to have simpler equations for the salient poles machines (and simplify even more the previous round-rotor model), there is a transformation to a reference frame that rotates with the rotor called the *dq0 reference frame*, also called the *Park transformation*. This reference frame is formed by the *direct axis (d)*, which is the polar axis in which the permeance to the magnetic field is greater than the permeance along the interpolar axis, called *quadrature axis (q)*. In this reference frame, inductance expressions no longer are a function of the rotor position, yielding much simpler flux expressions.

The following diagram shows the convention for the reference frame as described in [[6]](#6), which is the most common convention used.

<p align="center">
<img src="{{'/pages/models/generations/synchronous_machines/SM1/SMSalientPoleScheme.svg' | relative_url }}"
     alt="Operation of a Synchronous Machine schematic"
     style="float: center; width: 400px;" />
</p>
<div style="text-align:center">
Figure 4: Salient pole synchronous machine schematic
</div>
<br>

As it can be seen, in addition to the field winding, the model considers three more windings $$(1d, 1q, 2q)$$ that act as dampers, and do not have electrical connections. The transformation for stator currents is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\begin{bmatrix} i_d \\\ i_q \\\ i_0 \end{bmatrix} = \frac{2}{3} \begin{bmatrix} \cos(\frac{p_f}{2}\theta_{shaft}) & \cos(\frac{p_f}{2}\theta_{shaft} - \frac{2\pi}{3}) & \cos(\frac{p_f}{2}\theta_{shaft} + \frac{2\pi}{3}) \\\ -\sin(\frac{p_f}{2}\theta_{shaft}) & -\sin(\frac{p_f}{2}\theta_{shaft} - \frac{2\pi}{3}) & -\sin(\frac{p_f}{2}\theta_{shaft} + \frac{2\pi}{3}) \\\ \frac{1}{2} & \frac{1}{2} & \frac{1}{2} \end{bmatrix} \times \begin{bmatrix} i_a \\\ i_b \\\ i_c \end{bmatrix}$$

</div>

An expression that is applicable to all the stator quantities such as voltage or flux. The *zero-sequence* current is always 0 in three-phase balanced conditions.

The transformation can be applied to the stator currents and fluxes equations from the general model while using the new inductance values. This derivation is omitted as it is laborious (it can be consulted in [[1]](#1) or [[5]](#5)). The flux expressions in the dq0 reference frame are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\psi_d = L_d i_d + L_{af} i_f $$
$$\psi_q = L_q i_q $$
$$\psi_f = \frac{3}{2} L_{af} i_d + L_{ff} i_f $$
$$\psi_0 = L_0 i_0 $$

</div>

with new inductance terms $$L_d = L_{al} + \frac{3}{2}(L_{aa0} + L_{g2})$$,  $$L_q = L_{al} + \frac{3}{2}(L_{aa0} - L_{g2})$$ and  $$L_0 = L_{al}$$, all of them independent from the rotor position in this reference frame.

Now, the voltage equations for the dq0 reference frame are also transformed into:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$v_d = R_a i_d + \frac{d\psi_d}{dt} - \omega \psi_q $$
$$v_q = R_a i_q + \frac{d\psi_q}{dt} + \omega \psi_d $$
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

The full model of the synchronous generation can be written in a per-unit system as defined in Sauer and Pai book [[6]](#6). Firstly, the displacement with respect to the synchronous speed is defined as $$\delta = \frac{p_f}{2} \theta_{shaft} - \omega_s t$$, where $$\omega_s = 2\pi f$$ is the synchronous speed. If the rotor is rotating at the same speed as the grid, this angle will be constant. The displacement is:

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

where $$V_{BABC}$$ and $$V_{BDQ}$$ are the rated RMS phase to neutral voltage and peak phase to neutral voltage respectively, $$I_{ABC} = \frac{S_B}{3V_{ABC}}$$, $$ I_{BDQ} = \frac{2S_B}{3V_{BDQ}}$$ with $$S_{B}$$ the rated three-phase apparent power, and $$\psi_{BABC} = \frac{V_{BABC}}{\omega_B}$$, $$\psi_{BDQ} = \frac{V_{BDQ}}{\omega_B}$$ with $$\omega_B = \omega_s$$.

The rest of parameters can also be scaled as follows:
<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ R_{a} = \frac{r_{a}}{Z_{BDQ}}$$
$$ R_{f} = \frac{r_{f}}{Z_{BFD}}$$
$$ R_{1d} = \frac{r_{1d}}{Z_{B1D}}$$
$$ R_{1q} = \frac{r_{1q}}{Z_{B1Q}}$$
$$ R_{2q} = \frac{r_{2q}}{Z_{B2Q}}$$
</div>

Similar transformations can be performed over the rotor and stator inductances, which can be consulted in Sauer and Pai book [[6]](#6), Sections 3.3 and 3.4.

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

## Open source implementations

This model has been successfully implemented in:


| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
|Dynawo|[Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Machines/OmegaRef/GeneratorSynchronous.mo)| modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 23/04/2024 | no comment |
|DP Sim|[Link](https://github.com/sogno-platform/dpsim/blob/master/dpsim-models/src/DP/DP_Ph1_SynchronGenerator6OrderPCM.cpp) | C++ | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/) | 24/05/2024 | no comment |
|OpenIPSL|[Link](https://github.com/OpenIPSL/OpenIPSL/blob/master/OpenIPSL/Electrical/Machines/PSSE/GENCLS.mo) | modelica | [3-clause-BSD](https://opensource.org/license/BSD-3-Clause) | 24/05/2024 | no comment |


## Table of references

<a id="1">[1]</a> Kundur, Prabha. "Power System Stability and Control" New York, USA, 1994, McGraw-Hill.

<a id="2">[2]</a> Kothari, D. P.; Nagrath, I. J. "Modern Power System Analysis", 4th ed., New Delhi, India, 2011, Tata McGraw-Hill.

<a id="3">[3]</a> PowerWorld Corporation. "ECE 310 Synchronous Machine Modeling".

<a id="4">[4]</a> Fitzgerald, A. E.; Kingsley, C.; Umans, S. D. "Electric Machinery", New York, USA, 6th ed., 2002, McGraw-Hill.

<a id="5">[5]</a> Krause, P.; Wasynczuk, O.; Sudhoff, S.; Pekarek, S. "Analysis of Electric Machinery and Drive Systems", 3rd ed., New Jersey, USA, 2013, Wiley.

<a id="6">[6]</a> Sauer, P.W.; Pai, M. A. "Power System Dynamics and Stability", Urbana, IL, USA, 2006.