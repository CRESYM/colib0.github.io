---
layout: page
title: Standard power system stabilizer model PSS2C
tags: ["Power system stabilizer", "PSS2C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "PssIEEE2C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# PSS2C model

## Context

This power system stabilizer model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard versions, its predecessor models were called PSS2A (1992, 2005) and PSS2B (2005). Compared to PSS2A, PSS2B has a third lead-lag compensation block. Compared to PSS2B, PSS2C has a fourth lead-lag compensation block and an output logic.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- omegaPu : measured angular frequency in pu (base omegaNom)
- omegaRefPu : reference angular frequency in pu (base omegaNom)
- PGenPu : active power in pu (base SnRef)

The output signal is VPssPu in pu (base UNom).

## Model parameters

KOmega : Coefficient applied to angular frequency
KOmegaRef : Coefficient applied to reference angular frequency
Ks1 : Gain of power system stabilizer in pu
Ks2 : Gain of transducer (active power branch) in pu
Ks3 : Washouts coupling factor in pu
M : Lag order of ramp-tracking filter
N : Order of ramp-tracking filter
OmegaMaxPu : Maximum angular frequency input of power system stabilizer in pu (base omegaNom)
OmegaMinPu : Minimum angular frequency input of power system stabilizer in pu (base omegaNom)
PGenMaxPu : Maximum active power input of power system stabilizer in pu (base SNom) (generator convention)
PGenMinPu : Minimum active power input of power system stabilizer in pu (base SNom) (generator convention)
PPssOffPu : Active power threshold for PSS deactivation in pu (base SNom) (generator convention)
PPssOnPu : Active power threshold for PSS activation in pu (base SNom) (generator convention)
t1 : First lead time constant in s
t2 : First lag time constant in s
t3 : Second lead time constant in s
t4 : Second lag time constant in s
t6 : Transducer time constant of angular frequency branch in s
t7 : Transducer time constant of active power branch in s
t8 : Ramp-tracking filter lead time constant in s
t9 : Ramp-tracking filter lag time constant in s
t10 : Third lead time constant in s
t11 : Third lag time constant in s
t12 : Fourth lead time constant in s
t13 : Fourth lag time constant in s
tW1 : First washout time constant (angular frequency branch) in s
tW2 : Second washout time constant (angular frequency branch) in s
tW3 : First washout time constant (active power branch) in s
tW4 : Second washout time constant (active power branch) in s
VPssMaxPu : Maximum voltage output of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum voltage output of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA

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

