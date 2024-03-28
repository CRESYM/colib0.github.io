---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "ST4C", "generic"]
---
# ST4C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages, the rotor current, the current and voltage at the terminal and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

Kc : Rectifier loading factor proportional to commutating reactance
Kg : Feedback gain of inner loop field regulator
Ki : Potential circuit (current) gain coefficient
Kim : Integral gain of second PI
Kir : Integral gain of first PI
Kp : Potential circuit gain
Kpm : Proportional gain of second PI
Kpr : Proportional gain of first PI
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at inner loop output
PositionPss : Input location : (0) none, (1) voltage error summation, (2) after take-over UEL
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at inner loop output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at inner loop output
Sw1 : If true, power source derived from terminal voltage, if false, independent from terminal voltage
tA : Voltage regulator time constant in s
tG : Feedback time constant of inner loop field regulator in s
Thetap : Potential circuit phase angle in rad
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of limited first order in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of limited first order in pu (user-selected base voltage)
VbMaxPu : Maximum available exciter field voltage in pu (base UNom)
VgMaxPu : Maximum feedback voltage of inner loop field regulator in pu (user-selected base voltage)
VmMaxPu : Maximum output voltage of second PI in pu (user-selected base voltage)
VmMinPu : Minimum output voltage of second PI in pu (user-selected base voltage)
VrMaxPu : Maximum output voltage of first PI in pu (user-selected base voltage)
VrMinPu : Minimum output voltage of first PI in pu (user-selected base voltage)
XlPu : Reactance associated with potential source in pu (base SNom, UNom)

## Model variant

In the ST4B model :
- the overexcitation limiter voltage is applied in the inner loop field regulator
- the voltages from the underexcitation limiter and the power system stabilizer are added to the voltage error
- there is no stator current limiter
- the power source is derived from terminal voltage
- there are no first order filter and no upper limit for the feedback signal of the inner loop field regulator
