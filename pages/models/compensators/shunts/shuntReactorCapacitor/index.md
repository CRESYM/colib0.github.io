---
layout: page 
title: Shunt Reactor/Capacitor  
tags: [RMS, shunt, opensource] 
date: 22/05/2024 
last-updated: 22/05/2024
---

# RMS shunt reactor/capacitor model

## Context

A shunt reactor (resp. capacitor) is a reactive power sink (resp. sources), increasing the energy efficiency of the system. It is the most compact device commonly used for reactive power compensation in long high-voltage transmission lines and cable systems.[[1]](#1).

It is a high-voltage passive electrical component whose function is to control the voltage of an electrical network by compensating the capacitive behaviour of a network with its inductive behaviour.
A traditional shunt reactor has a fixed rating and is either connected to the power line all the time or switched in and out depending on the load.

## Model use, assumptions, validity domain and limitations

### Shunt reactors

Shunt reactors are used to compensate for the effects of line capacitance, particularly to limit voltage rise on open circuit or light load condition.
Indeed, for an opened overhead lines longer than 200 km or a shorter line in a weak system, the voltage at the sending end is rising due to the large source inductive reactance and the Ferranti effect. A well sized shunt reactor permanently connected to the line will limit the overvoltages. Another use is to maintain normal voltage under light-load conditions. Tapped reactors with on-voltage tap change control facilities can allow a smoother variation of the reactance value.

### Shunt capacitors

They supply reactive power and boost local voltages. They were initially used for power factor correction but rapidly, due to their low cost and easy installation and operation, they were used for supplying reactive power in various points of the transmission and distribution grids. They compensate for the reactive losses in transmission system and to ensure satisfactory voltage levels during heavy loading conditions.

## Model description

The shunt reactor/capacitor has a single winding (per phase) on an iron core with air-gaps and immersed in oil. Hence, it is a purely reactive, constant shunt admittance. The reactive power $$Q$$ it produces varies with the sqaure of the voltage $$V$$ according to the following equation:
<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$Q= B V^2$$
</div>

where:

- B is the susceptance (in siemens)
- V is the line RMS voltage (in V)

if $$B > 0$$, it is a capacitor, if $$B< 0$$, it is a reactor.

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| dynawo | [Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Shunts/ShuntB.mo) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 22/05/2024 | - |

## Table of references & license

<a id="1">[1]</a> Kundur, Prabha. "Power System Stability and Control" New York, USA, 1994, McGraw-Hill.