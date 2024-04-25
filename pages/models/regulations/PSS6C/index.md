---
layout: page
title: Standard power system stabilizer model PSS6C
tags: ["Power system stabilizer", "PSS6C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "PssIEEE6C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# PSS6C model

## Context

This power system stabilizer model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

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
K0 : Gain of first integrator input in pu
K1 : Gain of first integrator output in pu
K2 : Gain of second integrator output in pu
K3 : Gain of third integrator output in pu
K4 : Gain of fourth integrator output in pu
Ki3 : Gain of third integrator in pu
Ki4 : Gain of fourth integrator in pu
Ks : Gain of power system stabilizer in pu
Ks1 : Gain of active power branch in pu
Ks2 : Gain of angular frequency branch in pu
MAcc : Gain of angular velocity in pu
OmegaMaxPu : Maximum angular velocity in pu (base omegaNom)
OmegaMinPu : Minimum angular velocity in pu (base omegaNom)
PGenMaxPu : Maximum active power in pu (base SNom) (generator convention)
PGenMinPu : Minimum active power in pu (base SNom) (generator convention)
PPssOffPu : Lower active power threshold for PSS activation in pu (base SNom) (generator convention)
PPssOnPu : Higher active power threshold for PSS activation in pu (base SNom) (generator convention)
t1 : Transducer time constant (active power branch) in s
t2 : Transducer time constant (angular frequency branch) in s
t3 : First order time constant (active power branch) in s
t4 : Derivative time constant (angular frequency branch) in s
tD : Washout time constant in s
tI1 : Time constant of first integrator, in s
tI2 : Time constant of second integrator, in s
tI3 : Time constant of third integrator, in s
tI4 : Time constant of fourth integrator, in s
VPssMaxPu : Maximum output voltage of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum output voltage of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA

## Model diagram

<img src="/pages/models/regulations/PSS6C/PSS6C.drawio.svg" alt="PSS6C diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}

