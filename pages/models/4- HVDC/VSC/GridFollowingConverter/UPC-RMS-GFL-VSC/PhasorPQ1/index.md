---
layout: page 
title: Phasor-PQ1 Grid Following Voltage Source Converter 
tags: ["Opensource", "Phasor", "voltage source", "converter", "wind", "pv", "hvdc"] 
date: 26/06/2024 
last-updated: 17/07/2024
id: #165
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---


## Context

The Phasor-$$PQ_1$$ Grid Following Voltage Source Converter (VSC) model [[1]](#1) is derived from the [Full-Phasor](../). 

## Model use, assumptions, validity domain and limitations

The model can be used to fasten the simulations for low-frequency phenomena studies, where it can simulate with time steps $$>10^3$$ $$\mu s$$ with half the error that the Phasor-$$I_0$$ model has. 

The assumptions made starting from the Full-Phasor model are the following:

* The current loop is removed, and the VSC current is set to be directly the output of the outer loop.

* The outer loop is substituted by a first-order transfer function with a given time constant.

The frequency range of the studies that are suitable for this model overlaps with the Phasor-$$I_1$$ and Phasor-$$I_0$$ models, but its biggest strength is the ability to use this big time steps in order to solve the simulation faster, with the trade-off of a higher error. Studies that have their dynamics with time-constants way higher than the time steps (i.e., around 10 to 100 times slower than the time step used) are suitable for this model, such as steady-state power flows, transient stability or interarea oscillations.

The error is considerably higher than any of the more complete models for smaller time steps, which means any other model is preferable in that case.

## Model description

The diagram of the complete model is shown in the following figure.

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PhasorPQ1.svg'}}"
      alt="Phasor Models Comparison"
      style="float: center; margin-right: 10px; width: 600px;" />
 </div>
<div align = 'center'>
Figure 1: Phasor-PQ1 Model Block Diagram <a href="#1">[1]</a>
</div>
<br>

The following subsections will describe the changes with respect to the Full-Phasor model.

### Current loop

The current loop is completely removed, which means the current setpoint obtained from the outer loop is directly considered as the VSC current $$i^{qd*} = i^{qd*}_c $$, as seen in Figure 1. 

### Outer loop

The outer loop becomes an open-loop approximated by a first-order transfer function with a given time constant $$\tau_{pq} = \frac{1}{\omega_{pq}}$$, where $$\omega_{pq}$$ is the frequency of the outer loop. The new open-loop transfer function is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ C_{pq}(s) = \frac{G_{pq}(s)}{1 + G_{pq}(s)} = \frac{1}{1+\tau_{pq}s} $$
</div>

The current setpoints are calculated using the instantaneous power theory by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ i^{q*} = \frac{2P^{*}}{3v_g^{q}} $$
$$ i^{d*} = \frac{2Q^{*}}{3v_g^{q}} $$
</div>

where $$v_g^{q}$$ can be approximated as $$V_{peak}$$.

As seen in Figure 1, the only input for this control block will be the power setpoints, while its output is the current setpoint.

## Open-source implementations

No open-source implementations have been found.

## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor Modeling Approaches and Simulation Guidelines of Voltage-Source Converters in Grid-Integration Studies", May 2022, IEEE Access, DOI: [10.1109/ACCESS.2022.3174958](https://doi.org/10.1109/ACCESS.2022.3174958)

<a id="2">[2]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)

