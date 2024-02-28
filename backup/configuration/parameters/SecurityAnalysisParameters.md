---
title: SecurityAnalysisParameters
layout: page
---

The `com.powsybl.security.SecurityAnalysisParameters` class provides the generic parameters for all `com.powsybl.security.SecurityAnalysis`
implementations. Specific parameters should be provided as an extension of the `SecurityAnalysisParameters` class.

# Properties

## load-flow-parameters
The `load-flow-parameters` property is an optional property that defines the [LoadFlowParameters](LoadFlowParameters.md)
to use. If this property is not set, the default values of all the optional properties are read from
the [load-flow-default-parameters](../../../pages/documentation/user/configuration/load-flow-default-parameters.md) module, defined in the
configuration file.

# Examples
```json
{
  "version" : "1.0",
  "load-flow-parameters" : {
    "voltageInitMode" : "PREVIOUS_VALUES",
    "transformerVoltageControlOn" : true,
    "phaseShifterRegulationOn" : false,
    "noGeneratorReactiveLimits" : true,
    "specificCompatibility" : false,
    "extensions" : {
      ...
    },
  },
  "extensions" : {
    ...
  }
}
```

Note that there are two `extensions` field. The first one contains the extensions of the `LoadFlowParameters` whereas the
the second one contains the extensions of the `SecurityAnalysisParameters`.
