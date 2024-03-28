---
layout: page
title: Standard power system stabilizer model
tags: ["PSS", "PSS2C", "generic"]
---
# PSS2C model

## Context

This power system stabilizer (PSS) model has been developed by RTE.

## Model inputs and output

This PSS takes as input the active power PGenPu, the angular frequency omegaPu and the reference angular frequency omegaRefPu.

The output signal VPssPu is sent to a voltage regulator.

## Model parameters

KOmega : Coefficient applied to angular frequency
KOmegaRef : Coefficient applied to reference angular frequency
Ks1 : Gain of power system stabilizer
Ks2 : Gain of transducer (active power branch)
Ks3 : Washouts coupling factor
M : Lag order of ramp-tracking filter
N : Order of ramp-tracking filter
OmegaMaxPu : Maximum angular frequency input of power system stabilizer in pu (base omegaNom)
OmegaMinPu : Minimum angular frequency input of power system stabilizer in pu (base omegaNom)
PGenMaxPu : Maximum active power input of power system stabilizer in pu (base SNom) (generator convention)
PGenMinPu : Minimum active power input of power system stabilizer in pu (base SNom) (generator convention)
PPssOffPu : Active power threshold for PSS deactivation in pu (base SNom) (generator convention)
PPssOnPu : Active power threshold for PSS activation in pu (base SNom) (generator convention)
t1 : First lead time constant in s
t2 : First lag time constant in s
t3 : Second lead time constant in s
t4 : Second lag time constant in s
t6 : Transducer time constant of angular frequency branch in s
t7 : Transducer time constant of active power branch in s
t8 : Ramp-tracking filter lead time constant in s
t9 : Ramp-tracking filter lag time constant in s
t10 : Third lead time constant in s
t11 : Third lag time constant in s
t12 : Fourth lead time constant in s
t13 : Fourth lag time constant in s
tW1 : First washout time constant (angular frequency branch) in s
tW2 : Second washout time constant (angular frequency branch) in s
tW3 : First washout time constant (active power branch) in s
tW4 : Second washout time constant (active power branch) in s
VPssMaxPu : Maximum voltage output of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum voltage output of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA

## Model variants

In the PSS2A and PSS2B models :

- the PSS deactivation for low active power values is absent (PPssOffPu = -1000, PPssOnPu = -999)
- the final lead-lag filter is ignored (t12 = t13 = 0)

Moreover, in the PSS2A model, the second to last lead-lag filter is ignored (t10 = t11 = 0).

