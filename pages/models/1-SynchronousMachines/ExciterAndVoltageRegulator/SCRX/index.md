---
layout: page
title: SCRX
tags: ["Voltage regulator", "SCRX", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcSCRX", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# SCRX model

This article is incomplete, some sections must be written.

## Context

This voltage regulator model appears under the name ExcSCRX in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|IrPu |rotor current |pu (base SNom, user-selected base voltage)|
|UsPu |measured stator voltage |pu (base UNom)|
|UsRefPu |reference stator voltage |pu (base UNom)|
|UOelPu (optional) |output voltage of overexcitation limiter |pu (base UNom)|
|UPssPu (optional) |output voltage of power system stabilizer |pu (base UNom)|
|UUelPu (optional) |output voltage of underexcitation limiter |pu (base UNom)|

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
CSwitch |If true, exciter is solid-fed, if false, exciter is bus-fed|-|
IrThresholdOn |If true, rotor current threshold applies|-|
K |Voltage regulator gain |pu|
RcToRfd |Ratio of field discharge resistance to field winding resistance|-|
tA |Transient gain reduction lead time constant |s|
tB |Transient gain reduction lag time constant |s|
tE |Voltage regulator time constant |s|
VrMaxPu |Maximum output voltage of voltage regulator |pu (user-selected base voltage)|
VrMinPu |Minimum output voltage of voltage regulator |pu (user-selected base voltage)|

## Model diagram

![SCRX](SCRX.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
