---
layout: page
title: Standard voltage regulator model IEEEX2
tags: ["Voltage regulator", "IEEEX2", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcDC2A", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# IEEEX2 model

## Context

This voltage regulator model appears under the name ExcDC2A in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

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
tF2 : Feedback lag time constant in s
tR : Stator voltage filter time constant in s
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/IEEEX2/IEEEX2.drawio.svg" alt="IEEEX2 diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
