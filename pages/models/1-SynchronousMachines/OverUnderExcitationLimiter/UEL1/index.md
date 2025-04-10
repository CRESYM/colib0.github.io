---
layout: page
title: UEL1
tags: ["Voltage regulator", "UEL1", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#236"]
date: 08/10/2024
last-updated: 09/10/2024
id: #236
authors: Erwan Guichard (DPS for RTE)
reviewers: Lampros Papangelis (CRESYM)
---
# IEEE UEL1 model

## Context

This underexcitation limiter model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

## Model use, assumptions, validity domain and limitations

This model is associated to one of the voltage regulators (types AC, DC, ST) defined by the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

The model provides an underexcitation limiter signal for the purpose of takeover : the underexcitation limiter signal acts as a lower limit on the voltage regulator main signal which then becomes the excitation voltage.

## Model inputs and output

The input signals are :

| Variable | Description | Unit |
| -------- | ----------- | ---- |
| itPu | Complex stator current | pu (base SnRef, UNom) |
| utPu | Complex stator voltage | pu (base UNom) |
| VfPu | Excitation system stabilizer signal | pu |

The output signal is UUelPu, the underexcitation limiter voltage in pu (base UNom).

## Model parameters

| Parameter | Description | Unit | Value |
| --------- | ----------- | ---- | ----- |
| Kuc | UEL center setting | pu | 1.38 |
| Kuf | UEL excitation system stabilizer gain | pu | 3.3 |
| Kui | UEL integral gain | pu | 0 |
| Kul | UEL proportional gain | pu | 100 |
| Kur | UEL radius setting | pu | 1.95 |
| tU1 | UEL first lead time constant | s | 0 |
| tU2 | UEL first lag time constant | s | 0.05 |
| tU3 | UEL second lead time constant | s | 0 |
| tU4 | UEL second lag time constant | s | 0 |
| VUcMaxPu | UEL maximum voltage magnitude | pu (base UNom) | 5.8 |
| VUiMaxPu | UEL maximum output | pu (base UNom) | 18 |
| VUiMinPu | UEL minimum output | pu (base UNom) | 18 |
| VUrMaxPu | UEL maximum radius | pu (base UNom) | 5.8 |

## Model diagram

![UEL1](UEL1.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 09/10/2024 |  |

## References

{% bibliography --cited --file references  %}