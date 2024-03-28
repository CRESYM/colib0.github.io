---
layout: page
title: Standard governor model
tags: ["Governor", "TGOV3", "generic"]
---
# TGOV3 model

## Context

This governor model has been developed by RTE.

## Model inputs and output

The input variables are the reference mechanical power, the measured angular frequency and the reference angular frequency. A fast valving Boolean signal can be included.

The output signal is the mechanical power PmPu.

## Model parameters

K : Governor gain (reciprocal of droop)
K1 : Fraction of HP shaft power after first boiler pass
K2 : Fraction of LP shaft power after first boiler pass
K3 : Fraction of HP shaft power after second boiler pass
PMaxPu : Maximum valve opening in pu (base PNomTurb)
PMinPu : Minimum valve opening in pu (base PNomTurb)
PrMaxPu : Maximum pressure in reheater in pu (base PNomTurb)
t1 : Governor lag time constant in s
t2 : Governor lead time constant in s
t3 : Valve positioner time constant in s
t4 : Inlet piping / steam bowl time constant in s
t5 : Time constant of second boiler pass (reheater) in s
t6 : Time constant of crossover of third boiler pass in s
tA : Time to close intercept valve in s
tB : Time until intercept valve starts to reopen in s
tC : Time until intercept valve is fully open in s
Uo : Maximum valve opening velocity in pu/s
Uc : Maximum valve closing velocity in pu/s
