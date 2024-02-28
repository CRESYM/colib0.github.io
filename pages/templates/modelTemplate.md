---
layout: page # do not modify
title: Model description template # put the name of your model, try to be as specific as possible
tags: [] # pick none, one or several tags for the following categories:
# Opensource : tag to be added if there is at least one open source implementation of this model
# CIM model: CIMStatic or CIMDynamic tags can be selected if your model is part of the CIM standard
# Modeling details: tags giving the modeling details for this model: EMT, Dynamic phasor, shifted frequency, phasor, RMS
# Number of phases: Single phase, three phases
# Standard: select the relevant tag name standard (WECC, CIGRE, IEEE, IEC, etc.) if your model is included in a standard.
# Code section: if this template contains a Modelica or Openmodelica code section in line with the model description and equations, use the tag CodeImplementation
# Component type: gives the electrical category of the device: Protection, line, bus, machines, synchronous generator, transformer, controllers, capacitors, sources, excitation system, automatic voltage regulator, PSS, PLL, Governor, load, sensors, wind generation, solar generation, load, HVDC, synchronous condensers, DLR, etc.
# Implementation tools: software name (EMTP, PSCAD, PSS/E, NEPLAN, dynawo, DPSIM, Power Factory, Matlab, STEPSS, RTDS, Opal RT, powerworld, GE PSLF) to be used as tag if your model is implemented in specific software 
date: XX/XX/20XX # date of last page modification 
bibliography: # if you have a bibtex file to include
  - my_references.bib
---
# Model description template 

 Each model post must be a consistent whole that cannot be subdivided into sub-models without loss of understanding (for example, due to a consistent notation system, intertwined equations, etc.) 

## Context (mandatory)

short paragraph reminding the history of the model, in which context it was developed for, what are the physics and the modelling approximations behind it.
References citations can be made pointing to the references section (at the end of the document). A citation can simply be included by using footnote links: [^1] inside the main text and
<a id="1">[1]</a> Author's name, "Title" Date Journal, doi: 10.1109/>XXXXx46648.2021.9495096 at the end of the document.

## Model use, assumptions, validity domain and limitations (mandatory)

Each model is an approximation of the reality, and considers some assumptions. This section gives details on:

- the validity domain of the model (frequency range, type of dynamics, type of stability phenomena) that the model covers,
- the model assumptions (e.g., neglecting the DC side of the converter, simplistic PLL representation)
- the limitations of the model (what people shouldn't use the model for)

## Model description (mandatory)

 This section gives the full description of the different model's component.
For each component, is given: a brief explanation about the functioning of the component (how it works, what it is made of, which implementation choices are made) and the component equations or control diagram. The author can also point to another component page if the component is already explained in another page. In such case, he clearly needs to make coherence is achieved with the rest of the model in terms of notation, convention, and connection aspects.

- For the equation system / algorithm, the author can use Latex language, which is fully compatible with markdown. For example: $$ x_{j}^{i} $$ or $ x_{j}^{i} $. He can also use numbered equations. The variables and parameters should be clearly specified, as well as their type (complex, real, etc.), unit (MW, MVA, etc), and meaning (phase to neutral voltage for the output terminal A). The notation should follow scientific standards.

- Images can be added for clarity with: <img src="{{'pages/templates/gaussian.png' | relative_url}}" alt="Normalized Gaussian curves" The image must be of good quality and more preferably in .svg format.

- Electric/Electronic/Control/Phasor diagrams can be used instead of equations system to describe the component. We invite the author to use the draw.io plugin for github allowing you to make your own diagram easily. The diagram is fully editable with github commit using a graphical interface, and allowing multiple format outputs (for more details, see: https://app.diagrams.net/). if the diagram includes common control block, you can use the already available drawio library in pages/models/controlBlocks/ . For each block a corresponding page is provided describing the block itself, it diagram representation and the corresponding equations/algorithm.

- Initial equations/boundary conditions: when initial equations or boundary conditions are necessary to fully described the system, a subsection dedicated to those aspects can be added in this section.

## Modelica implementation (if any)

This section is a code section that provides the source code for model described above. The implementation should correspond strictly the equations/diagram/algorithm described before and should have been validated in a tool. The date of the code should be specified at the beginning of the section, the code should be clean, readable and organized.
The code can be presented in a markdown code block like this:

```text
function test() {
  console.log("notice the blank line before this function?");
}
```

## Open source implementations (if any)

This section give a list of the different open source implementations of this model. It provides the reader with links and languages/software used for each implementations.
The markdown table can be used to display such list, for example:

This model has been successfully implemented in :

| Software      | URL | Language  | Last consulted date |
| --------------| --- | --------- | ------------------- |
| Software name | [Link](https://github.com/toto) | modelica | XX/0X/20XX |

## Table of references & license

This section lists all the references. It must comply with current citation standards. A bibtex file can directly be used.

For example:
You can insert references manually by using this markdown list links:

<a id="1">[1]</a> Author's name, "Title" Date Journal, doi: 10.1109/>XXXXx46648.2021.9495096 at the end of the document.
<a id="2">[2]</a> Author's name 2, "Title2" Date Journal, doi: 10.1109/>XXXXXXXXX.2021.9495096 at the end of the document.

or by using directly a bibtex file in the model's folder and using the citation command: [@texbook]
