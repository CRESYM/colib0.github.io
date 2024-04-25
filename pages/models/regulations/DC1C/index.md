---
layout: page
title: Standard voltage regulator model DC1C
tags: ["Voltage regulator", DC1C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEDC1C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# Exc IEEE DC1C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard versions (1992, 2005), its predecessor model was called DC1A. Compared to DC1A, DC1C has additional options for connecting OEL limits and an additional limit EfdMinPu.

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

AEx : Gain of saturation function in pu
BEx : Exponential coefficient of saturation function
EfdMinPu : Minimum excitation voltage in pu (user-selected base voltage)
Ka : Voltage regulator gain in pu
Ke : Exciter field proportional constant in pu
Kf : Exciter rate feedback gain in pu
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
tA : Voltage regulator time constant in s
tB : Voltage regulator lag time constant in s
tC : Voltage regulator lead time constant in s
tE : Exciter time constant in s
tF : Exciter rate feedback time constant in s
tR : Stator voltage filter time constant in s
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/DC1C/DC1C.drawio.svg" alt="DC1C diagram">

## Model variant

In the DC1A model :

- the integrator of the second loop (and its output EfdPu) is not limited
- there are no stator current limiter and no overexcitation limiter

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
