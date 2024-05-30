---
layout: page
title: MTDC benchmark models and test simulations
tags: [opensource, small, TCRL2, converter driven instability slow interaction, HVDC, WTG, grid forming, grid following, RSCAD, MMC, Generic]
date: 16/11/2023
last-updated: 04/05/2024
---

# MTDC benchmark models for the real-time simulation

## Use case purpose

In the global pursuit of carbon neutrality, the European energy transition stands out as a pioneering effort, aiming to make Europe climate-neutral by 2050. Offshore wind energy in the North Sea is instrumental in achieving this goal, with the European Union setting ambitious targets of 60 GW by 2030 and 300 GW by 2050.

TenneT's 2GW Program: TenneT, a offshore transmission operator, is at the forefront of this movement. Their vision: 14 high-voltage direct current (HVDC) offshore grids with 2 GW transmission each, delivering green energy to the Dutch and German North Sea by 2031.

These real time MTDC models designed for the RTDS-based simulation are using the CIGRE models {% cite No1 %} and CIGRE brochures {% cite No2 %}, {% cite No3 %}, {% cite No4 %} as the basis for the models design.

The proposed model uses the CIGRE benchmark models {% cite No1 %} and it closes the following modelings gap in the benchmark network:

- Proposed network models consist of ±525 kV Submarine and land cables.
- Proposed network models consider wind farm/wind turbine dynamics based on Real-time wind gusts using SiL setup.
- Electrical and Control parameter perturbation using an automatic script.
- Provides an overview of required cores per network models.
- Proposed networks consist of an average model of VARC DC CB.

<!-- could you explain a bit more what this test aim to prove? can you explain a bit more the phenomena that those case show? -->

## References

This benchmark has been designed by the Control of HVDC/AC electrical grids group from TU Delft
{% cite No5 %} {% cite No6 %}.

## Network ​description

The networks are described by the following figure:

<img src="{{ '/pages/testCases/MTDC_RTDS_tests/MTDC_network.png' | relative_url }}"
     alt="MTDC topologies"
     style="float: center; margin-right: 10px;" />

<!-- the quality of the picture is not that good. if you have an higher resolution it would be great. -->

The network topologies have a DC voltage rating of ±525 kV, with bipolar dedicated metallic return (DMR) configurations. The converter is a half-bridge topology. The system can be divided into three subsystems: the onshore AC system, the DC system, and the offshore AC system.

The onshore AC system consists of Thevenin’s equivalent circuit (static voltage source) of a strong grid; the grid impedance is computed based on the short circuit current level—a series resistor connection of a parallel resistor and inductor models it. By adjusting the values of the inductance and resistance, the short circuit current value and the damping angle at fundamental and Nth harmonic are controlled.

The rated line-to-line (LL) voltage is 400 kV. The onshore converter station has two Y-D transformers, with ratings of 2 GVA each. The voltage ratio of this transformer is 400 kV/275 kV. Onshore converters are labeled CSA1, CSA4, and CSA5. However, based on the se-lected topology, the converters are omitted.

The number of land and submarine DMR cables varies depending on the network topologies. For the five-terminal HVDC system, the number of land DMR cables are Cable 0a, 0b, and 0c. The length of these cables is 12 km. The land cables connect the onshore DC hub, which comprises DC breakers; for simplicity and to reduce the computation burden, only one DC breaker is employed. Furthermore, the DC system comprises six submarine cable links: ca-ble 1 (300 km), cable 2 (200 km), cable 3 (400 km), cable 4a (150 km), cable 4b (150 km), and cable 5 (200 km). The cables are modeled as a frequency phase-depended model. Furthermore, the cable link consists of three conductors (i.e., a positive, a negative cable, and metallic return per cable link) due to DMR topology. Cable 1 consists of two simplified VARC DC CB placed on the positive pole at either end of the cable, as seen in previous figure.

The offshore AC system consists of converter stations and aggregated average-value model wind farms. In the applied networks, offshore converters are labeled CSA2 and CSA3. However, based on the topologies, the converters are omitted. The offshore converter is connected to the offshore AC system via D-Y transformers. The rating of this transformer is 275 kV/220 kV, 2 GVA. Besides, this converter transformer is connected to a wind turbine transformer. This transformer has a voltage ratio of 220 kV/66 kV and acts as a VA scaled-up transformer. Thus, a power rating of 2 GW can be achieved by choosing the proper scaling factor. The lower voltage end of this transformer is connected to the wind turbine. The wind turbines are type 4 and have a rating of 2 MW at a wind speed of 15 m/s. In this work, three fault locations are selected. F1 indicates an AC fault at the Point-of-Common Coupling (PCC) of the CSA1, F2 indicates a DC fault at the DC terminal near CSA1, and F3 indicates an AC fault at the PCC of CSA2.

