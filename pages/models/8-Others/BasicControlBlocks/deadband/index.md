---
id: db1
layout: page
title: Deadband control block
tags: ["control block", "deadband"]
authors: Mathilde Bongrain
date: 16/10/2023
version: version-1.0.0
---

## Diagram

![deadbandDiagram](deadband.svg)
![detailedDeadbandDiagram](detailedDeadband.svg)

Syntax:  

- function name: db
- input variable : $$x_i$$
- output variable: $$x_j$$
- data name, parameter name or math expression for $$\delta_1$$
- data name, parameter name or math expression for $$s_1$$
- data name, parameter name or math expression for $$a_1$$
- data name, parameter name or math expression for $$\delta_2$$
- data name, parameter name or math expression for $$s_2$$
- data name, parameter name or math expression for $$a_2$$

Internal states : none

Discrete variable : $$ z \in \{-1,0,1\} $$

## Equations

$$
0 = \left\{
    \begin{array}{lll}
        x_j & if & z=0 \\
        x_j - s_2 - a_2(x_i - \delta_2) & if & z=1 \\
        x_j - s_1 - a_1(x_i - \delta_1) & if & z=-1
    \end{array}
\right.
$$

## Discrete transitions

```

if z ∈ {0, 1} then
    if xi < δ1 then
        z ← −1
    end if
else if z ∈ {−1, 0} then
    if xi > δ2 then
        z ← 1
    end if
else if z ∈ {−1, 1} then
    if δ1 < xi < δ2 then
        z ← 0
    end if
end if
```

## Initialization of discrete variables

```
if xi > δ2 then
    z ← 1
else if xi < δ1 then
    z ← −1
else
    z ← 0
end i
```

## N.B.

The data must obey $$\delta_1 < \delta_2$$, $$a_1 \geq 0$$ and $$a_2 \geq 0$$ (see for instance the diagram above).
A particular case is $$s_1 = s_2 = 0$$ and $$a_1 = a_2 = 1$$ (but all values are allowed for these four parameters).
