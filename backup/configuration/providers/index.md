---
title: Configuration Providers
layout: page
---

Configuration can typically come from different sources. For exemple, command line or desktop apps usually store the configuration in files in the user home directory; server deployments might use a central configuration database; or during testing, the configuration might be hardcoded in the test.

To implement this behavior, Powsybl defines a Configuration Provider interface: `com.powsybl.commons.config.PlatformConfigProvider`. You can use the implementations shipped with Powsybl or implement your own.

Note: The `iTools` and `GSE` distributions automatically use the `ClassicPlatformConfigProvider` so you don't have to think about it when using these programs. But if you are a developper using Powsybl as a plain java library, you must choose a configuration provider. To choose a configuration provider, ensure that it is the only implementation of PlatformConfigProvider available to Java's ServiceLoader. Otherwise, you will get one the following exceptions:
```
com.powsybl.commons.PowsyblException: Platform configuration provider not found
    at com.powsybl.commons.config.PlatformConfig.defaultConfig (PlatformConfig.java:70)
    [...]
```
or
```
com.powsybl.commons.PowsyblException: Multiple platform configuration providers found
    at com.powsybl.commons.config.PlatformConfig.defaultConfig (PlatformConfig.java:74)
    [...]
```



## List of Configuration Providers

### Classic Config
The ClassicPlatformConfigProvider is described in [Modules configuration](../modules/). It is the historical and main way to configure Powsybl. Add the following dependency in the pom.xml of your project to use it:
```xml
<dependency>
    <groupId>com.powsybl</groupId>
    <artifactId>powsybl-config-classic</artifactId>
    <version>${powsybl.version}</version>
</dependency>
```

### Test Config
The TestPlatformConfigProvider reads all the config from the classpath, making the test indepedant from the user's filesystem. This is done to have reproducible tests. Add the following dependency in the pom.xml of your project to use it:
```xml
<dependency>
    <groupId>com.powsybl</groupId>
    <artifactId>powsybl-config-test</artifactId>
    <version>${powsybl.version}</version>
</dependency>
```
The files must be present in the classpath in the folder "com/powsybl/config/test/" and must also be listed manually (this is a limitation due to how resource loading from the classpath works) in the file "com/powsybl/config/test/filelist.txt". For example, to specify a config.yml used by maven for tests, put the files in
```
src/test/resources/com/powsybl/config/test/filelist.txt
src/test/resources/com/powsybl/config/test/config.yml
```
Put the following content in filelist.txt:
```
config.yml
```
