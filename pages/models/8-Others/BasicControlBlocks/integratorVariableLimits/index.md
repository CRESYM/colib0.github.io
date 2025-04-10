---
id: invlim1
layout: page
title: Integrator control block with (positive) time constant T and non-windup variable limits on output
tags: ["control block", "integrator", "limited integrator"]
authors: Mathilde Bongrain
date: 16/10/2023
version: version-1.0.0
---
## Diagram

![integrator diagram](integratorVariableLimits.svg)

Syntax:  

- function name: invlim
- input variable : $$x_i$$
- output variable: $$x_j$$
- variable $$x_{min}$$
- variable $$x_{max}$$

Internal states : none

Discrete variable : $$ z \in \{-1,1\} $$

## Equations

$$
 \left\{
    \begin{array}{lll}
         T \dot{x_j} = x_i & if & z=0 \\
        0= x_j - x_{min} & if & z=-1 \\
        0 = x_j - x_{max} & if & z=1
    \end{array}
\right.
$$

## Discrete transitions

```

if z = 0 then
    if xj > xmax then
        z ← 1
    else if xj < xmin then
        z ← −1
    end if
else if z = 1 then
    if xi < 0 then
        z ← 0
    end if
else if z = −1 then
    if xi > 0 then
        z ← 0
    end if
end if
```

## Initialisation of discrete variables

```
if xj > xmax then
    z ← 1
else if xj < xmin then
    z ← −1
else
    z ← 0
end if
```

**N.B.** A zero value for $$T$$ is not allowed. If too small a value is specified for $$T$$, the solver may encounter a singularity and the simulation may not proceed.