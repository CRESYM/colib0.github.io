---
layout: page
title: MTDC Models
tags: ["RTDS", "HVDC", "MMC", "generic"]
---
# MTDC real-time models  

## Context 
These real time MTDC models designed for the for the RTDS-based simulation are using the CIGRE models [[1]](#1) and CIGRE brochures [[2]](#2), [[3]](#3), [[4]](#4) as the basis for the models design.
 

## Model use, assumptions, validity domain and limitations
The proposed model uses the CIGRE benchmark models [[1]](#1) and it closes the following modelings gap in the benchmark network: 
- Proposed network models consist of ±525 kV Submarine and land cables. 
- Proposed network models consider wind farm/wind turbine dynamics based on Real-time wind gusts using SiL setup. 
- Electrical and Control parameter perturbation using an automatic script.
- Provides an overview of required cores per network models. 
- Proposed networks consist of an average model of VARC DC CB. 

## Model description

The general structure of the HVDC VSC standard model is this one:
<img src="{{ '/pages/models/HVDC/MTDC_real-time_examples/MTDC_network.png' | relative_url }}"
     alt="MTDC topologies"
     style="float: left; margin-right: 10px;" />
	 
The network topologies have a DC voltage rating of ±525 kV, with bipolar dedicated metallic return (DMR) configurations. The converter is a half-bridge topology. The system can be divided into three subsystems: the onshore AC system, the DC system, and the offshore AC system.

The onshore AC system consists of Thevenin’s equivalent circuit (static voltage source) of a strong grid; the grid impedance is computed based on the short circuit current level—a series resistor connection of a parallel resistor and inductor models it. By adjusting the values of the inductance and resistance, the short circuit current value and the damping angle at funda-mental and Nth harmonic are controlled.

The rated line-to-line (LL) voltage is 400 kV. The onshore converter station has two Y-D transformers, with ratings of 2 GVA each. The voltage ratio of this transformer is 400 kV/275 kV. Onshore converters are labeled CSA1, CSA4, and CSA5. However, based on the se-lected topology, the converters are omitted.

The number of land and submarine DMR cables varies depending on the network topologies. For the five-terminal HVDC system, the number of land DMR cables are Cable 0a, 0b, and 0c. The length of these cables is 12 km. The land cables connect the onshore DC hub, which comprises DC breakers; for simplicity and to reduce the computation burden, only one DC breaker is employed. Furthermore, the DC system comprises six submarine cable links: ca-ble 1 (300 km), cable 2 (200 km), cable 3 (400 km), cable 4a (150 km), cable 4b (150 km), and cable 5 (200 km). The cables are modeled as a frequency phase-depended model. Fur-thermore, the cable link consists of three conductors (i.e., a positive, a negative cable, and metallic return per cable link) due to DMR topology. Cable 1 consists of two simplified VARC DC CB placed on the positive pole at either end of the cable, as seen in previous figure.

The offshore AC system consists of converter stations and aggregated average-value model wind farms. In the applied networks, offshore converters are labeled CSA2 and CSA3. How-ever, based on the topologies, the converters are omitted. The offshore converter is connect-ed to the offshore AC system via D-Y transformers. The rating of this transformer is 275 kV/220 kV, 2 GVA. Besides, this converter transformer is connected to a wind turbine trans-former. This transformer has a voltage ratio of 220 kV/66 kV and acts as a VA scaled-up transformer. Thus, a power rating of 2 GW can be achieved by choosing the proper scaling factor. The lower voltage end of this transformer is connected to the wind turbine. The wind turbines are type 4 and have a rating of 2 MW at a wind speed of 15 m/s. In this work, three fault locations are selected. F1 indicates an AC fault at the Point-of-Common Coupling (PCC) of the CSA1, F2 indicates a DC fault at the DC terminal near CSA1, and F3 indicates an AC fault at the PCC of CSA2.


## Open source implementations
This model has been successfully implemented in : RSCAD software

| Software      | [Link](https://www.rtds.com/) |  
| -----------------  | --- | 
| Models        | [Link](https://github.com/control-protection-grids-tudelft/HVDC-RTDS-models) |  

## Table of references

<a id="1">[1]</a> CIGRE Working Group B4.72, “DC grid benchmark models for system studies,” CIGRE Tech. Broch., vol. 804, no. June, 2020.

<a id="2">[2]</a> CIGRE Working Group B4.74, “Guide to Develop Real-Time Simulation Models for HVDC Operational Studies,” Tech. Broch.,vol. 864, no. February, 2022.

<a id="3">[3]</a> CIGRE Working Group B4.70, “Guide for electromagnetic transient studies involving VSC converters,” Tech. Broch.,vol. 832, no. April, 2021.

<a id="4">[4]</a> CIGRE Working Group B4.76, “DC-DC converters in HVDC grids and for connections to HVDC systems,”Tech. Broch., vol. 827, 2021.

<a id="5">[5]</a> NC Rfg Commission Regulation (EU) 2016/631 of 14 April 2016 establishing a network code on requirements for grid connection of generators (Text with EEA relevance) - Articles: 20 2 (b) and (c)