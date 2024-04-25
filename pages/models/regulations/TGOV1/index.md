---
layout: page
title: Standard governor model TGOV1
tags: ["Governor", "TGOV1", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovSteam0", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# TGOV1 model

## Context

This governor model appears under the name GovSteam0 in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- omegaPu : measured angular frequency in pu (base omegaNom)
- omegaRefPu : reference angular frequency in pu (base omegaNom)
- PmRefPu : reference mechanical power in pu (base PNomTurb)

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

Dt : Turbine damping coefficient in pu
R : Permanent droop in pu
t1 : Steam bowl time constant in s
t2 : Reheater lead time constant in s
t3 : Reheater lag time constant in s
VMax : Maximum valve position in pu
VMin : Minimum valve position in pu

## Model diagram

<img src="/pages/models/regulations/TGOV1/TGOV1.drawio.svg" alt="TGOV1 diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
