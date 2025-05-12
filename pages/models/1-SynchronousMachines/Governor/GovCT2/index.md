---
layout: page
title: GovCT2 / GGOV2
tags: ["regulations", "governor", "controller", "synchronous machine", "Opensource", "IEC", "CIMDynamic", "RMS", "modelica", "dynawo", "RMS", "#53"]
date: 23/04/2024
last-updated: 20/06/2024
authors: Martin Franke (Fraunhofer IEE)
reviewers: Mathilde Bongrain (CRESYM)
id: #53
---

## Context

In a power plant, a governor regulates the mechanical power ($$P_m$$) or
torque ($$T_m$$) delivered from the turbine to the electrical generator.
This governor model includes the turbine dynamics, i.e. it takes a
reference power and generator speed and outputs the mechanical torque.

This GovCT2 is a modification of the GovCT1 in order to represent the
frequency-dependent fuel flow limit of a specific gas turbine
manufacturer. Both are based on *Rowen’s model* from 1983 [1].

When comparing to older standards: GovCT2 is identical to GGOV2 and
GovCT1 is identical to GGOV1.

GovCT2 is part of the CIM/CGMES standard, see [2] and [3]. CIM is
developed by ENTSO-E and aims at ensuring the reliability of grid models
and market information exchanges. ENTSO-E developed CGMES as a superset
of the IEC CIM standards (belonging to IEC CIM16) in 2013 to fulfill the
requirements of transmission system operators and their data exchanges.

The following information has been gathered from [2], [4] and [3].

## Model use, assumptions, validity domain and limitations

General model for any prime mover with a PID governor.

For example used for:

Can be used to represent a variety of prime movers controlled by PID
governors, such as:

- Single shaft combined cycle turbines and Gas turbines
- Diesel engines (with modern digital or electronic governors)
- Steam turbines with
  - steam supplied from a large boiler drum
  - or steam supplied from a large header with approximately constant
    pressure (over the time period of the simulation)
- Simple hydro turbines in dam configurations with
  - short water column length
  - and minimal water inertia effects

The model is a positive-sequence RMS model, hence it assumes symmetrical
operating conditions and neglects high-frequency dynamics. This type of
model is often used in large-scale stability studies, for which it
reflects the relevant phenomena. It is not a detailed physical model of
the unit. Also for some stability phenomena (e.g. resonance stability)
this model is not sufficient and EMT models or other approaches may be
necessary.

## Model description

### Model schema


![](drawings/GovCT2.drawio.svg)

<div id="fig-modelSchema">

Figure 1: Model schema, based on [3]

</div>

### Major control paths

The following section is based on [1] (p. 517f).

The model has three major control paths (speed/load, acceleration,
temperature) associated with the dynamic response during disturbances.
Outputs of these control functions are all inputs into a minimum value
selector determining the least fuel request. This is then given to the
actuator.

#### Speed/load (fsrn)

This can be considered the main control path. It corresponds directly to
the governor. The inputs are load demand $$P_\mathrm{ref}$$, rotor speed
$$\omega$$ and automatic generation control power $$P_\mathrm{MWSet}$$.

The resulting signal is then passed through a deadband, limits and a
PID-controller. To represent a specific governor, some elements can be
deactivated by setting parameters to zero (examples in [1]).

##### Supervisory load controller

In [3] the $$P_\mathrm{MWSet}$$ path is described as an optional
additional outer loop associated with a power plant control (supervisory
load controller). This is active when $$K_\mathrm{I\,MW}$$ is not equal to
zero. It is a slow acting reset control and it adjusts the speed/load
reference of the turbine governor to maintain the electrical power of
the unit at the value which it has been initialized with. That value is
stored in $$P_\mathrm{MW\,set}$$ when the model is initialized, and can be
changed during simulation. The load controller is expected to have a
slow reaction compared to the speed governor. [3]

A value $$K_\mathrm{I\,MW}$$ = to 0.01 corresponds to a time constant of
100 s; 0.001 corresponds to 1000 s (relatively slow acting) [3].

##### Acceleration (fsra)

> […] for studies of large power systems, [the acceleration control
> loop] can be ignored. It is important for islanding studies and
> smaller power systems with large frequency variations. If the
> generating unit begins to accelerate at a rate over
> [$$a_\mathrm{set}$$] (pu/s^2) then this control loop acts to limit
> fuel flow. [1]

