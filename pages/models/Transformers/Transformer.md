---
layout: page
title: Transformer
tags: ["#114", "Transformer", "Single-phase", "Three-phase", "Cantilever equivalent", "Leakage flux"]
date: 02/05/2024 
last-updated: 02/05/2024
---

# Transformer model

## Context

Transformers are essential parts of the grid as two-port devices that change the voltage level from one of its ends to the other. It allows to be able to change the voltage to a suitable level to perform any of the actions necessary for the grid. For example, it is used to raise the voltage to be able to transport electricity minimizing the losses, and then lower the voltage until reaching appropriate levels for consumption without risking the integrity of the users. 

## Model use, assumptions, validity domain and limitations

The model is developed starting from the single-phase transformer, then it is expanded to describe the three-phase configurations and equations. It describes the *cantilever equivalent circuit* of the transformers, which consider a non-ideal model of the transformer with some simplifications that allow to perform the steady-state analysis of transformers.

The assumptions are: 

* The model assumes linearity with respect to the magnetic circuits, not considering saturation.
* Each winding has a leakage flux associated, which does not contribute to the core flux, and is included only in the total flux passing through the winding in which is generated. The path taken by this flux is mainly through the air, and can be modelled as a linear function of the current associated to the winding.
* The primary winding current is divided in two components, one is the current associated to the magnetomotive force produced to compensate for the demagnetizing force produced by the secondary windings, which can be though of as a load, and the second component is associated to the current necessary to produce the mutual flux.
* In practice, not all the turns of the coils are affected by the leakage flux, and not all the magnetizing flux produced by one winding affects all the turns of the other winding. For that reason, the number of turns of each winding ($$N_i$$) is assumed to be an equivalent number of turns, which differs from the actual number of turns.
* The final equivalent model neglects the voltage drop produced by the exciting current in the secondary leakage impedance.

The model does replicate exactly the theoretical value of the voltage at the secondary winding calculated with full information, as the equivalent impedance is a simplified approach of the losses. Since the leakage reactances are not easily measured, this approach is preferred as there are short-circuit and open-circuit tests that can be used to determine these equivalent values. 

## Model description

### Parts of the transformers

There are two physical parts of the transformers relevant for the model described:

#### Windings

Windings are copper coil turns grouped in different bundles. Windings can be primary windings, to which the voltage is applied, or secondary windings, which have an output voltage that is product of the transformation.

They can also be considered high voltage windings or low voltage windings, and both of them can act as primary or secondary depending on the direction of the power. In the generation part of the power system, the primary winding of the transformer will correspond to the low voltage level, since the generation occurs at low voltage, and it has to be raised to a higher level for the transmission grid. In the consumer part of the power system, the primary will be the high voltage level, and the secondary will be the low voltage level.

#### Core

The core has two primary functions. The more obvious one, it acts as the support of both the primary and secondary windings. The second function, but not less important, it creates a low reluctance path for the magnetic flux. It is typically made of soft iron in order to lower the eddy current losses.


### Transformer equations

#### Variables

#### Parameters

#### Systems of equations

### Operational principles

#### Equivalent-T single-phase transformer

Single-phase transformers have two windings around the same iron core, which confines the magnetic flux created by the windings. The relationship between currents and voltages for the windings can be written as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
\begin{equation}
    v_1 = R_1 i_1 + \frac{d\Psi_1}{dt} \\
    v_2 = R_2 i_2 + \frac{d\Psi_2}{dt}
\end{equation}
</div>

where $$R_i$$ is the winding resistance in $$\Omega$$, $$v_i$$ is the terminal voltage in $$V$$, $$i_i$$ is the winding current in $$A$$ and $$\Psi_i$$ is the magnetic flux linkages in $$Wb$$. The subindex $$1$$ refers to the primary winding of the transformer, while the subindex $$2$$ refers to the secondary winding. 

The total linkage flux can be split into mutual flux, which is the flux confined in the iron-core and produced by the magnetomotive forces of both windings, and the leakage flux, which links only the winding at which is generated.

From the point of view of the primary circuit, the leakage flux induces a voltage in the primary winding that adds to the voltage induced by the mutual flux, and it is considered proportional to the current the primary current $$i_1$$. It is represented by the primary leakage inductance $$L_{l_1}$$ and its corresponding reactance $$X_{l_1} = 2\pi f L_{l_1}$$, with $$f$$ the frequency of the current in $$Hz$$.

Regarding the magnetic circuit, the primary current must produce the magnetomotive force to counteract the magnetomotive force produced by the secondary winding, which can be regarded as the demagnetizing winding, and in addition to that it has to produce the resultant mutual flux. The current components that produce each magnetomotive force are defined as the load component $$i_{2'}$$ and the exciting component $$i_\varphi$$. The following equation represents the magnetomotive forces balance:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ N_1 i_{\varphi} = N_1 i_1 - N_2 i_2 = N_1 (i_{\varphi} + i_{2'}) - N_2 i_2 $$
</div>

