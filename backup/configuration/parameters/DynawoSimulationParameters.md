---
title: DynawoSimulationParameters
layout: page
---

The `com.powsybl.dynawo.simulator.DynawoSimulationParameters` class provides the specific parameters of a dynamic simulation run with Dynawo.

# Properties

## parametersFile
The `parametersFile` property is a required property that defines the path of the main parameters file.

## network.parametersFile
The `network.parametersFile` property is a required property that defines the path of the network parameters file

## network.parametersId
The `network.parametersId` property is an optional property that defines the set of network parameters. The default value for this property is `NETWORK`.

## solver.type
The `solver.type` property is an optional property that defines the solver used in the simulation. The default value for this property is `SIM`. The available `com.powsybl.dynawo.simulator.DynawoSimulationParameters.SolverType`
values are:
- SIM: the simplified solver (fixed time step solver)
- IDA: the IDA solver (variable time step solver)

## solver.parametersFile
The `solver.parametersFile` property is a required property that defines the path of the solver parameters file

## solver.parametersId
The `solver.parametersId` property is an optional property that defines the set of solver parameters. The default value for this property is `SIM`.

# Configuration
The default values of all the optional properties are read from the [dynawo-default-parameter](../../../pages/documentation/user/configuration/dynawo-default-parameters.md)
module, defined in the configuration file.
