---
layout: page
title: Model description template
tags: []
author: Toto
---
You can use the following template for any model post:

# Model Name

## Context 
Reminds the history of the model, what are the physics and the modelling approximations behind it, eventually key references.

## Model use, assumptions, validity domain and limitations
Each model is an approximation of the reality, and considers some assumptions. This section gives the validity domain of the model (frequency range, type of dynamics, type of stability phenomena). 

## Model description
Explains the different components of the model, how it works, what it is made of.

*Latex can be used: $$ x_{j}^{i} $$*

*Footnotes can be included.[^1]*

*Images can be added:*

![Normalized Gaussian curves](/pages/templates/gaussian.png)
<img src="{{'pages/templates/gaussian.png' | relative_url}}" alt="Normalized Gaussian curves"/>

[^1]: This is a footnote.


## Model schema (optional)
Any kind of illustration that can help the understanding of the model. It can be: electrical representation, control diagram, phasor diagram, schematic representation, etc.

## Parameters 
Sets of parameters of the equations below. For each parameter: type, unit, brief description

## Variables 
Sets of variables of the equations below. For each variables: its type (eg. Complex), unit (eg MW), brief description

## Equations & algorithm  
Gives the set of equations or algorithm of the model, in accordance with mathematical standards and notations. Time-domain or frequency domain can be written.

## Initial equations / boundary conditions (optional)
Give the set of equations satisfied by the model at the initialization if different from the dynamic equations.  

## Open source implementations (if any)
Table of the different open source implementations of this model. It gives links and languages used for each implementations.

## Table of references & license
