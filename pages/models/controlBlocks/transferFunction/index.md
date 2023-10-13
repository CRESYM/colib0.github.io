---
layout: page
title: Transfer function between an input and output one time constant
tags: ["control block", "transfer function"]
---

## Diagram

![transfer function diagram](/pages/models/controlBlocks/transferFunction/transferFunction.svg)

Syntax:  

- & tf1p
- input variable : $x_i$
- output variable : $x_j$
- data name, parameter name or math expression for $G$
- - data name, parameter name or math expression for $T$

Internal states : none

Discrete variable : none

## Equations

$$ T \dot{x_j} = - x_j + G x_i$$

**N.B.** A zero value for $T$ is allowed.