It can be disabled by setting $$a_\mathrm{set}$$ to a large value, such
as 1. [3]

##### Temperature (fsrt) / load limit

The load limiter module allows to set a maximum output limit
$$P_\mathrm{ldref}$$. This can also model an exhaust temperature limit, in
which case $$P_\mathrm{ldref}$$ is not to be interpreted as a power value.
The time constant $$T_\mathrm{f\,load}$$ should match the measurement time
constant for temperature (or power or which ever signal is being
modelled). Additionally, the gains of the limiter, $$K_\mathrm{P\,load}$$
and $$K_\mathrm{I\,load}$$, should be set to achieve fast and stable
control when the limit $$P_\mathrm{ldref}$$ is reached. To deactivate the
load limit, set the parameter $$P_\mathrm{ldref}$$ to a high value [3].

The lead-lag block with $$T_\mathrm{sa}$$ and $$T_\mathrm{sb}$$ can be used
to model the exhaust gas temperature measurement system in gas turbines.
A “radiation shield” component of larger gas turbines can be modeled by
setting $$T_\mathrm{sa}=4\,\mathrm{s}$$ and $$T_\mathrm{sb}=5\,\mathrm{s}$$,
for example [3].

> The temperature limit [tlim] in pu corresponds to the fuel flow
> required for 1 pu turbine power. [1]

#### Turbine/engine model

The output from the low value select block is given to the first order
lag element representing the fuel or gate system (Valve). [1]

$$V_\mathrm{max}$$ and $$V_\mathrm{min}$$ represent the maximum and minimum
fuel valve opening. $$W_\mathrm{fspd}$$ is the fuel flow multiplyer.

$$W_\mathrm{fnl}$$ is the fuel required to run the compensator [1].

The range of fuel valve travel and of fuel flow is unity, so the limits
lie between 0 pu and 1 pu. $$V_\mathrm{max}$$ can be reduced below 1, for
example to model a load limit defined by the operator or supervisory
controller [3]. Additionally there is a dynamic frequency dependent
limit reduction, see
<a href="#sec-freqDepLimit" class="quarto-xref">Section 3.2.3</a>.

For a gas turbine, in the presence of a minimum firing limit,
$$V_\mathrm{min}$$ normally is set greater than zero and less than
$$W_\mathrm{fnl}$$ [3].

The value of the fuel flow at maximum power shall be $$\leq 1$$, depending
on the value of $$K_\mathrm{turb}$$ [3]. It translates the fuel
consumption (or water flow) to mechanical power output [1].

The time delay $$e^{-sT_\mathrm{eng}}$$ is used in representing diesel
engines where there is a small but measurable transport delay between a
change in fuel flow setting and the development of torque.
$$T_\mathrm{eng}$$ should be zero in all but special cases where this
transport delay is of particular concern [3].

The switch $$W_\mathrm{fspd}$$ is responsible for recognizing whether fuel
flow, for a given fuel valve stroke, is be proportional to engine speed
[3]. If True, fuel flow is proportional to speed. This is applicable
for some gas turbines and diesel engines with positive displacement fuel
injectors. If false, the fuel control system keeps fuel flow independent
of engine speed.

##### Speed sensitivity / Damping

If $$D_\mathrm{m}=0$$, the speed sensitivity paths are not active. [3]

If $$D_\mathrm{m}>0$$, it models friction losses (variation of the engine
power with the shaft speed; slightly increasing losses with increasing
speed are characteristic for reciprocating engines and some
aeroderivative turbines [3]).

If $$D_\mathrm{m}=<0$$, it can model an influence of rotation speed on
exhaust temperature using an exponential characteristic determined by
$$D_\mathrm{m}$$. The maximum permissible fuel flow falls with falling
speed (typical for single-shaft industrial turbines due to exhaust
temperature limits) [3]. The authors suspect that this could represent
fan cooling.

#### Frequency dependent (valve) limit

The frequency-dependent limit block outputs the upper limit for valve
position / the fuel flow signal fsr. It is shown in
<a href="#fig-frequencyDependentLimit" class="quarto-xref">Figure 2</a>.

In normal operation, the limit is
$$V_\mathrm{max\,\omega} = V_\mathrm{max}$$ and the there is no frequency
dependent reduction.

