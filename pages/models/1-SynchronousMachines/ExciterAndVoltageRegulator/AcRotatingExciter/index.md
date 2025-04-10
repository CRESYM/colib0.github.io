---
layout: page
title: AcRotatingExciter (submodel)
tags: ["Voltage regulator submodel", "AcRotatingExciter", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# AcRotatingExciter model

## Context

This ac rotating exciter with non-controlled rectifiers has been presented in details in {% cite Ferguson1960 %} and {% cite Gayek1964 %}.

This model is included in the type AC (alternator-supplied rectifier) voltage regulator models described in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}, specifically those named AC.C (AC1C, AC6C, etc.). Compared to the first standard version (1992), the models AC.B (introduced in the second standard version of 2005) and AC.C have a variable upper limit for the limited integrator.

## Model use, assumptions, validity domain and limitations

This model is satisfactory for large scale simulations. However, if this model is used to design phase lead networks for power system stabilizers, and the local mode is close to 3 Hz or higher, a more detailed treatment of the ac rotating exciter may be needed.
Saturation is taken into account with $$S_E(V_E)$$

The demagnetizing effect of load current $$I_{FD}$$ on the exciter alternator output voltage $$V_E$$ is accounted for in the feedback path that includes the demagnetization constant $$K_D$$. This constant depends on of the exciter alternator synchronous and transient reactances.

## Model inputs and outputs

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| EfePu | output voltage of voltage regulator | pu (user-selected base voltage)|
| IrPu | rotor current | pu (base SNom, user-selected base voltage)|

The output variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| EfdPu | excitation voltage | pu (user-selected base voltage)|
| VfePu | field current signal | pu (user-selected base voltage)|

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
|AEx | Gain of saturation function | pu|
|BEx | Exponential coefficient of saturation function|-|
|Kc | Rectifier loading factor proportional to commutating reactance, | pu|
|Kd | Demagnetizing factor, function of exciter alternator reactances, | pu|
|Ke | Exciter field resistance constant |pu|
|tE | Exciter field time constant | s|
|TolLi | Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator | pu|
|VeMinPu | Minimum exciter output voltage | pu (user-selected base voltage)|
|VfeMaxPu | Maximum exciter field current signal | pu (user-selected base voltage)|

## Model diagram

![AcRotatingExciter](AcRotatingExciter.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
