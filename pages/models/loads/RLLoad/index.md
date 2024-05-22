---
layout: page 
title: RL Load model
tags: [#133, RMS, static, RL, load, resistance, inductance, opensource, static] 
date: 22/05/2024 
last-updated: 22/05/2024
id: 133
---

# RL Load model

## Context

This RL load model also called constant impedance load model, is an resistor-inductor circuit (RL circuit) composed of a resistor and an inductor in serie driven by a voltage source. It is the simplest model that can represent a static load.

## Model use, assumptions, validity domain and limitations

The load has a constant impedance at a specified frequency. The active and reactive powers absorbed by the load are propotional to the square of the applied voltage.

It can represent static load components such as resistive and lighting load and as an approximation for dynamic load components such as induction motor driven loads when running in steady state with no load changes. Stator and rotor resistance, inductance, slip, torque, have been simplified into a R and L values.

It can't be used for small-signal, voltage stability, cold-load pickup, imbalances or overvoltages. 

## Model description (mandatory)

this model is constitued of two passive linear circuit elements : the resistor (R), and the inductor (L).

R is defined for a positive power P as:
$$R = \frac{V_{load}^2}{P}$$

The inductance L ($$\Omega$$) is defined for a positive reactive power Q:
$$L = \frac{V_{load}^2}{Q}$$

where:

- V is the RMS line to line voltage in V
- P is the load active power in W
- Q is the load reactive power in W

Equations can also be written as:
$$P = G V^2 = P_0 \frac{V}{V_0}^2 $$
$$Q = -B V^2 = Q_0 \frac{V}{V_0}^2 $$

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| Software name | [Link](https://github.com/toto) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | XX/0X/20XX | Comments can contain implementations details such as validation means, implementations key choices, etc. |

## Table of references & license

<a id="1">[1]</a> [Mathworks](https://fr.mathworks.com/help/sps/powersys/ref/seriesrlcload.html).

<a id="1">[1]</a> IEEE Transactions on Power Systems, vol 8, No?2, 1993, LOAD REPRESENTATION FOR DYNAMIC PERFORMANCE ANALYSIS