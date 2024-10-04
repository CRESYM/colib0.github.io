---
layout: page
title: OEL2C
tags: ["Voltage regulator", "OEL2C", "generic", "Opensource", "CIM model", "RMS", "phasor", "MRL4", "Single phase", "IEEE", "dynawo", "#236"]
date: 08/10/2024
last-updated: 09/10/2024
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

| Parameter | Description | Units |
| --------- | ----------- | ----- |
| C1 | OEL exponent for calculation of first error | - |
| C2 | OEL exponent for calculation of second error | - |
| FixedRd | OEL fixed cooling-down time output | pu |
| FixedRu | OEL fixed delay time output | pu |
| IInstPu | OEL instantaneous field current limit | pu |
| ILimPu | OEL thermal field current limit | pu |
| IResetPu | OEL reset-reference, if OEL is inactive | pu |
| ITfPu | OEL reference for inverse time calculations | pu |
| IThOffPu | OEL reset threshold value | pu |
| K1 | OEL gain for calculation of first error | pu |
| K2 | OEL gain for calculation of second error | pu |
| KAct | OEL actual value scaling factor | pu |
| KdOel | OEL PID regulator differential gain | pu |
| KFb | OEL timer feedback gain | pu |
| KiOel | OEL PID regulator integral gain | pu |
| KpOel | OEL PID regulator proportional gain | pu |
| Krd | OEL reference ramp-down rate | pu |
| Kru | OEL reference ramp-up rate | pu |
| KScale | OEL input signal scaling factor | pu |
| Kzru | OEL thermal reference release threshold | pu |
| Sw1 | If true, ramp rate depends on field current error, if false, ramp rates are fixed | - |
| tAOel | OEL reference filter time constant | s |
| tB1Oel | OEL regulator first lag time constant | s |
| tB2Oel | OEL regulator second lag time constant | s |
| tC1Oel | OEL regulator first lead time constant | s |
| tC2Oel | OEL regulator second lead time constant | s |
| tDOel | OEL PID regulator differential time constant | s |
| tEn | OEL activation delay time | s |
| tFcl | OEL timer reference | s |
| tMax | OEL timer maximum level | s |
| tMin | OEL timer minimum level | s |
| tOff | OEL reset delay time | s |
| tROel | OEL input signal filter time constant | s |
| VInvMaxPu | OEL maximum inverse time output | pu |
| VInvMinPu | OEL minimum inverse time output | pu |
| VOel1MaxPu | Maximum OEL output limit | pu (base UNom) |
| VOel1MinPu | Minimum OEL output limit | pu (base UNom) |
| VOel2MaxPu | Maximum OEL lead-lag 1 output limit | pu (base UNom) |
| VOel2MinPu | Minimum OEL lead-lag 1 output limit | pu (base UNom) |
| VOel3MaxPu | Maximum OEL PID output limit | pu (base UNom) |
| VOel3MinPu | Minimum OEL PID output limit | pu (base UNom) |

## Model diagram

![OEL2C](/pages/models/regulations/oel/OEL2C/OEL2C.drawio.svg)

![OelReferenceCurrent](/pages/models/regulations/oel/OEL2C/OelReferenceCurrent.drawio.svg)

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