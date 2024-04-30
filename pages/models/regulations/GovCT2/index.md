---
layout: page
title: GovCT2 (Synchronous Machine Governor)
tags: ["regulations", "governor", "controller", "synchronus machine"]
author: Martin Franke
date: 23/04/2024
last-updated: 23/04/2024
---


- [Context](#context)
- [Model use, assumptions, validity domain and limitations](#model-use-assumptions-validity-domain-and-limitations)
- [Model description](#model-description)
  - [Major control paths](#major-control-paths)
    - [Speed/load (fsrn)](#speedload-fsrn)
      - [Supervisory load controller](#supervisory-load-controller)
    - [Acceleration (fsra)](#acceleration-fsra)
    - [Temperature (fsrt) / load limit](#temperature-fsrt--load-limit)
  - [Turbine/engine model](#turbineengine-model)
    - [Speed sensitivity / Damping](#speed-sensitivity--damping)
  - [Frequency dependent (valve) limit](#frequency-dependent-valve-limit)
- [Model schema](#model-schema)
- [Parameters](#parameters)
- [Variables](#variables)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
- [Equations \& algorithm  ](#equations--algorithm-)
- [Initial equations / boundary conditions (optional)](#initial-equations--boundary-conditions-optional)
  - [Helper variables](#helper-variables)
  - [Initial states](#initial-states)
- [Assumptions in modelica implementation (Open source implementations)](#assumptions-in-modelica-implementation-open-source-implementations)
  - [Open points TODO](#open-points-todo)
  - [Integrator anti-windup and integrator limits](#integrator-anti-windup-and-integrator-limits)
    - [Limits](#limits)
    - [Anti-windup](#anti-windup)
    - [Resulting assumptions](#resulting-assumptions)
  - [Ramp rate limiters](#ramp-rate-limiters)
  - [Input signals $\\omega$ and $P\_\\mathrm{ref}$](#input-signals-omega-and-p_mathrmref)
    - [Power setpoint $P\_\\mathrm{ref}$](#power-setpoint-p_mathrmref)
    - [Rotor speed $\\omega$](#rotor-speed-omega)
  - [Frequency-dependent limit](#frequency-dependent-limit)
  - [Governor output feedback delay](#governor-output-feedback-delay)
- [Table of references \& license](#table-of-references--license)

# Context

In a power plant, a governor regulates the mechanical power ($P_m$) or
torque ($T_m$) delivered from the turbine to the electrical generator.
This governor model includes the turbine dynamics, i.e. it takes a
reference power and generator speed and outputs the mechanical torque.

This governor model is part of the CIM/CGMES standard \[1\]. CIM is
developed by ENTSO-E and aims at ensuring the reliability of grid models
and market information exchanges. ENTSO-E developed CGMES as a superset
of the IEC CIM standards (belonging to IEC CIM16) in 2013 to fulfill the
requirements of transmission system operators and their data exchanges.

# Model use, assumptions, validity domain and limitations

The following information has been gathered from \[1\].

General model for any prime mover with a PID governor.

For example used for:

Can be used to represent a variety of prime movers controlled by PID
governors, such as:

- Single shaft combined cycle turbines and Gas turbines
- Diesel engines (with modern digital or electronic governors
- Steam turbines with
  - steam supplied from a large boiler drum
  - or steam supplied from a large header with approximately constant
    pressure (over the time period of the simulation)
- Simple hydro turbines in dam configurations with
  - short water column length
  - and minimal water inertia effects

# Model description

This model is based on Rowen’s model from 1983 \[2\].

This GovCT2 is a modification of the GovCT1 in order to represent the
frequency-dependent fuel flow limit of a specific gas turbine
manufacturer.

When comparing to older standards: GovCT2 is identical to GGOV2 and
GovCT1 is identical to GGOV1.

## Major control paths

The following section is based on \[2, p. 517f\].

The model has three major control paths (speed/load, acceleration,
temperature) associated with the dynamic response during disturbances.
Outputs of these control functions are all inputs into a minimum value
selector determining the least fuel request. This is then given to the
actuator.

### Speed/load (fsrn)

This can be considered the main control path. It corresponds directly to
the governor. The inputs are load demand $P_\mathrm{ref}$, rotor speed
$\omega$ and automatic generation control power $P_\mathrm{MWSet}$.

The resulting signal is then passed through a deadband, limits and a
PID-controller. To represent a specific governor, some elements can be
deactivated by setting parameters to zero (examples in \[2\]).

#### Supervisory load controller

In \[1\] the $P_\mathrm{MWSet}$ path is described as an optional
additional outer loop associated with a power plant control (supervisory
load controller). This is active when $K_\mathrm{I\,MW}$ is not equal to
zero. It is a slow acting reset control and it adjusts the speed/load
reference of the turbine governor to maintain the electrical power of
the unit at the value which it has been initialized with. That value is
stored in $P:\mathrm{mw\,set}$ when the model is initialized, and can be
changed during simulation. The load controller is expected to have a
slow reaction compared to the speed governor. \[1\]

A value $K_\mathrm{I\,MW}$ = to 0.01 corresponds to a time constant of
100 s; 0.001 corresponds to 1000 s (relatively slow acting) \[1\].

### Acceleration (fsra)

> \[…\] for studies of large power systems, \[the acceleration control
> loop\] can be ignored. It is important for islanding studies and
> smaller power systems with large frequency variations. If the
> generating unit begins to accelerate at a rate over
> \[$a_\mathrm{set}$\] (pu/s^2) then this control loop acts to limit
> fuel flow. \[2\]

It can be disabled by setting $a_\mathrm{set}$ to a large value, such
as 1. \[1\]

### Temperature (fsrt) / load limit

The load limiter module allows to set a maximum output limit
$P_\mathrm{ldref}$. This can also model an exhaust temperature limit, in
which case $P_\mathrm{ldref}$ is not to be interpreted as a power value.
The time constant $T_\mathrm{f\,load}$ should match the measurement time
constant for temperature (or power or which ever signal is being
modelled). Additionally, the gains of the limiter, $K_\mathrm{P\,load}$
and $K_\mathrm{I\,load}$, should be set to achieve fast and stable
control when the limit $P_\mathrm{ldref}$ is reached. To deactivate the
load limit, set the parameter $P_\mathrm{ldref}$ to a high value \[1\].

The lead-lag block with $T_\mathrm{sa}$ and $T_\mathrm{sb}$ can be used
to model the exhaust gas temperature measurement system in gas turbines.
A “radiation shield” component of larger gas turbines can be modeled by
setting $T_\mathrm{sa}=4\,\mathrm{s}$ and $T_\mathrm{sb}=5\,\mathrm{s}$,
for example \[1\].

> The temperature limit \[tlim\] in pu corresponds to the fuel flow
> required for 1 pu turbine power. \[2\]

## Turbine/engine model

The output from the low value select block is given to the first order
lag element representing the fuel or gate system (Valve). \[2\]

$V_\mathrm{max}$ and $V_\mathrm{min}$ represent the maximum and minimum
fuel valve opening. $W_\mathrm{fspd}$ is the fuel flow multiplyer.

$W_\mathrm{fnl}$ is the fuel required to run the compensator \[2\].

The range of fuel valve travel and of fuel flow is unity, so the limits
lie between 0 pu and 1 pu. $V_\mathrm{max}$ can be reduced below 1, for
example to model a load limit defined by the operator or supervisory
controller \[1\]. Additionally there is a dynamic frequency dependent
limit reduction, see
<a href="#sec-freqDepLimit" class="quarto-xref">Section 3.3</a>.

For a gas turbine, in the presence of a minimum firing limit,
$V_\mathrm{min}$ normally is set greater than zero and less than
$W_\mathrm{fnl}$ \[1\].

The value of the fuel flow at maximum power shall be $\leq 1$, depending
on the value of $K_\mathrm{turb}$ \[1\]. It translates the fuel
consumption (or water flow) to mechanical power output \[2\].

The time delay $e^{-sT_\mathrm{eng}}$ is used in representing diesel
engines where there is a small but measurable transport delay between a
change in fuel flow setting and the development of torque.
$T_\mathrm{eng}$ should be zero in all but special cases where this
transport delay is of particular concern \[1\].

The switch $W_\mathrm{fspd}$ is responsible for recognizing whether fuel
flow, for a given fuel valve stroke, is be proportional to engine speed
\[1\]. If True, fuel flow is proportional to speed. This is applicable
for some gas turbines and diesel engines with positive displacement fuel
injectors. If false, the fuel control system keeps fuel flow independent
of engine speed.

### Speed sensitivity / Damping

If $D_\mathrm{m}=0$, the speed sensitivity paths are not active. \[1\]

If $D_\mathrm{m}>0$, it models friction losses (variation of the engine
power with the shaft speed; slightly increasing losses with increasing
speed are characteristic for reciprocating engines and some
aeroderivative turbines \[1\]).

If $D_\mathrm{m}=<0$, it can model an influence of rotation speed on
exhaust temperature using an exponential characteristic determined by
$D_\mathrm{m}$. The maximum permissible fuel flow falls with falling
speed (typical for single-shaft industrial turbines due to exhaust
temperature limits) \[1\]. The authors suspect that this could represent
fan cooling.

## Frequency dependent (valve) limit

The frequency-dependent limit block outputs the upper limit for valve
position / the fuel flow signal fsr. It is shown in
<a href="#fig-frequencyDependentLimit" class="quarto-xref">Figure 1</a>.

In normal operation, the limit is
$V_\mathrm{max\,\omega} = V_\mathrm{max}$ and the there is no frequency
dependent reduction.

When the frequency $f$ in Hz drops below $f_\mathrm{lim\,1}$, the value
for $P_\mathrm{lim}$, the power limit, is calculated by linear
interpolation between the values
$f_\mathrm{lim\,1}, f_\mathrm{lim\,2}, \dots$ and
$P_\mathrm{lim\,1}, P_\mathrm{lim\,2}, \dots$ of a lookup table. The
table consists of 10 data points which monotonically decrease in both
power and frequency, point 1 being the hightest. The lowest data point
does act as a lower limit, i.e. is not extrapolated to lower values.

$V_\mathrm{max\,\omega}$ then ramps with the rate $P_\mathrm{rate}$ from
the initial and maximum value to the new value
$V_\mathrm{max\,omega} = (P_\mathrm{lim} / K_\mathrm{turb} + W_\mathrm{fnl})$.

$P_\mathrm{lim}$ will then change with frequency. If f rises above
$P_\mathrm{lim\,1}$ again, $V_\mathrm{max\,\omega}$ ramps back to
$V_\mathrm{max}$ \[1\].

![](GovCT2.frequencylimit.drawio.svg)

# Model schema

![](GovCT2.drawio.svg)

# Parameters

Per-unit parameters are on base of $P_\mathrm{base}$, which is normally
the capability of the turbine in MW.

| name                        | type  | unit | modelica name     | IEC name   | description                                                                                              | typical value |
|:----------------------------|:------|:-----|:------------------|:-----------|:---------------------------------------------------------------------------------------------------------|:--------------|
| $a_\mathrm{set}$            | float | pu/s | aSetPu            | Aset       | Acceleration limiter setpoint                                                                            | 10            |
| $\Delta\omega_\mathrm{db}$  | float | pu   | DeltaOmegaDbPu    | db         | Frequency error deadband. Recommended to be =0 in most applications \[1\]                                | 0             |
| $\Delta\omega_\mathrm{max}$ | float | pu   | DeltaOmegaMaxPu   | Maxerr     | Maximum value for frequency error                                                                        | 1             |
| $\Delta\omega_\mathrm{min}$ | float | pu   | DeltaOmegaMinPu   | Minerr     | Minimum value for frequency error                                                                        | -1            |
| $\Delta t$                  | float | s    | DeltaTSeconds     | $\Delta t$ | Correction factor to adapt the unit of $K_\mathrm{a}$ from pu/s to pu                                    | 1             |
| $D_\mathrm{m}$              | float | pu   | DmPu              | dm         | Speed sensitivity coefficient, see <a href="#sec-speedSensitivity" class="quarto-xref">Section 3.2.1</a> | 0             |
| $f_\mathrm{lim\,1}$         | float | Hz   | fLim1             | flim1      | Frequency threshold 1                                                                                    | 59            |
| $f_\mathrm{lim\,10}$        | float | Hz   | fLim1             | flim10     | Frequency threshold 10                                                                                   | 0             |
| $f_\mathrm{lim\,2}$         | float | Hz   | fLim1             | flim2      | Frequency threshold 2                                                                                    | 0             |
| $f_\mathrm{lim\,3}$         | float | Hz   | fLim1             | flim3      | Frequency threshold 3                                                                                    | 0             |
| $f_\mathrm{lim\,4}$         | float | Hz   | fLim1             | flim4      | Frequency threshold 4                                                                                    | 0             |
| $f_\mathrm{lim\,5}$         | float | Hz   | fLim1             | flim5      | Frequency threshold 5                                                                                    | 0             |
| $f_\mathrm{lim\,6}$         | float | Hz   | fLim1             | flim6      | Frequency threshold 6                                                                                    | 0             |
| $f_\mathrm{lim\,7}$         | float | Hz   | fLim1             | flim7      | Frequency threshold 7                                                                                    | 0             |
| $f_\mathrm{lim\,8}$         | float | Hz   | fLim1             | flim8      | Frequency threshold 8                                                                                    | 0             |
| $f_\mathrm{lim\,9}$         | float | Hz   | fLim1             | flim9      | Frequency threshold 9                                                                                    | 0             |
| $K_\mathrm{a}$              | float | pu   | KAPu              | Ka         | Acceleration limiter gain                                                                                | 10            |
| $K_\mathrm{D\,gov}$         | float | pu   | KDGovPu           | Kdgov      | Governor derivative gain                                                                                 | 0             |
| $K_\mathrm{I\,gov}$         | float | pu   | KIGovPu           | Kigov      | Governor integral gain                                                                                   | 0.45          |
| $K_\mathrm{I\,load}$        | float | pu   | KILoadPu          | Kiload     | Load limiter integral gain                                                                               | 1             |
| $K_\mathrm{I\,MW}$          | float | pu   | KIMwPu            | Kimw       | Supervisory load controller integral gain                                                                | 0             |
| $K_\mathrm{P\,gov}$         | float | pu   | KPGovPu           | Kpgov      | Governor proportional gain                                                                               | 4             |
| $K_\mathrm{P\,load}$        | float | pu   | KPLoadPu          | Kpload     | Load limiter proportional                                                                                | 1             |
| $K_\mathrm{turb}$           | float | pu   | KTurbPu           | Kturb      | Turbine gain (translates from fuel flow to power)                                                        | 1.9168        |
| $P_\mathrm{base}$           | float | MW   | PBaseMw           | Mwbase     | Base for power values (\> 0)                                                                             |               |
| $P_\mathrm{ldref}$          | float | pu   | PLdRefPu          | Ldref      | Load limiter reference value                                                                             | 1             |
| $P_\mathrm{lim\,1}$         | float | pu   | PLim1Pu           | plim1      | Power limit 1                                                                                            | 0.8325        |
| $P_\mathrm{lim\,10}$        | float | pu   | PLim10Pu          | plim10     | Power limit 10                                                                                           | 0             |
| $P_\mathrm{lim\,2}$         | float | pu   | PLim2Pu           | plim2      | Power limit 2                                                                                            | 0             |
| $P_\mathrm{lim\,3}$         | float | pu   | PLim3Pu           | plim3      | Power limit 3                                                                                            | 0             |
| $P_\mathrm{lim\,4}$         | float | pu   | PLim4Pu           | plim4      | Power limit 4                                                                                            | 0             |
| $P_\mathrm{lim\,5}$         | float | pu   | PLim5Pu           | plim5      | Power limit 5                                                                                            | 0             |
| $P_\mathrm{lim\,6}$         | float | pu   | PLim6Pu           | plim6      | Power limit 6                                                                                            | 0             |
| $P_\mathrm{lim\,7}$         | float | pu   | PLim7Pu           | plim7      | Power limit 7                                                                                            | 0             |
| $P_\mathrm{lim\,8}$         | float | pu   | PLim8Pu           | plim8      | Power limit 8                                                                                            | 0             |
| $P_\mathrm{lim\,9}$         | float | pu   | PLim9Pu           | plim9      | Power Limit 9                                                                                            | 0             |
| $P_\mathrm{rate}$           | float | pu   | PRatePu           | prate      | Ramp rate for frequency-dependent power limit                                                            | 0.017         |
| $R$                         | float | pu   | RPu               | R          | Droop (frequency/power)                                                                                  | 0.05          |
| $R_\mathrm{close}$          | float | pu/s | RClosePu          | Rclose     | Minimum rate for valve closing                                                                           | -99           |
| $R_\mathrm{down}$           | float | pu   | RDownPu           | Rdown      | temperature/load limit path output decrease rate limit                                                   | -99           |
| $R_\mathrm{open}$           | float | pu/s | ROpenPu           | Ropen      | Maximum rate for valve closing                                                                           | 99            |
| $R_\mathrm{select}$         | int   | \-   | RSelectInt        | Rselect    | governor controller feedback mode switch                                                                 |               |
| $R_\mathrm{up}$             | float | pu   | RUpPu             | Rup        | temperature/load limit path output increase rate limit                                                   | 99            |
| $T_\mathrm{a}$              | float | s    | tASeconds         | Ta         | Acceleration limiter time constant                                                                       | 1             |
| $T_\mathrm{act}$            | float | s    | tActuatorSeconds  | Tact       | actuator (valve) reaction time constant                                                                  | 0.4           |
| $T_\mathrm{b}$              | float | s    | tBSeconds         | Tb         | Turbine lag time constant                                                                                | 0.1           |
| $T_\mathrm{c}$              | float | s    | tCSeconds         | Tc         | Turbine lead time constant                                                                               | 0             |
| $T_\mathrm{dgov}$           | float | s    | tDGovSeconds      | Tdgov      | Governor controller derivative time constant                                                             | 1             |
| $T_\mathrm{D\,ratelim}$     | float | s    | tDRatelimSeconds  | \-         | Ramp rate limter derivative time constant in s                                                           | 0.001         |
| $T_\mathrm{eng}$            | float | s    | tEngineSeconds    | Teng       | Transport time delay for diesel engine                                                                   | 0             |
| $T_\mathrm{f\,load}$        | float | s    | tFLoadSeconds     | Tfload     | Load limiter time constant                                                                               | 3             |
| $T_\mathrm{last\,value}$    | float | s    | tLastValueSeconds | \-         | Time constant of very fast first order block to prevent algebraic loop                                   | 1e-9          |
| $T_\mathrm{p\,elec}$        | float | s    | tPElecSeconds     | Tpelec     | Electrical power measurement time constant                                                               | 2.5           |
| $T_\mathrm{sa}$             | float | s    | tSASeconds        | Tsa        | lead time constant of temperature detection                                                              | 0             |
| $T_\mathrm{sb}$             | float | s    | tSBSeconds        | Tsb        | lag time constant of temperature detection                                                               | 50            |
| $V_\mathrm{max}$            | float | pu   | ValveMaxPu        | Vmax       | Maximum valve position limit                                                                             | 1             |
| $V_\mathrm{min}$            | float | pu   | ValveMinPu        | Vmin       | Minimum valve position limit                                                                             | 0.175         |
| $W_\mathrm{fnl}$            | float | pu   | WFnlPu            | Wfnl       | fuel flow with no load                                                                                   | 0.187         |
| $W_\mathrm{fspd}$           | bool  | \-   | WFSpdBool         | Wfspd      | Switch for fuel source characteristic                                                                    | false         |

# Variables

## Inputs

| name               | type  | unit | modelica name | IEC name | description                                                          |
|--------------------|-------|------|---------------|----------|----------------------------------------------------------------------|
| $\omega$           | float | pu   | omegaPu       | $\omega$ | rotor speed                                                          |
| $P_\mathrm{ref}$   | float | pu   | PRefPu        | Pref     | load setpoint                                                        |
| $P_\mathrm{MWSet}$ | float | pu   | PMwSetPu      | Pmwset   | Supervisory power controller setpoint (automatic generation control) |
| $P_\mathrm{e}$     | float | pu   | PElecPu       | Pe       | measured electric power generation                                   |

- **assumption:** In the CGMES standard \[1\], there are two
  inconsistencies:
  - The input $\omega$ is passed into the summation point while it
    should be $\Delta \omega$. In \[3\], $\omega - 1$ is used as input,
    which supports this claim. In
    <a href="#fig-modelSchema" class="quarto-xref">Figure 2</a>,
    $\omega$ is still used as the input, but $\Delta \omega = \omega -1$
    is then calculated.
  - The input *speed* on the bottom right in \[1, Fig. 48\] should be
    the same as $\omega$, which is also backed by \[3\].

## Outputs

| name           | type  | unit | modelica name | IEC name | description      |
|----------------|-------|------|---------------|----------|------------------|
| $P_\mathrm{m}$ | float | pu   | PMechPu       | Pm       | mechanical power |

# Equations & algorithm  

–

# Initial equations / boundary conditions (optional)

The initial values for the system’s states are calculated from the
initial mechanical power $P_\mathrm{m\,0}$ and rotation speed
$\omega_\mathrm{0}$.

## Helper variables

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

## Initial states

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

$$
x_\mathrm{last\,value\,0} = V_\mathrm{0}
$$

# Assumptions in modelica implementation (Open source implementations)

## Open points TODO

- The fuel flow command fsr is determined by whichever is lowest of
  fsrt, fsra, and fsrn. Although not explicitly shown in the GovCT1
  diagram, the signals that are not in control track fsr so that they do
  not *windup* beyond that value. This represents GE gas turbine control
  practice but might not be true for other controller designs. TODO
  **open question** what is meant here?
  - It us unclear which kind of anti-windup is implemented.
  - Also in GovCT1 it says that all signals ar “tracked” while GovCT2
    says that fsrt is not tracked. Nothing said about fsrn. this is
    confusing.
- PF used fixed $\Delta t = 0.01$ (according to governor type
  description) in the acceleration path, while standard recommends to
  use 1.
- Damping implementation in PF is this:
  - yo1=selfix(Dm\>=0.0,(w-1)\*Dm,0.0)
  - yo2=selfix(Dm\<0.0,1/pow(w,abs(Dm)),1.0)
  - no matter wether $\omega$ or $\Delta \omega$ is used as input.
  - can this be correct? There seems to be a lot of confusion about w
    and w-1

## Integrator anti-windup and integrator limits

### Limits

In \[1, p. 45\] it is stated that generally *“limited integrators are of
the non-windup type”*. A concrete implementation is not specified. On
p. 244 IEEE 421.5-2005 anti windup is referenced, but related to an AVR
model. Since in \[1, Fig. 48\] there is an explicitly limited integrator
(`Kimw`), it was assumed that the integrators `Kigov` and `Kiload` are
not *limited* in that sense, they are merely integrators with limits
after them. Hence, they do not have a limit.

### Anti-windup

In \[1, Fig. 47\] it is shown for the GovCT1 model that the
$K_\mathrm{I\,gov}$ and $K_\mathrm{I\,load}$ integrators have a
so-colled *tracking logic*, i.e. anti-windup logic, implemented.

For GovCT2, there are two statements:

1)  In \[1, p. 139\] it is stated that \> The Kpgov/Kigov and
    Kpload/Kiload controllers include tracking logic to ensure smooth
    transfer between active controllers. This logic is not shown on the
    GovCT2 diagram.

2)  Just above that, the following is written: \> Aside from the
    frequency-dependent limit, GovCT2 is identical to GovCT1, except
    that the temperature fuel command fsrt does not track fsr when it is
    not in control. Instead, it stays at its upper limit (1).

Statement 2. contradicts in two ways:

- it says that there is no tracking logic for the $K_\mathrm{I\,load}$
  integrator, while statement 1) says the opposite.
- it says that there is an upper limit on the $K_\mathrm{I\,load}$
  controller, which contradicts
  <a href="#sec-assumptionLimits" class="quarto-xref">Section 9.2.1</a>.

### Resulting assumptions

The validation reference model in DIgSILENT PowerFactory does not
include the tracking logic. Because of this and the contradicting
informaton in the standard:

- No tracking logic has been implemented
- Integrator limits are only implemented if explicitly shown in \[1,
  Fig. 48\]

## Ramp rate limiters

As ramp rate limiter, the Modelica library block
`Modelica.Blocks.Nonlinear.SlewRateLimiter` is used.

> The SlewRateLimiter block limits the slew rate of its input signal in
> the range of \[Falling, Rising\]. To ensure this for arbitrary inputs
> and in order to produce a differential output, the input is
> numerically differentiated with derivative time constant Td. Smaller
> time constant Td means nearer ideal derivative. Note: The user has to
> choose the derivative time constant according to the nature of the
> input signal.

*Documentation of the Modelica block*

- The default value of $T_\mathrm{D\,ratelim}=1 \mathrm{ms}$ is used.
- The same value is used for each ramp rate limiter block.

## Input signals $\omega$ and $P_\mathrm{ref}$

### Power setpoint $P_\mathrm{ref}$

Since the power feedback gets passed through the droop $R$, so for the
power difference to make sense, the reference power needs to be
multiplied by $R$ as well.

- **assumption:** In this implementation the reference power input needs
  to be multiplied by $R$ before entering the governor model.

The same is done in *DIgSILENT PowerFactory* GovCT2 at initialization:
`inc(Pref) = R*Pfdbck + w`. ()

### Rotor speed $\omega$

In *DIgSILENT PowerFactory*, different implementations for the speed
signal are used. For example,

- In the PSS/E compatible GGOV1 model, the reference speed is explicitly
  subtracted from the measured speed to calculate `dw`, which is then
  subtracted at the control error summation point. Here, the reference
  power input is initialized to `inc(Pref) = R*Pfdbck+dw`.
- In the GovCT2 model, the speed `w` is directly subtracted at the
  control error summation point. Here, the reference power input is
  initialized to `inc(Pref) = R*Pfdbck+w`.

So in both cases the initial speed value that is subtracted from the
control error summation point is – implicitly! – being added to that
summation point through the `Pref` input. The effect is that in both
cases $\Delta \omega$ is subtracted at the summation point.

- **assumption:** In this model, this subtraction is being done
  explicitly by calculating $\Delta \omega$ (see
  <a href="#fig-modelSchema" class="quarto-xref">Figure 2</a>) and
  **not** adding anything speed related to the power reference input.

## Frequency-dependent limit

The mapping between frequency and maximum valve position is implemented
via a lookup table. The table consists of 10 pairs of values. Successive
values need to decrease in frequency and max. power. If e.g. only 5
pairs shall be used instead of all 10, only define pairs 1 to 5 and set
all following pairs with fLim=0 and PLim = PLim5, resuling in a straight
line in the lookup table. **This is implemented slightly different
compared to \[1, p. 139\].**

## Governor output feedback delay

To prevent an algebraic loop when using the governor output feedback, a
first-order lag block with time constant $T_\mathrm{last\,value}$ has
been added to the governor output feedback loop. The use of a unit delay
block (1/z) has been found impractical.

# Table of references & license

<div id="refs" class="references csl-bib-body" entry-spacing="0">

<div id="ref-iec61970-3022023" class="csl-entry">

<span class="csl-left-margin">\[1\]
</span><span class="csl-right-inline">IEC61970-302, “DIN EN IEC
61970-302 – Schnittstelle für Anwendungsprogramme für
Energiemanagementsysteme (EMS­API) Teil 302: Allgemeines
Informationsmodell (CIM) Dynamik.” Jun. 2023.</span>

</div>

<div id="ref-machowski2020" class="csl-entry">

<span class="csl-left-margin">\[2\]
</span><span class="csl-right-inline">J. Machowski, Z. Lubosny, J. W.
Bialek, and J. R. Bumby, *Power System Dynamics: Stability and Control,
3rd Edition \| Wiley*. 2020. Accessed: Nov. 22, 2022. \[Online\].
Available:
<https://www.wiley.com/en-us/Power+System+Dynamics%3A+Stability+and+Control%2C+3rd+Edition-p-9781119526360></span>

</div>

<div id="ref-neplan2015" class="csl-entry">

<span class="csl-left-margin">\[3\]
</span><span class="csl-right-inline">Neplan, “TURBINE-GOVERNOR MODELS –
Standard Dynamic Turbine-Governor Systems in NEPLAN Power System
Analysis Tool.” 2015. Available:
[www.neplan.ch](https://www.neplan.ch)</span>

</div>

</div>

- [ ] TODO license