---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "AC7C", "generic"]
---
# AC7C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages, the rotor current, the current and voltage at the terminal and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

AEx : Gain of saturation function
BEx : Exponential coefficient of saturation function
Kc : Rectifier loading factor proportional to commutating reactance
Kc1 : Rectifier loading factor proportional to commutating reactance (exciter)
Kd : Exciter internal reactance
Kdr : Regulator derivative gain
Ke : Exciter field resistance constant
Kf1 : Generator field voltage feedback gain
Kf2 : Exciter field current feedback gain
Kf3 : Rate feedback gain
Ki : Potential circuit (current) gain coefficient
Kia : Amplifier integral gain
Kir : Regulator integral gain
Kl : Exciter field current limiter gain
Kp : Potential source gain
Kpa : Amplifier proportional gain
Kpr : Regulator proportional gain
Kr : Field voltage feedback gain
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output, (4) take-over at inner loop regulator output
PositionPss : Input location : (0) none, (1) voltage error summation, (2) after take-over UEL
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over at AVR input, (3) take-over at AVR output
Sw1 : If true, power source derived from terminal voltage, if false, independent from terminal voltage
Sw2 : If true, power source derived from available exciter field voltage, if false, from rotating exciter output voltage
tDr : Derivative gain washout time constant in s
tE : Exciter field time constant in s
tF : Rate feedback time constant in s
Thetap : Potential circuit phase angle in rad
TolLi : Tolerance on limit crossing as a fraction of the difference between initial limits of limited integrator
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of limited PI in pu (user-selected base voltage)
VaMinPu : Minimum output voltage of limited PI in pu (user-selected base voltage)
VbMaxPu : Maximum available exciter field voltage in pu (base UNom)
VeMinPu : Minimum exciter output voltage in pu (user-selected base voltage)
VfeMaxPu : Maximum exciter field current signal in pu (user-selected base voltage)
VrMaxPu : Maximum output voltage of limited PID in pu (user-selected base voltage)
VrMinPu : Minimum output voltage of limited PID in pu (user-selected base voltage)
XlPu : Reactance associated with potential source in pu (base SNom, UNom)

## Model variant

In the AC7B model :
- there are no overexcitation limiter and no stator current limiter
- the power system stabilizer and the underexcitation limiter output voltages are added to the voltage error
- the available exciter field voltage is proportional to the absolute terminal voltage
