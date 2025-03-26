---
id: algeq1
layout: page
title: Algebraic equation
tags: ["control block", "algebraic equation"]
authors: Mathilde Bongrain
date: 16/10/2023
version: version-1.0.0
---

## Syntax:

- function name: algeq

Internal states : none

Discrete variable : none

## Equations

This block forces an algebraic constraint (or equation) involving one of several states :
$$f(x_1, x_2, ..., x_n)= 0$$
where $$n$$ is the number of system states ($$n \geq 1$$)

**N.B.**
Note that this blocks does not really have “inputs” and “outputs”. The latter stem from the rest of the model involving the algebraic constraint.
