---
layout: page
title: Standard governor model IEEEG1
tags: ["Governor", "IEEEG1", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovSteam1", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
---
# IEEEG1 model

## Context

This governor model appears under the name GovSteam1 in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

To be completed

## Model inputs and output

The input variables are :

- omegaPu : measured angular frequency in pu (base omegaNom)
- omegaRefPu : reference angular frequency in pu (base omegaNom)
- PmRefPu : reference mechanical power in pu (base PNomTurb)

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

K : Governor gain (reciprocal of droop) in pu
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

## Model diagram

<img src="/pages/models/regulations/IEEEG1/IEEEG1.drawio.svg" alt="IEEEG1 diagram">

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
