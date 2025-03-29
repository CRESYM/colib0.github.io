---
layout: page 
title: Point-to-Point HVDC EMT VSC
tags: ["Opensource", "EMT", "voltage source", "converter", "wind", "pv", "hvdc", "forming", "following", "point to point"] 
date: 25/07/2024 
last-updated: 01/08/2024
id: #190
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

High Voltage Direct Current (HVDC) transmission systems are becoming more significant with the appearance of power electronics in the power system, being a promising solution to connect two grids separated by long distances or difficult terrain, as well as connecting asynchronous grids. The model presents a point-to-point HVDC transmission lines, which is formed by two equivalent AC grids at each side, two converters and a DC transmission line with one capacitor at each end. There are many possible configurations of the model [[1]](#1) [[2]](#2), with the possibility of having Grid Forming or Grid Following, as well as different control strategies.

## Model use, assumptions, validity domain and limitations

The model presented is valid to perform EMT simulations of an HVDC link, (a point-to-point HVDC transmission line). It is valid to perform studies such as lightning events, control dynamics, short-circuit studies and other high-frequency phenomena. The following assumptions are made:

* There are two converters at both ends of the line. The model showcases a Grid Forming - Grid Following configuration (although there could be different configurations).
* The DC line is represented by a resistance and one capacitor at each end that are useful for the transient stability of the line.
* Each of the converters follows the same assumptions as in the individual models, available here: [EMT Grid Following](../../GridFollowingConverter/EMTGridFollowingVSC/) and [EMT Grid Forming](../../GridFormingConverter/UPC-EMTGridFormingVSC/).

As all the EMTs model, it is not suitable for low-frequency studies, such as power flow or dynamic stability studies, as its computational cost is high, and the time step cannot be reduced too much without losing convergence. 

## Model description

The equivalent circuit of this model is shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'HVDC_scheme.svg'}}"
      alt="HVDC scheme"
      style="float: center; margin-right: 10px; width: 900px;" />
 </div>
<div align = 'center'>
Figure 1: Equivalent circuit of the HVDC model
</div>


