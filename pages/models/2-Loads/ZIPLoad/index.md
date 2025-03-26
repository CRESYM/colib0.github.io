---
layout: page
title: ZIP Load Model 
tags: ["#141", "load", "ZIP", "steady-state", "polynomial"] 
date: 28/05/2024 
last-updated: 29/05/2024
id: #141
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

Loads are the consumer side of an electrical power system, draining energy from a given bus. Since a load can be a bundle of elements such as shunt elements, regulators, transformers, and many other devices, it is tough to describe accurately how it behaves as a group, and there are many models that try to provide an accurate representation. It is necessary to be able to simulate the behavior of the system under different conditions. The model proposed in this page describes the *ZIP load model*, also referred to as *polynomial load model* [[1]](#1) [[2]](#2) [[3]](#3), which is useful for steady-state for forecasting studies mainly.

## Model use, assumptions, validity domain and limitations

The ZIP load model can be used for steady-state studies. The assumptions made for this model are:

* The load is formed by a combination of constant impedance loads, constant current loads and constant power loads.
* The total load can be represented as a function of the bus voltage by adding the three types of loads in a weighted polynomial.
* The frequency is constant, and the load is balanced.

## Model description

### Parameters

| Parameter|Description | Unit |
| ---| ---  | --- |
| $$V_0$$ | Load Nominal voltage | $$V$$ |
| $$P_0$$ | Load Nominal active power | $$W$$ |
| $$Q_0$$ | Load Nominal reactive power | $$VAR$$ |
| $$a_1$$ | Coefficient for active power quadratic term (Constant impedance load) | Unitless |
| $$a_2$$ | Coefficient for active power linear term (Constant current load) | Unitless |
| $$a_3$$ | Coefficient for active power constant term (Constant power load) | Unitless | 
| $$a_4$$ | Coefficient for reactive power quadratic term (Constant impedance load)| Unitless |
| $$a_5$$ | Coefficient for reactive power linear term (Constant current load)| Unitless |
| $$a_6$$ | Coefficient for reactive power constant term (Constant power load) | Unitless |

### Variables 

| Variable | Description | Unit |
| --- | --- | --- |
| $$V$$ | Phase-to-ground Bus Voltage | $$V$$ |
| $$P$$ | Load Active power | $$W$$ |
| $$Q$$ | Load Reactive power | $$VAR$$ |


### System of equations

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$P = P_0 [a_1 (\frac{V}{V_0})^{2} + a_2 \frac{V}{V_0} + a_3]$$
$$Q = Q_0 [a_4 (\frac{V}{V_0})^{2} + a_5 \frac{V}{V_0} + a_6]$$

</div>

## Operational principles

This model arises from the consideration of three different type of loads joined together in a weighted model. The three types of loads are constant impedance, constant current, and constant power, which is giving the name (ZIP) to the model. The following representations of power loads are used for each type [[2]](#2):

* Constant impedance load: $$S_{Z}^* = V^2/Z$$
* Constant current load: $$S_{I} = V I^*$$
* Constant power load: $$S_{P} = P + jQ$$

The total terms of power can be described as a function of the voltage $$V$$ of the bus where the load is connected by the following weighted polynomial [[1]](#1)[[3]](#3):

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$P = P_0 [a_1 (\frac{V}{V_0})^{2} + a_2 \frac{V}{V_0} + a_3] $$
$$Q = Q_0 [a_4 (\frac{V}{V_0})^{2} + a_5 \frac{V}{V_0} + a_6] $$
$$a_1 + a_2 + a_3 = 1$$
$$a_4 + a_5 + a_6 = 1$$

</div>

Where the coefficients $$a_i$$ are the weights of the ZIP model, and $$V_0$$, $$P_0$$ and $$Q_0$$ are the nominal voltage, power and reactive power of the load, respectively.

## Open source implementations

This model has been successfully implemented in :


| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Loads/LoadZIP.mo) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 29/05/2024 | No comment |
| Andes | [Link](https://github.com/CURENT/andes/blob/master/andes/models/dynload/zip.py) | Python | [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)  | 29/05/2024 | No comment |
|OpenIPSL | [Link](https://github.com/OpenIPSL/OpenIPSL/blob/master/OpenIPSL/Electrical/Loads/PSAT/ZIP.mo) | modelica | [BSD-3-clause](https://opensource.org/licenses/BSD-3-Clause)  | 29/05/2024 | No comment |

## Table of references

<a id="1">[1]</a> IEEE Task Force, "Load Representation for Dynamic Performance Analysis" 1993 IEEE Transactions on Power Systems, Vol. 8, No. 2.

<a id="2">[2]</a> Kothari, D. P.; Nagrath, I. J. "Modern Power System Analysis", 4th ed., New Delhi, India, 2011, Tata McGraw-Hill.

<a id="3">[3]</a> Kundur, Prabha. "Power System Stability and Control" New York, USA, 1994, McGraw-Hill.
