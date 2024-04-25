---
layout: page
title: Standard voltage regulator model IEEX2A
tags: ["Voltage regulator", "IEEX2A", "generic"]
date: 05/04/2024
last-updated: 24/05/2024
---
# IEEX2A model

## Context

This voltage regulator model has been developed by RTE.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- UsPu : measured stator voltage in pu (base UNom)
- UsRefPu : reference stator voltage in pu (base UNom)
- UOelPu (optional) : output voltage of overexcitation limiter in pu (base UNom)
- UPssPu (optional) : output voltage of power system stabilizer in pu (base UNom)
- UUelPu (optional) : output voltage of underexcitation limiter in pu (base UNom)

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

AEx : Gain of saturation function in pu
BEx : Exponential coefficient of saturation function
EfdMinPu : Minimum excitation voltage in pu (user-selected base voltage)
Ka : Voltage regulator gain in pu
Ke : Exciter field proportional constant in pu
Kf : Exciter rate feedback gain in pu
tA : Voltage regulator time constant in s
tB : Voltage regulator lag time constant in s
tC : Voltage regulator lead time constant in s
tE : Exciter field time constant in s
tF1 : Feedback lead time constant in s
tR : Stator voltage filter time constant in s
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/IEEX2A/IEEX2A.drawio.svg" alt="IEEX2A diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
