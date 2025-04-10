---
layout: page
title: Single-cage induction motor model
tags: ["#200", "Induction motor", "RMS", "Dynawo", "Opensource"]
date: 09/08/2024
last-updated: 09/08/2024
authors: Frédéric Sabot (ULB)
reviewers: Lampros Papangelis (CRESYM)
---


## Context

Motors are a particular kind of load that can account for a large share of the total load especially in industrialised countries. Adequate representation of motors is important, especially in short-term voltage stability studies as motors can cause fault-induced delayed voltage recovery. This page presents a single-cage induction motor model based on the textbook three-phase induction motor equivalent circuit [[1]](#1).

## Model use, assumptions, validity domain and limitations

The motor model can be used for short-term voltage stability studies. The assumptions made for this model are:

* The rotor resistance is constant (no skin-effect or double-cage motors).
* The motor is balanced.
* The magnetic circuit is considered to be linear, neglecting saturation effects.
* The mechanical torque varies as a constant power of the rotor speed (e.g. constant torque or quadratic torque).

The model does not take into account transient and subtransient phenomena and is therefore not suitable for systems with a very large motor share (>50% of the total load) or to compute the short-circuit contribution from motors.

## Model description

The model is based on the equivalent circuit represented below.

![Equivalent circuit of the induction motor](MotorEquivalentCircuit.drawio.svg)

### Parameters

| Parameter| Description | Unit | Typical value
| ---| ---  | --- | --- |
| $$\omega_s$$ | Synchronous speed | $$rad/s$$ | $$314rad/s$$ |
| $$R_s$$ | Stator resistance | $$\Omega$$ | $$0.02pu$$ |
| $$X_s$$ | Stator leakage reactance  | $$\Omega$$ | $$0.1pu$$ |
| $$R_r$$ | Rotor resistance | $$\Omega$$ | $$0.02pu$$ |
| $$X_r$$ | Rotor leakage reactance  | $$\Omega$$ | $$0.1pu$$ |
| $$X_m$$ | Magnetising reactance  | $$\Omega$$ | $$3pu$$ |
| $$J$$ | Moment of inertia | $$kgm^2$$ | 0.1 to 5s |
| $$\eta$$ | Exponent of the torque speed dependency | Unitless | 0 to 3 |
| $$C_{l, 0}$$ | Initial load torque | $$Nm$$ | N/A |
| $$\omega_0$$ | Initial rotor speed | $$rad/s$$ | N/A |

### Variables

| Variable | Description | Unit |
| --- | --- | --- |
| $$V$$ | Stator voltage | $$V$$ |
| $$I_s$$ | Stator current | $$A$$ |
| $$I_r$$ | Rotor current | $$A$$ |
| $$I_m$$ | Magnetising current | $$A$$ |
| $$C_e$$ | Electrical torque | $$Nm$$ |
| $$C_l$$ | Load torque | $$Nm$$ |
| $$s$$ | Rotor slip | Unitless |
| $$\omega$$ | Rotor speed | $$rad/s$$ |

### Equations

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

<div style="font-weight: bold;">Electrical equations:</div>

$$V = j X_m * I_m + (R_s + j X_s) I_s$$
$$I_s = \frac{V}{(R_s + j X_s) + \frac{1}{\frac{1}{X_m} + \frac{s}{R-r + j X_r * s}}}$$
$$I_s = I_m + I_r$$

<div style="font-weight: bold;">Mechanical equations:</div>

$$2 J  \frac{d\omega}{dt} = C_e - C_l$$
$$s = \frac{\omega_s - \omega}{\omega_s}$$
$$C_e = R_r * \frac{\left|I_r\right|^2}{\omega_s s}$$
$$C_l = C_{l, 0} \left(\frac{\omega}{\omega_0}\right)^\eta$$

</div>

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
|Dynawo|[Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Machines/Motors/SimplifiedMotor.mo)| modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 09/08/2024 | no comment |


## Table of references

<a id="1">[1]</a> Guru, B. S.; Warrier, R. K. "Electric Machinery and Transformers", 3th ed., New York, United States, 2001, Oxford University Press
