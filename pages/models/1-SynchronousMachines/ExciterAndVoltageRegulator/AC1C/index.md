---
layout: page
title: AC1C
tags: ["Voltage regulator", "AC1C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEAC1C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE AC1C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In previous standard versions (1992, 2005), its predecessor model was called AC1A. Compared to AC1A, AC1C has additional options for connecting OEL and UEL inputs and limits on the rotating exciter model.

This model is part of the alternator supplied rectifier excitation systems that use an ac alternator and stationary or rotating rectifies to produce generator field requirements.

## Model use, assumptions, validity domain and limitations

These excitation systems consist of an alternator main exciter feeding its output via non-controlled rectifiers. The exciter does not employ self-excitation, and the voltage regulator power is taken from a source that is not affected by external transients.

It takes into account loading effects. It can't allow the supply of negative field current. It takes into account saturation.

This model is satisfactory for large scale simulations. However, if this model is used to design phase lead networks for power system stabilizers, and the local mode is close to 3 Hz or higher, a more detailed treatment of the ac rotating exciter may be needed.

Excitation systems incorporating rotating machines produce a field voltage output ($$E_{FD}$$) which is proportional to the rotating speed of the machine. Since this effect is negligible when speed deviations are small which is the case of dynamic studies of large interconnected power systems, the effect of speed deviations on the output of the dc rotating exciter models is not represented in this latest version of the standard. However, some commercial software may have implemented such speed dependency in their model.

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| IrPu | rotor current | pu (base SNom, user-selected base voltage) |
| UsPu | measured stator voltage | pu (base UNom) |
| UsRefPu | reference stator voltage | pu (base UNom)|
| UOelPu (optional) | output voltage of overexcitation limiter | pu (base UNom)|
| UPssPu (optional) | output voltage of power system stabilizer | pu (base UNom)|
| USclOelPu (optional) | output voltage of stator current overexcitation limiter | pu (base UNom)|
| USclUelPu (optional) | output voltage of stator current underexcitation limiter | pu (base UNom)|
| UUelPu (optional) | output voltage of underexcitation limiter | pu (base UNom)|

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
| AEx | Gain of saturation function | pu|
| BEx | Exponential coefficient of saturation function| -|
| EfeMaxPu | Maximum exciter field voltage | pu (user-selected base voltage)|
| EfeMinPu | Minimum exciter field voltage | pu (user-selected base voltage)|
| Ka | Voltage regulator gain | pu|
| Kc | Rectifier loading factor proportional to commutating reactance, | pu|
| Kd | Demagnetizing factor, function of exciter alternator reactances | pu|
| Ke | Exciter field resistance constant | pu|
| Kf | Exciter rate feedback gain | pu|
| PositionOel | Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output |-|
| PositionScl | Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output |-|
| PositionUel | Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output |-|
| tA | Voltage regulator time constant | s|
| tB | Voltage regulator lag time constant | s|
| tC | Voltage regulator lead time constant | s|
| tE | Exciter field time constant | s|
| tF | Exciter rate feedback time constant | s|
| TolLi | Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator | pu|
| tR | Stator voltage filter time constant | s|
| VaMaxPu | Maximum output voltage of voltage regulator | pu (user-selected base voltage)|
| VaMinPu | Minimum output voltage of voltage regulator | pu (user-selected base voltage)|
| VeMinPu | Minimum exciter output voltage | pu (user-selected base voltage)|
| VfeMaxPu | Maximum exciter field current signal | pu (user-selected base voltage)|

## Model diagram

![AC1C](AC1C.drawio.svg)

Where the AC rotating exciter model is modelled [here](../AcRotatingExciter/)

## Model variant

In the AC1A model :

- there is no stator current limiter
- the underexcitation and overexcitation limitation voltages apply at the AVR output
- there is no upper limit on the exciter field current
- the lower limit on the exciter output voltage is zero

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
