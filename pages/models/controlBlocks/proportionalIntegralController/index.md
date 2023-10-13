---
layout: page
title: Proportional integral (PI) controller
tags: ["control block", "PI", "Proportional Integral"]
---

## Diagram

![pictl diagram](/pages/models/controlBlocks/proportionalIntegralController/proportionalIntegralController.svg)

Syntax:  

- function name: pictl
- input variable : $x_k$
- output variable: $x_j$
- data name, parameter name or math expression for $K_I$
- data name, parameter name or math expression for $K_p$

Internal states : variable $x_i$

Discrete variable : none

## Equations

$$ \dot{x_i} = K_i x_k $$
$$ 0 = K_p x_k + x_i - x_j $$

## Initialization of internal state variables

$$
x_i = x_j
$$
