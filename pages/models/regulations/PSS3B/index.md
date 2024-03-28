---
layout: page
title: Standard power system stabilizer model
tags: ["PSS", "PSS3B", "generic"]
---
# PSS3B model

## Context

This power system stabilizer (PSS) model has been developed by RTE.

## Model inputs and output

This PSS takes as input the active power PGenPu, the angular frequency omegaPu and the reference angular frequency omegaRefPu.

The output signal VPssPu is sent to a voltage regulator.

## Model parameters

A1 : First numerator coefficient of first notch filter in s
A2 : Second numerator coefficient of first notch filter in s ^ 2
A3 : First denominator coefficient of first notch filter in s
A4 : Second denominator coefficient of first notch filter in s ^ 2
A5 : First numerator coefficient of second notch filter in s
A6 : Second numerator coefficient of second notch filter in s ^ 2
A7 : First denominator coefficient of second notch filter in s
A8 : Second denominator coefficient of second notch filter in s ^ 2
KOmega : Coefficient applied to angular frequency
KOmegaRef : Coefficient applied to reference angular frequency
Ks1 : Gain of active power branch
Ks2 : Gain of angular frequency branch
t1 : Transducer time constant (active power branch) in s
t2 : Transducer time constant (angular frequency branch) in s
tW1 : Washout time constant (active power branch) in s
tW2 : Washout time constant (angular frequency branch) in s
tW3 : Washout time constant (main branch) in s
VPssMaxPu : Maximum voltage output of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum voltage output of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA

