---
layout: page
title: OEL3C
tags: ["Voltage regulator", "OEL3C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#236"]
date: 08/10/2024
last-updated: 09/10/2024
id: #236
authors: Erwan Guichard (DPS for RTE)
reviewers: Lampros Papangelis (CRESYM)
---
# IEEE OEL3C model

## Context

This overexcitation limiter model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

## Model use, assumptions, validity domain and limitations

This model is associated to one of the voltage regulators (types AC, DC, ST) defined by the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

The model provides an overexcitation limiter signal for the purpose of summation : the overexcitation limiter signal is added to the stator voltage deviation from the reference, thus being taken into account in the calculation of the excitation voltage.

## Model input and output

The input signal is either the generator field current (for static excitation systems) or the exciter field current (for rotating exciters), in pu.

The output signal is UOelPu, the overexcitation limiter voltage in pu (base UNom).

## Model parameters

| Parameter | Description | Unit | Value |
| --------- | ----------- | ---- | ----- |
| ITfPu | OEL timed field current limiter pick up level | pu | 3.7 |
| K1 | Exponent for OEL error calculation | - | 1 |
| KOel | OEL gain | pu | 1 |
| KpOel | OEL proportional gain | pu | 1 |
| KScale | OEL input signal scaling factor | pu | - |
| tF | OEL field current measurement time constant | s | 0.02 |
| tOel | OEL integral time constant | s | 24 |
| VOel1MaxPu | OEL integrator maximum output | pu (base UNom) | 0.66 |
| VOel1MinPu | OEL integrator minimum output | pu (base UNom) | -1 |
| VOel2MaxPu | OEL maximum output | pu (base UNom) | 0 |
| VOel2MinPu | OEL minimum output | pu (base UNom) | -1 |

## Model diagram

![OEL3C](OEL3C.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 09/10/2024 |  |

## References

{% bibliography --cited --file references  %}