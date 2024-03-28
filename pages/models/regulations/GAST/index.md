---
layout: page
title: Standard governor model
tags: ["Governor", "GAST", "generic"]
---
# GAST model

## Context

This governor model has been developed by RTE.

## Model inputs and output

The input variables are the reference mechanical power, the measured angular frequency and the reference angular frequency.

The output signal is the mechanical power PmPu.

## Model parameters

At : Ambient temperature load limit
DTurb : Turbine damping coefficient
Kt : Temperature limiter gain
R : Permanent droop
t1 : Steam bowl time constant in s
t2 : Reheater time constant in s
t3 : Feedback time constant in s
VMax : Maximum valve position
VMin : Minimum valve position
