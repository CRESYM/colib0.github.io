---
layout: page
title: Integrator control block with a positive time constant T
tags: ["control block", "integrator"]
---

## Diagram

![integrator diagram](/pages/models/controlBlocks/integrator/integrator.svg)

Syntax:  

- function name: int
- input variable : $x_i$
- output variable : $x_j$
- data name, parameter name or math expression for $T$

Internal states : none

Discrete variable : none

## Equations

$$ T \dot{x_j} = x_i$$

**N.B.** A zero value for $T$ is not allowed. If too small a value is specified for $T$, the solver may encounter a singularity and the simulation may not proceed.
