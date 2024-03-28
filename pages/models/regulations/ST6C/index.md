---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "ST6C", "generic"]
---
# ST6C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages, the rotor current, the current and voltage at the terminal and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

IlrPu : Rotor current threshold of field current limiter in pu (base SNom, user-selected base voltage)
Kc : Rectifier loading factor proportional to commutating reactance
Kcl : Field current limiter conversion factor
Kff : Feedforward gain of inner loop field regulator
Kg : Feedback gain constant of inner loop field regulator
Ki : Potential circuit (current) gain coefficient
Kia : Integral gain of PI
Klr : Gain of field current limiter
Km : Gain of error of inner loop field regulator
Kp : Potential circuit gain
Kpa : Proportional gain of PI
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) AVR input summation, (4) take-over at AVR output
Sw1 : If true, power source derived from terminal voltage, if false, independent from terminal voltage
tA : Voltage regulator time constant in s
tG : Feedback time constant of inner loop field regulator in s
Thetap : Potential circuit phase angle in rad
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of limited first order in pu
VaMinPu : Minimum output voltage of limited first order in pu
VbMaxPu : Maximum available exciter field voltage in pu (base UNom)
VmMaxPu : Maximum output voltage of second PI in pu
VmMinPu : Minimum output voltage of second PI in pu
VrMaxPu : Maximum output voltage of first PI in pu
VrMinPu : Minimum output voltage of first PI in pu
XlPu : Reactance associated with potential source in pu (base SNom, UNom)

## Model variant

In the ST6B model :
- the voltage from the underexcitation limiter is applied at the AVR input
- there is no stator current limiter
- the power source is derived from terminal voltage, with no reactance
- there is no first order filter on the feedback signal of the inner loop field regulator
