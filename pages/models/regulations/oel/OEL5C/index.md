---
layout: page
title: OEL5C
tags: ["Voltage regulator", "OEL5C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#236"]
date: 08/10/2024
last-updated: 09/10/2024
---
# IEEE OEL5C model

## Context

This overexcitation limiter model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

## Model use, assumptions, validity domain and limitations

This model is associated to one of the voltage regulators (types AC, DC, ST) defined by the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

The model provides an overexcitation limiter signal for the purpose of takeover : the overexcitation limiter signal acts as an upper limit on the voltage regulator main signal which then becomes the excitation voltage.

## Model inputs and output

The input signals (in pu) are the exciter field current, and possibly either the generator field current or the generator field voltage.

The output signal is UOelPu, the overexcitation limiter voltage in pu (base UNom).

## Model parameters

| Parameter | Description | Units |
| --------- | ----------- | ----- |
| IBiasPu | OEL reference bias | pu (base UNom) |
| IfdLevelPu | OEL activation logic pickup level | pu |
| IfdLimPu | OEL inverse time limit active level | pu |
| IfdPu | OEL inverse time integrator pickup level | pu |
| IfdRef1Pu | OEL reference 1 | pu |
| IfdRef2Pu | OEL reference 2 | pu |
| K | OEL lead-lag gain | pu |
| K1 | Exponent for inverse time function | - |
| KIfdt | OEL inverse time leak gain | pu |
| KiOel | OEL integral gain | pu |
| KiVfe | Exciter field current regulator integral gain | pu |
| KpOel | OEL proportional gain | pu |
| KpVfe | Exciter field current regulator proportional gain | pu |
| KScale1 | Scale factor for OEL input | pu |
| KScale2 | Scale factor for exciter field current | pu |
| Sw1 | OEL reference logic switch | - |
| tBOel | OEL lag time constant | s |
| tCOel | OEL lead time constant | s |
| tF1 | OEL input transducer time constant | s |
| tF2 | Exciter field current transducer time constant | s |
| tIfdLevel | OEL activation logic timer setpoint | s |
| tOel | OEL inverse time integrator time constant | s |
| TolPI | Tolerance on PI limit crossing as a fraction of the difference between limits | pu |
| VfeMaxPu | Exciter field current regulator upper limit | pu (base UNom) |
| VfeMinPu | Exciter field current regulator lower limit | pu (base UNom) |
| VfeRefPu | Exciter field current reference setpoint | pu (base UNom) |
| VOel1MaxPu | OEL inverse time upper limit | pu |
| VOelMaxPu | OEL PI control upper limit | pu |
| VOelMinPu | OEL PI control lower limit | pu |

## Model diagram

![OEL5C](/pages/models/regulations/oel/OEL5C/OEL5C.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 09/10/2024 |  |

## References

{% bibliography --cited --file references  %}