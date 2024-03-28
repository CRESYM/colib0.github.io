---
layout: page
title: Standard governor model
tags: ["Governor", "TGOV1", "generic"]
---
# TGOV1 model

## Context

This governor model has been developed by RTE.

## Model inputs and output

The input variables are the reference mechanical power, the measured angular frequency and the reference angular frequency.

The output signal is the mechanical power PmPu.

## Model parameters

Dt : Turbine damping coefficient
R : Permanent droop
t1 : Steam bowl time constant in s
t2 : Reheater lead time constant in s
t3 : Reheater lag time constant in s
VMax : Maximum valve position
VMin : Minimum valve position
