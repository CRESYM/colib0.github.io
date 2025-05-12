---
layout: page
title: IEEEX2
tags: ["Voltage regulator", "IEEEX2", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcDC2A", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---

This article is incomplete, some sections must be written.

## Context

This modified IEEE DC2A direct current commutator exciter with speed input, one more leg block in feedback loop and without underexcitation limiters (UEL) inputs. DC type 2 excitation system model with added speed multiplier, added lead-lag, and voltage-dependent limits. D2CA model represents represent field-controlled dc commutator exciters with continuously acting voltage regulators having supplies obtained from the generator or auxiliary bus. It differs from the Type DC1A model only in the voltage regulator output limits, which are now proportional to terminal voltage $$V_T$$. It is representative of solid-state replacements for various forms of older mechanical and rotating amplifier regulating equipment connected to dc commutator exciters.

This voltage regulator model appears under the name ExcDC2A in {% cite IEEEExciterModels2016 %}, the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %},  and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

to be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|UsPu |measured stator voltage |pu (base UNom)|
|UsRefPu |reference stator voltage |pu (base UNom)|
|UOelPu (optional) |output voltage of overexcitation limiter |pu (base UNom)|
|UPssPu (optional) |output voltage of power system stabilizer |pu (base UNom)|
|UUelPu (optional) |output voltage of underexcitation limiter |pu (base UNom)|

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
|AEx |Gain of saturation function |pu|
|BEx |Exponential coefficient of saturation function |-|
|EfdMinPu |Minimum excitation voltage |pu (user-selected base voltage)|
|Ka |Voltage regulator gain |pu|
|Ke |Exciter field proportional constant |pu|
|Kf |Exciter rate feedback gain |pu|
|tA |Voltage regulator time constant |s|
|tB |Voltage regulator lag time constant |s|
|tC |Voltage regulator lead time constant |s|
|tE |Exciter field time constant |s|
|tF1 |Feedback lead time constant |s|
|tF2 |Feedback lag time constant |s|
|tR |Stator voltage filter time constant |s|
|VrMaxPu |Maximum field voltage |pu (user-selected base voltage)|
|VrMinPu |Minimum field voltage |pu (user-selected base voltage)|

## Model diagram

![IEEEX2](IEEEX2.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
