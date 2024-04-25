---
layout: page
title: Standard voltage regulator model AC8C
tags: ["Voltage regulator", "AC8C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEAC8C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# Exc IEEE AC8C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called AC7B. Compared to AC8B, AC8C has additional options for connecting OEL and UEL inputs, and additional flexibility for the representation of the controlled rectifier power source.

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

AEx : Gain of saturation function in pu
BEx : Exponential coefficient of saturation function
Ka : Voltage regulator gain in pu
Kc : Rectifier loading factor proportional to commutating reactance, in pu
Kc1 : Rectifier loading factor proportional to commutating reactance (exciter), in pu
Kd : Demagnetizing factor, function of exciter alternator reactances, in pu
Kdr : Regulator derivative gain in pu
Ke : Exciter field resistance constant in pu
Kf1 : Generator field voltage feedback gain in pu
Kf2 : Exciter field current feedback gain in pu
Kf3 : Rate feedback gain in pu
Ki : Potential circuit (current) gain coefficient in pu
Kia : Amplifier integral gain in pu
Kir : Regulator integral gain in pu
Kl : Exciter field current limiter gain in pu
Kp : Potential source gain in pu
Kpa : Amplifier proportional gain in pu
Kpr : Regulator proportional gain in pu
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionPss : Input location : (0) none, (1) voltage error summation, (2) after take-over UEL
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
Sw1 : If true, power source derived from terminal voltage, if false, independent from terminal voltage
tA : Voltage regulator time constant in s
tDr : Derivative gain washout time constant in s
tE : Exciter field time constant in s
tF : Rate feedback time constant in s
Thetap : Potential circuit phase angle in rad
TolLi : Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator in pu
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of limited PI in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of limited PI in pu (user-selected base voltage)
VbMaxPu : Maximum available exciter field voltage in pu (base UNom)
VeMinPu : Minimum exciter output voltage in pu (user-selected base voltage)
VfeMaxPu : Maximum exciter field current signal in pu (user-selected base voltage)
VrMaxPu : Maximum output voltage of limited PID in pu (user-selected base voltage)
VrMinPu : Minimum output voltage of limited PID in pu (user-selected base voltage)
XlPu : Reactance associated with potential source in pu (base SNom, UNom)

## Model diagram

<img src="/pages/models/regulations/AC8C/AC8C.drawio.svg" alt="AC8C diagram">

## Model variant

In the AC8B model :

- there are no overexcitation limiter, no underexcitation limiter and no stator current limiter
- the power system stabilizer output voltage is added to the voltage error
- the available exciter field voltage is proportional to the absolute terminal voltage

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
