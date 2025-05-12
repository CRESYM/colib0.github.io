---
layout: page
title: OEL5C
tags: ["Voltage regulator", "OEL5C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#236"]
date: 08/10/2024
last-updated: 09/10/2024
id: #236
authors: Erwan Guichard (DPS for RTE)
reviewers: Lampros Papangelis (CRESYM)
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

| Parameter | Description | Unit | Value (set 1) | Value (set 2) | Value (set 3) |
| --------- | ----------- | ---- | ------------- | ------------- | ------------- |
| IBiasPu | OEL reference bias | pu (base UNom) | 1 | 1 | 2.15 |
| IfdLevelPu | OEL activation logic pickup level | pu | 1.4 | 1.4 | 1.4 |
| IfdLimPu | OEL inverse time limit active level | pu | 6.58 | 6.58 | 6.58 |
| IfdPu | OEL inverse time integrator pickup level | pu | 1.02 | 1.02 | 1.02 |
| IfdRef1Pu | OEL reference 1 | pu | 1.25 | 1.25 | 1.25 |
| IfdRef2Pu | OEL reference 2 | pu | 1 | 1 | 1 |
| K | OEL lead-lag gain | pu | 1 | 1 | 0 |
| K1 | Exponent for inverse time function | - | 1 | 1 | 1 |
| KIfdt | OEL inverse time leak gain | pu | 0.0043 | 0.0043 | 0.0043 |
| KiOel | OEL integral gain | pu | 17.36 | 8.94 | 0 |
| KiVfe | Exciter field current regulator integral gain | pu | 0 | 169.1 | 0 |
| KpOel | OEL proportional gain | pu | 0.46 | 2.861 | 1.0753 |
| KpVfe | Exciter field current regulator proportional gain | pu | 0 | 1.522 | 0 |
| KScale1 | Scale factor for OEL input | pu | 0.295 | 0.3503 | 0.2296 |
| KScale2 | Scale factor for exciter field current | pu | 0 | 0.2317 | 0 |
| Sw1 | OEL reference logic switch | - | true | false | true |
| tBOel | OEL lag time constant | s | 0 | 0.32 | 0 |
| tCOel | OEL lead time constant | s | 0 | 0.9 | 0 |
| tF1 | OEL input transducer time constant | s | 0 | 0 | 1.22 |
| tF2 | Exciter field current transducer time constant | s | 0 | 0 | 0 |
| tIfdLevel | OEL activation logic timer setpoint | s | 1 | 1 | 1 |
| tOel | OEL inverse time integrator time constant | s | 1 | 1 | 1 |
| TolPI | Tolerance on PI limit crossing as a fraction of the difference between limits | pu | - | - | - |
| VfeMaxPu | Exciter field current regulator upper limit | pu (base UNom) | 1 | 1 | 1 |
| VfeMinPu | Exciter field current regulator lower limit | pu (base UNom) | -0.99 | -0.99 | -0.99 |
| VfeRefPu | Exciter field current reference setpoint | pu (base UNom) | 0 | 2.151 | 0 |
| VOel1MaxPu | OEL inverse time upper limit | pu | 9.49 | 9.49 | 9.49 |
| VOelMaxPu | OEL PI control upper limit | pu | 1 | 1 | 1 |
| VOelMinPu | OEL PI control lower limit | pu | -0.99 | -0.99 | -0.99 |

The parameter sets correspond to an overexcitation limiter applied to :
- 1 : a static excitation system;
- 2 : a rotating excitation system;
- 3 : a brushless excitation system.

## Model diagram

![OEL5C](OEL5C.drawio.svg)

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 09/10/2024 |  |

## References

{% bibliography --cited --file references  %}