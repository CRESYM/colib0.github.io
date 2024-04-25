---
layout: page
title: Standard governor model GAST
tags: ["Governor", "GAST", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovGAST", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# GAST model

## Context

This governor model appears under the name GovGAST in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- omegaPu : measured angular frequency in pu (base omegaNom)
- omegaRefPu : reference angular frequency in pu (base omegaNom)
- PmRefPu : reference mechanical power in pu (base PNomTurb)

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

At : Ambient temperature load limit in pu
DTurb : Turbine damping coefficient in pu
Kt : Temperature limiter gain in pu
R : Permanent droop in pu
t1 : Steam bowl time constant in s
t2 : Reheater time constant in s
t3 : Feedback time constant in s
VMax : Maximum valve position in pu
VMin : Minimum valve position in pu

## Model diagram

<img src="/pages/models/regulations/GAST/GAST.drawio.svg" alt="GAST diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
