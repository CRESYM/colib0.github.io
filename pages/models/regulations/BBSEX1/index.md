---
layout: page
title: Standard voltage regulator model
tags: ["Voltage regulator", "BBSEX1", "generic"]
---
# BBSEX1 model

## Context

This voltage regulator model has been developed by RTE.

## Model inputs and output

The input variables are the measured stator voltage and the reference stator voltage, and possibly the output voltages of the power system stabilizer, the underexcitation limiter and the overexcitation limiter.

The output signal is the excitation voltage EfdPu.

## Model parameters

EfdMaxPu : Maximum excitation voltage in pu (user-selected base voltage)
EfdMinPu : Minimum excitation voltage in pu (user-selected base voltage)
K : Voltage regulator gain
t1 : Voltage regulator first time constant in s
t2 : Voltage regulator second time constant in s
t3 : Voltage regulator lead time constant in s
t4 : Voltage regulator lag time constant in s
tR : Stator voltage filter time constant in s
VrMaxPu : Maximum output voltage of voltage regulator in pu (user-selected base voltage)
VrMinPu : Minimum output voltage of voltage regulator in pu (user-selected base voltage)
