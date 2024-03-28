---
layout: page
title: Standard power system stabilizer model
tags: ["PSS", "PSS6C", "generic"]
---
# PSS6C model

## Context

This power system stabilizer (PSS) model has been developed by RTE.

## Model inputs and output

This PSS takes as input the active power PGenPu, the angular frequency omegaPu and the reference angular frequency omegaRefPu.

The output signal VPssPu is sent to a voltage regulator.

## Model parameters

KOmega : Coefficient applied to angular frequency
KOmegaRef : Coefficient applied to reference angular frequency
K0 : Gain of first integrator input
K1 : Gain of first integrator output
K2 : Gain of second integrator output
K3 : Gain of third integrator output
K4 : Gain of fourth integrator output
Ki3 : Gain of third integrator
Ki4 : Gain of fourth integrator
Ks : Gain of power system stabilizer
Ks1 : Gain of active power branch
Ks2 : Gain of angular frequency branch
MAcc : Gain of angular velocity
OmegaMaxPu : Maximum angular velocity in pu (base omegaNom)
OmegaMinPu : Minimum angular velocity in pu (base omegaNom)
PGenMaxPu : Maximum active power in pu (base SNom) (generator convention)
PGenMinPu : Minimum active power in pu (base SNom) (generator convention)
PPssOffPu : Lower active power threshold for PSS activation in pu (base SNom) (generator convention)
PPssOnPu : Higher active power threshold for PSS activation in pu (base SNom) (generator convention)
t1 : Transducer time constant (active power branch) in s
t2 : Transducer time constant (angular frequency branch) in s
t3 : First order time constant (active power branch) in s
t4 : Derivative time constant (angular frequency branch) in s
tD : Washout time constant in s
tI1 : Time constant of first integrator, in s
tI2 : Time constant of second integrator, in s
tI3 : Time constant of third integrator, in s
tI4 : Time constant of fourth integrator, in s
VPssMaxPu : Maximum output voltage of power system stabilizer in pu (base UNom)
VPssMinPu : Minimum output voltage of power system stabilizer in pu (base UNom)

SNom : Nominal apparent power in MVA

