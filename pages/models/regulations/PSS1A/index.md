---
layout: page
title: Standard power system stabilizer model
tags: ["PSS", "PSS1A", "generic"]
---
# PSS1A model

## Context

This power system stabilizer (PSS) model has been developed by RTE.

## Model input and output

This PSS takes as input either the active power PGenPu or the angular frequency omegaPu.

The output signal VPssPu is sent to a voltage regulator.

## Model parameters

A1 : First coefficient of notch filter in s
A2 : Second coefficient of notch filter in s ^ 2
Ks : Gain of power system stabilizer
t1 : First lead time constant in s
t2 : First lag time constant in s
t4 : Second lag time constant in s
t5 : Washout time constant in s
t6 : Transducer time constant in s
VPssMaxPu : Maximum voltage output of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum voltage output of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA (only if PGenPu is the input signal)
