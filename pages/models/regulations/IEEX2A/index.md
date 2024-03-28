---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "IEEX2A", "generic"]
---
# IEEX2A model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured stator voltage and the reference stator voltage, and possibly the output voltages of the power system stabilizer, the underexcitation limiter and the overexcitation limiter.

The output signal is the excitation voltage EfdPu.

## Model parameters

AEx : Gain of saturation function
BEx : Exponential coefficient of saturation function
EfdMinPu : Minimum excitation voltage in pu (user-selected base voltage)
Ka : Voltage regulator gain
Ke : Exciter field proportional constant
Kf : Exciter rate feedback gain
tA : Voltage regulator time constant in s
tB : Voltage regulator lag time constant in s
tC : Voltage regulator lead time constant in s
tE : Exciter field time constant in s
tF1 : Feedback lead time constant in s
tR : Stator voltage filter time constant in s
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)