When the frequency $$f$$ in Hz drops below $$f_\mathrm{lim\,1}$$, the value
for $$P_\mathrm{lim}$$, the power limit, is calculated by linear
interpolation between the values
$$f_\mathrm{lim\,1}, f_\mathrm{lim\,2}, \dots$$ and
$$P_\mathrm{lim\,1}, P_\mathrm{lim\,2}, \dots$$ of a lookup table. The
table consists of 10 data points which monotonically decrease in both
power and frequency, point 1 being the hightest. The lowest data point
does act as a lower limit, i.e. is not extrapolated to lower values.

$$V_\mathrm{max\,\omega}$$ then ramps with the rate $$P_\mathrm{rate}$$ from
the initial and maximum value to the new value
$$V_\mathrm{max\,omega} = (P_\mathrm{lim} / K_\mathrm{turb} + W_\mathrm{fnl})$$.

$$P_\mathrm{lim}$$ will then change with frequency. If f rises above
$$P_\mathrm{lim\,1}$$ again, $$V_\mathrm{max\,\omega}$$ ramps back to
$$V_\mathrm{max}$$ [3].



![](drawings/GovCT2.frequencylimit.drawio.svg)

<div id="fig-frequencyDependentLimit">

Figure 2: Frequency dependent valve limit as described in [3]

</div>

### Parameters

Per-unit power parameters are based on $$P_\mathrm{base}$$, which is
normally the capability of the turbine in MW. Per-unit frequency or
acceleration parameters are based on the nominal frequency of the grid
(e.g. 50 Hz in Europe).

<div id="tbl-parameters">

Table 1: Parameters

</div>

