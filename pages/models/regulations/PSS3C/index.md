---
layout: page
title: Standard power system stabilizer model PSS3C
tags: ["Power system stabilizer", "PSS3C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "PssIEEE3C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# PSS3C model

## Context

This power system stabilizer model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called PSS3B. Compared to PSS3B, PSS3C has an additional output logic.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- omegaPu : measured angular frequency in pu (base omegaNom)
- omegaRefPu : reference angular frequency in pu (base omegaNom)
- PGenPu : active power in pu (base SnRef)

The output signal is VPssPu in pu (base UNom).

## Model parameters

A1 : First numerator coefficient of first notch filter in s
A2 : Second numerator coefficient of first notch filter in s ^ 2
A3 : First denominator coefficient of first notch filter in s
A4 : Second denominator coefficient of first notch filter in s ^ 2
A5 : First numerator coefficient of second notch filter in s
A6 : Second numerator coefficient of second notch filter in s ^ 2
A7 : First denominator coefficient of second notch filter in s
A8 : Second denominator coefficient of second notch filter in s ^ 2
KOmega : Coefficient applied to angular frequency
KOmegaRef : Coefficient applied to reference angular frequency
Ks1 : Gain of active power branch in pu
Ks2 : Gain of angular frequency branch in pu
t1 : Transducer time constant (active power branch) in s
t2 : Transducer time constant (angular frequency branch) in s
tW1 : Washout time constant (active power branch) in s
tW2 : Washout time constant (angular frequency branch) in s
tW3 : Washout time constant (main branch) in s
VPssMaxPu : Maximum voltage output of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum voltage output of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA

## Model diagram

<img src="/pages/models/regulations/PSS3C/PSS3C.drawio.svg" alt="PSS3C diagram">

## Model variant

In the PSS3B model, the PSS deactivation for low active power values is absent (PPssOffPu = -1000, PPssOnPu = -999.

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}

