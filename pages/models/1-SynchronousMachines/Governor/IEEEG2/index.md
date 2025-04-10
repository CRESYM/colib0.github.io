---
layout: page
title: IEEEG2 / GovSteam 2
tags: ["Governor", "IEEEG2", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovHydroIEEE0", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---

## Context

This governor model appears under the name GovHydroIEEE0 in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

IEEE simplified hydro governor-turbine model. Used for mechanical-hydraulic and electrohydraulic turbine governors, with or without steam feedback

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|omegaPu |measured angular frequency | pu (base omegaNom)|
|omegaRefPu |reference angular frequency |pu (base omegaNom)|
|PmRefPu |reference mechanical power |pu (base PNomTurb)|

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

| Variable | Description | Units |
|-----------|--------------| ------|
|K |Governor gain (reciprocal of droop) |pu|
|PMaxPu |Maximum mechanical power |pu (base PNomTurb)|
|PMinPu |Minimum mechanical power |pu (base PNomTurb)|
|t1 |Governor mechanism time constant |s|
|t2 |Turbine power time constant |s|
|t3 |Turbine exhaust temperature time constant |s|
|t4 |Governor lead-lag time constant |s|

## Model diagram

![IEEEG2](IEEEG2.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
