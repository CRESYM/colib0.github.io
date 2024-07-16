---
layout: page
title: Constant parameters Line Model 
tags: ["#120", "pi-equivalent", "EMT", "Bergeron", "Constant Parameter", "transient", "transmission", "Dynawo"]
date: 09/05/2024 
last-updated: 13/05/2024
id: #120
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

When performing time-domain analysis of a transmission line, the physics of the waves that propagate through the line have to be considered. During the early stages of the development of the analysis techniques, the work of Dommel [[1]](#1) was one of the first to describe the time response of electromagnetic transients in the transmission lines. His model is based on the method of characteristics or Bergeron model for distributed parameter lines, being useful to describe electromagnetic transients at a given grid frequency. 

## Model use, assumptions and validity

The model can be used to perform EMT studies of transmission lines considering constant grid frequency. The following assumptions are considered for the model:

* The frequency is constant, and thus the line parameters are constant along the line.

* The effects of resistance and conductance are neglected in front of the inductive and capacitive effects of the line.

* The relationship between the voltages and currents at the source and receiver terminals is obtained as in the $$\pi$$-equivalent model for long-range lines, considering an equal distribution of the capacitance and inductance over the line.

* The voltage (and currents) are waves that travel through the transmission line according to the telegrapher's equations, with a constant propagation velocity of the wave along the line.

* The solution of these equations considers a forward and a backward traveling wave.

It is valid when dealing with constant grid frequency and when the line parameters are constant along the line. For grid frequency variations, the assumptions made over the impedance are not valid and thus more complex models are required, such as the frequency-dependent line model.

## Model description

### Line parameters

| Parameters    | details  | Unit |
| --------------| ------ | ----- |
| $$l$$ | Length of the line | $$m$$ |
| $$L$$ | Inductance of the line per meter | $$H m^{-1}$$ |
| $$C$$ | Capacitance of the line per meter | $$F m^{-1}$$ |
| $$r$$ | Resistance of the line per meter | $$\Omega m^{-1}$$ |
| $$x_L$$ | Reactance of the line per meter | $$\Omega m^{-1}$$ |
| $$z$$ | Impedance of the line per meter $$z = r + jx_L$$ | $$\Omega m^{-1}$$ |
| $$g$$ | Conductance of the line per meter | $$\Omega^{-1} m^{-1}$$ |
| $$b$$ | Susceptance of the line per meter | $$\Omega^{-1} m^{-1}$$ |
| $$y$$ | Equivalent admittance of the line per meter $$y = g + jb$$ | $$\Omega^{-1} m^{-1}$$ |
| $$\tau$$ | Time delay representing the propagation delay or travel time of a wave $$\tau = l\sqrt(LC)$$| $$s$$ |
| $$Z_C$$ | Characteristic impedance of the transmission line $$Z_C = \sqrt(\frac{z(\omega)}{y(\omega)})$$ | $$\Omega$$ |
| $$i_{R_h}(t - \tau)$$| History term for the complex current at the receiving end | $$A$$ |
| $$i_{S_h}(t - \tau)$$ | History term for the complex current at the sending end | $$A$$ |


### Line variables

| Variable    | details  | Unit |
| --------------| ------ | ----- |
| Variable/Parameter | Description | Unit |
| --- | --- | --- |
| $$v_S(t)$$ | Complex phase-to-ground voltage at the sending end at time $$t$$ | $$V$$ |
| $$i_S(t)$$ | Complex current at the sending end at time $$t$$ | $$A$$ |
| $$v_R(t)$$ | Complex phase-to-ground voltage at the receiving end at time $$t$$ | $$V$$ |
| $$i_R(t)$$ | Complex current at the receiving end at time $$t$$ | $$A$$ |


### Equations

The system of equations to solve at each time step is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ v_S(t) - Z_C i_S(t) = Z_C i_{S_h}(t-\tau)$$
$$ v_R(t) - Z_C i_R(t) = Z_C i_{R_h}(t-\tau)$$
</div>

with the history terms computed as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ i_{S_h}(t - \tau) = v_R(t - \tau) + Z_C i_R(t - \tau)$$
$$ i_{R_h}(t - \tau) = v_S(t - \tau) + Z_C i_S(t - \tau)$$
</div>

## Operational principles

### Lossless transmission lines

Consider a line with a given inductance (L) and capacitance (C), and assume their values are much greater than the resistance and the conductance, thus neglecting their effects. The differential equations for $$v(x,t)$$ and $$i(x, t)$$ describing the travelling wave are the following [[1]](#1) [[2]](#2):

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\frac{\partial v}{\partial x} = -L \frac{\partial i}{\partial t}$$
$$\frac{\partial i}{\partial x} = -C \frac{\partial v}{\partial t}$$

</div>

Performing derivatives with respect to $$x$$ for the first equation and with respect to $$t$$ for the second, and substituting the crossed partial derivative for the current, the following equation is obtained:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\frac{\partial^2 v}{\partial x^2} = LC \frac{\partial^2 v}{\partial t^2}$$

</div>

With the following general solution:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$v(x, t) = v_f(x - \mathcal{v} t) + v_b(x + \mathcal{v} t)$$

</div>

where $$v_f = V_fe^{-\alpha x} \cos(\omega t - \beta x + \theta_f)$$ and $$v_b = V_be^{\alpha x} \cos(\omega t + \beta x + \theta_b)$$ are the forward and backward travelling waves at the grid frequency $$\omega$$, respectively, $$\mathcal{v} = \frac{1}{\sqrt(LC)}$$ is the propagation velocity of the wave, and $$\gamma = \sqrt(zy) = \alpha + j\beta \approx j\beta$$ is the propagation constant, approximated by only considering the $$L$$ and $$C$$ of the line. Differentiating this solution with respect to $$x$$ and then using equation $$\frac{\partial v}{\partial x} = -L \frac{\partial i}{\partial t}$$, the current solution is obtained:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$i(x,t) = \frac{v_f(x - \gamma t)}{Z_C} - \frac{v_b(x + \gamma t)}{Z_C} = i_f(x - \gamma t) + i_b(x + \gamma t)$$

</div>

where $$Z_C = \sqrt{\frac{L}{C}}$$ is the characteristic impedance of the line approximated for the case were only $$L$$ and $$C$$ are considered. 

We can perform the following operation over the voltage and current solutions:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$v(x,t) + Z_C i(x,t) = v_f(x - \gamma t) + v_b(x + \gamma t) + (v_f(x - \gamma t) - v_b(x + \gamma t)) = 2v_f(x - \gamma t)$$
</div>

which is the basic relationship of the Bergeron's *Method of Characteristics*, 
Recovering the $$\pi$$-equivalent model equations, the relationship between the voltages and currents at the source and receiver terminals for the distributed parameters line model can be transformed into time-domain:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ v_S(t) - Z_C i_S(t) = Z_C i_{S_h}(t-\tau)$$
$$ v_R(t) - Z_C i_R(t) = Z_C i_{R_h}(t-\tau)$$
</div>

where $$\tau = \frac{l}{\mathcal{v}} = l\sqrt{LC}$$ is the time delay of the wave propagation along the line. The expressions $$i_{S_h}$$ and $$i_{R_h}$$ are calculated using values from previous time steps:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ i_{S_h}(t - \tau) = v_R(t - \tau) + Z_C i_R(t - \tau)$$
$$ i_{R_h}(t - \tau) = v_S(t - \tau) + Z_C i_S(t - \tau)$$
</div>

which allows for iterative solutions for simulations with time steps sized as $$k \Delta t = \tau$$, with $$k$$ being an integer number.

## Open-source implementations

No open source implementation found.

## References

<a id="1">[1]</a> Dommel, H.W. “Digital computer solution of Electromagnetic Transiens in single and multiphase networks”, IEEE Transactions, Vol. PAS-88, pages 388-399, April 1969.

<a id="2">[2]</a> Kothari, D. P.; Nagrath, I. J. "Modern Power System Analysis", 4th ed., New Delhi, India, 2011, Tata McGraw-Hill.