The detailed description of the models can be found in the publication {% cite No5 %}.

<!-- what is the reason behind the choice of those cases? show the evolution of converter driven instability with increasing number of HVDC, or impact on RMS limitations?   -->

## Dynamic models​

All test cases contains the same component types but differs in their numbers and configurations.

- generic HVDC VSC lines
- wind turbines generators (equivalent for a Wind park)
- sets of 6 cables in parallel (225kV)
- 400kV overhead lines
- two windings transformers
- shunt reactors
- RL load
- the rest of the network is represented by a Thevenin equivalent
<!-- links will be added later on when the models will be part of colib. -->

| Case  | HVDC | WTG  | cables (sets of 6 cables in parallel) | overhead lines | two windings transformers | shunt reactors | RL load | Thevenin equiv. |
| ----- | ---- | ---- | ------ | -------------- | ------------------------- | -------------- | ------- |
| a)    | 2    |  2   | 2 | 7 | 4 | 2 | 1 | 1 |
| b)    | 3    |  4   | 7 | 7 | 6 | 2 | 1 | 1 |
| c)    | 4    |  4   | 2 | 7 | 2 | 2 | 1 | 2 |
| d)    | 5    |  4   | 2 | 7 | 2 | 2 | 1 | 1 |

<!-- i have tried to make the table but there surely are some mistakes.  -->

## Data

### Parameters of the converters <!-- HVDC ones or WTG?  -->

| Parameter   | Onshore converter station per MMC |  Offshore converter station per MMC  |
| ----------- | --------------- | --------------- |
| Rated Power (MVA)     | 2000      |    2000   |  
| Line frequency (Hz)   | 50        |    50     |
| AC grid voltage (kV)  | 400       |    220    |
| AC converter bus voltage (kV)     | 275             |    275   |
| DC link voltage (kV)  | 525       |    525    |
| Transformer reactance (p.u.)  | 0.18      |    0.15    |
| MMC equivalent arm inductance (mH)  | 0.025       |    0.0497    |
| MMC equivalent arm resistance ($$\Omega$$)  | 0.0785       |    0.0785   |
| Capacitor energy in each submodule (MJ)  | 30       |    30    |
| Number of submodules per valve  | 240       |    200    |
| Rated voltage and current of each sub-module   | 2.5 kV /2kA       |    2.5 kV /2kA    |
| Conduction resistance of each IGBT/diode   | $$5.44 \times 10^{-4}$$ |    $$5.44 \times 10^{-4}$$    |

<!-- which unit for the conduction resistance? -->

### Relevant Geometrical and Material Data of Generic 525 kV HVDC Land Cable

| Main layers | Properties (unit) |  Parameter value    |
| ----------- | --------------- | --------- |
| Core conductor        | Metallic cross-sectional area ( $$mm ^2$$)    |    3000      |

<!-- you just need one parameter for the cable model?  -->

### 6 transformers in parallel 400MVA each

| Converter   | Snom (MVA) |  Pnom (MVA)  |
| ----------- | ---------- | ------ |
| WP1         | 2400       |   2300 |
| WP2         | 2400       |   2300 |
| HVDC1       | 1200       |   1150 |
| HVDC2       | 1700       |   1630 |  

<!-- what about the data for the RL load, the shunt reactors, the overhead lines, the thevenin equivalent? if it is easier you can add directly a parameter file like this: [Data](/pages/templates/data.xlsx) -->
<!-- do the cables have all the same parameters in all cases ?  -->

## Scenarios
<!-- i did removed all scenarios, as they were the ones from another test case. in your cases, what is the most relevant scenario that show converter driven instability. From your first figure, you seem to play different three phase fault events, is that right?  -->
<!-- the point of this paragraph is to show some key simulation results.  -->
<!-- any specific simulation parametrization of RSCAD there?  -->

## Open source implementations

| Software      | URL  |  Language | Open-Source license | Last consulted Date | Comments |
| ------------- | ---- | --------  | ------------------- | ------------------- | -------- |
| [RTDS](https://www.rtds.com/)  | [Link](https://github.com/control-protection-grids-tudelft/HVDC-RTDS-models) | RTDS | [MIT](https://github.com/control-protection-grids-tudelft/HVDC-RTDS-models/tree/main?tab=MIT-1-ov-file#readme) | 05/04/2024 | simulations made with RSCAD FX 2.0 software |

## Bibliography

{% bibliography --file references --cited %}