from where it can be extracted that $$i_{2'} = \frac{N_2}{N_1} i_2$$, which would be the ideal transformer relationship between the primary and secondary current with $$i_2' = i_1$$. $$N_1$$ and $$N_2$$ correspond to the equivalent number of turns for the primary and secondary windings respectively. 

The exciting current is split into a core-loss component $$i_c$$ in phase with the electromotive force produced by the primary circuit, and a magnetizing component $$i_m$$ lagging the electromotive force by 90º. These two components can be represented by the means of a core-loss resistance $$R_c$$ and a magnetizing inductance $$L_m$$, which can be represented as a reactance as $$X_m = 2\pi f L_m$$.

The transformer can now be seen as an ideal transformer with external impedances that model all the losses. The following equivalent circuit, which can be referred to as *equivalent-T circuit*, includes all the elements of the transformer model:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/Transformers/Transformer/Tequiv_trafo.svg' | relative_url }}"
     alt="T-equivalent circuit of a transformer"
     style="float: center; margin-right: 10px;" />
</div>

The transformer has been omitted, and it can be thought as if it was at the right-most or the left-most part of the equivalent circuit, depending on the reference winding chosen. In the equivalent circuit shown in the previous figure, the reference winding is the primary, and all the secondary quantities (those with a $$'$$ on top) are referred from the primary. To recover the actual value of these secondary quantities, the following transformation can be applied as done with the current earlier:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ X_{l_2}' = (\frac{N_1}{N_2})^2 X_{l_2} $$ 
$$ R_{2}' = (\frac{N_1}{N_2})^2 R_{2} $$ 
$$ v_{2}' = \frac{N_1}{N_2}v_{2} $$
</div>

#### Cantilever equivalent circuit

The equivalent-T circuit can be simplified by moving the shunt impedance to before the primary resistance and reactance, which enables the representation of both windings' impedance as a unified equivalent impedance. The error induced by displacing the shunt impedance is small, since it is only disregarding the voltage drop caused by the exciting current when passing through the primary impedance, and this current is much smaller than the primary current. The resulting equivalent circuit is called the *cantilever equivalent circuit*, which in this case is referred from the primary circuit, meaning that the secondary circuit quantities have to be rescaled using the transformation ratio. The following figure represents this equivalent circuit:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ '/pages/models/Transformers/Transformer/cantilever.svg' | relative_url }}"
     alt="Cantilever equivalent circuit of a transformer"
     style="float: center; margin-right: 10px;" />
</div>

where $$R_{eq} = R_1 + R_2'$$ and $$X_{eq} = X_{l_1} + X_{l_2}'$$. All the parameters of this equivalent model can be obtained after performing an open-circuit and a short-circuit test.

#### Short-circuit test

This test is used to find the equivalent series impedance $$R_{eq} + jX_{eq}$$. It considers a short-circuit in the secondary terminals of the T-equivalent circuit, and assumes that the iron-core is not saturated.

The short-circuit impedance from the primary side is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ Z_{sc} = R_1 + jX_{l_1} + \frac{Z_{\varphi} R_2' + jX_{l_2}'}{Z_{\varphi} + R_2' + jX_{l_2}'} \approx R_1 + jX_{l_1} + R_2' + jX_{l_2}' = R_{eq} + jX_{eq} $$
</div>

where the approximation is done considering the impedance of the exciting branch is much larger than that of the secondary. 

When doing the test, the measurements that are necessary to compute the equivalent impedance are the RMS magnitude of the applied voltage $$V_{sc}$$, the short-circuit current $$I_{sc}$$ and the power $$P_{sc}$$. Using these measurements, the values for the impedance components are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ |Z_{eq}| = |Z_{sc}| = \frac{V_{sc}}{I_{sc}}$$ 
$$ R_{eq} = R_{sc} = \frac{P_{sc}}{I_{sc}^2}$$ 
$$ X_{eq} = X_{sc} = \sqrt(|Z_{sc}|^2 - R_{sc}^2)$$

</div>


#### Open-circuit test

To calculate the magnetizing impedance, the test performed is the open-circuit test, which is performed by opening the secondary circuit and applying a voltage in the primary circuit, which generates an exciting current. It is performed at the rated voltages, which ensures that the exciting current is of a few percent of the rated current of the transformer.

The open-circuit impedance from the primary side is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$ Z_{oc} = R_1 + jX_{l_1} + Z_{\varphi} = R_1 + jX_{l_1} + \frac{R_c(jX_m)}{R_c + jX_m} \approx \frac{R_c(jX_m)}{R_c + jX_m} $$
</div>
which assumes that the magnetizing impedance is much larger than the primary impedance.

With the measurements of the voltage applied $$V_{oc}$$, the open-circuit current $$I_{oc}$$ and the power $$P_{oc}$$, the magnetizing impedance terms can be calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ |Z_{\varphi}| = \frac{V_{oc}}{I_{oc}}$$ 
$$ R_{c} = \frac{V_{oc}^2}{P_{oc}}$$ 
$$ X_{m} = \frac{1}{\sqrt((\frac{1}{|Z_{\varphi}|})^2 - (\frac{1}{R_c})^2)}$$

</div>


## Open source implementations

This model has been successfully implemented in :


| Software | URL | Language | Open-Source License | Last consulted date | Comments |
| Dynawo | [Link](https://github.com/dynawo/dynawo/blob/master/dynawo/sources/Models/Modelica/Dynawo/Electrical/Transformers/TransformerFixedRatio.mo) | Modelica | [MPL v2.0](https://www.mozilla.org/en-US/MPL/2.0/) |02/05/2024 | no comments |


## Table of references

<a id="1">[1]</a> Fitzgerald, A. E.; Kingsley, C.; Umans, S. D. "Electric Machinery", New York, USA, 6th ed., 2002, McGraw-Hill.