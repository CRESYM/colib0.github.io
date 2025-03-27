---
layout: page
title: Frequency Dependent Line Model 
tags: ["#120", "pi-equivalent", "Frequency Dependent", "Martí", "EMT", "transient",  "transmission"]
date: 09/05/2024 
last-updated: 13/05/2024
id: #120
authors: Carlos Alegre (eRoots)
reviewers: Eduardo Prieto Araujo (UPC), Josep Fanals Batllori (eRoots)
---

## Context

Fast-transient phenomena of transmission lines have been a matter of study in order to describe its behavior during non-normal operation. To mitigate possible unwanted effects and correctly protect transmission line, there is a need of accurate models that correctly predict the performance during these events. Since the introduction of the computer as a tool for power system analysis, many works have tried to solve numerically the complex differential equations that describe the physics of transmission lines, being the one of the first relevant H. W. Dommel's work [[1]](#1). His work did not cover the dependence of the line parameters with respect to the frequency of the system, which added more complexity to the problem. Later works have been developed until reaching a really accurate model developed by José R. Martí [[2]](#2) and [[3]](#3), which is still used to perform fast-transient analysis of transmission lines.

## Model use, assumptions and validity

The model can be used to perform EMT analysis of transmission lines as described in Martí's approach in [[2]](#2) and [[3]](#3). 

The assumptions are:

* The line parameters are in general dependent on the frequency of the system.

* The relation between voltages and current at both ends of the transmission line in the frequency-domain are described by the distributed parameter transmission line equations as developed in the $$\pi$$-equivalent model.

* The description in the time-domain considers that voltage (or current) oscillations can be modelled as traveling waves along the line with a certain propagation speed, having a forward traveling component and backwards traveling component. 

* There is a time delay between the pulses at each end of the line. 

* In the approach described, there is an equivalent network at both ends of the line that matches the frequency response of the characteristic impedance of the line.

* The model considers two weight functions that are related to the voltage response of the line at each end for a given voltage impulse. For the model with the equivalent networks matching the characteristic impedance behavior, the weight functions are a formed by a single spike for the receiving end, while for the source end equals to 0, since there is no wave reflections.

The model is valid to perform EMT studies, able to predict the behavior in studies involving high frequencies and long-range transmission lines. 

It is not recommended for lower frequencies, shorter range transmission lines, or for studies where the frequency dependence of the line parameters is not relevant, as it involves a higher computational cost than other models. It is also not recommended when the physical characteristics of the line are not well detailed for a wide range of frequencies, since the model needs to model the frequency response of the impedance of the line.


## Model description

### Line parameters

| Parameters    | details  | Unit |
| --------------| ------ | ----- |
| $$Z_C$$ | Characteristic impedance of the grid at a given frequency |$$\Omega$$ |
| $$e_{R_h}(t)$$ | History term of the phase to ground voltage of the receiving end| $$V$$ |
| $$e_{S_h}(t)$$ | History term of the phase to ground voltage of the sending end | $$V$$ |

### Line variables

| Variable    | details  | Unit |
| --- | --- | --- |
| $$Z_C(\omega)$$ | Characteristic impedance of the grid at a given frequency |$$\Omega$$ |
| $$v_S(t)$$ | Phase to ground voltage at the sending end at time $$t$$ | $$V$$ |
| $$e_S(t)$$ | Phase to ground voltage across the characteristic impedance at the sending end at time $$t$$ | $$V$$ |
| $$v_R(t)$$ | Phase to ground voltage at the receiving end at time $$t$$ | $$V$$ |
| $$e_R(t)$$ |  Phase to ground voltage across the characteristic impedance at the receiving end at time $$t$$ | $$V$$ |



### Equations


<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$v_S(t) = e_S(t) + e_{S_h}(t)$$
$$v_R(t) = e_R(t) + e_{R_h}(t)$$

</div>

