---
layout: page
title: Capacitor Bank 
tags: ["#121","Capacitor", "dynawo"]
date: 10/05/2024 
last-updated: 14/05/2024
id: #121
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

In electrical grids, shunt elements are connected to the end of a transmission line in order to control the voltage level by injecting or absorbing reactive power. This is done to prevent the voltage level to go below or above the desired range, something usual when dealing with long transmission lines or for some specific loads. If the shunt element absorbs reactive power, it is formed by inductances, while if it injects reactive power, it is formed by capacitors. This model presents the steady-state analysis of a capacitor bank.

## Model use, assumptions, validity domain and limitations

The model is used to perform steady-state analysis of a capacitor bank. The model is based on the following assumptions:

- The capacitor bank is connected to one of the nodes of the line at its voltage level.
- It is considered to be static, meaning it cannot change its capacitive parameters nor change its behavior to inductive.
- Dynamics are not considered, the capacitor is considered to be at load.
- The line is considered to have only reactance, disregarding the resistive part of the impedance.

The model is valid to dimension capacitor bank for a given condition, or to calculate the injection when the capacitive parameter is known and fixed. It does not considered rotating VAR generators, which can perform the same role of the capacity bank but with the ability to change the injection, or even to have inductive behavior, using excitation control. It is also not valid for dynamic analysis, as it does not consider the transient behavior of the capacitor bank.

## Model description

### Parameters

| Parameter | Description | Unit | 
| --- | --- | --- |
| $$\|\|V_S\|\|$$ | Voltage level at the sending end | $$kV$$ |
| $$\|\|V_R\|\|$$ | Voltage level at the receiving end | $$kV$$ |
| $$X$$ | Reactance of the transmission line | $$\Omega$$ |
| $$Q_D$$ | Reactive power consumed by the load | $$MVAr$$ |

### Variables

| Parameter | Description | Unit | 
| --- | --- | --- |
| $$Q_R$$ | Reactive power at the receiving end | $$MVAr$$ |
| $$Q_C$$ | Reactive power injected by the capacitor bank | $$MVAr$$ |
| $$X_C$$ | Capacitive reactance of the capacitor bank | $$\Omega$$ |

### Equations

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$\|V_R\| = \frac{1}{2} \|V_S\| + \frac{1}{2} \|V_S\| \sqrt(1 - \frac{4 X Q_R}{\|V_S\|^2}) $$
$$Q_C = \frac{\|V_R\|^2}{X_C}$$
$$Q_C = Q_R - Q_D$$

</div>

## Operational principles

### Voltage control of a line

Consider a line where the power goes from a node with voltage $$\|V_S\|e^{j\delta}$$, to a node with voltage $$\|V_R\|e^{j0}$$. The line is assumed to only have reactance component, disregarding the resistive part of the impedance. The power received at the end of the line is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ P_R = \frac{\|V_S\|\|V_R\|}{X} \sin(\delta)$$
$$ Q_R = \frac{\|V_R\|}{X}(\|V_S\| - \|V_R\|)$$

</div>

where $$X$$ is the reactance of the line. This received power is consumed by the load at the receiving end. If the active power consumption changes, the torque angle between the two nodes will change accordingly to match the power without varying the voltage level. But if the reactive power consumption changes, the only way to keep the voltage level constant is to inject or absorb reactive power by the means of a shunt element. If the voltage level is too low, a capacitor bank is connected to the end of the line to inject reactive power, increasing the voltage level. The relationship between voltage level and reactive power can be obtained from the $$Q_R$$ equation solving the second equation for $$\|V_R\|$$:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$\|V_R\| = \frac{1}{2} \|V_S\| + \frac{1}{2} \|V_S\| \sqrt(1 - \frac{4 X Q_R}{\|V_S\|^2}) $$
</div>
       
To maintain the level of voltage, the shunt element has to maintain the same $$Q_R$$ by absorbing or injecting the reactive power to compensate the load fluctuations: $$Q_C = Q_R - Q_D$$. If the load is higher than $$Q_R$$, then the shunt element will need to absorb reactive power, which means it will have to be inductive. If the load is lower than $$Q_R$$, then the shunt element will need to inject reactive power, which means it will have to be capacitive. The model studies the second case.

### Capacitor bank dimensioning

The capacitor bank is considered to be connected to the end of a transmission line at its voltage level $$\|V_R\|$$. The following schematic represents the simplified circuit:


<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/Capacitors/CapacitorBank/CapBank_scheme.svg' | relative_url }}"
     alt="Capacitor bank scheme"
     style="float: center; margin-right: 10px;" />
</div>
<div align = 'center'>
Figure 1: Capacitor bank scheme
</div>
<br>

In this circuit, the current passing through the capacitor bank is given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$I_C = j \frac{\|V_R\|}{\sqrt(3) X_C}$$

</div>

where $$X_C$$ is the capacitive reactance of the capacitor bank. To calculate the reactive power injected the following equation is used:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$jQ_C = 3 \frac{\|V_R\|}{\sqrt(3)} (-I_C^*)$$
$$Q_C = \frac{\|V_R\|^2}{X_C}$$

</div>

To dimension the capacitive bank, the capacitive reactance is calculated from the desired reactive power injection and the voltage level that has to be maintained, calculated using the relation derived in the previous section.


## Open source implementations

This model has been successfully implemented in :


| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| dynawo | [Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Shunts/ShuntB.mo) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 24/05/2024 | - |
| Andes | [Link](https://github.com/CURENT/andes/blob/master/andes/models/shunt/shunt.py) | python | [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)  | 24/05/2024 | - |
| Pandapower | [Link](https://github.com/e2nIEE/pandapower/blob/develop/pandapower/converter/cim/cim2pp/converter_classes/shunts/linearShuntCompensatorCim16.py) | python | [3-clause BSD](https://pandapower.readthedocs.io/en/v2.0.1/about/license.html)  | 24/05/2024 | - |

## Table of references


