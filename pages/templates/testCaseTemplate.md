---
layout: page # do not modify
title: Test cases description template # put the name of your test case, try to be as specific as possible
tags: [] # pick none, one or several tags for the following categories:
# Opensource : tag to be added if there is at least one open source implementation of this test case
# CIM description: CIMStatic or CIMDynamic tags can be selected if your test case can be exported with CIM standard
# Test case size: Small (<10 nodes), medium (>10 and <100 nodes), large (>100 nodes)
# Standard: select the relevant tag name standard (WECC, CIGRE, IEEE, IEC, etc.) if your test case is included in a standard.
# Phenomena: tag caracterizing the type of phenomena the test case is meant to highlight. For example: Short term Voltage, long term voltage, small signal,  frequency, converter driven instability slow interaction, converter driven instability fast interaction, resonance, restoration, etc.
# Code section: if this template contains a Modelica or Openmodelica code section in line with the network description and equations, use the tag CodeImplementation
# Contains: gives the list of electrical device the case contains: Protection, line, bus, machines, synchronous generator, transformer, controllers, capacitors, sources, excitation system, automatic voltage regulator, PSS, PLL, Governor, load, sensors, wind generation, solar generation, load, HVDC, synchronous condensers, DLR, etc.
# Implementation tools: software name (EMTP, PSCAD, PSS/E, NEPLAN, dynawo, DPSIM, Power Factory, Matlab, STEPSS, RTDS, Opal RT, powerworld, GE PSLF) to be used as tag if your test case is implemented in specific software 
date: XX/XX/20XX # date of last page modification 
bibliography: # if you have a bibtex file to include
  - my_references.bib
---
# Test cases description template
  
 A test case include a network test system with static and dynamic models for each element, some input data, and some scenarios
 Each test case must be specific enough to be added in a new page. In other words, it means that the test case should be significatively different from existing standard test cases (either by its network topology, generation mix, static data values), either by its operating point, either by the phenomena/event it tackles. The differences with existing well-known test cases should be clearly explained.

## Use case purpose​ and context

this section aims at explaining the main purpose of the test case, the reason why it was built. The history behind the test case can also be given for clarity. ​
References citations can be made pointing to the references section (at the end of the document). A citation can simply be included by using footnote links: [^1] inside the main text and
<a id="1">[1]</a> Author's name, "Title" Date Journal, doi: 10.1109/>XXXXx46648.2021.9495096 at the end of the document.

## Table of references

This section lists all the references. It must comply with current citation standards. A bibtex file can directly be used.

For example:
You can insert references manually by using this markdown list links:

<a id="1">[1]</a> Author's name, "Title" Date Journal, doi: 10.1109/>XXXXx46648.2021.9495096 at the end of the document.
<a id="2">[2]</a> Author's name 2, "Title2" Date Journal, doi: 10.1109/>XXXXXXXXX.2021.9495096 at the end of the document.

or by using directly a bibtex file in the model's folder and using the citation command: [@texbook]

## Network ​description

This section gives the overview of the network test system. A grid map, an electrical circuit diagram,  can be provided as well as some extra explanations of the network (chart labels, symbols, generation mix, consumption level, etc.)
For electrical circuit diagram, we invite the author to use the draw.io plugin for github allowing you to make your own diagram easily. The diagram is fully editable with github commit using a graphical interface, and allowing multiple format outputs (for more details, see: https://app.diagrams.net/)
If you want to use a picture, please use Scalable Vector Graphics (SVG) file format.

## Static and Dynamic models​ description

This section lists the different elements of the network test system. To avoid moo much information on the same page, some links to the elements model's pages can be provided.

## Input Data

This section includes all the needed input data the test case needs to be run.
It covers:

- static data for the network
| Line/Cable  | Nominal Voltage (kV) |  R (\ohm) |  X (\ohm)  |
| ----------- | -------------------- | --------- | ---------- |
| XXX         |    XXX               |   XXX     | XXX        |

- dynamic data for each dynamic element component. For example :
| PLL parameter| Units (if pu specify the base) |
| ------------ | -------------------- ----------|
| Tpll         |   ms                           |
- load flow values
- initial states of dynamic variables

If the network is too big, input data can be provided by uploading data files directly in the page. The data files should be understandable and contains unit information. For example: [Data](data.xlsx)

## Scenarios

This section explains the scenario that is played on the previous described system. For example: three phase ground fault on line 1-3.

### Scenario No. XX / Name: <!-- give a number or/and a name to the scenario. -->

In this paragraph, all the information that is required to run the test and that the previous section hasn't covered should be included in the scenario description. If no additional information is required, this section can be left empty.
Below is listed the type of information that can be useful for the reader.

**Event**
gives a description of the event and the time of the event.

**Operating point No. X**
If the operating point differs from the load flow values provided before, the change in the operating point should be precised here.

**Control modes**
if specific control modes are used for the scenario, it should be detailed here.

**Network variant**
if slight changes are made in the network configuration, topology, mix, dynamic data, etc. those changes can be described here.

## Simulation parameters

The section gathers the main simulation parameters used to run the case.
For example:

- type of problem: Differential algebraic equations
- solver name: e.g. IDA
- computing method: e.g. variable-order, variable-coefficient Backward differentiation formula in fixed-leading-coefficient form
- time step (min,max): e.g. 5 ms
- simulation duration: e.g. 5 s

## Outputs

The section presents the key outputs of the simulation by providing figures, curves, and text.
The results should be interpreted to the extent possible.
The plots can be provided in various forms.

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
| Software name | [Link](https://github.com/toto) | modelica | XX/XX/20XX |