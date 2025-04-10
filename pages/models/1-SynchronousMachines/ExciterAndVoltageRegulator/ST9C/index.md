---
layout: page
title: ST9C
tags: ["Voltage regulator", "ST9C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST9C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE ST9C model

This article is incomplete, some sections must be written.

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

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
|Ka |Voltage regulator gain |pu|
|Kas |Power converter gain proportional to supply voltage, |pu|
|Kc |Rectifier loading factor proportional to commutating reactance, |pu|
|Ki |Potential circuit (current) gain coefficient |pu|
|Kp |Potential circuit gain |pu|
|Ku |Gain associated with activation of takeover UEL, |pu|
|PositionOel |Input location : (0) none, (1) voltage error summation, (2) take-over|-|
|PositionScl |Input location : (0) none, (1) voltage error summation, (2) take-over|-|
|PositionUel |Input location : (0) none, (1) voltage error summation, (2) take-over|-|
|Sw1 |If true, power source derived from terminal voltage, if false, independent from terminal voltage|-|
|tA |Voltage regulator time constant |s|
|tAs |Equivalent time constant of power converter firing control |s|
|tAUel |Time constant of underexcitation limiter |s|
|tBd |Filter time constant of differential part of voltage regulator |s|
|tCd |Time constant of differential part of voltage regulator |s|
|Thetap |Potential circuit phase angle |rad|
|tR |Stator voltage filter time constant |s|
|VaMaxPu |Maximum output voltage of limited first order |pu|
|VaMinPu |Minimum output voltage of limited first order |pu|
|VbMaxPu |Maximum available exciter field voltage |pu (base UNom)|
|VrMaxPu |Maximum field voltage |pu (user-selected base voltage)|
|VrMinPu |Minimum field voltage |pu (user-selected base voltage)|
|XlPu |Reactance associated with potential source |pu (base SNom, UNom)|
|ZaPu |Dead-band for differential part influence on voltage regulator |pu (base UNom)|

## Model diagram

![ST9C](ST9C.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
