---
layout: page 
title: EPRI Grid Forming
tags: ["Opensource", "RMS", "GFM", "GFL", "converter", "wind", "generic", "pv", "hvdc", "EPRI", "Dynawo"] 
date: 20/12/2024
last-updated: 22/01/2025
id: #63
authors: Nils Wiese (Fraunhofer IEE), Martin Franke (Fraunhofer IEE), Saikrishna Vallabhaneni
reviewers: Lampros Papangelis (CRESYM)
---


## Context

This model was developed by Electric Power Research Institute (EPRI) and
provides a standardized approach for inverter based resources [1]. The
original model is described in a report available
[here](https://www.epri.com/research/products/000000003002021403).

## Model use, assumptions, validity domain and limitations

The model is a positive-sequence RMS model, hence it assumes symmetrical
operating conditions and neglects high-frequency dynamics. This type of
model is often used in large-scale stability studies, for which it
reflects the relevant phenomena. It is not a detailed physical model of
the unit. Also for some stability phenomena (e.g. resonance stability)
this model is not sufficient and EMT models or other approaches may be
necessary. A comparison against EMT is shown in the EPRI documentation.
It is also available for
[PSCAD](https://www.pscad.com/knowledge-base/download/PSCAD-EPRI-Generic-GFM.pdf).

## Model description

### Difference between grid following and grid forming inverter

A grid-following inverter synchronizes with the power grid’s voltage and
frequency using a Phase-Locked Loop (PLL), which tracks the grid’s phase
angle and enables the inverter to adjust accordingly. In contrast, a
grid-forming inverter can actively establish the grid’s voltage and
frequency, allowing it to create or stabilize the grid, particularly in
situations where traditional grid infrastructure is weak or absent.
Unlike grid-following inverters, grid-forming inverters do not rely on a
PLL; instead, they can synchronize with the grid similarly to a
synchronous generator. Several approaches can be found in literature, a
subset of which is present in the EPRI model.

### EPRI GFM operation modes

The Generic EPRI GFM model offers four control modes:

- Droop based, $$\omega_\mathrm{flag}=1$$, see
  <a href="#fig-droop_mode" class="quarto-xref">Figure 1</a>
- Virtual Synchronous Machine (VSM), $$\omega_\mathrm{flag}=2$$, see
  <a href="#fig-vsm_mode" class="quarto-xref">Figure 2</a>
- Dispatchable Virtual Oscillator (dVOC) based GFM,
  $$\omega_\mathrm{flag}=3$$, see
  <a href="#fig-dvoc_mode" class="quarto-xref">Figure 3</a>
- Phase Locked Loop (Grid following mode), $$\omega_\mathrm{flag}=0$$, see
  <a href="#fig-pll_mode" class="quarto-xref">Figure 4</a>

## Model schema

The different control method diagrams of the GFM is shown below:


![](./drawings/Droop_Mode.drawio.svg)


<div id="fig-droop_mode">
Figure 1: Droop mode diagram
</div>


![](./drawings/VSM_Mode.drawio.svg)


<div id="fig-vsm_mode">
Figure 2: VSM mode diagram
</div>


![](./drawings/DVOC_Mode.drawio.svg)


<div id="fig-dvoc_mode">
Figure 3: dVOC mode diagram

</div>

![](./drawings/PLL_Mode.drawio.svg)


<div id="fig-pll_mode">
Figure 4: PLL mode diagram

</div>

> [!NOTE]
>
> The xy reference frame is the real-imaginary coordinate frame of the
> network, to which all voltage angles are typically referenced, while
> the dq reference frame functions as the coordinate system of the
> control. The relative angle between these two reference frames is
> represented by the control variable $$\theta_\mathrm{inv}$$.

### D and q reference currents calculation


![](./drawings/Grid_Forming.drawio.svg)


<div id="fig-IdIqRefCalculation">
Figure 5: Calculation of d and q reference currents

</div>

## Parameters

In [1], per-unit parameters are based on the inverter’s rated apparent
power $$S_\mathrm{r}$$ in MVA with a default value of 100 MVA.

<div id="tbl-parameters">

Table 1: Parameters
</div>

| name                             | type  | unit  | description                             | typical value                                                        |
| :------------------------------- | :---- | :---- | :-------------------------------------- | :------------------------------------------------------------------- |
| $$\Delta\omega_\mathrm{max}$$    | float | rad/s | Maximum frequency deviation             | 75.0/$$\omega_\mathrm{base}$$                                        |
| $$\Delta\omega_\mathrm{min}$$    | float | rad/s | Minimum frequency deviation             | -75.0/$$\omega_\mathrm{base}$$                                       |
| $$d_\mathrm{d}$$                 | float | pu    | VSM damping factor                      | 0.11                                                                 |
| $$K_\mathrm{1}$$                 | int   | pu    | – (depends on $$\omega_\mathrm{flag}$$) | see <a href="#tbl-controllerParams2" class="quarto-xref">Table 3</a> |
| $$K\mathrm{2}$$                  | int   | pu    | – (depends on $$\omega_\mathrm{flag}$$) | see <a href="#tbl-controllerParams2" class="quarto-xref">Table 3</a> |
| $$K_\mathrm{2}^{\mathrm{dvoc}}$$ | int   | pu    | – (depends on $$\omega_\mathrm{flag}$$) | see <a href="#tbl-controllerParams2" class="quarto-xref">Table 3</a> |
| $$K_\mathrm{Ii}$$                | float | pu    | Current controller integral gain        | 20.0                                                                 |
| $$K_\mathrm{Ip}$$                | float | pu    | Active power integral gain              | 20.0                                                                 |
| $$K_\mathrm{Ipll}$$              | float | pu    | PLL integral gain                       | 700.0                                                                |
| $$K_\mathrm{Iv}$$                | float | pu    | Voltage control integral gain           | see <a href="#tbl-controllerParams" class="quarto-xref">Table 2</a>  |
| $$K_\mathrm{Pi}$$                | float | pu    | Current controller proportional gain    | 0.5                                                                  |
| $$K_\mathrm{Pp}$$                | float | pu    | Active power proportional gain          | 0.5                                                                  |
| $$K_\mathrm{Ppll}$$              | float | pu    | PLL proportional gain                   | 20.0                                                                 |
| $$K_\mathrm{Pv}$$                | float | pu    | Voltage control proportional gain       | see <a href="#tbl-controllerParams" class="quarto-xref">Table 2</a>  |
| $$m_\mathrm{f}$$                 | float | pu    | VSM inertia constant                    | 0.15                                                                 |
| $$\omega_\mathrm{drp}$$          | float | pu    | Frequency droop                         | 0.033                                                                |
| $$\omega_\mathrm{flag}$$         | int   | pu    | GFM control type                        | 0-3                                                                  |
| $$PQ_\mathrm{flag}$$             | bool  | pu    | Current priority                        | false: P priority; true: Q priority                                  |
| $$Q_\mathrm{drp}$$               | float | pu    | Voltage droop                           | 4.5                                                                  |
| $$R_\mathrm{f}$$                 | float | pu    | Filter resistance                       | 0.0015                                                               |
| $$T_\mathrm{e}$$                 | float | s     | Output state time constant              | 0.01                                                                 |
| $$T\mathrm{f}$$                  | int   | pu    | – (depends on $$\omega_\mathrm{flag}$$) | see <a href="#tbl-controllerParams2" class="quarto-xref">Table 3</a> |
| $$T_\mathrm{r}$$                 | float | s     | Transducer time constant                | 0.005                                                                |
| $$T_\mathrm{v}$$                 | int   | pu    | – (depends on $$\omega_\mathrm{flag}$$) | see <a href="#tbl-controllerParams2" class="quarto-xref">Table 3</a> |
| $$V_\mathrm{dip}$$               | float | pu    | State freeze threshold                  | 0.8                                                                  |
| $$X_\mathrm{f}$$                 | float | pu    | Filter reactance                        | 0.15                                                                 |


$$\omega_\mathrm{base}$$ is the nominal angular frequency in rad/s.

<div id="tbl-controllerParams">

Table 2: Voltage controller parameters depending on control mode
</div>

| name            | $$\omega_\mathrm{flag}=0$$ | $$\omega_\mathrm{flag} \neq  0$$ |
|-----------------|--------------------------|--------------------------------|
| $$K_\mathrm{Iv}$$ | 150.0                    | 10.0                           |
| $$K_\mathrm{Pv}$$ | 0.5                      | 3.0                            |

<div id="tbl-controllerParams2">

Table 3: Mode dependent paramaters
</div>

| GFM Control | $$K_\mathrm{d}$$ | $$K_\mathrm{1}$$ | $$K_\mathrm{2}$$ | $$K_\mathrm{2}^{\mathrm{dVOC}}$$ |
|----|----|----|----|----|
| PLL | 0.0 | 0.0 | 0.0 | 0.0 |
| Droop | 0.0 | $$\omega_\mathrm{drp}$$ | $$Q_\mathrm{drp}$$ | 0.0 |
| VSM | $$d_\mathrm{d}\omega_\mathrm{drp}$$ | $$\omega_\mathrm{drp}$$ | $$Q_\mathrm{drp}$$ | 0.0 |
| dVOC | 0.0 | $$\omega_\mathrm{drp}/s_2^3$$ | $$\omega_\mathrm{drp}/s_3$$ | see <a href="#eq-dvoc1" class="quarto-xref">Equation 1</a> |


<span id="eq-dvoc1">$$
\frac{K_2^{dvoc}}{\omega_{drp}} = \frac{4 \cdot 100^4}{100^4 - \left( 2 \cdot \left(100 - 100 \cdot Q_{drp}\right)^2 - 100^2 \right)^2}
 \qquad(1)$$</span>

### Inputs

<div id="tbl-inputs">

Table 4: Inputs
</div>

| name                    | type  | unit | description                               |
| ----------------------- | ----- | ---- | ----------------------------------------- |
| $$I_\mathrm{x,y}$$      | float | pu   | measured current in real/imag. quantities |
| $$\omega_\mathrm{ref}$$ | float | pu   | speed reference (difference to nominal)   |
| $$P_\mathrm{aux}$$      | float | pu   | auxiliary active power                    |
| $$P_\mathrm{ref}$$      | float | pu   | active power setpoint                     |
| $$Q_\mathrm{aux}$$      | float | pu   | auxiliary reactive power                  |
| $$Q_\mathrm{ref}$$      | float | pu   | reactive power setpoint                   |
| $$V_\mathrm{ref}$$      | float | pu   | voltage setpoint                          |
| $$V_\mathrm{x,y}$$      | float | pu   | measured voltage in real/imag. quantities |


### Outputs

<div id="tbl-outputs">

Table 5: Outputs
</div>

| name             | type  | unit | description                     |
| ---------------- | ----- | ---- | ------------------------------- |
| $$E_\mathrm{x}$$ | float | pu   | output voltage in real quantity |
| $$E_\mathrm{y}$$ | float | pu   | output voltage in imag quantity |


## Initial equations

<span id="eq-s0">$$
s_0 = P_\mathrm{ref}
 \qquad(2)$$</span>

<span id="eq-s1">$$
s_1 = Q_\mathrm{ref}
 \qquad(3)$$</span>

<span id="eq-s2">$$ 
s_2 = \theta_\mathrm{loadflow} 
 \qquad(4)$$</span> <span id="eq-s3">$$ 
s_3 = V_\mathrm{ref}
 \qquad(5)$$</span> <span id="eq-s4">$$ 
s_4 = \omega_\mathrm{grid} - \omega_\mathrm{base}
 \qquad(6)$$</span> <span id="eq-s5">$$ 
s_5 = \theta_\mathrm{loadflow} 
 \qquad(7)$$</span> <span id="eq-s6">$$ 
s_6 = E_\mathrm{q,loadflow} - v_\mathrm{q,loadflow} - i_\mathrm{q,loadflow}R_\mathrm{f} - i_\mathrm{d,loadflow}X_\mathrm{f}
 \qquad(8)$$</span> <span id="eq-s7">$$ 
s_7 = E_\mathrm{d,loadflow} - v_\mathrm{d,loadflow} - i_\mathrm{d,loadflow}R_\mathrm{f} + i_\mathrm{q,loadflow}X_\mathrm{f}
 \qquad(9)$$</span> <span id="eq-s8">$$ 
s_8 = E_\mathrm{q,loadflow} 
 \qquad(10)$$</span> <span id="eq-s9">$$ 
s_9 = E_\mathrm{d,loadflow} 
 \qquad(11)$$</span>

<span id="eq-s10">$$ 
s_{10} = i_\mathrm{q,loadflow} 
 \qquad(12)$$</span> <span id="eq-s11">$$ 
s_{11} = i_\mathrm{q,loadflow} 
 \qquad(13)$$</span> <span id="eq-s12">$$ 
s_{12} = i_\mathrm{d,loadflow}  
 \qquad(14)$$</span> <span id="eq-s13">$$ 
s_{13} = i_\mathrm{d,loadflow} 
 \qquad(15)$$</span>

The index “loadflow” indicates that this is the solution of a loadflow.

## Open source implementations

This model has been successfully implemented in:

| Software               | URL                                        | Language | Open-Source License                                | Last consulted date | Comments                                                                                              |
| ---------------------- | ------------------------------------------ | -------- | -------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
| Open Modelica / Dynawo | [Dynawo](https://github.com/dynawo/dynawo) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/) | 12/12/2024          | For modeling assumptions and test results, see [Dynawo](https://github.com/dynawo/dynawo) repository. |


## Table of references & license

<div id="refs" class="references csl-bib-body" entry-spacing="0">

<div id="ref-epri2021" class="csl-entry">

<span class="csl-left-margin">[1]
</span><span class="csl-right-inline">EPRI, “Generic Positive Sequence
Domain Model of Grid Forming Inverter Based Resource,” Dec. 2021.</span>

</div>

</div>
