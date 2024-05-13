---
layout: page
title: Pi-equivalent Line Model
tags: ["#120", "pi-equivalent", "transmission", "transmission", "Dynawo"]
date: 09/05/2025 
last-updated: 13/05/2024
---

# Pi Line Model

## Context

Transmission lines carry the electric power from one substation of the grid to another. There are overhead lines or underground cables, and they can be classified as low-range, middle-range or long-range depending on the distance between the two ends. Modelling precisely their behavior is essential to calculate the voltage drops, the phase shifts due to inductive behavior and the losses that occur when transporting energy from one point to another.

## Model use, assumptions and validity

The model described is intended to be used in transmission lines for middle range, considering a distance of between 100 and 250 kilometers. For lower distances, more simplifications can be made without loosing precision. For longer distances, the equivalent circuit proposed can be used, but its parameters will need to be obtained considering the distribution of impedance across the whole line, instead of the simplifications proposed.

The assumptions made are the following:

* The line is represented phase by phase with a series impedance and two parallel capacitors, distributing the total capacitance of the line in two equal blocks situated at each end of the line. The resulting circuit is named after the $$\pi$$-shape it has.

* The model does not consider the dependency on the temperature for its impedance values.

## Model description

### Line parameters

| Parameters    | details  | Unit |
| --------------| ------ | ----- |
|$$R$$ | Resistance of the line | $$\Omega$$ |
|$$X$$ | Reactance of the line | $$\Omega$$ |
|$$Z$$ | Impedance of the line $$Z = R + jX$$ | $$\Omega$$ |
|$$G$$ | Conductance of the line | $$\Omega^{-1}$$ |
|$$B$$ | Susceptance of the line | $$\Omega^{-1}$$ |
|$$Y$$ | Admittance of the line $$Y = G + jB$$ | $$\Omega^{-1}$$ |

### Line variables

| Variable    | details  | Unit |
| --------------| ------ | ----- |
| $$V_{S}$$ | Complex voltage of the source terminal | $$V$$ |
| $$I_{S}$$ | Complex current of the source terminal | $$A$$ |
| $$V_{R}$$ | Complex voltage of the receiver terminal | $$V$$ |
| $$I_{R}$$ | Complex current of the receiver terminal | $$A$$ |

### Equations

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V_S = (1 + \frac{1}{2}YZ)V_R + Z I_R $$
$$ I_S = Y(1 + \frac{1}{4}YZ)V_R + (1 + \frac{1}{2}YZ) I_R $$

</div>

## Operational principles

The two ports connected by a transmission lines can be characterized by their voltage and the current sent or received. The sign convention used will be positive for outgoing current in the source port, and positive for incoming current in the receiving port.

The equivalent circuit proposed is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/lines/piLine/pi_eq_scheme.svg' | relative_url }}"
     alt="pi-equivalent circuit of a transmission line"
     style="float: center; margin-right: 10px;" />
</div>

<div align='center'>

Figure 1. Pi-equivalent circuit of a transmission line.

</div>
<br>

Using the Kirchhoff laws to determine the relationship between voltages and current, the following equations are obtained:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ I_S = I_R + \frac{1}{2}V_R Y + \frac{1}{2}V_S Y $$
$$ V_S = V_R + (I_R + \frac{1}{2}V_R Y)Z $$ 

</div>

These equations can be transformed into the following matrix expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$
\begin{bmatrix}
V_S \\
I_S
\end{bmatrix}
=
\begin{bmatrix}
1 + \frac{1}{2} YZ & Z \\
Y(1 + \frac{1}{4}YZ) & 1 + \frac{1}{2} YZ
\end{bmatrix}
\begin{bmatrix}
V_R \\
I_R
\end{bmatrix}
$$

</div>

The resulting system of equations can be solved providing the value of 2 out of the 4 voltage and current variables.


## Open-source implementations

<details>
<summary>Modelica</summary>
<br>
[Dynawo public library](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Lines/Line.mo).
</details>

## References 

<a id="1">[1]</a> Kundur, Prabha. "Power System Stability and Control" New York, USA, 1994, McGraw-Hill.

<a id="2">[2]</a> Kothari, D. P.; Nagrath, I. J. "Modern Power System Analysis", 4th ed., New Delhi, India, 2011, Tata McGraw-Hill.

<a id="3">[3]</a> Salam, A. "Fundamentals of Electrical Power Systems Analysis", Singapore, 2020, Springer.