---
layout: page
title: Two-Area Four-Generator System 
tags: [_Opensource, medium, Small Signal Stability, line, bus, synchronous generator, load_]
date: 18/12/2024  
last-updated: 18/12/2024
authors: 
reviewers:
---


{% endraw %}

<!--# Test cases description template (ID: 60)-->

## Use case purpose​ and context (mandatory)

The Two-Area 4-Generator Test Case [^1] is a well-established model for studying small-signal stability in interconnected power systems, with a particular focus on interarea oscillations. Interarea oscillations are low-frequency oscillations where groups of generators swing against each other across interconnected areas. 

This model allows researchers to evaluate the impacts of system parameters, stabilizers, and load variations on the damping of these oscillations. As a result, it has become a benchmark for validating analytical methods and developing control strategies to enhance system stability.

## Table of references (mandatory)

{% raw %}

```text
<a id="1">[1]</a> Kundur, Prabha S. Power System Stability and Control. First Edition. New York: McGraw Hill, 1994.
```

{% endraw %}

## Network ​description (mandatory)

The one-line diagram is shown in the following figure (Fig.1):

<figure>
     <img src="{{ '/two-area-oneline.png' | relative_url }}"
     alt="Two-Area Four-Generator Test Case"
     style="float: center; margin-right: 10px;"/>
     <p style='text-align: center; font-family: Serif;'><b> Fig.1. one line diagram of Two-Area Four-Generator Test Case</b></p>
</figure>

## Static and Dynamic models​ description (mandatory)

- Generator represented by the classical model : https://cresym.github.io/WOLF-I/2024/09/02/small-signal-stability-of-multimachine-systems.html
- Generator represented by the detailed model : https://cresym.github.io/WOLF-I/2024/12/12/small-signal-stability-of-multimachine-systems.html
- Representation of static loads : https://cresym.github.io/WOLF-I/2024/08/30/small-signal-stability-of-multimachine-systems.html


## Input Data (mandatory)

- **static data for the network**
The transmission system nominal voltage is 230 kV. The line lengths are identified in Fig1. The parameters of the lines in per unit on 100 MVA, 230 kV base are : 
$$r = 0.0001 pu/km$$
$$x_L = 0.001 pu/km$$ 
$$b_c = 0.0175 pu/km$$ 

Each step-up transformer has an impedance of $$0+j0.15$$ per unit on 900 MVA and 20/230 kV base, and has an off-nominal ratio of $$1.0$$. 

- **dynamic data for each dynamic element component.**

The system consists of two similar areas connected by a weak tie. Each area consists of two coupled units, each having a rating of 900 MVA and 20 kV. The generator parameters in per unit on the rated MVA and kV are as follows : 

$$X_d = 1.8$$ 
$$X_q = 1.7$$
$$X_l = 0.2$$
$$X'_d = 0.3$$
$$X'_q = 0.55$$
$$X''_d = 0.25$$
$$X''_q = 0.25$$ 
$$R_a = 0.0025$$
$$T'_d0 = 8.0s$$ 
$$T'_{q0} = 0.4s$$ 
$$T'_{d0} = 0.03s$$
$$T''_{q0} = 0.05s$$ 
$$A_{sat} = 0.015$$
$$B_{sat} = 9.6$$ 
$$\psi_{T1} = 0.9$$
$$H = 6.5 \rightarrow G1, G2$$ 
$$H = 6.175 \rightarrow G3, G4$$
$$K_D = 0$$

- **load flow values**
The system is operating with area 1 exporting 400 MW to area 2,and the generating units are loaded as follows : 

|G1 | P = 700 MW | Q = 185 MVAr | E_t = 1.03 \angle{20.2º}|
|G2 | P = 700 MW | Q = 235 MVAr | E_t = 1.01 \angle{10.5º}|
|G3 | P = 719 MW | Q = 176 MVAr | E_t = 1.03 \angle{-6.8º}|
|G4 | P = 700 MW | Q = 202 MVAr | E_t = 1.01 \angle{-17.0º}|

The loads and reactive power supplied ($Q_C$) by the shunt capacitors at buses 7 and 9 are as follows : 

|Bus7 | P_L = 967 MW | Q_L = 100 MVAr | Q_C = 200 MVAr|
|Bus9 | P_L = 1767 MW | Q_L = 100 MVAr | Q_C = 350 MVAr|

## Scenarios (at least one mandatory)

1. All four generators are on manual excitation control (constant $$E_{fd}$$) and represented by the classical model. Assume that the active components of loads have constant current characteristics, and reactive components of loads have constant impedance characteristics. 

1. All four generators are on manual excitation control (constant $$E_{fd}$$) and represented by the detailed model. Assume that the active components of loads have constant current characteristics, and reactive components of loads have constant impedance characteristics. 

## Outputs (mandatory)

1. The 8 eigenvalues of the system are : 
``` -0.0 - 7.21im
 -0.0 + 7.21im
  0.0 - 3.41im
  0.0 + 3.41im
  0.0 - 0.0im
  0.0 + 0.0im
  0.0 - 7.4im
  0.0 + 7.4im
```
2. The 24 eigenvalues of the system are : 
``` 
 -37.23 + 0.0im
 -37.15 + 0.0im
 -36.21 + 0.0im
 -36.04 + 0.0im
  -34.8 + 0.0im
 -33.41 + 0.0im
 -30.39 + 0.0im
 -28.89 + 0.0im
   -4.7 + 0.0im
  -4.66 + 0.0im
  -3.28 + 0.0im
  -2.36 + 0.0im
  -0.59 - 6.99im
  -0.59 + 6.99im
  -0.58 - 6.79im
  -0.58 + 6.79im
  -0.17 + 0.0im
  -0.17 + 0.0im
  -0.12 - 3.43im
  -0.12 + 3.43im
  -0.04 + 0.0im
   -0.0 - 0.0im
   -0.0 + 0.0im
    0.0 + 0.0im
```

## Open source implementations (if any)

This model has been successfully implemented in :

| Software      | URL | Language  | Open-Source License | Last consulted date | Comments |
| --------------| --- | --------- | -------------------| ------------------- |
| / | [Link](https://cresym.github.io/WOLF-I/2024/09/06/small-signal-stability-of-multimachine-systems_2area4gen_clsgen.html) | Julia | [MIT License]| 18/12/2024 |  |
| / | [Link](https://cresym.github.io/WOLF-I/2024/12/13/small-signal-stability-of-multimachine-systems_2area4gen_detgen.html) | Julia | [MIT License]| 18/12/2024 |  |
