---
layout: page
title: GENROU
tags: ["#110","Synchronous machine", "RMS", "EMT", "Phasorial", "Rotor", "Stator", "Dynawo", "Opensource", "GENROU", "GENSAL"]
date: 10/04/2024 
last-updated: 23/04/2024
---

# Salient-pole Synchronous Machine

## Context

As explained in the general Synchronous Machine model, the particular systems that can be derived by making some additional assumptions yield systems of equations that can be easily solved computationally. The GENROU model in *abc* reference frame is one of the simplest models, considering the uniformity of the air gap between the stator and rotor to be able to simplify the equations. 

## Model use, assumptions, validity domain and limitations

The model can be used to perform dynamic simulations of round-rotor synchronous machine in *abc* reference frame, aswell as performing steady-state analysis using the equivalent circuit obtained.

The additional assumptions with respect to the base model made in this model are:

- The air gap between the stator and rotor is uniform.
- The three-phase system is balanced.

It cannot be used to simulate machines with a non-uniform air gap such as the salient-pole synchronous machine. In fact, the round-rotor model is a particular case of the salient-pole model.

## Model Description

### Parameters

| Parameter | Description | Unit |
| --- | --- | --- |

### Variables

| Variable | Description | Unit |
| --- | --- | --- |

### Equations

## Operational principles

For a balanced system and considering $$t=0$$ the instant where $$i_a$$ is maximum, a sinusoidal field distribution over time and a 120º separation between, we have:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$i_a = I_m\cos(\omega_e t)$$

$$i_b = I_m\cos(\omega_e t - \frac{2\pi}{3})$$

$$i_c = I_m\cos(\omega_e t + \frac{2\pi}{3})$$

$$i_a + i_b + i_c = 0$$
</div>

where $$I_m$$ corresponds to the peak intensity.

The flux expression for phase $$a$$ can be rewritten as:
<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
\psi_a = (L_{aa0} + L_{al}) i_a - \frac{1}{2} L_{aa0} (i_b + i_c) + \psi_{af} = (\frac{3}{2} L_{aa0} + L_{al}) i_a + \psi_{af} 
\end{equation}
</div>

We can define the synchronous inductance as $$L_s = \frac{3}{2} L_{aa0} + L_{al}$$, and then substitute the flux expression, as well as $$i_b + i_c = -i_a$$ using the current equation, in the terminal voltage equation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
v_a = R_a i_a + \frac{d\psi_a}{dt} =  R_a i_a + L_s \frac{di_a}{dt} + \frac{d\psi_{af}}{dt} 
\end{equation}
</div>

Since the excitation of the rotor winding comes from a DC source, the current $$i_f$$ is independent of time. 

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
e_{af} = \frac{d\psi_{af}}{dt} = \frac{d\mathcal{L}_{af}}{dt} i_f = L_{af} \omega_e I_f \sin(\theta_{me})
\end{equation}
</div>

Where $$e_{af}$$ stands for the electromotive force that is induced in the stator due to this change of flux. The differential equation for the current of phase $$a$$ can be expressed as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

\begin{equation}
v_a = R_a i_a + L_s \frac{di_a}{dt} + e_{af}
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

$$v_a =  R_a i_a + j X_s i_a + e_{af}$$
</div>

where $$v_a$$ is the voltage at the terminals of the stator winding $$a$$, $$e_f$$ is the induced electromotive force by the magnetic field rotation, $$X_s = X_a + X_l = \omega_e L_s$$ is the total reactance of the generator, which is obtained by adding the armature and the leakage inductance as shown before and multiplied by the electrical rotation speed, $$R_a$$ is the series resistance, and $$i_a$$ is the current through the $$a$$ winding.

This phasorial equation corresponds to the differential equation obtained previously.