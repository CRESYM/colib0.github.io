---
layout: page
title: AC6C
tags: ["Voltage regulator", "AC6C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEAC6C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE AC6C model

## Context

This model is part of the alternator supplied rectifier excitation systems that use an ac alternator and stationary or rotating rectifiers to produce generator field requirements.

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In previous standard versions (1992, 2005), its predecessor model was called AC6A. Compared to AC6A, AC6C has additional options for connecting OEL and UEL inputs.

## Model use, assumptions, validity domain and limitations

It is used to represent field-controlled alternator-rectifier excitation systems with system-supplied electronic voltage regulators.
It takes into account loading effects. It can't allow the supply of negative field current. It takes into account saturation.

This model is satisfactory for large scale simulations. However, if this model is used to design phase lead networks for power system stabilizers, and the local mode is close to 3 Hz or higher, a more detailed treatment of the ac rotating exciter may be needed.

Excitation systems incorporating rotating machines produce a field voltage output ($$E_{FD}$$) which is proportional to the rotating speed of the machine. Since this effect is negligible when speed deviations are small which is the case of dynamic studies of large interconnected power systems, the effect of speed deviations on the output of the dc rotating exciter models is not represented in this latest version of the standard. However, some commercial software may have implemented such speed dependency in their model.

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| IrPu | rotor current | pu (base SNom, user-selected base voltage)|
| UsPu |measured stator voltage |pu (base UNom)|
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
|AEx |Gain of saturation function |pu|
|BEx |Exponential coefficient of saturation function|-|
|EfeMaxPu |Maximum exciter field voltage |pu (user-selected base voltage)|
|EfeMinPu |Minimum exciter field voltage |pu (user-selected base voltage)|
|Ka |Voltage regulator ga|pu|
|Kc |Rectifier loading factor proportional to commutating reactance |pu|
|Kd |Demagnetizing factor, function of exciter alternator reactances |pu|
|Ke |Exciter field resistance constant |pu|
|Kh |Exciter field current feedback gain pu|
|PositionOel |Input location :(0) none, (1) voltage error summation, (2) take-over at AVR output|-|
|PositionScl |Input location :(0) none, (1) voltage error summation, (2) take-over at AVR output|-|
|PositionUel |Input location :(0) none, (1) voltage error summation, (2) take-over at AVR output|-|
|tA |First lag time constant |s|
|tB |Second lag time constant |s|
|tC |Second lead time constant |s|
|tE |Exciter field time constant |s|
|tH |Feedback lag time constant |s|
|tJ |Feedback lead time constant |s|
|tK |First lead time constant |s|
|TolLi |Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator |pu|
|tR |Stator voltage filter time constant |s|
|VfeLimPu |Threshold of field current signal for feedback |pu (user-selected base voltage)|
|VaMaxPu |Maximum output voltage of voltage regulator |pu (user-selected base voltage)|
|VaMinPu |Minimum output voltage of voltage regulator |pu (user-selected base voltage)|
|VeMinPu |Minimum exciter output voltage |pu (user-selected base voltage)|
|VfeMaxPu |Maximum exciter field current signal |pu (user-selected base voltage)|
|VhMaxPu |Maximum feedback voltage |pu (user-selected base voltage)|
|VrMaxPu |Maximum field voltage |pu (user-selected base voltage)|
|VrMinPu |Minimum field voltage |pu (user-selected base voltage)|

## Model diagram

![AC6C](AC6C.drawio.svg)

Where the AC rotating exciter model is modelled [here](../AcRotatingExciter/)

## Model variant

In the AC6A model :

- there are no stator current limiter and no overexcitation limiter
- the underexcitation limitation voltage is added to the voltage error
- the lower limit on exciter output voltage is zero

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
