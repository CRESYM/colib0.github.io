---
title: run-impact-analysis
layout: page
todo:
    - add link to IPST implementation (pclf / https://github.com/itesla/ipst/tree/master/pclfsim-integration)
---

The `run-impact-analysis` command is used to run dynamic simulations on one or several networks, for all the configured
contingencies and re-calculate all the predefined security-indexes.

# Usage
```shell
$> itools run-impact-analysis --help
usage: itools [OPTIONS] run-impact-analysis --case-file <FILE> [--contingencies
       <LIST>] [--help] [-I <property=value>] [--import-parameters
       <IMPORT_PARAMETERS>] [--output-csv-file <FILE>]


Available options are:
    --config-name <CONFIG_NAME>                       Override configuration file name

Available arguments are:
    --case-file <FILE>                                the case path
    --contingencies <LIST>                            contingencies to test separated by ,
                                                      (all the db in not set)
    --help                                            display the help and quit
-I <property=value>                                   use value for given
                                                      importer parameter
    --import-parameters <IMPORT_PARAMETERS>           the importer configuation
                                                      file
    --output-csv-file <FILE>                          output CSV file path (pretty print
                                                      on standard output if not specified)
```

## Required parameters

### case-file
Use the `--case-file` to specify the path of the case file.

## Optional parameters

### contingencies
Use the `--contingencies` parameter to filter the list of contingencies to simulate. If this parameter is not set, all
the contingencies provided by the `com.powsybl.contingency.ContingencyProvider` are simulated.

### import-parameters
Use the `--import-parameters` parameter to specify the path of the configuration file of the importer. It is possible to
overload one or many parameters using the `-I property=value` parameter. The properties depend on the input format.
Refer to the documentation page of each [importer](../iidm/importer/index.md) to know their specific configuration.

### output-csv-file
Use the `--output-csv-file` parameter to export the output to the specified CSV file. If this parameter is not set, the
outputs are printed to the console.

# Configuration
To run an impact analysis, one has to choose the implementation of the `com.powsybl.contingency.ContingenciesProviderFactory`
to use, by setting the `ContingenciesProviderFactory` property to the [componentDefaultConfig](../pages/documentation/user/configuration/componentDefaultConfig.md)
module. To learn more about contingencies or available `ContingenciesProvider` read this [documentation](../contingencies/index.md) page.

Read the [simulation-parameters](../pages/documentation/user/configuration/simulation-parameters.md) documentation to learn how to
configure the impact analysis parameters.

# Maven configuration
To use `run-impact-analysis` command, add the following dependencies to the `pom.xml` file:
```xml
<dependency>
    <groupId>com.powsybl</groupId>
    <artifactId>powsybl-simulation-api</artifactId>
    <version>${powsybl.version}</version>
</dependency>
```
