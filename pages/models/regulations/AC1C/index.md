---
layout: page
title: Standard voltage regulator model AC1C
tags: ["Voltage regulator", "AC1C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4","Single phase", "ExcIEEEAC1C", "IEEE", "dynawo", "#106"]
date: 05/04/2024
last-updated: 23/04/2024
---
# Exc IEEE AC1C model

## Context

This voltage regulator model firstly appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}. It has been reproduced identically in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.
In previous standard versions (2005, 1992), the model was slightly different and was called AC1A. In 2016, additional options for connecting OEL and UEL inputs and limits on the rotating exciter model were added.

## Model use, assumptions, validity domain and limitations

to be completed

## Model inputs and outputs

The input variables are the measured and reference stator voltages, the rotor current and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

- AEx : Gain of saturation function
- BEx : Exponential coefficient of saturation function
- EfeMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
- EfeMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
- Ka : Voltage regulator gain
- Kc : Rectifier loading factor proportional to commutating reactance
- Kd : Demagnetizing factor, function of exciter alternator reactances
- Ke : Exciter field resistance constant
- Kf : Exciter rate feedback gain
- PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
- PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
- PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
- tA : Voltage regulator time constant in s
- tB : Voltage regulator lag time constant in s
- tC : Voltage regulator lead time constant in s
- tE : Exciter field time constant in s
- tF : Exciter rate feedback time constant in s
- TolLi : Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator
- tR : Stator voltage filter time constant in s
- VaMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
- VaMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
- VeMinPu : Minimum exciter output voltage in pu (user-selected base voltage)
- VfeMaxPu : Maximum exciter field current signal in pu (user-selected base voltage)

## Model diagram

<img src="/pages/models/regulations/AC1C/AC1C.drawio.svg" alt="AC1C diagram">

## Model variant

In the AC1A model :

- there is no stator current limiter
- the underexcitation and overexcitation limitation voltages apply at the AVR output
- there is no upper limit on the exciter field current
- the lower limit on the exciter output voltage is zero

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| Software name | [Link](https://github.com/toto) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | XX/0X/20XX | Comments can contain implementations details such as validation means, implementations key choices, etc. |

## References

{% bibliography --cited --file references  %}