| name                          | type  | unit e | IEC name     | description                                                                                                | typical value |
| :---------------------------- | :---- | :----- | :----------- | :--------------------------------------------------------------------------------------------------------- | :------------ |
| $$a_\mathrm{set}$$            | float | pu/s   | Aset         | Acceleration limiter setpoint                                                                              | 10            |
| $$\Delta\omega_\mathrm{db}$$  | float | pu     | db           | Frequency error deadband. Recommended to be =0 in most applications [3]                                    | 0             |
| $$\Delta\omega_\mathrm{max}$$ | float | pu     | Maxerr       | Maximum value for frequency error                                                                          | 1             |
| $$\Delta\omega_\mathrm{min}$$ | float | pu     | Minerr       | Minimum value for frequency error                                                                          | -1            |
| $$\Delta t$$                  | float | s      | $$\Delta t$$ | Correction factor to adapt the unit of $$K_\mathrm{a}$$ from pu/s to pu                                    | 1             |
| $$D_\mathrm{m}$$              | float | pu     | dm           | Speed sensitivity coefficient, see <a href="#sec-speedSensitivity" class="quarto-xref">Section 3.2.2.1</a> | 0             |
| $$f_\mathrm{lim\,1}$$         | float | Hz     | flim1        | Frequency threshold 1                                                                                      | 59            |
| $$f_\mathrm{lim\,10}$$        | float | Hz     | flim10       | Frequency threshold 10                                                                                     | 0             |
| $$f_\mathrm{lim\,2}$$         | float | Hz     | flim2        | Frequency threshold 2                                                                                      | 0             |
| $$f_\mathrm{lim\,3}$$         | float | Hz     | flim3        | Frequency threshold 3                                                                                      | 0             |
| $$f_\mathrm{lim\,4}$$         | float | Hz     | flim4        | Frequency threshold 4                                                                                      | 0             |
| $$f_\mathrm{lim\,5}$$         | float | Hz     | flim5        | Frequency threshold 5                                                                                      | 0             |
| $$f_\mathrm{lim\,6}$$         | float | Hz     | flim6        | Frequency threshold 6                                                                                      | 0             |
| $$f_\mathrm{lim\,7}$$         | float | Hz     | flim7        | Frequency threshold 7                                                                                      | 0             |
| $$f_\mathrm{lim\,8}$$         | float | Hz     | flim8        | Frequency threshold 8                                                                                      | 0             |
| $$f_\mathrm{lim\,9}$$         | float | Hz     | flim9        | Frequency threshold 9                                                                                      | 0             |
| $$K_\mathrm{a}$$              | float | pu     | Ka           | Acceleration limiter gain                                                                                  | 10            |
| $$K_\mathrm{D\,gov}$$         | float | pu     | Kdgov        | Governor derivative gain                                                                                   | 0             |
| $$K_\mathrm{I\,gov}$$         | float | pu     | Kigov        | Governor integral gain                                                                                     | 0.45          |
| $$K_\mathrm{I\,load}$$        | float | pu     | Kiload       | Load limiter integral gain                                                                                 | 1             |
| $$K_\mathrm{I\,MW}$$          | float | pu     | Kimw         | Supervisory load controller integral gain                                                                  | 0             |
| $$K_\mathrm{P\,gov}$$         | float | pu     | Kpgov        | Governor proportional gain                                                                                 | 4             |
| $$K_\mathrm{P\,load}$$        | float | pu     | Kpload       | Load limiter proportional                                                                                  | 1             |
| $$K_\mathrm{turb}$$           | float | pu     | Kturb        | Turbine gain (translates from fuel flow to power)                                                          | 1.9168        |
| $$P_\mathrm{base}$$           | float | MW     | Mwbase       | Base for power values (\> 0)                                                                               |               |
| $$P_\mathrm{ldref}$$          | float | pu     | Ldref        | Load limiter reference value                                                                               | 1             |
| $$P_\mathrm{lim\,1}$$         | float | pu     | plim1        | Power limit 1                                                                                              | 0.8325        |
| $$P_\mathrm{lim\,10}$$        | float | pu     | plim10       | Power limit 10                                                                                             | 0             |
| $$P_\mathrm{lim\,2}$$         | float | pu     | plim2        | Power limit 2                                                                                              | 0             |
| $$P_\mathrm{lim\,3}$$         | float | pu     | plim3        | Power limit 3                                                                                              | 0             |
| $$P_\mathrm{lim\,4}$$         | float | pu     | plim4        | Power limit 4                                                                                              | 0             |
| $$P_\mathrm{lim\,5}$$         | float | pu     | plim5        | Power limit 5                                                                                              | 0             |
| $$P_\mathrm{lim\,6}$$         | float | pu     | plim6        | Power limit 6                                                                                              | 0             |
| $$P_\mathrm{lim\,7}$$         | float | pu     | plim7        | Power limit 7                                                                                              | 0             |
| $$P_\mathrm{lim\,8}$$         | float | pu     | plim8        | Power limit 8                                                                                              | 0             |
| $$P_\mathrm{lim\,9}$$         | float | pu     | plim9        | Power Limit 9                                                                                              | 0             |
| $$P_\mathrm{rate}$$           | float | pu     | prate        | Ramp rate for frequency-dependent power limit                                                              | 0.017         |
| $$R$$                         | float | pu     | R            | Droop (frequency/power)                                                                                    | 0.05          |
| $$R_\mathrm{close}$$          | float | pu/s   | Rclose       | Minimum rate for valve closing                                                                             | -99           |
| $$R_\mathrm{down}$$           | float | pu     | Rdown        | temperature/load limit path output decrease rate limit                                                     | -99           |
| $$R_\mathrm{open}$$           | float | pu/s   | Ropen        | Maximum rate for valve closing                                                                             | 99            |
| $$R_\mathrm{select}$$         | int   | \-     | Rselect      | governor controller feedback mode switch                                                                   |               |
| $$R_\mathrm{up}$$             | float | pu     | Rup          | temperature/load limit path output increase rate limit                                                     | 99            |
| $$T_\mathrm{a}$$              | float | s      | Ta           | Acceleration limiter time constant                                                                         | 1             |
| $$T_\mathrm{act}$$            | float | s      | Tact         | actuator (valve) reaction time constant                                                                    | 0.4           |
| $$T_\mathrm{b}$$              | float | s      | Tb           | Turbine lag time constant                                                                                  | 0.1           |
| $$T_\mathrm{c}$$              | float | s      | Tc           | Turbine lead time constant                                                                                 | 0             |
| $$T_\mathrm{dgov}$$           | float | s      | Tdgov        | Governor controller derivative time constant                                                               | 1             |
| $$T_\mathrm{D\,ratelim}$$     | float | s      | \-           | Ramp rate limter derivative time constant in s                                                             | 0.001         |
| $$T_\mathrm{eng}$$            | float | s      | Teng         | Transport time delay for diesel engine                                                                     | 0             |
| $$T_\mathrm{f\,load}$$        | float | s      | Tfload       | Load limiter time constant                                                                                 | 3             |
| $$T_\mathrm{last\,value}$$    | float | s      | \-           | Time constant of very fast first order block to prevent algebraic loop                                     | 1e-9          |
| $$T_\mathrm{p\,elec}$$        | float | s      | Tpelec       | Electrical power measurement time constant                                                                 | 2.5           |
| $$T_\mathrm{sa}$$             | float | s      | Tsa          | lead time constant of temperature detection                                                                | 0             |
| $$T_\mathrm{sb}$$             | float | s      | Tsb          | lag time constant of temperature detection                                                                 | 50            |
| $$V_\mathrm{max}$$            | float | pu     | Vmax         | Maximum valve position limit                                                                               | 1             |
| $$V_\mathrm{min}$$            | float | pu     | Vmin         | Minimum valve position limit                                                                               | 0.175         |
| $$W_\mathrm{fnl}$$            | float | pu     | Wfnl         | fuel flow with no load                                                                                     | 0.187         |
| $$W_\mathrm{fspd}$$           | bool  | \-     | Wfspd        | Switch for fuel source characteristic                                                                      | false         |



