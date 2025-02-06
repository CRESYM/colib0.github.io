---
layout: page
title: Grid Following - Grid Forming DC link 
tags: [DC, Grid Following, Grid Forming, OpenSource, Matlab, VSC, small] 
date: 24/10/2024  
last-updated: 24/10/2024 
authors: Carlos Alegre (eRoots)
reviewers: Josep Fanals (eRoots)
---
 

## Use case purpose​ and context 

The following test case is used to study the behavior of a DC link using EMT simulations of the converters. There is a Voltage Source Converter at each side of the line, one operating in Grid Forming mode and the other operating in Grid Following mode. 

The scenario presented simulates a DC interconnection between a grid and an isolated load. The Grid Following converter is at the grid side, and it controls the DC voltage level as well as the reactive power exchange of the link. The Grid Forming converter is at the load side, and it generates an AC voltage, controlling its amplitude and frequency. This combined control mode can be obtained following the rules described in the [HVDC model page](/pages/models/HVDC/EMTVSC). The Grid Forming's control is the only type I control (mode 1), while the Grid Following's is a type II (mode 4).

The studied scenario represents the dynamics during setpoint tracking operation. 


## Table of references 

The references can be consulted in each model's page:
- [Grid Forming VSC model](/pages/models/generations/Sources/VSC/EMTGridFormingVSC)
- [Grid Following VSC model](/pages/models/generations/Sources/VSC/EMTGridFollowingVSC)
- [HVDC model page](/pages/models/HVDC/EMTVSC/)

## Network ​description 

The network is formed by two VSC in Grid Following - Grid Forming configuration, a symetric monopolar DC link, a three-phase voltage source representing the grid and a load. 


<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/testCases/GridFollowing_GridForming_DClink/HVDC_scheme.svg' | relative_url }}"
     alt="HVDC scheme"
     style="float: center; margin-right: 10px; width: 900px;" />
</div>
<div align = 'center'>
Figure 1: Circuit of the DC model test case studied.
</div>
<br>


## Static and Dynamic models​ description 

- The grid is represented by ideal Voltage Sources.
- The load is a constant impedance [ZIP load](/pages/models/loads/ZIPload/).
- The Grid Following converter controls includes a DC Voltage regulation, similar to the controls described in the [STATCOM model](/pages/models/CompensationDevices/STATCOM).
- The Grid Forming converter controls include a frequency and voltage regulation using the droop control approach described in the [Grid Forming VSC model](/pages/models/generations/Sources/VSC/EMTGridFormingVSC/).

To avoid too much information on the same page, some links to the elements model's pages can be provided.

## Input Data 

This section includes all the needed input data the test case needs to be run.
It covers:

- **Static data for the lines**

| Line/Cable  | Nominal Voltage (kV) |  R ($$\Omega$$) |  L ($$H$$)  |
| ----------- | -------------------- | --------- | ---------- |
| Converter - grid filter (grid connection)   |    $$2.45$$ kV              |   $$0.0326$$     | $$0.001038$$     |
| Converter - capacitor (GFM)   |    $$2.45$$ kV              |   $$0.0048913$$     | $$0.00031139$$     |
| DC line   |   $$1.5$$             |   $$0.001$$     | $$0.000163$$     |

- **Static data for the capacitors**

| Capacitor | C (F) |  
| ----------- | -------------------- |
| DC line   |   $$0.15$$           |  
| GFM   |       $$1.63 \cdot 10^{-4}$$           |  

- **Static data for the loads**

| Loads |  P ($$MW$$)  | Q($$MVar$$) |
| ----------- | -------------------- | --------- | 
| Load 1         |    $$ 1 $$             |  $$ 0.0001 $$   |
| Load 2         |    $$ 0.5 $$           |  $$ 0.0001 $$   |


- **Dynamic data for the Grid Following VSC.** 

| Parameter | Value | Units |
| --------- | ----- | ----- |
| $$V_{peak}$$ | $$2.45$$ | kV |
| $$\omega_n^{PLL}$$ | $$2\pi 1000$$ | rad/s |
| $$\zeta^{PLL}$$ | $$0.707$$ | - |
| $$K^{PLL}_p$$ | $$3.55$$ | - |
| $$K^{PLL}_i$$ | $$1.58 \cdot 10^4$$ | - |
| $$\tau^{PLL}$$ | $$0.225$$ | ms |
| $$\tau^c$$ | $$1$$ | ms |
| $$K^{icl}_p$$ | $$1,038$$ | - |
| $$K^{icl}_i$$ | $$32.609$$ | - |
| $$\tau_p$$ | $$15$$ | ms |
| $$K^{ipl}_p$$ | $$1.778 \cdot 10^{-5}$$ | - |
| $$K^{ipl}_i$$ | $$1.778 \cdot 10^{-2}$$ | - |
| $$V_{DC}$$ | $$1.5$$ | kV |
| $$K^{DC}_p$$ | $$ 5 $$ | - |
| $$K^{DC}_i$$ | $$ 50 $$ | - |


