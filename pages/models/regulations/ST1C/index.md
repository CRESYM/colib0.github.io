---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "ST1C", "generic"]
---
# ST1C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured stator voltage and the reference stator voltage, the rotor current and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

IlrPu : Rotor current threshold of field current limiter in pu (base SNom, user-selected base voltage)
Ka : Voltage regulator gain
Kc : Rectifier loading factor proportional to commutating reactance
Kf : Exciter rate feedback gain
Klr : Gain of field current limiter
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionPss : Input location : (0) none, (1) voltage error summation, (2) summation at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
tA : Voltage regulator time constant in s
tB : Voltage regulator lag time constant in s
tB1 : Voltage regulator second lag time constant in s
tC : Voltage regulator lead time constant in s
tC1 : Voltage regulator second lead time constant in s
tF : Exciter rate feedback time constant in s
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
ViMaxPu : Maximum input voltage of voltage regulator in pu (user-selected base voltage)
ViMinPu : Minimum input voltage of voltage regulator in pu (user-selected base voltage)
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)

## Model variant

In the ST1A model :
- the overexcitation limiter voltage is applied at the AVR output
- there is no stator current limiter