### Variables

#### Inputs

<div id="tbl-inputs">

Table 2: Inputs

</div>

| name                 | type  | unit | IEC name   | description                                                          |
| -------------------- | ----- | ---- | ---------- | -------------------------------------------------------------------- |
| $$\omega$$           | float | pu   | $$\omega$$ | rotor speed                                                          |
| $$P_\mathrm{ref}$$   | float | pu   | Pref       | load setpoint                                                        |
| $$P_\mathrm{MWSet}$$ | float | pu   | Pmwset     | Supervisory power controller setpoint (automatic generation control) |
| $$P_\mathrm{e}$$     | float | pu   | Pe         | measured electric power generation                                   |


### Outputs

<div id="tbl-outputs">

Table 3: Outputs
</div>

| name             | type  | unit | IEC name | description      |
| ---------------- | ----- | ---- | -------- | ---------------- |
| $$P_\mathrm{m}$$ | float | pu   | Pm       | mechanical power |



### Equations & algorithm  

–

### Initial equations / boundary conditions

The initial values for the system’s states are calculated from the
initial mechanical power $$P_\mathrm{m\,0}$$ and rotation speed
$$\omega_\mathrm{0}$$.

#### Helper variables

The following “helper variables” are defined to avoid repetition in the
definitions of initial states below. They are the initial values of
signals at certain points in
<a href="#fig-modelSchema" class="quarto-xref">Figure 1</a>.

<span id="eq-initPmnoloss">$$
P_\mathrm{m\,noloss\,0} = 
\begin{cases}
    P_\mathrm{m\,0} + \omega_\mathrm{0} \cdot D_\mathrm{m},& \text{if } D_\mathrm{m}> 0\\
    P_\mathrm{m\,0},              & \text{otherwise}
\end{cases}
 \qquad(1)$$</span>

<span id="eq-initCfe">$$
C_\mathrm{fe\,0} = 
\begin{cases}
    W_\mathrm{fnl} + P_\mathrm{m\,noloss\,0} / K_\mathrm{turb},& \text{if } K_\mathrm{turb}>0\\
    W_\mathrm{fnl},              & \text{otherwise}
\end{cases}
 \qquad(2)$$</span>

<span id="eq-initValve">$$
V_\mathrm{0} = 
\begin{cases}
    C_\mathrm{fe\,0} / \omega_\mathrm{0},& \text{if } W_\mathrm{fspd}\\
    C_\mathrm{fe\,0},              & \text{otherwise}
\end{cases}
 \qquad(3)$$</span>

<span id="eq-initTex">$$
\vartheta_\mathrm{ex\,0} = 
\begin{cases}
    C_\mathrm{fe\,0} \cdot \omega_\mathrm{0}^{D_\mathrm{m}},& \text{if } D_\mathrm{m}<0\\
    1,              & \text{otherwise}
\end{cases}
 \qquad(4)$$</span>

<span id="eq-initFsrt">$$
F_\mathrm{srt\,0} = (P_\mathrm{ldref}/K_\mathrm{turb} + W_\mathrm{fnl} - \vartheta_\mathrm{ex\,0}) \cdot K_\mathrm{P\,load} + x_\mathrm{I\,load}
 \qquad(5)$$</span>

#### Initial states

<span id="eq-initXiload">$$
x_\mathrm{I\,load\,0} = 1
 \qquad(6)$$</span>

