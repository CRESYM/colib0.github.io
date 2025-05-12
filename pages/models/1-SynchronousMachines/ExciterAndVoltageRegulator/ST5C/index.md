---
layout: page
title: ST5C
tags: ["Voltage regulator", "ST5C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST5C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE ST5C model

This article is incomplete, some sections must be written.

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called ST5B. Compared to ST5B, ST5C has additional options for connecting OEL and UEL inputs.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|IrPu |rotor current |pu (base SNom, user-selected base voltage)|
|UsPu |measured stator voltage |pu (base UNom)|
|UsRefPu |reference stator voltage |pu (base UNom)|
|UOelPu (optional) |output voltage of overexcitation limiter |pu (base UNom)|
|UPssPu (optional) |output voltage of power system stabilizer |pu (base UNom)|
|USclOelPu (optional) |output voltage of stator current overexcitation limiter |pu (base UNom)|
|USclUelPu (optional) |output voltage of stator current underexcitation limiter |pu (base UNom)|
|UUelPu (optional) |output voltage of underexcitation limiter |pu (base UNom)|

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
|Kc |Rectifier loading factor proportional to commutating reactance, |pu|
|Kr |Gain of voltage after overexcitation and underexcitation limitations, |pu|
|PositionOel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input|-|
|PositionScl |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input|-|
|PositionUel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input|-|
|t1 |Inverse timing current constant |s|
|tB1 |Second lag time constant |s|
|tB2 |First lag time constant |s|
|tC1 |Second lead time constant |s|
|tC2 |First lead time constant |s|
|tOB1 |Second lag time constant (overexcitation limitation) |s|
|tOB2 |First lag time constant (overexcitation limitation) |s|
|tOC1 |Second lead time constant (overexcitation limitation) |s|
|tOC2 |First lead time constant (overexcitation limitation) |s|
|tR |Stator voltage filter time constant |s|
|tUB1 |Second lag time constant (underexcitation limitation) |s|
|tUB2 |First lag time constant (underexcitation limitation) |s|
|tUC1 |Second lead time constant (underexcitation limitation) |s|
|tUC2 |First lead time constant (underexcitation limitation) |s|
|VrMaxPu |Maximum field voltage |pu (user-selected base voltage)|
|VrMinPu |Minimum field voltage |pu (user-selected base voltage)|

## Model diagram

![ST5C](ST5C.drawio.svg)

## Model variant

In the ST5B model :

- the overexcitation and underexcitation limitation voltages are applied at the AVR input
- there is no stator current limiter

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
