---
layout: page
title: IEEEG1 / GovSteam 1
tags: ["Governor", "IEEEG1", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovSteam1", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# IEEEG1 model / GovSteam 1

## Context

This governor was initially developed and described in {% cite IEEEWGPrimeMover1973 %}. It is oftenly combined with the LCFBA model which is a simple representation of an outer-loop MW controller.

This governor model appears under the name GovSteam1 in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

 It includes the rate limits on the main control valve (Uo and Uc) as well as four steam‐stages and the ability to model cross‐compound Units.
 There are a number of key assumptions behind this model:

- steam pressure and temperature remain constant under all conditions,
- the unit is in boiler‐follow control mode – that is, the main steam control valve (MCV) is used primarily for regulating power and the boiler follows the turbine in producing additional steam as needed, and
- there is essentially an unlimited source of steam from the boiler to be provided once the main steam control valve opens.
These assumptions are quite simplistic and not truly indicative of the physics of a steam turbine. However, it can be true for many steam turbines such as  boiler‐follow control.

 As stated in {%cite PESTR12013 %}, it has been been shown that this model in combination with LCBF1 is effective in capturing the behavior of large steam turbine generators that are operated on outer‐loop MW control. It applicable for large interconnected grid simulations when looking at relatively small frequency deviations, that is, in the range of +/‐ 0.5% change in frequency.  The LCBF1 model is needed only in cases where there is a active secondary outer‐loop MW controller in the plant.

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
|omegaPu | measured angular frequency |pu (base omegaNom)|
|omegaRefPu |reference angular frequency |pu (base omegaNom)|
|PmRefPu |reference mechanical power |pu (base PNomTurb)|

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

| Variable | Description | Units |
|-----------|--------------| ------|
|K |Governor gain (reciprocal of droop) |pu|
|K1 |Fraction of HP shaft power after first boiler pass|-|
|K2 |Fraction of LP shaft power after first boiler pass|-|
|K3 |Fraction of HP shaft power after second boiler pass|-|
|K4 |Fraction of LP shaft power after second boiler pass|-|
|K5 |Fraction of HP shaft power after third boiler pass|-|
|K6 |Fraction of LP shaft power after third boiler pass|-|
|K7 |Fraction of HP shaft power after fourth boiler pass|-|
|K8 |Fraction of LP shaft power after fourth boiler pass|-|
|PMaxPu |Power output of boiler at maximum valve opening |pu (base PNomTurb)|
|PMinPu |Power output of boiler at minimum valve opening |pu (base PNomTurb)|
|t1 |Governor lag time constant |s|
|t2 |Governor lead time constant |s|
|t3 |Valve positioner time constant |s|
|t4 |HP bowl time constant |s|
|t5 |Reheater time constant |s|
|t6 |Crossover time constant |s|
|t7 |Double reheat time constant |s|
|Uc |Maximum valve closing velocity |pu/s (base PNomTurb)|
|Uo |Maximum valve opening velocity |pu/s (base PNomTurb)|

## Model diagram

![IEEEG1](IEEEG1.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
