---
layout: page
title: ST1C
tags: ["Voltage regulator", "ST1C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST1C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE ST1C model

This article is incomplete, some sections must be written.

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In previous standard versions (1992, 2005), its predecessor model was called ST1A. Compared to ST1A, ST1C has additional options for connecting OEL input.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| IrPu | rotor current |pu (base SNom, user-selected base voltage)|
|UsPu |measured stator voltage |pu (base UNom)|
|UsRefPu |reference stator voltage |pu (base UNom)|
|UOelPu (optional) |output voltage of overexcitation limiter |pu (base UNom)|
|UPssPu (optional) |output voltage of power system stabilizer |pu (base UNom)|
|USclOelPu (optional) |output voltage of stator current overexcitation limiter |pu (base UNom)|
|USclUelPu (optional) |output voltage of stator current underexcitation limiter |pu (base UNom)|
|UUelPu (optional) |output voltage of underexcitation limiter |pu (base UNom)|

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
|IlrPu |Exciter output current limit reference |pu (base SNom, user-selected base voltage)|
|Ka |Voltage regulator gain |pu|
|Kc |Rectifier loading factor proportional to commutating reactance, |pu|
|Kf |Exciter rate feedback gain |pu|
|Klr |Gain of field current limiter |pu|
|PositionOel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
|PositionPss |Input location : (0) none, (1) voltage error summation, (2) summation at AVR output|-|
|PositionScl |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
|PositionUel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
|tA |Voltage regulator time constant |s|
|tB |Voltage regulator lag time constant |s|
|tB1 |Voltage regulator second lag time constant |s|
|tC |Voltage regulator lead time constant |s|
|tC1 |Voltage regulator second lead time constant |s|
|tF |Exciter rate feedback time constant |s|
|tR |Stator voltage filter time constant |s|
|VaMaxPu |Maximum output voltage of voltage regulator |pu (user-selected base voltage)|
|VaMinPu |Minimum output voltage of voltage regulator |pu (user-selected base voltage)|
|ViMaxPu |Maximum input voltage of voltage regulator |pu (user-selected base voltage)|
|ViMinPu |Minimum input voltage of voltage regulator |pu (user-selected base voltage)|
|VrMaxPu |Maximum field voltage |pu (user-selected base voltage)|
|VrMinPu |Minimum field voltage |pu (user-selected base voltage)|

## Model diagram

![ST1C](ST1C.drawio.svg)

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
