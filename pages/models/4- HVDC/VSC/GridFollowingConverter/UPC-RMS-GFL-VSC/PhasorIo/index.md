---
layout: page 
title: Phasor-I0 Grid Following Voltage Source Converter 
tags: ["Opensource", "Phasor", "voltage source", "converter", "wind", "pv", "hvdc"] 
date: 26/06/2024 
last-updated: 17/07/2024
id: #165
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---


## Context

The Phasor-$$I_0$$ Grid Following Voltage Source Converter (VSC) model is derived from the [Full-Phasor](../). 

## Model use, assumptions, validity domain and limitations

The model has uses similar to the $$I_1$$ model, with some improvement in the simulation speed while the precision is slightly reduced.

The assumptions made starting from the Full-Phasor model are the following:

* The current loop is completely removed from the model. The current obtained from the outer loop is directly considered to be provided by the VSC.
* Since there are no current dynamics, the outer loop is modified to maintain the closed-loop from the Full-Phasor model.

The model is valid for low-frequency phenomena studies, similarly to the Phasor-I1 model, but it allows for bigger time-steps (around 2 or 3 times greater time-step size). The medium to high-frequency events ($$>100$$ Hz) are not captured as well as in the Full-Phasor model for instance. 

## Model description

The diagram of the complete model is shown in the following figure.

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PhasorI0.svg'}}"
      alt="Phasor-I0 Model Block Diagram"
      style="float: center; margin-right: 10px; width: 600px;" />
 </div>
<div align = 'center'>
Figure 1: Phasor-I0 Model Block Diagram <a href="#1">[1]</a>
</div>
<br>

The following subsections will describe the changes with respect to the Full-Phasor model.

### Current loop

The block is completely removed, which means $$i^{qd*} = i^{qd*}_c $$.

### Outer loop

The outer loop, or power loop, has to be adapted since it had the dynamics of the current loop included in its transfer function. The closed-loop transfer function of the outer loop is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ C_{pq}(s) = \frac{G_{pq}(s)}{1 + G_{pq}(s)} = \frac{1}{1+\tau_{pq}s} $$

</div>

where $$\tau_{pq} = \frac{1}{\omega_{pq}}$$ is the time constant of the original outer loop. The new open-loop transfer function, which does not include the current loop dynamics, is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ G_{pq}(s) = K_{pq}(s)\frac{3}{2}v_g^{q} $$

</div>

where $$v_g^{q}$$ can be considered to be $$V_peak$$. The controller is then:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ K_{pq}(s) = \frac{2}{3V_{peak}} \frac{1}{\tau_{pq}s} $$

</div>

## Open-source implementations

No open-source implementations have been found.

## Table of references


<a id="1">[1]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor Modeling Approaches and Simulation Guidelines of Voltage-Source Converters in Grid-Integration Studies", May 2022, IEEE Access, DOI: [10.1109/ACCESS.2022.3174958](https://doi.org/10.1109/ACCESS.2022.3174958)

<a id="2">[2]</a> Lacerda, V. A.; Prieto-Araujo, E.; Cheah, M.; Gomis-Bellmunt, O. "Phasor and EMT models of grid-following and grid-forming converters for short-circuit simulations.", October 2023, vol. 223, núm. 109662. DOI: [10.1016/j.epsr.2023.109662](https://doi.org/10.1016/j.epsr.2023.109662)
