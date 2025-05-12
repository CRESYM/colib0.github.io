---
layout: page
title: IEEX2A
tags: ["Voltage regulator", "IEEX2A", "generic"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---

This article is incomplete, some sections must be written.

## Context

To be completed

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|UsPu |measured stator voltage | pu (base UNom)|
|UsRefPu |reference stator voltage|pu (base UNom)|
|UOelPu (optional) |output voltage of overexcitation limiter|pu (base UNom)|
|UPssPu (optional) |output voltage of power system stabilizer|pu (base UNom)|
|UUelPu (optional) |output voltage of underexcitation limiter|pu (base UNom)|

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
AEx |Gain of saturation function|pu|
BEx |Exponential coefficient of saturation function|-|
EfdMinPu |Minimum excitation voltage|pu (user-selected base voltage)|
Ka |Voltage regulator gain|pu|
Ke |Exciter field proportional constant|pu|
Kf |Exciter rate feedback gain|pu|
tA |Voltage regulator time constant|s|
tB |Voltage regulator lag time constant|s|
tC |Voltage regulator lead time constant|s|
tE |Exciter field time constant|s|
tF1 |Feedback lead time constant|s|
tR |Stator voltage filter time constant|s|
VrMaxPu |Maximum field voltage|pu (user-selected base voltage)|
VrMinPu |Minimum field voltage|pu (user-selected base voltage)|

## Model diagram

![IEEX2A](IEEX2A.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
