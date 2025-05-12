---
id: timer1
layout: page
title: Timer control block
tags: ["control block", "timer"]
authors: Mathilde Bongrain
date: 16/10/2023
version: version-1.0.0
---

Timer with varying delay. The latter is a piecewise linear function of the monitored variable
If $$x_i$$ is smaller than a threshold $$v_1$$, the output $$x_j$$ is equal to zero. Otherwise, $$x_j$$ changes from zero to one at time $$t* + \tau(x_i)$$ where t* is the time at which the input $$x_i$$ became larger than $$v_1$$ and the delay $$\tau (x_i)$$ varies with $$x_i$$ according to a piecewise linear characteristic involving $$n$$ points (see diagram below).

## Diagram

![timer diagram](timer.svg)
![detailed timer diagram](detailedTimer.svg)

Syntax:  

- function name: timer
- input variable : $$x_i$$
- output variable: $$x_j$$
- data name, parameter name or math expression for $$v_l$$ where $$l \in \{0,1, ..., n\}$$
- data name, parameter name or math expression for $$T_l$$

Internal states : $$x_1$$

Discrete variable : $$z \in \{-1,0,1\}$$

## Equations

$$
0 = \left\{
    \begin{array}{lll}
        x_j & if & z \in \{-1, 0\} \\
        x_j - 1 & if & z=1 
    \end{array}
\right.
$$

$$
 \left\{
    \begin{array}{lll}
        x_1 & if & z =-1 \\
        \dot{x_1} = 1 & if & z= 0 \\
        \dot{x_1} = 0 & if & z= 1
    \end{array}
\right.
$$

## Discrete transitions

```
if z = −1 then
    if xi ≥ v1 then
        z ← 0
    end if
else
    if xi < v1 then
    z ← −1
    end if
end if
```

```
if z = 0 then
    if x1 ≥ $$\tau (xi)$$ then
        z ← 1
    end if
end if
```

## Initialization of internal states

```
x1 ← 0
```

## Initialisation of the discrete variables

```
z ← -1
```

The $$v_i$$ values must be increasing, but two consecutive values may be equal, i.e. $$v_1 \leq v_2 \leq v_3 \leq . . . \leq v_{n−1} \leq v_n$$.
The piecewise linear characteristic is typically used to approximate an inverse-time characteristic, in which case the $$T$$ values are decreasing, i.e. $$T_1 \geq T_2 \geq T_3 \geq . . . \geq T_{n−1} \geq T_n$$.  
Nevertheless, non decreasing values are also allowed.
If the initial value of $$x_i$$ is larger than $$v_1$$, $$x_j$$ will change to one after the time $$\tau(x_i)$$, unless $$x_i$$ decreases below $$v_1$$ before the delay $$\tau$$ is elapsed.
