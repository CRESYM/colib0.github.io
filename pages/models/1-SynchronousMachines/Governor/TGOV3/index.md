---
layout: page
title: TGOV3
tags: ["Governor", "TGOV3", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovSteamFV3", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# TGOV3 model

This article is incomplete, some sections must be written.

## Context

This governor model appears under the name GovSteamFV3 in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|fastValving |a Boolean which, if true, initiates the fast valving|-|
|omegaPu |measured angular frequency | pu (base omegaNom)|
|omegaRefPu |reference angular frequency | pu (base omegaNom)|
|PmRefPu |reference mechanical power | pu (base PNomTurb)|

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
K |Governor gain(reciprocal of droop) |pu|
K1 |Fraction of HP shaft power after first boiler pass|-|
K2 |Fraction of LP shaft power after first boiler pass|-|
K3 |Fraction of HP shaft power after second boiler pass|-|
PMaxPu |Maximum valve opening |pu (base PNomTurb)|
PMinPu |Minimum valve opening |pu (base PNomTurb)|
PrMaxPu |Maximum pressure in reheater |pu (base PNomTurb)|
t1 |Governor lag time constant |s |
t2 |Governor lead time constant |s|
t3 |Valve positioner time constant |s|
t4 |Inlet piping / steam bowl time constant |s|
t5 |Time constant of second boiler pass (reheater) |s|
t6 |Time constant of crossover of third boiler pass |s|
tA |Time to close intercept valve |s|
tB |Time until intercept valve starts to reopen |s|
tC |Time until intercept valve is fully open |s|
Uo |Maximum valve opening velocity |pu/s|
Uc |Maximum valve closing velocity |pu/s|

## Model diagram

![TGOV3](TGOV3.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
