---
layout: page
title: Standard governor model
tags: ["Governor", "IEEEG2", "generic"]
---
# IEEEG2 model

## Context

This governor model has been developed by RTE.

## Model inputs and output

The input variables are the reference mechanical power, the measured angular frequency and the reference angular frequency.

The output signal is the mechanical power PmPu.

## Model parameters

K : Governor gain (reciprocal of droop)
PMaxPu : Maximum mechanical power in pu (base PNomTurb)
PMinPu : Minimum mechanical power in pu (base PNomTurb)
t1 : Governor mechanism time constant in s
t2 : Turbine power time constant in s
t3 : Turbine exhaust temperature time constant in s
t4 : Governor lead-lag time constant in s
