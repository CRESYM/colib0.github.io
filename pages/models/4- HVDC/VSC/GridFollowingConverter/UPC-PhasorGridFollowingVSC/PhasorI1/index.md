---
layout: page 
title: Phasor-I1 Grid Following Voltage Source Converter 
tags: ["Opensource", "Phasor", "voltage source", "converter", "wind", "pv", "hvdc"] 
date: 26/06/2024 
last-updated: 17/07/2024
id: #165
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---


## Context

The Phasor-$$I_1$$ Grid Following Voltage Source Converter (VSC) model [[1]](#1) is derived from the [Full-Phasor](../). 

## Model use, assumptions, validity domain and limitations

The model can be used to fasten the simulations for low-frequency phenomena studies. If the simulation step size is desired to be close to the dynamics of the current control loop (around $$10^3$$ $$\mu s$$), the Phasor-$$I_1$$ model performs better than the Full-Phasor model, which will have an important increase of the error (or even divergence) when using these step sizes.

The assumptions made starting from the Full-Phasor model are the following:

* The current loop is substituted by a first-order transfer function with a given time constant.

The model shows a performance close to more accurate models during for slow dynamics such as setpoint tracking or voltage/frequency deviation. It can solve high frequency phenomena with clear limitations, as the results do not capture correctly the dynamics of phenomena like asymmetrical faults.

Although it allows a bigger time step than the Full-Phasor model, it eventually will diverge if it is increased too much, as it still retains some dynamics in an approximate way. The Phasor-$$I_0$$ model is more suitable as it completely removes the current loop dynamics.

## Model description

The diagram of the complete model is shown in the following figure.

 <div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PhasorI1.svg'}}"
      alt="PhasorI1 Model Block Diagram"
      style="float: center; margin-right: 10px; width: 600px;" />
 </div>
<div align = 'center'>
Figure 1: Phasor-I1 Model Block Diagram <a href="#1">[1]</a>
</div>
<br>

The following subsections will describe the changes with respect to the Full-Phasor model.

### Current loop

The differential equations that modelled the behavior of the current loop are substituted by a first-order transfer function with a given time constant:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{i_c^{qd*}}{i^{qd*}} = \frac{1}{1 + \tau_c s}$$
</div>

where $$\tau_c = \frac{1}{w_c}$$ is the time constant of the current loop, being $$w_c$$ the frequency that is set to match the bandwidth of the original  current loop. 


### Outer loop

No changes are made directly to this outer-loop, although the time constant $$\tau_c$$ will act as a low-pass filter of the current setpoint provided by the outer loop.


## Open-source implementations

No open-source implementations have been found.

## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor Modeling Approaches and Simulation Guidelines of Voltage-Source Converters in Grid-Integration Studies", May 2022, IEEE Access, DOI: [10.1109/ACCESS.2022.3174958](https://doi.org/10.1109/ACCESS.2022.3174958)

<a id="2">[2]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)
