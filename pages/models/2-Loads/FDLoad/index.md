---
layout: page
title: Frequency Dependent Load Model 
tags: ["#145", "load", "Frequency", "polynomial", "ZIP", "exponential"] 
date: 29/05/2024 
last-updated: 29/05/2024
id: #145
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

Loads are the consumer side of an electrical power system, draining energy from a given bus. Since a load can be a bundle of elements such as shunt elements, regulators, transformers, and many other devices, it is tough to describe accurately how it behaves as a group, and there are many models that try to provide an accurate representation. It is necessary to be able to simulate the behavior of the system under different conditions. The model proposed in this page describes the *Frequency Dependent Load Model* [[1]](#1) [[2]](#3), which is used in addition to a static load model to describe the behavior of the load under frequency changes.

## Model use, assumptions, validity domain and limitations

The frequency dependent load model can be used for static analysis considering variations on frequency with respect to the nominal grid frequency. The assumptions made for this model are:

* The load static value is modeled using a ZIP or exponential model.
* The variation of the load when the frequency changes are modeled using a factor dependent on the frequency deviation
* The load is balanced 

## Model description

### Parameters

| Parameter|Description | Unit |
| ---| ---  | --- |
| $$k_p$$ | Active power frequency variation coefficient | Unitless |
| $$k_q$$ | Reactive power frequency variation coefficient | Unitless |
| $$f_0$$ | Nominal frequency of the grid | $$Hz$$ |

### Variables 

| Variable | Description | Unit |
| --- | --- | --- |
| $$V$$ | Phase-to-ground Bus Voltage | $$V$$ |
| $$P(V)$$ | Load Active power modeled as a function of $$V$$ | $$W$$ |
| $$Q(V)$$ | Load Reactive power modeled as a function of $$V$$ | $$VAR$$ |
| $$P$$ | Load Active power | $$W$$ |
| $$Q$$ | Load Reactive power | $$VAR$$ |
| $$f$$ | Frequency | $$Hz$$ |
| $$\Delta f$$ | Frequency deviation $$\Delta f = f - f_0$$ | $$Hz$$ |


### System of equations

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$P(V, f) = P(V) (1 + k_p\frac{\Delta f}{f_0}) $$
$$Q(V, f) = Q(V) (1 + k_q \frac{\Delta f}{f_0}) $$
</div>

## Operational principles

The model considers the load as a general function of voltage for both active and reactive power $$P(V)$$ and $$Q(V)$$, typically using either the exponential or the ZIP Load Model [[2]](#2).

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$P(V, f) = P(V) (1 + k_p\frac{\Delta f}{f_0}) $$
$$Q(V, f) = Q(V) (1 + k_q \frac{\Delta f}{f_0}) $$
</div>

where $$k_p$$ and $$k_q$$ are the frequency variation coefficients for active and reactive power, respectively, and $$\Delta f = f - f_0$$ is the frequency deviation, with $$f_0$$ being the nominal frequency of the grid. The deviation is scaled in per-untis with respect to the nominal frequency.

## Open source implementations

This model has been successfully implemented in :


| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
|OpenIPSL | [Link](https://github.com/OpenIPSL/OpenIPSL/blob/master/OpenIPSL/Electrical/Loads/PSAT/FrequencyDependent.mo) | modelica | [BSD-3-clause](https://opensource.org/licenses/BSD-3-Clause)  | 29/05/2024 | No comment |


## References

<a id="1">[1]</a> IEEE Task Force, "Load Representation for Dynamic Performance Analysis" 1993 IEEE Transactions on Power Systems, Vol. 8, No. 2.

<a id="2">[2]</a> Kundur, Prabha. "Power System Stability and Control" New York, USA, 1994, McGraw-Hill.
