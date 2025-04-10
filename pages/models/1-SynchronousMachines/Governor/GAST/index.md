---
layout: page
title: GAST
tags: ["Governor", "GAST", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "GovGAST", "IEC", "dynawo", "#106"]
date: 05/04/2024
last-updated: 24/05/2024
id: #106
authors: Erwan Guichard (DPS for RTE)
reviewers: Mathilde Bongrain (CRESYM)
---
# GAST model

## Context
This governor is a standard that can apply to gas turbine model. It is a simple representations of a turbine governor control system, developed and introduced as early as the mid-1970s.

This governor model appears under the name GovGAST in the Common Information Model for Dynamics - Standard Models (2012) {% cite CIMStandardModels2012 %} and in the IEC 61970-302:2024 version {% cite IECCIMForDynamics2024 %}.

## Model use, assumptions, validity domain and limitations

This models is considered obsolete and should not be used for representing new generators and applicable existing generators. Most modern digital gas turbine governor control systems employ a proportional-integral (PI) controller that cannot be captured in this model.  In It is unable to model the gas turbine operation accurately when the temperature control loop
 becomes active, and to replicate system oscillations around the final settling frequency. {% cite Nagpal2001 %}

This model is constituted of a simple droop control, constant load limit (rating of turbine), only three time constants (fuel valve response, turbine response, and load limit response), and neglects all aspects of the physics of heavy-duty gas turbines.

NERC {% cite NERC2017 %} and WECC recommends that generator owners and transmission planners to transition to using the GGOV1 model for generating Units currently modeled using these models. It has been removed from the NERC and WECC list of acceptable models.

## Model inputs and output

The input variables are :

| Variable | Description | Units |
|-----------|--------------| ------|
| omegaPu | measured angular frequency | pu (base omegaNom)|
| omegaRefPu | reference angular frequency | pu (base omegaNom)|
| PmRefPu | reference mechanical power | pu (base PNomTurb)|

The output signal is PmPu, the mechanical power in pu (base PNomTurb).

## Model parameters

| Parameter | Description | Units |
|-----------|--------------| ------|
| At |Ambient temperature load limit | pu|
|DTurb |Turbine damping coefficient |pu|
|Kt |Temperature limiter gain |pu|
|R |Permanent droop |pu|
|t1 |Steam bowl time constant |s|
|t2 |Reheater time constant |s|
|t3 |Feedback time constant |s|
|VMax |Maximum valve position |pu|
|VMin |Minimum valve position |pu|

## Model diagram

![GAST](GAST.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 |  |

## References

{% bibliography --cited --file references  %}
