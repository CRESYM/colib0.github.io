---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "ST7C", "generic"]
---
# ST7C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

Kh : High-value gate feedback gain
Kia : Voltage regulator feedback gain
Kl : Low-value gate feedback gain
Kpa : Voltage regulator proportional gain
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
tA : Thyristor bridge firing control equivalent time constant in s
tB : Voltage regulator lag time constant in s
tC : Voltage regulator lead time constant in s
tF : Stator voltage lag time constant in s
tG : Stator voltage lead time constant in s
tIa : Feedback time constant in s
tR : Stator voltage filter time constant in s
VMaxPu : Maximum reference voltage in pu (user-selected base voltage)
VMinPu : Minimum reference voltage in pu (user-selected base voltage)
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model variant

In the ST7B model, the final first order filter is ignored.
