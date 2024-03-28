---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "AC1C", "generic"]
---
# AC1C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages, the rotor current and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

AEx : Gain of saturation function
BEx : Exponential coefficient of saturation function
EfeMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
EfeMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
Ka : Voltage regulator gain
Kc : Rectifier loading factor proportional to commutating reactance
Kd : Demagnetizing factor, function of exciter alternator reactances
Ke : Exciter field resistance constant
Kf : Exciter rate feedback gain
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
tA : Voltage regulator time constant in s
tB : Voltage regulator lag time constant in s
tC : Voltage regulator lead time constant in s
tE : Exciter field time constant in s
tF : Exciter rate feedback time constant in s
TolLi : Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
VeMinPu : Minimum exciter output voltage in pu (user-selected base voltage)
VfeMaxPu : Maximum exciter field current signal in pu (user-selected base voltage)

## Model variant

In the AC1A model :
- there is no stator current limiter
- the underexcitation and overexcitation limitation voltages apply at the AVR output
- there is no upper limit on the exciter field current
- the lower limit on the exciter output voltage is zero
