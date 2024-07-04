---
id: hyst1
layout: page
title: Hysteresis control block
tags: ["control block", "hysteresis"]
authors: Mathilde Bongrain
date: 16/10/2023
version: version-1.0.0
---

## Diagram

![hysteresis diagram](hysteresis.svg)
![detailedHysteresisDiagram](detailedHysteresis.svg)

- D stands for "Decreasing"
- I stands for "Increasing"
- B stands for "Before jumping"
- A stands for "After jumping"

Syntax:  

- function name: hyst
- input variable : $$x_i$$
- output variable: $$x_j$$
- data name, parameter name or math expression for $$x_I$$
- data name, parameter name or math expression for $$y_{IB}$$
- data name, parameter name or math expression for $$y_{IA}$$
- data name, parameter name or math expression for $$x_{D}$$
- data name, parameter name or math expression for $$y_{BD}$$
- data name, parameter name or math expression for $$y_{DA}$$
- data name, parameter name or math expression for $$z_0$$

Internal states : none

Discrete variable : $$ z \in \{-1,1\} $$

## Equations

$$
0 = \left\{
    \begin{array}{lll}
        x_j - y_{IA} - \frac{y_{IA} - y_{IB}}{x_I -x_D} (x_i - x_I) & if & z=1 \\
        x_j - y_{DA} - \frac{y_{IB} - y_{DA}}{x_I - x_D} (x_i - x_D) & if & z=-1
    \end{array}
\right.
$$

## Discrete transitions

```

if z = −1 then
    if xi > xI then
        z ← 1
    end if
else
    if xi < xD then
        z ← −1
    end if
end if
```

## Initialization of discrete variables

```
if xi > xI then
    z ← 1
else if xi < xD then
    z ← −1
else
    if z0 ≥ 0 then
        z ← 1
    else
        z ← 0
    end if
end if
```

## N.B.

At $$t = 0$$, if $$x_D < x_i(0) < x_I$$ the initial state of the system is indeterminate, since it could operate on the ( $$y_{IA}$$ , $$y_{DB}$$ ) line (i.e. with an initial value of z equal to 1) as well as on the ( $$y_{DA}$$, $$y_{IB}$$) line (i.e. with an initial value of z equal to −1). Hence, the user must specify $$z_0$$, the initial value of z.
If $$x_i(0) < x_D$$ (resp. $$x_i(0) > x_I$$ ) the initial value is $$z = −1$$ (resp. $$z = 1$$) and $$z_0$$ is not used.
The data must obey $$x_D < x_I$$ , otherwise the model would not correspond to hysteresis.
