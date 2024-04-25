---
layout: page
title: Standard voltage regulator model BBSEX1
tags: ["Voltage regulator", "BBSEX1", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcBBC", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# BBSEX1 model

## Context

This voltage regulator model appears under the name ExcBBC in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

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

EfdMaxPu : Maximum excitation voltage in pu (user-selected base voltage)
EfdMinPu : Minimum excitation voltage in pu (user-selected base voltage)
K : Voltage regulator gain in pu
t1 : Voltage regulator first time constant in s
t2 : Voltage regulator second time constant in s
t3 : Voltage regulator lead time constant in s
t4 : Voltage regulator lag time constant in s
tR : Stator voltage filter time constant in s
VrMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
VrMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/BBSEX1/BBSEX1.drawio.svg" alt="BBSEX1 diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
