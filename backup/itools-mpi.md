---
title: itools-mpi.conf
layout: page
---

The `POWSYBL_HOME/etc/itools-mpi.conf` file is a [properties](https://en.wikipedia.org/wiki/.properties) file that contains
system properties to configure MPI tasks. This configuration file is read by the `itools-mpi` script, that runs computations
on a MPI cluster.

# Properties

## mpi_hosts
The `mpi_hosts` property is a required property to run parallel command with MPI that defines the list of hosts of the MPI
cluster. The hosts are separated by a comma.

## mpi_tasks
The `mpi_tasks` property is a required property to run parallel command wih MPI that defines the maximum number of parallel
tasks.

# Example
```properties
# MPI maximum parallel tasks count
mpi_tasks=2

# MPI comma sperated hosts list
mpi_hosts=localhost
```
