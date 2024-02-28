---
title: DynamicSimulationParameters
layout: page
---

The `com.powsybl.dynamicsimulation.DynamicSimulationParameters` class provides the generic parameters for all `com.powsybl.dynamicsimulation.DynamicSimulation`
implementations. Specific parameters should be provided as an extension of the `DynamicSimulationParameters` class.

# Properties

## startTime
The `startTime` property is an optional property that defines the instant of time at which the dynamic simulation begins, in
seconds.

## stopTime
The `stopTime` property is an optional property that defined the instant of time at which the dynamic simulation ends, in
seconds.

# Configuration
The default values of all the optional properties are read from the [dynamic-simulation-default-parameter](../../../pages/documentation/user/configuration/dynamic-simulation-default-parameters.md)
module, defined in the configuration file.

## Examples
```json
{
  "version": "1.0"
  "startTime": 0
  "stopTime": 3600
  "extensions": {
    ...
  }
}

```
