---
layout: page
title: CP Line Model 
tags: ["#120", "pi-equivalent", "transmission", "transmission", "Dynawo"]
date: 09/05/2025 
last-updated: 13/05/2024
---

# Constant Parameters Line Model

## Context


## Model use, assumptions and validity



## Model description

### Line parameters

| Parameters    | details  | Unit |
| --------------| ------ | ----- |



### Line variables

| Variable    | details  | Unit |
| --------------| ------ | ----- |


### Equations



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