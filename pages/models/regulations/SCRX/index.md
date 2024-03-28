---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "SCRX", "generic"]
---
# SCRX model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured and reference stator voltages, the rotor current and possibly the output voltages of the power system stabilizer, the underexcitation limiter and the overexcitation limiter.

The output signal is the excitation voltage EfdPu.

## Model parameters

CSwitch : If true, exciter is solid-fed, if false, exciter is bus-fed
IrThresholdOn : If true, rotor current threshold applies
K : Voltage regulator gain
RcToRfd : Ratio of field discharge resistance to field winding resistance
tA : Transient gain reduction lead time constant in s
tB : Transient gain reduction lag time constant in s
tE : Voltage regulator time constant in s
VrMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
VrMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
