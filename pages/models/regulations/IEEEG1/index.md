---
layout: page
title: Standard governor model
tags: ["Governor", "IEEEG1", "generic"]
---
# IEEEG1 model

## Context

This governor model has been developed by RTE.

## Model inputs and output

The input variables are the reference mechanical power, the measured angular frequency and the reference angular frequency.

The output signal is the mechanical power PmPu.

## Model parameters

K : Governor gain (reciprocal of droop)
K1 : Fraction of HP shaft power after first boiler pass
K2 : Fraction of LP shaft power after first boiler pass
K3 : Fraction of HP shaft power after second boiler pass
K4 : Fraction of LP shaft power after second boiler pass
K5 : Fraction of HP shaft power after third boiler pass
K6 : Fraction of LP shaft power after third boiler pass
K7 : Fraction of HP shaft power after fourth boiler pass
K8 : Fraction of LP shaft power after fourth boiler pass
PMaxPu : Power output of boiler at maximum valve opening in pu (base PNomTurb)
PMinPu : Power output of boiler at minimum valve opening in pu (base PNomTurb)
t1 : Governor lag time constant in s
t2 : Governor lead time constant in s
t3 : Valve positioner time constant in s
t4 : HP bowl time constant in s
t5 : Reheater time constant in s
t6 : Crossover time constant in s
t7 : Double reheat time constant in s
Uc : Maximum valve closing velocity in pu/s (base PNomTurb)
Uo : Maximum valve opening velocity in pu/s (base PNomTurb)
