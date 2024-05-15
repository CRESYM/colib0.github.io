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

### Line parameters

The line parameters are obtained from the per-unit length values of resistance, inductance, capacitance and conductance. The total series impedance and shunt admittance of the line are calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ Z = zl = (r + jx) l = (r + j\omega l_{ind})l $$
$$ Y = yl = (g + jb)l = (g + j\omega c)l $$
</div>

where $$r$$ is the resistance in $$\Omega m^{-1}$$, $$x$$ is the reactance in $$\Omega m^{-1}$$, $$z$$ is the impedance in $$\Omega m^{-1}$$, $$g$$ is the conductance in $$\Omega^{-1} m^{-1}$$, $$b$$ is the susceptance in $$\Omega^{-1} m^{-1}$$, $$l_{ind}$$ is the inductance in $$H m^{-1}$$, $$c$$ is the capacitance in $$F m^{-1}, $$\omega$$ is the angular frequency of the system in $$rad/s$$ and $$l$$ is the length of the line in $$m$$.

#### Resistance

Resistance is the opposition to the flow of current in the line. For transmission lines, its effects can be neglected in front of the inductive and capacitive behavior of the line, although it represents the main source of losses of the power lines, hence why it can be useful to include it in the models.
Its value is calculated as the product of the resistance per unit length and the length of the line. The resistance per unit length is obtained from the resistivity of the material and the cross-sectional area of the conductor. The expression is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ r = \frac{\rho}{A} $$
</div>

where $$\rho$$ is the resistivity of the material in $$\Omega m$$ and $$A$$ is the cross-sectional area of the conductor in $$m^2$$. The total resistance of the line can be obtained multiplicating by the total length of the line.

Although the model developed does not take into account thermal changes, it has to be noted that the resistance of the line is temperature-dependent, and it can be calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ R = R_0 (1 + \alpha (T - T_0)) $$
</div>

where $$R_0$$ is the resistance at a reference temperature $$T_0$$, $$\alpha$$ is the temperature coefficient of the material in $$K^{-1}$$ and $$T$$ is the temperature in $$K$$.

#### Inductance

Inductive effects dominate the behavior of the transmission lines, and arise from the interaction between the parallel conductors (considered to be infinite for the purpose of this subsection) due to the magnetic flux linkages. The inductance of the line can be calculated using different methods depending on the geometry and configuration of the transmission lines.
#### Capacitance

#### Conductance


### Distributed parameters line model

The distributed parameters line model is a more complex model that considers the distribution of the impedance along the line. The model is based on the transmission line equations, which are a set of partial differential equations that describe the behavior of the line. It is used to obtain the accurate values of the impedance, admittance, and other parameters of the line at any point of the line. Equivalent circuits such as the $$\pi$$-equivalent are used to describe the performance as seen from the terminals.

Suppose a line with its circuit parameters $$z = R + jX_L$$ and $$ y = G + jB_L$$ calculated as the shown in the previous section. An infinitesimal section of the line, of length $$dx$$, can be represented by the following circuit:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/lines/piLine/distparam_equiv.svg' | relative_url }}"
     alt="pi-equivalent circuit of a transmission line"
     style="float: center; margin-right: 10px;" />
</div>

Using the Kirchhoff laws, the following equations can be obtained:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V(x+dx) = V(x) + zdxI(x) $$
$$ I(x+dx) = I(x) + ydxV(x)$$ 

</div>

Which can be expressed in their differential form for $$dx \rightarrow 0$$ as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{dV}{dx} = zI(x) $$
$$ \frac{dI}{dx} = yV(x) $$

</div>

Performing the second derivative of the voltage expression, the expression obtained is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ \frac{d^2V}{dx^2} = z\frac{dI}{dx} = zyV(x) $$
</div>

This is a linear differential equations the solution of which can be written as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V(x) = C_1e^{\gamma x} + C_2e^{-\gamma x} $$
</div>

with $$\gamma = \sqrt{yz}$$ being the propagation constant, with $$z$$ and $$y$$ being the per-length impedance and shunt admittance respectively. Deriving this general expression, the current can be obtained as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ I(x) = \frac{1}{z} \frac{dV}{dx} = \frac{C_1}{Z_c} e^{\gamma x} - \frac{C_2}{Z_c}e^{-\gamma x} $$
</div>

with $$Z_c$$ being the characteristic impedance of the line, defined as $$Z_c = \sqrt{\frac{z}{y}}$$. To determine the values of the constants $$C_1$$ and $$C_2$$, the values of the voltages have to be evaluated at the ends of the line, i.e., $$V(0) = V_R$$ and $$I(0) = I_R$$. The resulting expressions are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V_R = C_1 + C_2 $$
$$ I_R = \frac{C_1}{Z_c} - \frac{C_2}{Z_c} $$
$$ C_1 = \frac{V_R + Z_cI_R}{2} $$
$$ C_2 = \frac{V_R - Z_cI_R}{2} $$

</div>

