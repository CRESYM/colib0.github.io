---
layout: page
title: Standard voltage regulator model ST6C
tags: ["Voltage regulator", "ST6C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST6C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# Exc IEEE ST6C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called ST6B. Compared to ST6B, ST6C has additional options for connecting OEL and UEL inputs and an additional block with time constant tA.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- IrPu : rotor current in pu (base SNom, user-selected base voltage)
- itPu : complex current at the terminal in pu (base SNom, UNom)
- UsPu : measured stator voltage in pu (base UNom)
- UsRefPu : reference stator voltage in pu (base UNom)
- utPu : complex voltage at the terminal in pu (base UNom)
- UOelPu (optional) : output voltage of overexcitation limiter in pu (base UNom)
- UPssPu (optional) : output voltage of power system stabilizer in pu (base UNom)
- USclOelPu (optional) : output voltage of stator current overexcitation limiter in pu (base UNom)
- USclUelPu (optional) : output voltage of stator current underexcitation limiter in pu (base UNom)
- UUelPu (optional) : output voltage of underexcitation limiter in pu (base UNom)

The output signal is EfdPu, the excitation voltage in pu (user-selected base voltage).

## Model parameters

IlrPu : Exciter output current limit reference in pu (base SNom, user-selected base voltage)
Kc : Rectifier loading factor proportional to commutating reactance, in pu
Kcl : Field current limiter conversion factor in pu
Kff : Feedforward gain of inner loop field regulator in pu
Kg : Feedback gain constant of inner loop field regulator in pu
Ki : Potential circuit (current) gain coefficient in pu
Kia : Integral gain of PI in pu
Klr : Gain of field current limiter in pu
Km : Gain of error of inner loop field regulator in pu
Kp : Potential circuit gain in pu
Kpa : Proportional gain of PI in pu
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output
Sw1 : If true, power source derived from terminal voltage, if false, independent from terminal voltage
tA : Voltage regulator time constant in s
tG : Feedback time constant of inner loop field regulator in s
Thetap : Potential circuit phase angle in rad
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of limited first order in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of limited first order in pu (user-selected base voltage)
VbMaxPu : Maximum available exciter field voltage in pu (base UNom)
VmMaxPu : Maximum output voltage of second PI in pu (user-selected base voltage)
VmMinPu : Minimum output voltage of second PI in pu (user-selected base voltage)
VrMaxPu : Maximum output voltage of first PI in pu (user-selected base voltage)
VrMinPu : Minimum output voltage of first PI in pu (user-selected base voltage)
XlPu : Reactance associated with potential source in pu (base SNom, UNom)

## Model diagram

<img src="/pages/models/regulations/ST6C/ST6C.drawio.svg" alt="ST6C diagram">

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
