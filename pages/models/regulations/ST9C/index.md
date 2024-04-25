---
layout: page
title: Standard voltage regulator model ST9C
tags: ["Voltage regulator", "ST9C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEST9C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# Exc IEEE ST9C model

## Context

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

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

Ka : Voltage regulator gain in pu
Kas : Power converter gain proportional to supply voltage, in pu
Kc : Rectifier loading factor proportional to commutating reactance, in pu
Ki : Potential circuit (current) gain coefficient in pu
Kp : Potential circuit gain in pu
Ku : Gain associated with activation of takeover UEL, in pu
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over
Sw1 : If true, power source derived from terminal voltage, if false, independent from terminal voltage
tA : Voltage regulator time constant in s
tAs : Equivalent time constant of power converter firing control in s
tAUel : Time constant of underexcitation limiter in s
tBd : Filter time constant of differential part of voltage regulator in s
tCd : Time constant of differential part of voltage regulator in s
Thetap : Potential circuit phase angle in rad
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of limited first order in pu
VaMinPu : Minimum output voltage of limited first order in pu
VbMaxPu : Maximum available exciter field voltage in pu (base UNom)
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)
XlPu : Reactance associated with potential source in pu (base SNom, UNom)
ZaPu : Dead-band for differential part influence on voltage regulator in pu (base UNom)

## Model diagram

<img src="/pages/models/regulations/ST9C/ST9C.drawio.svg" alt="ST9C diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
