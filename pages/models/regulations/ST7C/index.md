---
layout: page
title: Standard voltage regulator model ST7C
tags: ["Voltage regulator", "ST7C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST7C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# Exc IEEE ST7C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called ST7B. Compared to ST7B, ST7C has an additional time constant tA.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- UsPu : measured stator voltage in pu (base UNom)
- UsRefPu : reference stator voltage in pu (base UNom)
- UOelPu (optional) : output voltage of overexcitation limiter in pu (base UNom)
- UPssPu (optional) : output voltage of power system stabilizer in pu (base UNom)
- USclOelPu (optional) : output voltage of stator current overexcitation limiter in pu (base UNom)
- USclUelPu (optional) : output voltage of stator current underexcitation limiter in pu (base UNom)
- UUelPu (optional) : output voltage of underexcitation limiter in pu (base UNom)

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

Kh : High-value gate feedback gain in pu
Kia : Voltage regulator feedback gain in pu
Kl : Low-value gate feedback gain in pu
Kpa : Voltage regulator proportional gain in pu
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
tA : Thyristor bridge firing control equivalent time constant in s
tB : Voltage regulator lag time constant in s
tC : Voltage regulator lead time constant in s
tF : Stator voltage lag time constant in s
tG : Stator voltage lead time constant in s
tIa : Feedback time constant in s
tR : Stator voltage filter time constant in s
VMaxPu : Maximum reference voltage in pu (user-selected base voltage)
VMinPu : Minimum reference voltage in pu (user-selected base voltage)
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/ST7C/ST7C.drawio.svg" alt="ST7C diagram">

## Model variant

In the ST7B model, the final first order filter is ignored.

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
