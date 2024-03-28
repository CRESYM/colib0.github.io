---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator submodel", "AcRotatingExciter", "generic"]
---
# AcRotatingExciter model

## Context

This model is included in several voltage regulator models developed by RTE.

## Model inputs and outputs

The input variables are the rotor current IrPu and the output voltage of the voltage regulator EfePu.

The output variables are the excitation voltage EfdPu and the field current signal VfePu.

## Model parameters

AEx : Gain of saturation function
BEx : Exponential coefficient of saturation function
Kc : Rectifier loading factor proportional to commutating reactance
Kd : Demagnetizing factor, function of exciter alternator reactances
Ke : Exciter field resistance constant
tE : Exciter field time constant in s
TolLi : Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator
VeMinPu : Minimum exciter output voltage in pu (user-selected base voltage)
VfeMaxPu : Maximum exciter field current signal in pu (user-selected base voltage)