where $$e_S(t) = Z_C i_S(t)$$ and $$e_R(t) = Z_C i_R(t)$$ are the voltages across the equivalent network due to the currents at each respective end of the line. and $$e_{S_h}(t)$$ and $$e_{R_h}(t)$$ are the historical terms, which can be computed using convolution products, or simply using the previous values $$v_S(t-\tau)$$ and $$v_R(t-\tau)$$ provided that the integration step $$\Delta t \leq \tau$$. 

## Operational principles

For this model, the distributed parameter transmission line equations are considered dependent on the frequency of the system:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ V_S(\omega) = \cosh(\gamma (\omega) l)V_R(\omega) - Z_C(\omega) \sinh(\gamma (\omega) l)I_R(\omega) $$
$$ I_S(\omega) = \frac{1}{Z_C(\omega)} \sinh(\gamma (\omega) l)V_R(\omega) - \cosh(\gamma (\omega) l)I_R(\omega) $$

</div>

where the propagation constant $$\gamma = \sqrt(z(\omega)y(\omega)) = \alpha(\omega) + j\beta(\omega)$$ and the characteristic impedance $$Z_C = \sqrt(\frac{z(\omega)}{y(\omega)})$$ are frequency-dependent. These equations correspond to the solution in frequency domain for the general transmission line. Transforming these equations to the time domain allows to perform transient analysis of the transmission line, but it is not trivial since the equations for wave propagations obtained in the Constant Parameter Line Model are obtained by assuming independence of the line parameters with respect to the grid frequency. To do so, the model proposed will convert the frequency-domain equations to the time-domain numerically. 

The developed model assumes the following equivalent circuit:


<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'FD_scheme.svg'}}"
     alt="Equivalent circuit of the frequency dependent line"
     style="float: center; margin-right: 10px;" />
</div>
<div align = 'center'>
     Figure 1: Equivalent circuit of the frequency dependent line.
</div>
<br>


The proposed equations for the travelling waves in this equivalent circuit are the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$f_S(t) = v_S(t) + e_S(t)$$
$$f_R(t) = v_R(t) + e_R(t)$$
$$b_S(t) = v_S(t) - e_S(t)$$
$$b_R(t) = v_R(t) - e_R(t)$$

</div>

Where $$f_S$$ and $$b_S$$ are the forward and backward travelling waves at the source terminal, respectively, $$f_R$$ and $$b_R$$ are the forward and backward travelling waves at the receiver terminal, and $$e_S = Z_{eq}i_S$$ and $$e_R = Z_{eq}i_R$$ are the voltage across the equivalent network due to the currents at each respective end of the line. In frequency domain, the equations can be rewritten as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$F_S(\omega) = V_S(\omega) + Z_{eq}(\omega) I_S(\omega)$$
$$F_R(\omega) = V_R(\omega) + Z_{eq}(\omega) I_R(\omega)$$
$$B_S(\omega) = V_S(\omega) - Z_{eq}(\omega) I_S(\omega)$$
$$B_R(\omega) = V_R(\omega) - Z_{eq}(\omega) I_R(\omega)$$

</div>

where $$Z_{eq} = Z_C(\omega)$$ is the equivalent impedance of the equivalent network. The model will transform these equations to the time domain to perform transient analysis of the transmission line.

These equations, alongisde the tranmission line equations, can be combined to obtain the following relationship:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$B_S(\omega) = A_1(\omega) F_R(\omega)$$
$$B_R(\omega) = A_1(\omega) F_S(\omega)$$

</div>

where $$A_1 = e^{-\gamma(\omega) l} = \frac{1}{\cosh(\gamma(\omega)l) + \sinh(\gamma(\omega)l)} $$ is a constant that depends on the equivalent impedance of the equivalent network. Converting these in time-domain, the following expressions are obtained:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$b_S(t) = a_1(t) * f_R(t)$$
$$b_R(t) = a_1(t) * f_S(t)$$

</div>

