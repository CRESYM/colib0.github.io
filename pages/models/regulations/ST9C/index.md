---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "ST9C", "generic"]
---
# ST9C model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages, the rotor current, the current and voltage at the terminal and possibly the output voltages of the power system stabilizer, the underexcitation limiter, the overexcitation limiter and the stator current underexcitation and overexcitation limiters.

The output signal is the excitation voltage EfdPu.

## Model parameters

Ka : Voltage regulator gain
Kas : Power converter gain proportional to supply voltage
Kc : Rectifier loading factor proportional to commutating reactance
Ki : Potential circuit (current) gain coefficient
Kp : Potential circuit gain
Ku : Gain associated with activation of takeover underexcitation limiter
PositionOel : Input location : (0) none, (1) voltage error summation, (2) take-over
PositionScl : Input location : (0) none, (1) voltage error summation, (2) take-over
PositionUel : Input location : (0) none, (1) voltage error summation, (2) take-over
Sw1 : If true, power source derived from terminal voltage, if false, independent from terminal voltage
tA : Voltage regulator time constant in s
tAs : Equivalent time constant of power converter firing control in s
tAUel : Time constant of underexcitation limiter in s
tBd : Filter time constant of differential part of voltage regulator in s
tCd : Time constant of differential part of voltage regulator in s
Thetap : Potential circuit phase angle in rad
tR : Stator voltage filter time constant in s
VaMaxPu : Maximum output voltage of limited first order in pu
VaMinPu : Minimum output voltage of limited first order in pu
VbMaxPu : Maximum available exciter field voltage in pu (base UNom)
VrMaxPu : Maximum field voltage in pu (user-selected base voltage)
VrMinPu : Minimum field voltage in pu (user-selected base voltage)
XlPu : Reactance associated with potential source in pu (base SNom, UNom)
Za : Dead-band for differential part influence on voltage regulator
