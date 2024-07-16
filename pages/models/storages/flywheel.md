---
layout: page
title: Flywheel model
tags: ["flywheel", "FW", "Optimal Power Flow", "storage","optimal design", "DC OPF", "inertia"]
---

## Context and assumptions

This model is used in the following publication: Rigo-Mariani R, Sareni B, Roboam X. Integrated Optimal Design of a Smart Microgrid With Storage. IEEE Trans Smart Grid 2017;8:1762–70. <https://doi.org/10.1109/TSG.2015.2507131>.

It is used to model the operation of a flywheel as a part of a microgrid system where different components are connected through a common DC bus. The objective of the model is to size the flywheel (and the other components) by minimization of the operational cost of the microgrid system.

Only active power flows are modelled.

## Model

### Description

### Schema

### Indexes

$$ t $$: Time, defined in $$[1,..,T]$$, where $$T \in \Re^+$$ is the horizon<br>

### Parameters

$$ \delta t $$: Time step, 1 hour<br>
$$ K $$: Self discharge of the flywheel, in kWh/h<br>
$$ E_{max} $$: Maximum stored energy, 100 kWh<br>

### Variables

$$ P_t^{FW} $$: True power of the flywheel, in kW<br>
$$ P_t^{st} $$: Power flowing from/to the flywheel (defined as positive for discharge power), in kW<br>
$$ SOC_t $$: State Of Charge of the flywheel, in %<br>

### Functions

A function to compute the losses versus the SOC:<br>
$$\begin{array}{ccccc}
P^{loss} & : & [0;1] & \to & \Re^+, (kWh)\\
 & & SOC_t & \mapsto & P^{loss}(SOC_t), (kW) \\
\end{array}$$
[^1]

A function to compute the efficiency versus the power of the flywheel:<br>
$$\begin{array}{ccccc}
\eta & : & \Re^+ (kW) & \to & [0;1] \\
 & & P_t^{st}, (kW) & \mapsto & \eta(P_t^{st}) \\
\end{array}$$
[^1]

### Equations
True power of the flywheel:<br>
$$
\ P_t^{FW} = \left\{
    \begin{array}{ll}
        \ P^{loss}(SOC_t) + P_t^{st} \eta(-P_t^{st}) & \mbox{if } \ P_t^{st} < 0\\
        \ P^{loss}(SOC_t) + P_t^{st}/\eta(P_t^{st}) & \mbox{otherwise.}
    \end{array}
\right.
$$

Discretization of the SOC differential equation:<br><br><br><br><br>

## Open source implementations

[^1]: For details on these functions, see: G. Celli et al., “Meshed vs. radial MV distribution network in presence of large amount of DG,” in Proc. IEEE PES Power Syst. Conf. Expo., New York, NY, USA, 2004, pp. 709–714.
