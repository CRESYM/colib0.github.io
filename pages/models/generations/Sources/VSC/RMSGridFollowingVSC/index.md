---
layout: page 
title: RMS grid following voltage source converter 
tags: [Opensource, RMS, phasor, TMRL2, voltage source, converter, wind, pv, hdvc, dynawo, STEPSS ] 
date: 17/05/2024 
last-updated: 17/05/2024
id: #131
---

# RMS grid following voltage source converter

## Context

This grid following voltage source converter is a generic RMS model that doesn't aim at embedding the “best” design and/or tuning of VSC controls, but rather encompass many variants from the literature by its genericity.
It has been developed by Professor Thierry Van Cutsem in 2021 with a view to building test cases to study the impact of converters on stability of power networks.

## Model use, assumptions, validity domain and limitations

This RMS model is an MMC-type converter connected to grid through transformer without LC filter, and no DC side model ($$v_c$$ is constant). Hence, only the AC dynamics of the model can be taken into account.

It can be used for voltage, frequency, transient, and slow interaction converter stability studies, but not in EMT studies.
As it is generic, it can't be used for studying a specific behavior of a real-life converter.

## Model description

The model is constituted of :

- the physical part that include a MMC-type converter represented by a voltage injector, in serie with a resistance and reactance and an ideal transformer before its connection to the point of common coupling.
- some controls : PLL, current control loop, active power and reactive power loops,

### Physical part

The physical part is presented on the following figure:
![Grid following converter](./img/grid_following_vsc_model.png)

The reference frame of the network is different from the one of the converter and can be related by:
![vsc control reference frames](./img/vsc_control_reference_frame.png)
 where:

- $$(𝑥,𝑦)$$ axes are rotating at angular speed $$𝜔_{𝑟𝑒𝑓}$$ in (rad/s)
- $$𝑣_𝑥, 𝑣_𝑦$$ are the rectangular components of PCC voltage phasor $$\bar{𝑉}$$
- $$(𝑑,𝑞)$$ axes are tracking the voltage phasor and are given by Phase Locked Loop
- $$𝑣_𝑑, 𝑣_𝑞$$ are the $$𝑑,𝑞$$ components of $$\bar{𝑉}$$
- $$𝛿_𝑔$$ are phase angle of  $$\bar{𝑉}$$ with regard to $$𝑥$$ in (rad)
- $$\tilde{𝛿}_𝑔$$ is the angle between $$𝑑$$ and $$𝑥$$ (rad). In steady-state : $$\tilde{𝛿}_𝑔= 𝛿_𝑔$$
- $$\tilde{𝜔}_𝑔$$ : angular speed of $$(𝑑,𝑞)$$ axes in (pu/s)

### PLL


## Model equations

Physical part:

Change in the reference from $$(x,y)$$  to $$(d,q)$$ representation :
$$ v_d = v_x * cos(\tilde{\delta}_g) + v_y * sin(\tilde{\delta}_g) $$
$$ i_d = r * i_x * cos(\tilde{\delta}_g) + r* i_y * sin(\tilde{\delta}_g) $$

      

## Open source implementations (if any)

_This section give a list of the different open source implementations of this model.It provides the reader with links and languages/software used for each implementations._

The markdown table can be used to display such list, for example:

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| STEPSS | [Link](https://github.com/CRESYM/BiGER/tree/main/testModels/gridFollowing/STEPPS) | txt | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 17/05/2024 | - |
| dynawo | [Link](https://github.com/dynawo/dynawo/compare/master...3093_GFL_VSC) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 17/05/2024 | - |

## Table of references
