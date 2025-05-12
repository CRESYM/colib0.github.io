---
layout: page
title: DC1C
tags: ["Voltage regulator", DC1C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEDC1C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE DC1C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard versions (1992, 2005), its predecessor model was called DC1A. Compared to DC1A, DC1C has additional options for connecting OEL limits and an additional limit EfdMinPu.

It conludes a DC type rotating exciters's model, which can be self-excited (buck-boost) or separately excited (as discussed in 1981 IEEE Committe Report). This type of rotating exciter's system tend to disapear in new synchronous machines. It includes a DC excitation system model as described in {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

This particular model is used represent field controlled dc commutator exciters with continuously acting voltage regulators (especially direct-acting rheostatic, rotating amplifier, and magnetic amplifier types).
As other standard DC excitation models, it includes the loading effects by using a loaded saturation curve ($$S_E(E_{FD})$$ is the saturation block).
Excitation systems incorporating rotating machines produce a field voltage output ($$E_{FD}$$) which is proportional to the rotating speed of the machine. Since this effect is negligible when speed deviations are small which is the case of dynamic studies of large interconnected power systems, the effect of speed deviations on the output of the dc rotating exciter models is not represented in this latest version of the standard. However, some commercial software may have implemented such speed dependency in their model.

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| UsPu | measured stator voltage | pu (base UNom) |
| UsRefPu | reference stator voltage | pu (base UNom) |
| UOelPu (optional) | output voltage of overexcitation limiter | pu (base UNom) |
| UPssPu (optional) | output voltage of power system stabilizer | pu (base UNom) |
| USclOelPu (optional) | output voltage of stator current overexcitation limiter | pu (base UNom) |
| USclUelPu (optional) | output voltage of stator current underexcitation limiter | pu (base UNom) |
| UUelPu (optional) | output voltage of underexcitation limiter | pu (base UNom) |

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
| AEx | Gain of saturation function | pu |
| BEx | Exponential coefficient of saturation function | - |
| EfdMinPu | Minimum excitation voltage | pu (user-selected base voltage)|
| Ka | Voltage regulator gain | pu |
|Ke | Exciter field proportional constant | pu |
|Kf | Exciter rate feedback gain | pu |
|PositionOel | Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output | -|
|PositionScl | Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output | -|
|PositionUel | Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output | -|
|tA | Voltage regulator time constant | s  |
|tB | Voltage regulator lag time constant | s |
|tC | Voltage regulator lead time constant | s |
|tE | Exciter time constant | s |
|tF | Exciter rate feedback time constant | s |
|tR | Stator voltage filter time constant | s |
|VrMaxPu | Maximum field voltage  | pu (user-selected base voltage) |
|VrMinPu | Minimum field voltage | pu (user-selected base voltage)|

## Model diagram

![DC1C](DC1C.drawio.svg)

## Model variant

In the DC1A model :

- the integrator of the second loop (and its output EfdPu) is not limited
- there are no stator current limiter and no overexcitation limiter

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
