---
layout: page
title: Standard voltage regulator submodel AcRotatingExciter
tags: ["Voltage regulator submodel", "AcRotatingExciter", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# AcRotatingExciter model

## Context

This model is included in the type AC (alternator-supplied rectifier) voltage regulator models described in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}, specifically those named AC.C (AC1C, AC6C, etc.). Compared to the first standard version (1992), the models AC.B (introduced in the second standard version of 2005) and AC.C have a variable upper limit for the limited integrator.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and outputs

The input variables are :
- EfePu : output voltage of voltage regulator in pu (user-selected base voltage)
- IrPu : rotor current in pu (base SNom, user-selected base voltage)

The output variables are :
- EfdPu : excitation voltage in pu (user-selected base voltage)
- VfePu : field current signal in pu (user-selected base voltage)

## Model parameters

AEx : Gain of saturation function in pu
BEx : Exponential coefficient of saturation function
Kc : Rectifier loading factor proportional to commutating reactance, in pu
Kd : Demagnetizing factor, function of exciter alternator reactances, in pu
Ke : Exciter field resistance constant in pu
tE : Exciter field time constant in s
TolLi : Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator in pu
VeMinPu : Minimum exciter output voltage in pu (user-selected base voltage)
VfeMaxPu : Maximum exciter field current signal in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/AcRotatingExciter/AcRotatingExciter.drawio.svg" alt="AcRotatingExciter diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
