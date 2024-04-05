---
layout: page
title: MTDC benchmark models and test simulations
tags: [opensource, small, TCRL2, converter driven instability slow interaction, HVDC, WTG, grid forming, grid following, RSCAD]
# what is the software for the RMS simulation?
date: 16/11/2023
last-updated: 04/05/2024
---

# MTDC benchmark models for the real-time simulation

## Use case purpose: ​

This 100% power electronics small test system combines VSC and wind turbines technologies, grid following and grid forming controls.
It aims at showing the limitations of the phasor approximation while being small and easily tractable but realistic. Hence, an EMT and RMS version of this system exist for the benchmark.
<!-- could you explain a bit more in which sense the case shows limitations of RMS ? can you explain a bit more the phenomena that those case show? -->

This case is typical of the converter driven stability slow interactions problem.

## References

This benchmark has been designed by the Control of HVDC/AC electrical grids group from TU Delft 
{% cite No1 %} {% cite No2 %}.
<!-- do you have a reference paper to add ? -->

## Network ​description

The network is described by the following figure:

<img src="{{ '/pages/testCases/MTDC_RTDS_tests/MTDC_network.png' | relative_url }}"
     alt="MTDC topologies"
     style="float: center; margin-right: 10px;" />

<!-- the quality of the picture is not that good. if you have an higher resolution it would be great. -->
The general structure of the HVDC VSC standard model is this one [[5]](#5): <!-- this reference doesn't lead anywhere, did you want to add a picture? -->

This figure shows four different HVDC configurations: a) two terminals, b) three terminals, c) four terminals and d) five terminals that are available in the repository.
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
<!-- it there a document explaining the model of each network element for EMT and RMS approaches? so that the link to the detailed models can be made at some point. -->

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
<!-- i do remove all scenarios, as they were the ones from another test case. in your cases, what is the most relevant scenario that show converter driven instability. From your first figure, you seem to play different three phase fault events, is that right?  -->
<!-- the point of this paragraph is to show some key simulation results.  -->

## Open source implementations

| Software      | URL  |  Language | Open-Source license | Last consulted Date | Comments |
| ------------- | ---- | --------  | ------------------- | ------------------- | -------- |
| [RTDS](https://www.rtds.com/)  | [Link](https://github.com/control-protection-grids-tudelft/HVDC-RTDS-models) | RTDS | [MIT](https://github.com/control-protection-grids-tudelft/HVDC-RTDS-models/tree/main?tab=MIT-1-ov-file#readme) | 05/04/2024 | No Comment |

## Bibliography

{% bibliography --file references --cited %}