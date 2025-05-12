---
layout: page
title: Transfer function between an input and output one time constant
tags: ["control block", "transfer function"]
authors: Mathilde Bongrain
date: 16/10/2023
version: version-1.0.0
---

## Diagram

![transfer function diagram](transferFunction.svg)

Syntax:  

- function name: tf1p
- input variable : $$x_i$$
- output variable : $$x_j$$
- data name, parameter name or math expression for $$G$$
- data name, parameter name or math expression for $$T$$

Internal states : none

Discrete variable : none

## Equations

$$ T \dot{x_j} = - x_j + G x_i$$

**N.B.** A zero value for $$T$$ is allowed.
