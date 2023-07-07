---
layout: default
title: Test cases
---

<!-- <details>
<summary>Test cases</summary>
<br>
TBF
</details> -->

<!-- Get the current model type -->
{% assign dir = page.url | split:"/" %} 
{% assign type = dir[-1] %}

<!-- Index content -->
<h1>Test cases</h1>
<p>List of available test cases:</p>

<ul>
{% for page in site.pages %}
    {% assign urlArray = page.url | split: "/" %}
    {% if urlArray[-2] == type %}
        <li><a href="{{page.url | relative_url}}">{{page.title}}</a></li>
    {% endif%}
{% endfor %}
</ul>