<span id="eq-initXTurbine">$$
x_\mathrm{turb\,0} = P_\mathrm{m\,noloss\,0}
 \qquad(7)$$</span>

<span id="eq-initXValve">$$
x_\mathrm{valve\,0} = V_\mathrm{0}
 \qquad(8)$$</span>

<span id="eq-initXFdl">$$
x_\mathrm{fdl\,ratelimit\,0} = K_\mathrm{turb}(V_\mathrm{max}-W_\mathrm{fnl})
 \qquad(9)$$</span>

<span id="eq-initXIGov">$$
x_\mathrm{I\,gov\,0} = V_\mathrm{0}
 \qquad(10)$$</span>

<span id="eq-initXMeasPe">$$
x_\mathrm{meas\,Pe\,0} = P_\mathrm{m\,0}
 \qquad(11)$$</span>

<span id="eq-initFsrt">$$
x_\mathrm{fsrt\,ratelim\,0} = F_\mathrm{srt\,0}
 \qquad(12)$$</span>

<span id="eq-Texm">$$
x_\mathrm{meas\,\vartheta\,ex\,0} = \vartheta_\mathrm{ex\,0}
 \qquad(13)$$</span>

<span id="eq-initTex">$$
x_\mathrm{\vartheta\,ex\,0} = \vartheta_\mathrm{ex\,0}
 \qquad(14)$$</span>

<span id="eq-initXIMw">$$
x_\mathrm{I\,MW} = 0
 \qquad(15)$$</span>

<span id="eq-initLastValue">$$
x_\mathrm{last\,value\,0} = V_\mathrm{0}
 \qquad(16)$$</span>

<span id="eq-initFsra">$$
x_\mathrm{fsra\,0} = 0
 \qquad(17)$$</span>


#### Initial power reference

<span id="eq-initPref">$$
P_\mathrm{ref\,0} = 
\begin{cases}
    0,                         & \text{if } R_\mathrm{select}=0\\
    R \cdot P_\mathrm{m\,0},   & \text{if } R_\mathrm{select}=1\\
    R \cdot V_\mathrm{0},      & \text{otherwise}
\end{cases}
 \qquad(18)$$</span>

## Open source implementations

This model has been successfully implemented in :

| Software               | URL                                        | Language | Open-Source License                                | Last consulted date | Comments                                                                                              |
| ---------------------- | ------------------------------------------ | -------- | -------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
| Open Modelica / Dynawo | [Dynawo](https://github.com/dynawo/dynawo) | modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/) | 15/05/2024          | For modeling assumptions and test results, see [Dynawo](https://github.com/dynawo/dynawo) repository. |



## Table of references

<div id="refs" class="references csl-bib-body" entry-spacing="0">

<div id="ref-machowski2020" class="csl-entry">

<span class="csl-left-margin">[1]
</span><span class="csl-right-inline">J. Machowski, Z. Lubosny, J. W.
Bialek, and J. R. Bumby, *Power System Dynamics: Stability and Control,
3rd Edition*. Wiley, 2020. Accessed: Nov. 22, 2022. [Online].
Available:
<https://www.wiley.com/en-us/Power+System+Dynamics%3A+Stability+and+Control%2C+3rd+Edition-p-9781119526360></span>

</div>

<div id="ref-alliander2024" class="csl-entry">

<span class="csl-left-margin">[2]
</span><span class="csl-right-inline">alliander, “Alliander-opensource.”
[Online]. Available:
<https://alliander-opensource.github.io/cgmes-profiles/Dynamics/GovCT2/></span>

</div>

<div id="ref-iec61970-3022023" class="csl-entry">

<span class="csl-left-margin">[3]
</span><span class="csl-right-inline">IEC61970-302, “DIN EN IEC
61970-302 – Schnittstelle für Anwendungsprogramme für
Energiemanagementsysteme (EMS­API) Teil 302: Allgemeines
Informationsmodell (CIM) Dynamik.” Jun. 2023.</span>

</div>

<div id="ref-neplan2015" class="csl-entry">

<span class="csl-left-margin">[4]
</span><span class="csl-right-inline">Neplan, “TURBINE-GOVERNOR MODELS –
Standard Dynamic Turbine-Governor Systems in NEPLAN Power System
Analysis Tool.” 2015. Available:
[www.neplan.ch](https://www.neplan.ch)</span>

</div>

</div>
