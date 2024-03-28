---
layout: page
title: Standard governor model
tags: ["Governor", "HYGOV", "generic"]
---
# HYGOV model

## Context

This governor model has been developed by RTE.

## Model inputs and output

The input variables are the reference mechanical power, the measured angular frequency and the reference angular frequency.

The output signal is the mechanical power PmPu.

## Model structure

The difference between the measured and reference angular frequency is calculated and subtracted to the reference mechanical power.

The resulting signal then goes through a loop which includes a limiter and a limited PI controller whose output (the power through the valve) is fed back to the beginning of the loop.

The power through the valve is then turned into the turbine output power by hydraulic calculations.

The turbine damping (evaluated from the angular frequency deviation and the power through the valve) is then subtracted from the the turbine output power.

## Model parameters

At : Turbine gain
DTurb : Turbine damping coefficient
FlowNoLoad : No-load water flow at nominal head
HDam : Head available at dam
KDroopPerm : Permanent droop
KDroopTemp : Temporary droop
OpeningGateMax : Maximum gate opening
OpeningGateMin : Minimum gate opening
tF : Filter time constant in s
tG : Gate servomotor time constant in s
tR : Governor time constant in s
tW : Water inertia time constant in s
VelMaxPu : Gate maximum opening/closing velocity in pu/s (base PNomTurb)
