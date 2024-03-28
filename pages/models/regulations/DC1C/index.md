---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "DC1C", "generic"]
---
# DC1C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

AEx : Gain of saturation function
BEx : Exponential coefficient of saturation function
EfdMinPu : Minimum excitation voltage in pu (user-selected base voltage)
Ka : Voltage regulator gain
Ke : Exciter field proportional constant
Kf : Exciter rate feedback gain
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR output
tA : Voltage regulator time constant in s
tB : Voltage regulator lag time constant in s
tC : Voltage regulator lead time constant in s
tE : Exciter time constant in s
tF : Exciter rate feedback time constant in s
tR : Stator voltage filter time constant in s
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model variant

In the DC1A model :
- the integrator of the second loop (and its output EfdPu) is not limited
- there are no stator current limiter and no overexcitation limiter 
