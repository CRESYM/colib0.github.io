---
layout: page
title: Standard governor model HYGOV
tags: ["Governor", "HYGOV", "generic", "Opensource", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# HYGOV model

## Context

This governor model has been developed by RTE.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- omegaPu : measured angular frequency in pu (base omegaNom)
- omegaRefPu : reference angular frequency in pu (base omegaNom)
- PmRefPu : reference mechanical power in pu (base PNomTurb)

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

At : Turbine gain in pu
DTurb : Turbine damping coefficient in pu
FlowNoLoad : No-load water flow at nominal head in pu
HDam : Head available at dam in pu
KDroopPerm : Permanent droop in pu
KDroopTemp : Temporary droop in pu
OpeningGateMax : Maximum gate opening in pu
OpeningGateMin : Minimum gate opening in pu
tF : Filter time constant in s
tG : Gate servomotor time constant in s
tR : Governor time constant in s
tW : Water inertia time constant in s
VelMaxPu : Gate maximum opening/closing velocity in pu/s (base PNomTurb)

## Model diagram

<img src="/pages/models/regulations/HYGOV/HYGOV.drawio.svg" alt="HYGOV diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
