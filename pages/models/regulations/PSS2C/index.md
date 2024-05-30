---
layout: page
title: Standard power system stabilizer model PSS2C
tags: ["Power system stabilizer", "PSS2C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "PssIEEE2C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# PSS2C model

This article is incomplete, some sections must be written.

## Context

This power system stabilizer model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard versions, its predecessor models were called PSS2A (1992, 2005) and PSS2B (2005). Compared to PSS2A, PSS2B has a third lead-lag compensation block. Compared to PSS2B, PSS2C has a fourth lead-lag compensation block and an output logic.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|omegaPu |measured angular frequency | pu (base omegaNom)|
| omegaRefPu |reference angular frequency|pu (base omegaNom)|
| PGenPu |active power|pu (base SnRef)|

The output signal is VPssPu in pu (base UNom).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
KOmega |Coefficient applied to angular frequency|-|
KOmegaRef |Coefficient applied to reference angular frequency|-|
Ks1 |Gain of power system stabilizer|pu|
Ks2 |Gain of transducer (active power branch)|pu|
Ks3 |Washouts coupling factor|pu|
M |Lag order of ramp-tracking filter|-|
N |Order of ramp-tracking filter|-|
OmegaMaxPu |Maximum angular frequency input of power system stabilizer|pu (base omegaNom)|
OmegaMinPu |Minimum angular frequency input of power system stabilizer|pu (base omegaNom)|
PGenMaxPu |Maximum active power input of power system stabilizer|pu (base SNom) (generator convention)|
PGenMinPu |Minimum active power input of power system stabilizer|pu (base SNom) (generator convention)|
PPssOffPu |Active power threshold for PSS deactivation|pu (base SNom) (generator convention)|
PPssOnPu |Active power threshold for PSS activation|pu (base SNom) (generator convention)|
t1 |First lead time constant|s|
t2 |First lag time constant|s|
t3 |Second lead time constant|s|
t4 |Second lag time constant|s|
t6 |Transducer time constant of angular frequency branch|s|
t7 |Transducer time constant of active power branch|s|
t8 |Ramp-tracking filter lead time constant|s|
t9 |Ramp-tracking filter lag time constant|s|
t10 |Third lead time constant|s|
t11 |Third lag time constant|s|
t12 |Fourth lead time constant|s|
t13 |Fourth lag time constant|s|
tW1 |First washout time constant (angular frequency branch)|s|
tW2 |Second washout time constant (angular frequency branch)|s|
tW3 |First washout time constant (active power branch)|s|
tW4 |Second washout time constant (active power branch)|s|
VPssMaxPu |Maximum voltage output of power system stabilizer|pu (base UNom)|
VPssMinPu |Minimum voltage output of power system stabilizer|pu (base UNom)|
SNom |Nominal apparent power|MVA|

## Model diagram

<img src="/pages/models/regulations/PSS2C/PSS2C.drawio.svg" alt="PSS2C diagram">

## Model variants

In the PSS2A and PSS2B models :

- the PSS deactivation for low active power values is absent (PPssOffPu = -1000, PPssOnPu = -999)
- the final lead-lag filter is ignored (t12 = t13 = 0)

Moreover, in the PSS2A model, the second to last lead-lag filter is ignored (t10 = t11 = 0).

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}