where the $$*$$ represents the convolution product, and $$a_1(t)$$ represents the weight function, which is a pulse starting at time $$\tau$$ when the impedance of the equivalent network matches the characteristic impedance of the line. The convolution product can be calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$b_S(t) = \int_{-\infty}^{\infty} f_R(t - u) a_1(u) du = \int_{\tau}^{\infty} f_R(t - u) a_1(u) du $$
$$b_R(t) = \int_{-\infty}^{\infty} f_S(t - u) a_1(u) du = \int_{\tau}^{\infty} f_S(t - u) a_1(u) du $$

</div>

Where the integral prior to the time $$\tau$$ is zero, since the weight function is zero for negative times. This time represents the time that the fastest frequency component of the applied voltage takes to reach the other end of the line. When the time interval for the numerical computation is lower ($$\Delta t \leq \tau$$), the values for $$f_R$$ and $$f_S$$ at the time $$t - u$$ can be obtained from previous time steps, allowing for iterative solutions for the time-domain simulation. The upper limit of the integral does not extend beyond $$\tau$$ for much longer times, since the weight function is a single pulse.

Since the terms $$b_S$$ and $$b_R$$ are obtained from historical values of voltages, they can be modelled as two voltage sources $$e_{S_h}$$ and $$e_{R_h}$$, obtaining the following equivalent circuit:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'FDLine_ThevEquiv.svg'}}"
     alt="FD Thevenin Equivalent Circuit of a transmission line"
     style="float: center; margin-right: 10px;" />
</div>
<div align = 'center'>
     Figure 2: Thevenin equivalent circuit of the frequency dependent line with history terms.
</div>
<br>


which has the following circuit equations:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$v_S(t) = e_S(t) + e_{S_h}(t)$$
$$v_R(t) = e_R(t) + e_{R_h}(t)$$

</div>

It can be converted into its Norton equivalent, as shown in the following schematic:


<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
<img src="{{ 'FDLine_NortonEquiv.svg'}}"
     alt="Norton Equivalent Circuit of a transmission line"
     style="float: center; margin-right: 10px;" />
</div>
<div align = 'center'>
     Figure 3: Norton equivalent circuit of the frequency dependent line with history terms.
</div>
<br>
    
where the equivalent current sources are calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$i_S(t) = \frac{v_S(t)}{Z_C} - i_{S_h}(t)$$
$$i_R(t) = \frac{v_R(t)}{Z_C} - i_{R_h}(t)$$

</div>

### Rational approximation of $$Z_C$$ and $$a_1$$

The expressions of the characteristic impedance and the weight function can be approximated by rational functions to simplify the calculations. Generally, their values are known as a point by point function of frequency (i.e., their values are tabulated, but not known as a parametrized function). 

#### Characteristic impedance rational approximation

The general form of the rational function used to simulate the characteristic impedance is the following:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$Z_C(s) = H \frac{(s + z_1)(s + z_2)...(s+z_n)}{(s + \alpha_1)(s + \alpha_2)...(s + \alpha_n)}$$

</div>

with $$s = j\omega$$, $$H$$ being a real and positive constant, $$z_i$$ and $$\alpha_i$$ being real and negative zeros and poles of the function, respectively. The values of the zeros and poles can be obtained by fitting the characteristic impedance values at different frequencies to the rational function, which can be done using the least squares method. 

