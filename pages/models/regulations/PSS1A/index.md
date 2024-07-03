---
layout: page
title: Standard power system stabilizer model PSS1A
tags: ["Power system stabilizer", "PSS1A", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "PssIEEE1A", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# PSS1A model

This article is incomplete, some sections must be written.

## Context

This power system stabilizer model appears in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
This model was introduced in the previous standard version (2005).

## Model use, assumptions, validity domain and limitations

To be completed

## Model input and output

The input variables are either :

| Variable | Description | Units |
|-----------|--------------| ------|
| omegaPu | measured angular frequency | pu (base omegaNom)|
| PGenPu |active power|pu (base SnRef)|

The output signal is VPssPu in pu (base UNom).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
A1 |First coefficient of notch filter|s|
A2 |Second coefficient of notch filter|$$s ^ 2$$|
Ks |Gain of power system stabilizer|pu|
t1 |First lead time constant|s|
t2 |First lag time constant|s|
t4 |Second lag time constant|s|
t5 |Washout time constant|s|
t6 |Transducer time constant|s|
VPssMaxPu |Maximum voltage output of power system stabilizer|pu (base UNom)|
VPssMinPu |Minimum voltage output of power system stabilizer|pu (base UNom)|
SNom |Nominal apparent power|MVA (only if PGenPu is the input signal)|

## Model diagram

<img src="/pages/models/regulations/PSS1A/PSS1A.drawio.svg" alt="PSS1A diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