The bipolar topology is used, distributing the resistance in both the positive and the negative pole cables. Other possible topologies can be considered, such as the monopolar with earth return [[1]](#1). Note that the filter is included inside the Grid Forming VSC block.

### Control strategy 

The internal controls of each VSC are the same as the ones described in their individual models. This model presents how each of these converters interact in order to decide which setpoints are provided to each converter, following the criteria explained in [[2]](#2) [[3]](#3). In this model, a point-to-point DC link is considered, although a meshed DC grid could also be modelled following some additional rules covered in [[4]](#4).

The DC electric equations during the transient are given by:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ C \frac{dV_{DC_1}}{dt} = I_{DC} - I_{DC_1} $$
$$ C \frac{dV_{DC_2}}{dt} = I_{DC_2} - I_{DC} $$
</div>

where the current $$I_{DC}$$ corresponds to the DC current flowing through the line, and $$I_{DC_1}$$ and $$I_{DC_2}$$ are the currents at the DC side of the converters. The current difference is the current flowing through the capacitor, which will be non-zero during the transient, and zero in the steady-state.

When isolated, a converter can control directly two of the electrical variables, but some are related, such as frequency and active power or reactive power and voltage magnitude. The following table shows the possible control modes for a VSC converter [[5]](#5):

| Control Mode | Constraint 1        | Constraint 2 | VSC Control Type |
|--------------|-------------------- |--------------|------------------|
| 1            | $$\theta$$          | $$v_{ac}$$   | I                |
| 2            | $$P_{DC}$$          | $$Q_{ac}$$   | I                |
| 3            | $$P_{DC}$$          | $$v_{ac}$$   | I                |
| 4            | $$v_{DC}$$          | $$Q_{ac}$$   | II               |
| 5            | $$v_{DC}$$          | $$v_{ac}$$   | II               |
| 6            | $$v_{DC} \; droop$$ | $$Q_{ac}$$   | III              |
| 7            | $$v_{DC} \; droop$$ | $$v_{ac}$$   | III              |

When pairing the two converters, there are controls that can overlap and some rules that have to be followed [[5]](#5):

* There must be at least a type II or type III VSC type in order to control the DC voltage. 
* If a type II is selected, there can only be one of them while the rest are type I VSCs, otherwise, there would be a conflict between several voltage setpoints. 
* There can be multiple type III VSC as the droop equations can manage the difference in the voltage setpoints.
* When stand-alone generation or loads are connected to the VSC, it is mandatory to use a type I converter, as it will serve as the slack bus of the AC side.

In the model presented, one of the possible configuration (GFM - GFOL) is considered. The GFM is connected to an islanded load/generation, and it will be forming the AC grid of that side as a type I VSC, controlling the angle and the AC voltage magnitude (i.e. it acts as the slack bus of the grid). On the other side, a GFOL is connected to the main grid (an equivalent three-phase voltage source), which is in this case its slack bus, and it controls both $$V_{DC}$$ and $$Q_{ac}$$. 

### Control blocks modifications

Both converters follow the same control principles as the individual models, but some slight changes are added in order to coordinate both controls.

#### Grid Forming

The main controls of the [EMT Grid Forming converter](../../GridFormingConverter/UPC-EMTGridFormingVSC/) in the DC link are the same as in the isolated mode. In this case, instead of having an AC equivalent voltage source, there is a three-phase load or generator which can be modelled using the ZIP model (for instance, some possibilities would be a fixed impedance load, or a fixed power load/generator). Since there is no grid, the model proposed imposes directly the angle from a reference angular speed, without considering any droop control, as well as the voltage magnitude. This means that the AC side of the GFM converter acts as an ideal voltage source. Another possibility would consider an active power setpoint with a droop control for the frequency. Again, this showcases how the two degrees of freedom of the converter can be used to define the control.

#### Grid Following

There are a few more changes in this case since it has to maintain a DC voltage level while exchanging power. Its control resembles the one in the [STATCOM model](../../CompensationDevices/STATCOM/), incorporating a DC voltage control over the standard Grid Following controls, but adding the DC power exchanged in the active power tracking. The modified setpoint tracking is shown in the following block diagram:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
 <img src="{{ 'PcontrolHVDC.svg'}}"
      alt="HVDC P control"
      style="float: center; margin-right: 10px; width: 700px;" />
 </div>
<div align = 'center'>
Figure 2: Active power control diagram of the HVDC model
</div>
<br>

Where $$P_{DC}$$ is the power injected from the DC line, $$P^*$$ is the power setpoint that has to be drawn from the capacitors from the DC side in order to maintain the voltage and $$P$$ is the resulting injection to the AC grid grom the GFOL converter.

## Open source implementations

This model has been successfully implemented in :

| Software      | URL | Language | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | ------------------- |------------------- | -------- |
| Dynawo | [Link](https://github.com/dynawo/dynawo/tree/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/HVDC/HvdcVsc) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/)  | 01/08/2024 | The model considers two grid following converters instead of one grid forming. There is a grid equivalent at the AC side of each converter |


## Table of references

<a id="1">[1]</a> Mishra, G. K.; Singh, Y. "Performance Analysis of Various Topologies in HVDC Networks". International Journal of Power Systems, 6, 37-47, 2021

<a id="2">[2]</a> Van Hertem, D., Gomis-Bellmunt, O., & Liang, J. "HVDC grids: for offshore and supergrid of the future", John Wiley & Sons (2016).

<a id="3">[3]</a> Beerten, J., Gomis-Bellmunt, O., Guillaud, X., Rimez, J., Van Der Meer, A., & Van Hertem, D. (2014, August). Modeling and control of HVDC grids: A key challenge for the future power system. In 2014 Power Systems Computation Conference (pp. 1-21). IEEE.

<a id="4">[4]</a> Gomis-Bellmunt, O., Sánchez-Sánchez, E., Arévalo-Soler, J., & Prieto-Araujo, E. (2020). Principles of operation of grids of DC and AC subgrids interconnected by power converters. IEEE Transactions on Power Delivery, 36(2), 1107-1117.

<a id="5">[5]</a> Alvarez-Bustos, A. (2021). Flexible universal branch model for steady state operational analysis and optimisation of hybrid ac/dc grids (Doctoral dissertation, Durham University).