This rational expression can be expanded into partial functions when considering an R-C synthesis over the equivalent impedance (see [[5]](#5)):

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$Z_C(s) = k_0 + \frac{k_1}{s + \alpha_1} + ... + \frac{k_n}{s + \alpha_n}$$

</div>

where  $$k_0 = \lim\limits{s \to \infty} Z_C(S) = H$$ and $$k_i = (s + \alpha_i)Z_C(S)\|_{s = -\alpha_i}$$. The first term corresponds to a resistance, $$R_0$$, and the following terms to a R-C parallel elements with $$R_i = \frac{k_i}{\alpha_i}$$ and $$C_i = \frac{1}{k_i}$$. It can be expressed in time-domain applying inverse Fourier transformation:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$z_C(t) = [k_0 \delta(t) + \sum_{i=1}^{n} k_i e^{-\alpha_i t}] u(t)$$

</div>

This form will ease introducing the frequency dependence of the characteristic impedance in the model equations.

#### Weight function rational approximation

Considering the convolution integral at time step $$t$$ as in the equations for $$b_{S}$$ and $$b_{R}$$, the convolution can be evaluated much easily if the weight function is approximated by a sum of exponential terms, having the following general convolution form:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$s(t) = \int_{\tau}^{\infty} f(t - u)ke^{-\beta (u - \tau)} du$$
</div>

With this expression, $$s(t)$$ can be directly computed using its previous values and the history of the function used to calculate it:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$s(t) = ms(t - \Delta t) + p f(t - \tau) + q f(t - \tau - \Delta t)$$

</div>

where $$m$$, $$p$$ and $$q$$ are constants depending on $$k$$ and $$\beta$$ and the integration step $$\Delta t$$.

Using similar procedure, the following equation can be used to approximate the weight function. Firstly, the weight function is displaced from $$t$$ to $$t-\tau$$ as $$A_1(\omega) = P(\omega)e^{-j \omega \tau}$$. Then, $$P(\omega)$$ can be approximated by a rational function as follows:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">
$$P(s) = H \frac{(s + z_1)(s + z_2)...(s+z_n)}{(s + \beta_1)(s + \beta_2)...(s + \beta_m)}$$
</div>

where the number of zeros is smaller than the number of poles, since it is a passive element and its response tends to 0 for infinite frequency. Expanding this expression and transforming into time-domain, a final expression for the weight function can be obtained:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$a_{1a}(t) = [k_1' e^{\beta_1 t} + k_2' e^{\beta_2 t} + ... + k_m' e^{\beta_m t}]u(t-\tau)$$

</div>

which can be used to obtain recursively the convolution terms.

### R-C equivalent circuit and historical terms calculation

The final equivalent circuit is the proposed by Dommel's work [[1]](#1), with the difference that the impedance terms model the frequency dependence of the parameters. Detailed descriptions on the difference by the model proposed by Dommel and the frequency dependent model proposed by Martí can be found in [[3]](#3). The equivalent circuit is shown in the following figure:

In frequency domain, we have:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$E_S(\omega) = I_S(\omega) Z_C(\omega)$$

</div>

which can be then expressed in time domain as the convolution product:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$e_S(t) = i_S(t) * Z_C(t) = \int_{-\infty}^{\infty} i_S(t - u) Z_C(u) du$$

</div>

Since $$Z_C$$ has been expressed as a sum of exponential functions in time-domain, the convolution can be split in a sum of convolutions as in the previous chapter, but using $$\tau=0$$:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ e_S(t) = e_{S_1} + e_{S_2} + ... + e_{S_n}$$
$$ e_{S_i}(t) = i_S(t) * e^{-\alpha_i t} = \int_{-\infty}^{\infty} i_S(t - u) e^{-\alpha_i u} du$$
$$ e_{S_i}(t) = m_i e_{S_i}(t - \Delta t) + p_i i_S(t) + q_i i_S(t - \Delta t)$$
</div>

Using the R-C equivalent circuit, the coeficients of this time-domain transformation are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$m_i = \frac{1-\frac{1}{2}(\alpha_i \Delta t)}{1+\frac{1}{2}(\alpha_i \Delta t)}$$
$$p_i = q_i = k_i \frac{\frac{\Delta t}{2}}{1+\frac{1}{2}(\alpha_i \Delta t)}$$

</div>

And separating $$e_S(t)$$ in its components, the final expression for the voltage across the equivalent network at the sending end is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$e_S(t) = R_S i_S(t) + e_{S_hc}(t) + e_{S_hv}(t)$$

</div>

where $$R_S = R_0 + p$$ is the equivalent constant resistance of the network at the sending end, with $$p = \sum p_i$$, and $$e_{S_hc}(t)$$ and $$e_{S_hv}(t)$$ are the historical terms of the current in $$Z_eq$$ and partial voltage in $$Z_eq$$, respectively, calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ e_{S_{hc}}(t) = (\sum q_i) i_S(t - \tau) = q i_S(t - \tau) $$
$$ e_{S_{hv}}(t) = \sum^{n}_{1} e_{S_i}(t - \tau) $$
</div>

An analogy can be made for the historical term $$b_S(t)$$, which can be calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$b_{S_i}(t) = g_i b_S(t - \Delta t) + c_i f_R(t) + d_i f_R(t - \Delta t)$$

</div>

where the coefficients, this time using the weight function terms $$k_i'$$ and $$\beta_i$$, are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$g_i = \frac{1-\frac{1}{2}(\beta_i \Delta t)}{1+\frac{1}{2}(\beta_i \Delta t)}$$
$$c_i = d_i = k_i' \frac{\frac{\Delta t}{2}}{1+\frac{1}{2}(\beta_i \Delta t)}$$

</div>

Now, the final expression for the history term of the voltage at the sending end is:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$b_S(t) = \sum b_{S_i}(t) = c f_R(t-\tau) + d f_R(t - \tau - \Delta t) + \sum g_i b_{S_i}(t - \Delta t)$$

</div>

with $$c = \sum c_i$$ and $$d = \sum d_i$$, and $$f_R(t-\tau) = 2v_R(t-\tau) + b_R(t-\tau)$$, similarly for $$f_R(t - \tau - \Delta t)$$. 

The same procedure can be followed for the historical terms of $$e_S(t)$$ and $$b_R(t)$$.

### Algorithm of solution

The history terms that have to be calculated at each step for one of the sides are:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$ e_{S_{hc}}(t) = q i_S(t - \tau) $$
$$ e_{S_{hv}}(t) = \sum e_{S_i}(t - \Delta t) $$
$$ b_{S_h}(t) = \sum g_i b_{S_i}(t - \Delta t) $$
$$ b_S(t) = c f_R(t - \tau) + d f_R(t - \tau - \Delta t) + b_{S_h}(t) $$

</div>

Then, the history current source is calculated as:

<div style="background-color:rgba(0, 0, 0, 0.0470588); text-align:center; vertical-align: middle; padding:4px 0;">

$$i_{S_h}(t) = \frac{e_{S_hc}(t) + e_{S_hv}(t) + b_S(t)}{R_S}$$

</div>

The equivalent system is solved, and the history terms are updated to the new time step. 


## Open-source implementations

No open-source implementations found.

## References 

<a id="1">[1]</a> Dommel, H. W. “Digital computer solution of Electromagnetic Transients in single and multiphase networks”, IEEE Transactions, Vol. PAS-88, pages 388-399, April 1969.

<a id="2">[2]</a> Marti, J. R. "Accurate Modelling of Frequency Dependent Transmission Lines in Electromagnetic Transient Simulations" Vancouver, B.C., IEEE Transactions on Power Apparatus and Systems, Vol. PAS-101, No. I January 1982.

<a id="3">[3]</a> Marti, J. R. "The Problem of Frequency Dependence in Transmission Line Modelling" Vancouver, B.C., 1981, PhD Thesis.

<a id="4">[4]</a> [PSCAD FD Line Model Documentation](https://www.pscad.com/webhelp/ol-help.htm#EMTDC/Transmission_Lines/EMTDC_Distributed_Branch_Interface.htm#Method%20of%20Characteristics)

<a id="5">[5]</a> Karni, S. "Network Theory: Analysis and Synthesis", Allyn and Bacon, Boston, 1966.