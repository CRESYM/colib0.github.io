---
layout: page
title: ST4C
tags: ["Voltage regulator", "ST4C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST4C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE ST4C model

This article is incomplete, some sections must be written.

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called ST4B. Compared to ST4B, ST4C has additional options for connecting OEL and UEL inputs, an additional block with time constant tA and an additional time constant tG in the feedback path with gain Kg.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|IrPu |rotor current |pu (base SNom, user-selected base voltage)|
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
|Kc |Rectifier loading factor proportional to commutating reactance, |pu|
|Kg |Feedback gain of inner loop field regulator |pu|
|Ki |Potential circuit (current) gain coefficient |pu|
|Kim |Integral gain of second PI |pu|
|Kir |Integral gain of first PI |pu|
|Kp |Potential circuit gain |pu|
|Kpm |Proportional gain of second PI |pu|
|Kpr |Proportional gain of first PI |pu|
|PositionOel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at inner loop output|-|
|PositionPss |Input location : (0) none, (1) voltage error summation, (2) after take-over UEL|-|
|PositionScl |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at inner loop output|-|
|PositionUel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at inner loop output|-|
|Sw1 |If true, power source derived from terminal voltage, if false, independent from terminal voltage|-|
|tA |Voltage regulator time constant |s|
|tG |Feedback time constant of inner loop field regulator |s|
|Thetap |Potential circuit phase angle |rad|
|tR |Stator voltage filter time constant |s|
|VaMaxPu |Maximum output voltage of limited first order |pu (user-selected base voltage)|
|VaMinPu |Minimum output voltage of limited first order |pu (user-selected base voltage)|
|VbMaxPu |Maximum available exciter field voltage |pu (base UNom)|
|VgMaxPu |Maximum feedback voltage of inner loop field regulator |pu (user-selected base voltage)|
|VmMaxPu |Maximum output voltage of second PI |pu (user-selected base voltage)|
|VmMinPu |Minimum output voltage of second PI |pu (user-selected base voltage)|
|VrMaxPu |Maximum output voltage of first PI |pu (user-selected base voltage)|
|VrMinPu |Minimum output voltage of first PI |pu (user-selected base voltage)|
|XlPu | Reactance associated with potential source |pu (base SNom, UNom)|

## Model diagram

![ST4C](ST4C.drawio.svg)

## Model variant

In the ST4B model :

- the overexcitation limiter voltage is applied in the inner loop field regulator
- the voltages from the underexcitation limiter and the power system stabilizer are added to the voltage error
- there is no stator current limiter
- the power source is derived from terminal voltage
- there are no first order filter and no upper limit for the feedback signal of the inner loop field regulator

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
