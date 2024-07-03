---
layout: page
title: Standard power system stabilizer model PSS6C
tags: ["Power system stabilizer", "PSS6C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "PssIEEE6C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# PSS6C model

This article is incomplete, some sections must be written.

## Context

This power system stabilizer model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|omegaPu |measured angular frequency |pu (base omegaNom)|
|omegaRefPu |reference angular frequency |pu (base omegaNom)|
|PGenPu |active power |pu (base SnRef)|

The output signal is VPssPu in pu (base UNom).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
KOmega |Coefficient applied to angular frequency|-|
KOmegaRef |Coefficient applied to reference angular frequency|-|
K0 |Gain of first integrator input |pu|
K1 |Gain of first integrator output |pu|
K2 |Gain of second integrator output |pu|
K3 |Gain of third integrator output |pu|
K4 |Gain of fourth integrator output |pu|
Ki3 |Gain of third integrator |pu|
Ki4 |Gain of fourth integrator |pu|
Ks |Gain of power system stabilizer |pu|
Ks1 |Gain of active power branch |pu|
Ks2 |Gain of angular frequency branch |pu|
MAcc |Gain of angular velocity |pu|
OmegaMaxPu |Maximum angular velocity |pu (base omegaNom)|
OmegaMinPu |Minimum angular velocity |pu (base omegaNom)|
PGenMaxPu |Maximum active power |pu (base SNom) (generator convention)|
PGenMinPu |Minimum active power |pu (base SNom) (generator convention)|
PPssOffPu |Lower active power threshold for PSS activation |pu (base SNom) (generator convention)|
PPssOnPu |Higher active power threshold for PSS activation |pu (base SNom) (generator convention)|
t1 |Transducer time constant (active power branch) |s|
t2 |Transducer time constant (angular frequency branch) |s|
t3 |First order time constant (active power branch) |s|
t4 |Derivative time constant (angular frequency branch) |s|
tD |Washout time constant |s|
tI1 |Time constant of first integrator, |s|
tI2 |Time constant of second integrator, |s|
tI3 |Time constant of third integrator, |s|
tI4 |Time constant of fourth integrator, |s|
VPssMaxPu |Maximum output voltage of power system stabilizer |pu (base UNom)|
VPssMinPu |Minimum output voltage of power system stabilizer |pu (base UNom)|
|SNom |Nominal apparent power |MVA|

## Model diagram

<img src="/pages/models/regulations/PSS6C/PSS6C.drawio.svg" alt="PSS6C diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}

