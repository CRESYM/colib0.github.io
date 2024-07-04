---
layout: page
title: Exponential Load Model 
tags: ["#143", "load", "Exponential", "steady-state", "polynomial"] 
date: 29/05/2024 
last-updated: 29/05/2024
id: #143
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

Loads are the consumer side of an electrical power system, draining energy from a given bus. Since a load can be a bundle of elements such as shunt elements, regulators, transformers, and many other devices, it is tough to describe accurately how it behaves as a group, and there are many models that try to provide an accurate representation. It is necessary to be able to simulate the behavior of the system under different conditions. The model proposed in this page describes the *Exponential Load model* [[1]](#1)[[2]](#2), which is useful for steady-state for forecasting studies mainly.

## Model use, assumptions, validity domain and limitations

The exponential load model can be used for steady-state studies. The assumptions made for this model are:

* The load is modeled as a composite load with exponential relationship between the load and the bus voltage. 
* The exponent value of the function is nearly equal to the slope of the function around the nominal voltage.
* Although this exponent varies non-linearly as a function of voltage, it is assumed to be constant for static loads. A common combination of exponents is $$a=1$$ for active power and $$b=2$$ for reactive power.
* The frequency is constant, and the load is balanced.

The model does not take into account the time-response performance of the load, therefore it is not useful for dynamic studies.

## Model description

### Parameters

| Parameter|Description | Unit |
| ---| ---  | --- |
| $$V_0$$ | Load Nominal voltage | $$V$$ |
| $$P_0$$ | Load Nominal active power | $$W$$ |
| $$Q_0$$ | Load Nominal reactive power | $$VAR$$ |
| $$a$$ | Exponent for the load active power function of voltage | Unitless |
| $$b$$ | Exponent for the load reactive power function of voltage | Unitless |


### Variables 

| Variable | Description | Unit |
| --- | --- | --- |
| $$V$$ | Phase-to-ground Bus Voltage | $$V$$ |
| $$P$$ | Load Active power | $$W$$ |
| $$Q$$ | Load Reactive power | $$VAR$$ |


### System of equations

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$P = P_0 (\frac{V}{V_0})^{a} $$
$$Q = Q_0 (\frac{V}{V_0})^{b} $$
</div>

## Operational principles

The model considers the load as an exponential function of voltage for both active and reactive power.

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$P = P_0 (\frac{V}{V_0})^{a} $$
$$Q = Q_0 (\frac{V}{V_0})^{b} $$
</div>

Where $$a$$ and $$b$$ are the exponents of the active and reactive power, respectively. These exponents take values that are similar to the slope of the function around the nominal voltage. If they take values of 0, 1 or 2, the load is considered constant power, constant current, or constant impedance, respectively [[2]](#2) [[3]](#3). 


## Open source implementations

This model has been successfully implemented in :


| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Loads/LoadAlphaBeta.mo) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 29/05/2024 | No comment |
|OpenIPSL | [Link](https://github.com/OpenIPSL/OpenIPSL/blob/master/OpenIPSL/Electrical/Loads/PSAT/VoltageDependent.mo) | modelica | [BSD-3-clause](https://opensource.org/licenses/BSD-3-Clause)  | 29/05/2024 | No comment |
| PowerSimulationsDynamics | [Link](https://github.com/NREL-Sienna/PowerSimulationsDynamics.jl/blob/main/src/models/load_models.jl) | julia |[BSD-3-clause](https://opensource.org/licenses/BSD-3-Clause)  | 29/05/2024 | No comment |

## References

<a id="1">[1]</a> IEEE Task Force, "Load Representation for Dynamic Performance Analysis" 1993 IEEE Transactions on Power Systems, Vol. 8, No. 2.

<a id="2">[2]</a> Kundur, Prabha. "Power System Stability and Control" New York, USA, 1994, McGraw-Hill.

<a id="3">[3]</a> Kothari, D. P.; Nagrath, I. J. "Modern Power System Analysis", 4th ed., New Delhi, India, 2011, Tata McGraw-Hill.

