---
layout: page
title: Pi Line Model
---

## Model context and assumptions

## Model schema

## Line parameters

  R : Resistance
  X : Reactance
  G : Half-conductance
  B : Half-susceptance
  Z
  Y :

## Line variables

  P1 Active power on side 1
  Q1 "Reactive power on side 1
  P2 Active power on side 2
  Q2Pu Reactive power on side 2

## Equations

 $$Z * (i2 - Y * V2) = V2  - V1 $$
 $$Z * (i1 - Y * V1) = V1 - V2 $$

## Open source implementations

<details>
<summary>Modelica</summary>
<br>
[Dynawo public library](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Lines/Line.mo).
</details>
