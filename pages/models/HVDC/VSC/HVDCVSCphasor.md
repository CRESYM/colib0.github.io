---
layout: default
title: Phasor VSC HVDC Model
permalink: /models/HVDC/VSC/HVDCVSCPhasor
---
# Phasor VSC HVDC model  

## Context 
This standard voltage source converter based high voltage DC transmission line (VSC-HVDC) model has been developped in ENTSOE G-HVDC working group. It gathers most of the features of specific detailed models, while being kept as simple and generic as possible.
 

## Model use, assumptions, validity domain and limitations
It can be used for voltage and transient stability studies, when a detailed specific model can't be used. It can't be used for studies that look at the DC side behaviour nor the frequency behaviour (the secondary voltage control isn't implemented in this model) as the DC link and its interaction with the converter isn't properly modelled.

Details on the voltage control, reactive power control, active/reactive limits are represented and key for the voltage studies.
Reactive current injection during fault and current blocking protection is also represented in this model for an acurate beahviour during a fault.

## Model description

The general structure of the HVDC VSC standard model is this one:
<img src="/pages/models/HVDC/VSC/standardVSCmodelGeneralView.png"
     alt="General view of the HVDC VSC standard model: physical and control connections"
     style="float: left; margin-right: 10px;" />

### DC transmission line and converters model
In the AC grid sending-end and receiving-end converters (SEC and REC) of the HVDC system are represented by controlled Thévenin sources. The controllers act on the two voltage sources to provide the prescribed terminal conditions by adjusting the magnitude and frequency of the source voltage. 
<img src="/pages/models/HVDC/VSC/standardVSCmodelACDCConverterConnections.png"
     alt="DC and AC sides of the converter"
     style="float: left; margin-right: 10px;" />

### AC side of the converter 
The VSC converter is modelled on the AC side by a current injector with a parallel admittance. 
It transforms the references of active and reactive currents IqRef and IpRef and the internal angle into a couple of to be injected in the network currents, which are the real Ir and imaginary Ii values.
<img src="/pages/models/HVDC/VSC/standardVSCmodelCurrentInjector.png"
     alt="Current injector"
     style="float: left; margin-right: 10px;" />

### DC link model
The DC link model is incorporated into the controller description and not explicitly physically represented.
However, the relationships between DC currents and voltages of the receiving-end and sending-end sides are represented by the following figure:

<img src="/pages/models/HVDC/VSC/standardVSCmodelDCSide.png"
     alt="Electrotechnical components representing the DC side"
     style="float: left; margin-right: 10px;" />

CDC represents the equivalent capacity of the converter
RDC12  represents the resistance of the DC cable 


### Active power control

### Voltage Control

### Reactive power control

### Secondary voltage control 

## Initial equations / boundary conditions (optional)
Give the set of equations satisfied by the model at the initialization if different from the dynamic equations.  

## Open source implementations (if any)
Table of the different open source implementations of this model. It gives links and languages used for each implementations.

## Table of references & license
A fundamental study on the impact of HVDC lines on transient stability of power systems, Lukas Sigrist; Francisco Echavarren; Luis Rouco; Patrick Panciatici

Modeling and control of HVDC grids: A key challenge for the future power system, Jef Beerten; Oriol Gomis-Bellmunt; Xavier Guillaud; Johan Rimez; Arjen van der Meer
