---
layout: page
title: HYGOV
tags: ["Governor", "HYGOV", "generic", "Opensource", "dynawo", "#106", "WEHGOV", "WPIDHY"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---

## Context

This governor model is a standard hydro turbine governor model. It represents a straightforward hydroelectric plant governor, with a simple hydraulic representation of the penstock with unrestricted head race and tail race, and no surge tank. {% cite PESTR12013 %}
It is one of the most commonly used model in the present North American system databases.

## Model use, assumptions, validity domain and limitations

This model is suitable for power system planning studies where the controls are known to be of the mechanical hydraulic type.

Linear models of a hydro penstock and water column should not be used for general power system studies. For some facilities, a travelling wave model may be necessary to correctly model dynamic behavior. Use of simpler models that do not accurately capture dynamic performance in the 0.1 Hz to 1 Hz frequency range can lead to errors in stability studies where inter‐area oscillations are a concern. Inclusion of nonlinear effects in hydro models is necessary for system frequency regulation studies.

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| omegaPu | measured angular frequency |pu (base omegaNom)|
| omegaRefPu | reference angular frequency |pu (base omegaNom)|
| PmRefPu | reference mechanical power |pu (base PNomTurb)|

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

|At |Turbine gain|pu
|DTurb |Turbine damping coefficient |pu|
|FlowNoLoad |No-load water flow at nominal head |pu|
|HDam |Head available at dam |pu|
|KDroopPerm |Permanent droop |pu|
|KDroopTemp |Temporary droop |pu|
|OpeningGateMax |Maximum gate opening |pu|
|OpeningGateMin|Minimum gate opening |pu|
|tF |Filter time constant |s|
|tG |Gate servomotor time constant |s|
|tR |Governor time constant |s|
|tW |Water inertia time constant |s|
|VelMaxPu |Gate maximum opening/closing velocity |pu/s (base PNomTurb)|

## Model diagram

![HYGOV](HYGOV.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
