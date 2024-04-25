---
layout: page
title: Standard power system stabilizer model PSS1A
tags: ["Power system stabilizer", "PSS1A", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "PssIEEE1A", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# PSS1A model

## Context

This power system stabilizer model appears in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
This model was introduced in the previous standard version (2005).

## Model use, assumptions, validity domain and limitations

To be completed

## Model input and output

The input variables are either :

- omegaPu : measured angular frequency in pu (base omegaNom)
- PGenPu : active power in pu (base SnRef)

The output signal is VPssPu in pu (base UNom).

## Model parameters

A1 : First coefficient of notch filter in s
A2 : Second coefficient of notch filter in s ^ 2
Ks : Gain of power system stabilizer in pu
t1 : First lead time constant in s
t2 : First lag time constant in s
t4 : Second lag time constant in s
t5 : Washout time constant in s
t6 : Transducer time constant in s
VPssMaxPu : Maximum voltage output of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum voltage output of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA (only if PGenPu is the input signal)

## Model diagram

<img src="/pages/models/regulations/PSS1A/PSS1A.drawio.svg" alt="PSS1A diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
