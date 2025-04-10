---
layout: page
title: ST7C
tags: ["Voltage regulator", "ST7C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST7C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE ST7C model

This article is incomplete, some sections must be written.

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called ST7B. Compared to ST7B, ST7C has an additional time constant tA.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| UsPu |measured stator voltage | pu (base UNom)|
|UsRefPu |reference stator voltage |pu (base UNom)|
|UOelPu (optional) |output voltage of overexcitation limiter |pu (base UNom)|
|UPssPu (optional) |output voltage of power system stabilizer |pu (base UNom)|
|USclOelPu (optional) |output voltage of stator current overexcitation limiter |pu (base UNom)|
|USclUelPu (optional) |output voltage of stator current underexcitation limiter |pu (base UNom)|
|UUelPu (optional) |output voltage of underexcitation limiter |pu (base UNom)|

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameters | Description | Units |
|-----------|--------------| ------|
|Kh |High-value gate feedback gain |pu|
|Kia |Voltage regulator feedback gain |pu|
|Kl |Low-value gate feedback gain |pu|
|Kpa |Voltage regulator proportional gain |pu|
|PositionOel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
|PositionScl |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
|PositionUel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
|tA |Thyristor bridge firing control equivalent time constant |s|
|tB |Voltage regulator lag time constant |s|
|tC |Voltage regulator lead time constant |s|
|tF |Stator voltage lag time constant |s|
|tG |Stator voltage lead time constant |s|
|tIa |Feedback time constant |s|
|tR |Stator voltage filter time constant |s|
|VMaxPu |Maximum reference voltage |pu (user-selected base voltage)|
|VMinPu |Minimum reference voltage |pu (user-selected base voltage)|
|VrMaxPu |Maximum field voltage |pu (user-selected base voltage)|
|VrMinPu |Minimum field voltage |pu (user-selected base voltage)|

## Model diagram

![ST7C](ST7C.drawio.svg)

## Model variant

In the ST7B model, the final first order filter is ignored.

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
