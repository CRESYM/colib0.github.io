---
layout: page
title: OEL2C
tags: ["Voltage regulator", "OEL2C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#236"]
date: 08/10/2024
last-updated: 09/10/2024
id: #236
authors: Erwan Guichard (DPS for RTE)
reviewers: Lampros Papangelis (CRESYM)
---
# IEEE OEL2C model

## Context

This overexcitation limiter model first appeared in the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

## Model use, assumptions, validity domain and limitations

This model is associated to one of the voltage regulators (types AC, DC, ST) defined by the IEEE Std 421.5-2016 {% cite IEEEExciterModels2016 %}.

The model provides an overexcitation limiter signal for the purposes of :

 - takeover : the overexcitation limiter signal acts as an upper limit on the voltage regulator main signal which then becomes the excitation voltage ;
 - summation : the overexcitation limiter signal is added to the stator voltage deviation from the reference, thus being taken into account in the calculation of the excitation voltage.

## Model input and output

The input signal is either the generator field current, the generator field voltage or (for brushless excitation systems) the exciter field current, in pu.

The output signal is UOelPu, the overexcitation limiter voltage in pu (base UNom).

## Model parameters

| Parameter | Description | Unit | Value (set 1) | Value (set 2) | Value (set 3) |
| --------- | ----------- | ---- | ------------- | ------------- | ------------- |
| C1 | OEL exponent for calculation of first error | - | 0 | 0 | 0 |
| C2 | OEL exponent for calculation of second error | - | 2 | 2 | 2 |
| FixedRd | OEL fixed cooling-down time output | pu | -0.001 | -0.001 | -0.001 |
| FixedRu | OEL fixed delay time output | pu | 0 | 0 | 0 |
| IInstPu | OEL instantaneous field current limit | pu | 6 | 6 | 6 |
| ILimPu | OEL thermal field current limit | pu | 3 | 3 | 3 |
| IResetPu | OEL reset-reference, if OEL is inactive | pu | 100 | 100 | 100 |
| ITfPu | OEL reference for inverse time calculations | pu | 3 | 3 | 3 |
| IThOffPu | OEL reset threshold value | pu | 0.05 | 0.05 | 0.05 |
| K1 | OEL gain for calculation of first error | pu | 0 | 0 | 0 |
| K2 | OEL gain for calculation of second error | pu | 0.296 | 0.296 | 0.296 |
| KAct | OEL actual value scaling factor | pu | 1 | 1 | 1 |
| KdOel | OEL PID regulator differential gain | pu | 0 | 0 | 0 |
| KFb | OEL timer feedback gain | pu | 0 | 0 | 0 |
| KiOel | OEL PID regulator integral gain | pu | 0 | 0 | 1 |
| KpOel | OEL PID regulator proportional gain | pu | 0.5 | 500 | 0.3 |
| Krd | OEL reference ramp-down rate | pu | -1000 | -1000 | -1000 |
| Kru | OEL reference ramp-up rate | pu | 1000 | 1000 | 1000 |
| KScale | OEL input signal scaling factor | pu | - | - | - |
| Kzru | OEL thermal reference release threshold | pu | 0.99 | 0.99 | 0.99 |
| Sw1 | If true, ramp rate depends on field current error, if false, ramp rates are fixed | - | - | - | - |
| tAOel | OEL reference filter time constant | s | 0.04 | 0.04 | 0.04 |
| tB1Oel | OEL regulator first lag time constant | s | 0.1 | 2 | 0.1 |
| tB2Oel | OEL regulator second lag time constant | s | 0.1 | 0.1 | 0.1 |
| tC1Oel | OEL regulator first lead time constant | s | 0.1 | 0.2 | 0.1 |
| tC2Oel | OEL regulator second lead time constant | s | 0.1 | 0.1 | 0.1 |
| tDOel | OEL PID regulator differential time constant | s | 0.1 | 0.1 | 0.1 |
| tEn | OEL activation delay time | s | 0.2 | 0.2 | 0.2 |
| tFcl | OEL timer reference | s | 10 | 1 | 10 |
| tMax | OEL timer maximum level | s | 10 | 1 | 10 |
| tMin | OEL timer minimum level | s | 0 | 0 | 0 |
| tOff | OEL reset delay time | s | 5 | 5 | 5 |
| tROel | OEL input signal filter time constant | s | 0.01 | 0.01 | 0.01 |
| VInvMaxPu | OEL maximum inverse time output | pu | 100 | 100 | 100 |
| VInvMinPu | OEL minimum inverse time output | pu | 0 | 0 | 0 |
| VOel1MaxPu | Maximum OEL output limit | pu (base UNom) | 10 | 10 | 0 |
| VOel1MinPu | Minimum OEL output limit | pu (base UNom) | -10 | -10 | -10 |
| VOel2MaxPu | Maximum OEL lead-lag 1 output limit | pu (base UNom) | 100 | 100 | 0 |
| VOel2MinPu | Minimum OEL lead-lag 1 output limit | pu (base UNom) | -100 | -100 | -100 |
| VOel3MaxPu | Maximum OEL PID output limit | pu (base UNom) | 100 | 100 | 0 |
| VOel3MinPu | Minimum OEL PID output limit | pu (base UNom) | -100 | -100 | -100 |

The parameter sets correspond to an overexcitation limitation output :
- 1 : with a takeover action at the AVR input;
- 2 : with a takeover action at the AVR output;
- 3 : added to the summation point in the AVR.

## Model diagram

![OEL2C](OEL2C.drawio.svg)

The OEL reference current is calculated with the following model :

![OelReferenceCurrent](OelReferenceCurrent.drawio.svg)

The OEL activation logic has three inputs (from top to bottom, IActPu, tErr, IRefPu) and one output (IBiasPu) calculated as follows :

    if tErr <= 0 or (IActPu > IRefPu for a duration >= tEn) or tEn == 0
        IBiasPu = 0
    elseif IRefPu == IInstPu and (IRefPu > IActPu + IThOffPu for a duration > tOff)
        IBiasPu = IResetPu
    else
        IBiasPu = 0

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| ------------- | --- | -------- | ------------------- | ------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 09/10/2024 |  |

## References

{% bibliography --cited --file references  %}