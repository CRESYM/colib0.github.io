---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "AC6C", "generic"]
---
# AC6C model

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
Kd : Exciter internal reactance
Ke : Exciter field resistance constant
Kh : Exciter field current feedback gain
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
tA : First lag time constant in s
tB : Second lag time constant in s
tC : Second lead time constant in s
tE : Exciter field time constant in s
tH : Feedback lag time constant in s
tJ : Feedback lead time constant in s
tK : First lead time constant in s
TolLi : Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator
tR : Stator voltage filter time constant in s
VfeLimPu : Threshold of field current signal for feedback in pu (user-selected base voltage)
VaMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
VeMinPu : Minimum exciter output voltage in pu (user-selected base voltage)
VfeMaxPu : Maximum exciter field current signal in pu (user-selected base voltage)
VhMaxPu : Maximum feedback voltage in pu (user-selected base voltage)
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model variant

In the AC6A model :
- there are no stator current limiter and no overexcitation limiter
- the underexcitation limitation voltage is added to the voltage error
- the lower limit on exciter output voltage is zero
