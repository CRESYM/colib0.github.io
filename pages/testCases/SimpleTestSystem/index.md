---
layout: page
title: Simple Test system 
tags: [SimpleTestSystem]
author: Chavdar Ivanov
date: 24/05/2024  
last-updated: 24/05/2024 
---

# Simple Test System

## Use case purpose: ​
A small test system that can be used to test excitation system and governor models.

## References:
This benchmark was originally proposed by Chavdar Ivanov (gridDigIt) for the purpose of testing excitation systems.


## Network ​description:
The network is described by the following figure:
<img src="{{ '/pages/testCases/converterDrivenStability/4VSCSystem/4VSCsystem.png' | relative_url }}"
alt="Four VSC system"
style="float: center; margin-right: 10px;" />

## Dynamic models​
This test case includes:
- two generic [HVDC VSC lines](/models/HVDC/VSC/HVDCVSCPhasor)
- two wind turbines generators (equivalent for a Wind park)
- two sets of 6 cables in parallel (225kV)
- seven 400kV overhead lines
- six two windings transformers
- two shunt reactors
- one RL load




## Open source implementations
Some open source implementations of this use case are available in the following software solutions:

| Software   | Phasor/EMT  |   URL |
| --------------- | --- | ----------- |
| Dynawo        | Phasor | [Link](https://github.com/dynawo/dynawo/tree/master/examples/DynaSwing/GridForming_GridFollowing) |
| STEPSS  | Phasor | ... |
| EMTP-RV | EMT | ...   |
| PSCAD   | EMT | ...   |
| SimPowerSystem | EMT |