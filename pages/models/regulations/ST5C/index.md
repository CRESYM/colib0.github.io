---
layout: page
title: Standard voltage regulator model ST5C
tags: ["Voltage regulator", "ST5C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST5C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# Exc IEEE ST5C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called ST5B. Compared to ST5B, ST5C has additional options for connecting OEL and UEL inputs.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- IrPu : rotor current in pu (base SNom, user-selected base voltage)
- UsPu : measured stator voltage in pu (base UNom)
- UsRefPu : reference stator voltage in pu (base UNom)
- UOelPu (optional) : output voltage of overexcitation limiter in pu (base UNom)
- UPssPu (optional) : output voltage of power system stabilizer in pu (base UNom)
- USclOelPu (optional) : output voltage of stator current overexcitation limiter in pu (base UNom)
- USclUelPu (optional) : output voltage of stator current underexcitation limiter in pu (base UNom)
- UUelPu (optional) : output voltage of underexcitation limiter in pu (base UNom)

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

Kc : Rectifier loading factor proportional to commutating reactance, in pu
Kr : Gain of voltage after overexcitation and underexcitation limitations, in pu
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input
t1 : Inverse timing current constant in s
tB1 : Second lag time constant in s
tB2 : First lag time constant in s
tC1 : Second lead time constant in s
tC2 : First lead time constant in s
tOB1 : Second lag time constant (overexcitation limitation) in s
tOB2 : First lag time constant (overexcitation limitation) in s
tOC1 : Second lead time constant (overexcitation limitation) in s
tOC2 : First lead time constant (overexcitation limitation) in s
tR : Stator voltage filter time constant in s
tUB1 : Second lag time constant (underexcitation limitation) in s
tUB2 : First lag time constant (underexcitation limitation) in s
tUC1 : Second lead time constant (underexcitation limitation) in s
tUC2 : First lead time constant (underexcitation limitation) in s
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/ST5C/ST5C.drawio.svg" alt="ST5C diagram">

## Model variant

In the ST5B model :

- the overexcitation and underexcitation limitation voltages are applied at the AVR input
- there is no stator current limiter

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
