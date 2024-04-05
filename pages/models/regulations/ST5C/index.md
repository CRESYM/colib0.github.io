---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "ST5C", "generic"]
---
# ST5C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured stator voltage and the reference stator voltage, the rotor current, the output voltage of the power system stabilizer and possibly the output voltages of the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

Kc : Rectifier loading factor proportional to commutating reactance
Kr : Gain of voltage after overexcitation and underexcitation limitations
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input
t1 : Inverse timing current constant in s
tB1 : Second lag time constant in s
tB2 : First lag time constant in s
tC1 : Second lead time constant in s
tC2 : First lead time constant in s
tOB1 : Second lag time constant (overexcitation limitation) in s
tOB2 : First lag time constant (overexcitation limitation) in s
tOC1 : Second lead time constant (overexcitation limitation) in s
tOC2 : First lead time constant (overexcitation limitation) in s
tR : Stator voltage filter time constant in s
tUB1 : Second lag time constant (underexcitation limitation) in s
tUB2 : First lag time constant (underexcitation limitation) in s
tUC1 : Second lead time constant (underexcitation limitation) in s
tUC2 : First lead time constant (underexcitation limitation) in s
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model variant

In the ST5B model :
- the overexcitation and underexcitation limitation voltages are applied at the AVR input
- there is no stator current limiter
