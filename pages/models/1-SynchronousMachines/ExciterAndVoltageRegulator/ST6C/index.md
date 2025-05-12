---
layout: page
title: ST6C
tags: ["Voltage regulator", "ST6C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST6C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE ST6C model

This article is incomplete, some sections must be written.

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called ST6B. Compared to ST6B, ST6C has additional options for connecting OEL and UEL inputs and an additional block with time constant tA.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| IrPu |rotor current |pu (base SNom, user-selected base voltage)|
|itPu |complex current at the terminal |pu (base SNom, UNom)|
|UsPu |measured stator voltage |pu (base UNom)|
|UsRefPu |reference stator voltage |pu (base UNom)|
|utPu |complex voltage at the terminal |pu (base UNom)|
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
|Kc |Rectifier loading factor proportional to commutating reactance, |pu|
|Kcl |Field current limiter conversion factor |pu|
|Kff |Feedforward gain of inner loop field regulator |pu|
|Kg |Feedback gain constant of inner loop field regulator |pu|
|Ki |Potential circuit (current) gain coefficient |pu|
|Kia |Integral gain of PI |pu|
|Klr |Gain of field current limiter |pu|
|Km |Gain of error of inner loop field regulator |pu|
|Kp |Potential circuit gain |pu|
|Kpa |Proportional gain of PI |pu|
|PositionOel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output|-|
|PositionScl |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output|-|
|PositionUel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output|-|
|Sw1 |If true, power source derived from terminal voltage, if false, independent from terminal voltage|-|
|tA |Voltage regulator time constant |s|
|tG |Feedback time constant of inner loop field regulator |s|
|Thetap |Potential circuit phase angle |rad|
|tR |Stator voltage filter time constant |s|
|VaMaxPu |Maximum output voltage of limited first order |pu (user-selected base voltage)|
|VaMinPu |Minimum output voltage of limited first order |pu (user-selected base voltage)|
|VbMaxPu |Maximum available exciter field voltage |pu (base UNom)|
|VmMaxPu |Maximum output voltage of second PI |pu (user-selected base voltage)|
|VmMinPu |Minimum output voltage of second PI |pu (user-selected base voltage)|
|VrMaxPu |Maximum output voltage of first PI |pu (user-selected base voltage)|
|VrMinPu |Minimum output voltage of first PI |pu (user-selected base voltage)|
|XlPu |Reactance associated with potential source |pu (base SNom, UNom)|

## Model diagram

![ST6C](ST6C.drawio.svg)

## Model variant

In the ST6B model :

- the voltage from the underexcitation limiter is applied at the AVR input
- there is no stator current limiter
- the power source is derived from terminal voltage, with no reactance
- there is no first order filter on the feedback signal of the inner loop field regulator

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
