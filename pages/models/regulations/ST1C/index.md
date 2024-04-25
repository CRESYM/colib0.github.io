---
layout: page
title: Standard voltage regulator model ST1C
tags: ["Voltage regulator", "ST1C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST1C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# Exc IEEE ST1C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In previous standard versions (1992, 2005), its predecessor model was called ST1A. Compared to ST1A, ST1C has additional options for connecting OEL input.

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

IlrPu : Exciter output current limit reference in pu (base SNom, user-selected base voltage)
Ka : Voltage regulator gain in pu
Kc : Rectifier loading factor proportional to commutating reactance, in pu
Kf : Exciter rate feedback gain in pu
Klr : Gain of field current limiter in pu
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionPss : Input location : (0) none, (1) voltage error summation, (2) summation at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
tA : Voltage regulator time constant in s
tB : Voltage regulator lag time constant in s
tB1 : Voltage regulator second lag time constant in s
tC : Voltage regulator lead time constant in s
tC1 : Voltage regulator second lead time constant in s
tF : Exciter rate feedback time constant in s
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
ViMaxPu : Maximum input voltage of voltage regulator in pu (user-selected base voltage)
ViMinPu : Minimum input voltage of voltage regulator in pu (user-selected base voltage)
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/ST1C/ST1C.drawio.svg" alt="ST1C diagram">

## Model variant

In the ST1A model :

- the overexcitation limiter voltage is applied at the AVR output
- there is no stator current limiter

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
