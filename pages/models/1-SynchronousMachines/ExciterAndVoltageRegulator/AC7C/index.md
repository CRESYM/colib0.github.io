---
layout: page
title: AC7C
tags: ["Voltage regulator", "AC7C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "ExcIEEEAC7C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# Exc IEEE AC7C model

## Context

This model consist of an ac alternator with either stationary or rotating rectifiers to produce the dc field requirements.Upgrades to earlier ac excitation systems, which replace only the controls but retain the ac alternator and diode rectifier bridge, have resulted in this new model.

This voltage regulator model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In the previous standard version (2005), its predecessor model was called AC7B. Compared to AC7B, AC7C has additional options for connecting OEL and UEL inputs, and additional flexibility for the representation of the controlled rectifier power source.

## Model use, assumptions, validity domain and limitations

It takes into account loading effects. It can't allow the supply of negative field current. It takes into account saturation.

This model is satisfactory for large scale simulations. However, if this model is used to design phase lead networks for power system stabilizers, and the local mode is close to 3 Hz or higher, a more detailed treatment of the ac rotating exciter may be needed.

Excitation systems incorporating rotating machines produce a field voltage output ($$E_{FD}$$) which is proportional to the rotating speed of the machine. Since this effect is negligible when speed deviations are small which is the case of dynamic studies of large interconnected power systems, the effect of speed deviations on the output of the dc rotating exciter models is not represented in this latest version of the standard. However, some commercial software may have implemented such speed dependency in their model.

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|IrPu | rotor current | pu (base SNom, user-selected base voltage)|
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
AEx |Gain of saturation function |pu|
BEx |Exponential coefficient of saturation function|
Kc |Rectifier loading factor proportional to commutating reactance, |pu|
Kc1 |Rectifier loading factor proportional to commutating reactance (exciter), |pu|
Kd |Demagnetizing factor, function of exciter alternator reactances, |pu|
Kdr |Regulator derivative gain|pu|
Ke |Exciter field resistance constant |pu|
Kf1 |Generator field voltage feedback gain|pu|
Kf2 |Exciter field current feedback gain|pu|
Kf3 |Rate feedback gain|pu|
Ki |Potential circuit (current) gaincoefficient |pu|
Kia |Amplifier integral gain|pu|
Kir |Regulator integral gain|pu|
Kl |Exciter field current limiter gain|pu|
Kp |Potential source gain|pu|
Kpa |Amplifier proportional gain|pu|
Kpr |Regulator proportional gain|pu|
Kr |Field voltage feedback gain|pu|
PositionOel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output, (4) take-over at inner loop regulator output|-|
PositionPss |Input location : (0) none, (1) voltage error summation, (2) after take-over UEL|-|
PositionScl |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
PositionUel |Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output|-|
Sw1 |If true, power source derived from terminal voltage, if false, independent from terminal voltage|-|
Sw2 |If true, power source derived from available exciter field voltage, if false, from rotating exciter output voltage|-|
tDr |Derivative gainwashout time constant |s|
tE |Exciter field time constant |s|
tF |Rate feedback time constant |s|
Thetap |Potential circuit phase angle |rad|
TolLi |Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator |pu|
tR |Stator voltage filter time constant |s|
VaMaxPu |Maximum output voltage of limited PI |pu (user-selected base voltage)|
VaMinPu |Minimum output voltage of limited PI |pu (user-selected base voltage)|
VbMaxPu |Maximum available exciter field voltage |pu (base UNom)|
VeMinPu |Minimum exciter output voltage |pu (user-selected base voltage)|
VfeMaxPu |Maximum exciter field current signal |pu (user-selected base voltage)|
VrMaxPu |Maximum output voltage of limited PID |pu (user-selected base voltage)|
VrMinPu |Minimum output voltage of limited PID |pu (user-selected base voltage)|
XlPu |Reactance associated with potential source |pu (base SNom, UNom)|

## Model diagram

![AC7C](AC7C.drawio.svg)

Where the AC rotating exciter model is modelled [here](..\AcRotatingExciter/)

## Model variant

In the AC7B model :

- there are no overexcitation limiter and no stator current limiter
- the power system stabilizer and the underexcitation limiter output voltages are added to the voltage error
- the available exciter field voltage is proportional to the absolute terminal voltage

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
