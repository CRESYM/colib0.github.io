---
layout: page
title: TGOV1
tags: ["Governor", "TGOV1", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovSteam0", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# TGOV1 model

This article is incomplete, some sections must be written.

## Context

This governor model appears under the name GovSteam0 in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| omegaPu |measured angular frequency |pu (base omegaNom)|
| omegaRefPu |reference angular frequency |pu (base omegaNom)|
| PmRefPu |reference mechanical power |pu (base PNomTurb)|

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
|Dt |Turbine damping coefficient |pu|
|R |Permanent droop |pu|
|t1 |Steam bowl time constant |s|
|t2 |Reheater lead time constant |s|
|t3 |Reheater lag time constant |s|
|VMax |Maximum valve position |pu|
|VMin |Minimum valve position |pu|

## Model diagram

![TGOV1](TGOV1.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