Substituting this in the general expression for the voltage and current and rearranging, the resulting expressions along the line are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ V(x) = \frac{V_R}{2} \left( e^{\gamma x} + e^{-\gamma x} \right) + \frac{Z_cI_R}{2} \left( e^{\gamma x} - e^{-\gamma x} \right) $$
$$ I(x) = \frac{V_R}{2Z_c} \left( e^{\gamma x} - e^{-\gamma x} \right) + \frac{I_R}{2} \left( e^{\gamma x} + e^{-\gamma x} \right) $$

</div>

Which can be expressed in terms of hyperbolic functions as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ V(x) = V_R \cosh(\gamma x) + Z_cI_R \sinh(\gamma x) $$
$$ I(x) = \frac{V_R}{Z_c} \sinh(\gamma x) + I_R \cosh(\gamma x) $$
</div>

For $$x=l$$, the matrix relationship between the voltage and currents of the terminals are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$
\begin{bmatrix}
V_S \\
I_S
\end{bmatrix}
=
\begin{bmatrix}
\cosh(\gamma l) & Z_c \sinh(\gamma l) \\
\frac{1}{Z_c} \sinh(\gamma l) & \cosh(\gamma l)
\end{bmatrix}
\begin{bmatrix}
V_R \\
I_R
\end{bmatrix}
$$

</div>

### Pi-equivalent circuit

The pi-equivalent circuit corresponds to a representation of the line with the line admittance equally lumped into the ends of the line. The equivalent circuit proposed is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/lines/piLine/pi_eq_scheme.svg' | relative_url }}"
     alt="pi-equivalent circuit of a transmission line"
     style="float: center; margin-right: 10px;" />
</div>

<div align='center'>

Figure 1. Pi-equivalent circuit of a transmission line.

</div>
<br>

In this case, applying the Kirchhoff laws yields the following equations:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ I_S = I_R + \frac{1}{2} V_R Y' + \frac{1}{2} V_S Y' $$
$$ V_S = V_R + (I_R + \frac{1}{2} V_R Y')Z' = V_R (1 + \frac{1}{2}Y'Z') +I_R Z'  $$
</div>
 
which rearranged in matrix form are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$
\begin{bmatrix}
V_S \\
I_S
\end{bmatrix}
=
\begin{bmatrix}
1 + \frac{1}{2} Y'Z' & Z' \\
Y'(1 + \frac{1}{4}Y'Z') & 1 + \frac{1}{2} Y'Z'
\end{bmatrix}
\begin{bmatrix}
V_R \\
I_R
\end{bmatrix}
$$
</div>

#### Long-range transmission lines

For long-range transmission lines, the exact solution has already been derived, and it can be represented as a $$\pi$$-equivalent by finding the equivalent values of its impedance and lumped admittance. To obtain the equivalence, the following relationship have to hold:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ Z' = Z_C sinh(\gamma l) $$
$$ 1 + \frac{1}{2}Y'Z' = cosh(\gamma l) $$

</div>

Developing the first expression:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ Z' = Z_C sinh(\gamma l) = \sqrt{\frac{z}{y}}  sinh(\gamma l) = zl \frac{sinh(\gamma l)}{\gamma l} = Z(\frac{sinh(\gamma l)}{\gamma l})$$

</div>

where $$Z$$ is the series impedance of the line, and $$\frac{sinh(\gamma l)}{\gamma l} is the factor to obtain the $$Z'$$ for the $$\pi$$-equivalent circuit. The second expression can be developed as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ 1 + \frac{1}{2}Y'Z_C sinh(\gamma l) = cosh(\gamma l) $$
$$ \frac{1}{2}Y' = \frac{1}{Z_C} \frac{cosh(\gamma l) - 1}{sinh(\gamma l)} = \sqrt{\frac{y}{z}} tanh(\frac{\gamma l}{2}) $$
$$ \frac{1}{2}Y' = \frac{Y}{2} \frac{tanh(\frac{\gamma l}{2})}{\frac{\gamma l}{2}} = 2\sqrt{yz} tanh(\frac{\sqrt{yz}l}{2}) $$

</div>

where $$Y$$ is the shunt admittance of the line and $$\frac{tanh(\frac{\gamma l}{2})}{\frac{\gamma l}{2}}$$ is the factor to obtain the $$Y'$$ for the $$\pi$$-equivalent circuit.

The expression $$Y'(1 + \frac{1}{4}Y'Z') = \frac{1}{Z_C}sinh(\gamma l)$$ is consistent with the values for $$Z'$$ and $$Y'$$ obtained. 

#### Medium and short range transmission lines

For lower values of $$l$$, $$\frac{sinh(\gamma l)}{\gamma l} \approx 1$$ and $$\frac{tanh(\frac{\gamma l}{2})}{\frac{\gamma l}{2}} \approx 1$$. In this case, the direct expression of the $$\pi$$-equivalent circuit can be used substituting by the series and shunt values for impedance and capacitance respectively, with $$Z' = Z$$ and $$Y' = Y$$.

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