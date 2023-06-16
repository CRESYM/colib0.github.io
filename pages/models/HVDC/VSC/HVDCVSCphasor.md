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
<img src="/pages/models/HVDC/VSC/HvdcVSC.svg"
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

<img src="/pages/models/HVDC/VSC/HVDCVSCPControl.svg"
     alt="P control of the VSC"
     style="float: left; margin-right: 10px;" />

The $$r_{p_{fault}}$$ signal is equal to 1 under normal conditions, and is set to zero when the converter is blocked. It comes back at value 1 following a ramp when the converter is unblocked. This allows to model the ramping power recovery after blocking of the converter.

The $$block$$ signal indicates if the converter is blocked (=1) or not.
$$P_{max}$$ and $$P_{min}$$ are operating limits, $$I_{p_{max}}$$ and $$I_{p_{min}}$$ are active power limits of the converter.

$$\Delta P$$ is a corrector that allows to adjust the active power of the current converter when the other converter isn't able to control the DC voltage. it is calculated as follows:
<img src="/pages/models/HVDC/VSC/HVDCVSCDeltaP.svg"
     alt="Delta P calculation"
     style="float: left; margin-right: 10px;" />
The threshold goes to 1 if the active current $$I_p^*$$ reaches its caps (by a matter of DUDC)

### DC Voltage Control 
<img src="/pages/models/HVDC/VSC/HVDCVSCVDCControl.svg"
     alt="VDC control of the VSC"
     style="float: left; margin-right: 10px;" />

$$I_{p_{max}}$$ is the maximum active nominal current of the DC line.

NB: if the nominal power $$S_n$$ is assumed equal to nominal active power $$P_n$$, there is a correspondance between pu and SI units, $$I_{p_{max}}$$ will be equal to 1, and InPu will be equal to $$I_n^{Pu} = \frac{\sqrt{P_{max}^2 + Q_{max}^2}}{S_n}$$

### AC Voltage control 
it the the reactive control loop and can be operated with two modes U-mode or Q-mode. In both moes, a reference of the reactive power to be injected to the grid is assessed.

**Q-mode:**
<img src="/pages/models/HVDC/VSC/HVDCVSCUACControlQmode.svg"
     alt="Q mode of the U AC control of the VSC"
     style="float: left; margin-right: 10px;" />

**U-mode:**
<img src="/pages/models/HVDC/VSC/HVDCVSCUACControlUmode.svg"
     alt="U mode of the U AC control of the VSC"
     style="float: left; margin-right: 10px;" />

$$Q_{max_{comb}}$$ and $$Q_{min_{comb}}$$ are a combinaison of the operational limits, the PQ limits and the UQ limits. 


Once the reference $$Q^*$$ is calculated, we apply to this reference the different limits 

Finally, the reactive power is converted into a reactive reference current $$I_q^*$$ by the following control:
<img src="/pages/models/HVDC/VSC/HVDCVSCUACControlIqref.svg"
     alt="calculation of the reference reactive current by the U AC control of the VSC"
     style="float: left; margin-right: 10px;" />
$$U$$ represents the voltage value at the PCC.
The $$T_Q$$ time constant represents tha dynamique of the voltage/reactive power control.
The $$I_q^{FRT}$$ represents the additional reactive current in case of fault or overvoltage on the AC side. It depends on the voltage level, and follows the ENTSOE requirements during a fault ride through.
TO BE FURTHER DEVELOPED

### Secondary voltage control 

### Blocking function
When the voltage goes below at certain trheshold $$U_{block}$$, the converter is blocked for a certain duration $$T_{block}$$. If the voltage gets back into the range $$[U_{min_{block}}, U_{max_{block}}]$$, it gets unblocked after $$T_{unblock}$$ seconds.

## Initial equations / boundary conditions (optional)
Give the set of equations satisfied by the model at the initialization if different from the dynamic equations.  

## Open source implementations (if any)
Table of the different open source implementations of this model. It gives links and languages used for each implementations.

## Table of references & license
A fundamental study on the impact of HVDC lines on transient stability of power systems, Lukas Sigrist; Francisco Echavarren; Luis Rouco; Patrick Panciatici

Modeling and control of HVDC grids: A key challenge for the future power system, Jef Beerten; Oriol Gomis-Bellmunt; Xavier Guillaud; Johan Rimez; Arjen van der Meer

The Comparison of Polish Grid Codes to Certain European Standards and resultant Differences for WPP Requirements