- **Dynamic data for the Grid Forming VSC.** 


| Parameter | Value | Units |
| --------- | ----- | ----- |
| $$V_{peak}$$ | $$2.45$$ | kV |
| $$K^{icl}_p$$ | $$0.13494$$ | - |
| $$K^{icl}_i$$ | $$100$$ | - |
| $$K^{vcl}_p$$ | $$5$$ | - |
| $$K^{vcl}_i$$ | $$500$$ | - |
| $$K^{Droop}_p$$ | $$2\pi 50$$ | - |


## Scenarios 

### Scenario No. 1 / Setpoint tracking operation

The scenario studied starts with a constant load, and after 1 second, there is second load connection. This scenario serves to study setpoint tracking operation during changes of loads.

- **Event:** Setpoing for $$Q_{ac}$$ is changed at 0.5 seconds. At 1s, connection of a new load in the Grid Forming side.

- **Operating point No. 1 (0 to 0.5 s):** $$Q^*_{ac}$$ = 0 MVAr, $$P_{load}$$ = 1 MW.

- **Operating point No. 2 (0.5 to 1 s):** $$Q^*_{ac}$$ = 0.46 MVAr, $$P_{load}$$ = 1 MW.

- **Operating point No. 3 (1 to 2 s):** $$Q^*_{ac}$$ = 0.46 MVAr, $$P_{load}$$ = 1.5 MW.

- **Control modes:** Setpoint tracking, Grid Forming ($$V_{ac}$$, $$\theta_{ac}$$), Grid Following ($$V_{DC}$$, $$Q_{ac}$$).

- **Network variant:** The breaker connecting the new load is closed at 1 second.


## Outputs 

To verify the correct setpoint tracking operation, we proceed to check the different controlled magnitudes of the simulation. Firstly, the plots for the DC voltage are shown at both ends of the DC link:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/testCases/GridFollowing_GridForming_DClink/VDC_GFOL.svg' | relative_url }}"
     alt="VDC_GFOL"
     style="float: center; margin-right: 10px; width: 900px;" />
</div>
<div align = 'center'>
Figure 2: DC voltage at the Grid Following side.
</div>
<br>

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/testCases/GridFollowing_GridForming_DClink/VDC_GFM.svg' | relative_url }}"
     alt="VDC_GMR"
     style="float: center; margin-right: 10px; width: 900px;" />
</div>
<div align = 'center'>
Figure 3: DC voltage at the Grid Forming side.
</div>
<br>

As shown in both figures, the DC voltage is correctly tracked by the DC voltage controls at the Grid Following side, reaching the desired value of 1.5 kV after a transient period. The Grid Forming side follows the same progression, although uncontrolled and falling slightly below the rated voltage due to the voltage drop of the link, as expected.

The reactive power exchanged with the grid in the Grid Following side is also shown in the following figure:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/testCases/GridFollowing_GridForming_DClink/Qg_GFOL.svg' | relative_url }}"
     alt="Qg_GFOL"
     style="float: center; margin-right: 10px; width: 900px;" />
</div>
<div align = 'center'>
Figure 4: Reactive power exchanged with the grid at the Grid Following side.
</div>
<br>

Initially, no reactive power is exchanged, but after the setpoint change at 0.5 seconds, the reactive power is increased to 0.46 MVAr, as expected. 

Lastly, the active power exchanged at both converters can be seen in the following figures:

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/testCases/GridFollowing_GridForming_DClink/P_GFOL.svg' | relative_url }}"
     alt="P_GFOL"
     style="float: center; margin-right: 10px; width: 900px;" />
</div>
<div align = 'center'>
Figure 5: Active power exchanged with the grid at the Grid Following side.
</div>
<br>

<div style="background-color:rgba(0, 0, 0, 0); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/testCases/GridFollowing_GridForming_DClink/P_GFM.svg' | relative_url }}"
     alt="P_GFM"
     style="float: center; margin-right: 10px; width: 900px;" />
</div>
<div align = 'center'>
Figure 6: Active power exchanged with the load at the Grid Forming side.
</div>
<br>

We can see that the active power exchanged in both sides is slightly lower than the expected (1 MW or 1.5 MW). This is due to the characteristics of the load, which is a constant impedance load. The value of this impedance is calculated using the nominal values for voltage and power, and since there is a voltage drop from the converter to the load, the exchanged power is lower than the nominal value.



## Open source implementations 

No open-source implementations were found.
