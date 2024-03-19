---
layout: base
title: Models-search
---

<noscript><h2>ERROR</h2>You need JavaScript to search.</noscript>
<div id="search-results"></div>

<script>
    window.store = {
    {% for page in site.pages %}
    {% if page.title.size > 0 and page.content.size > 0 and page.dir contains "/pages/models" and page.url != "/pages/models/models-search.html" %}
    "{{ page.url | slugify }}": {
        "url": "{{ page.url }}",
        "title": "{{ page.title | xml_escape }}",
        "content": {{ page.content | strip_html | jsonify }},
    },
    {% endif %}
    {% endfor %}
    };
    console.log(window.store)
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.6/lunr.min.js" integrity="sha256-M/Awbb/BYh+Rh0aGjpQid26p1b2OBsrk2k9yAvQxPV0=" crossorigin="anonymous"></script>
<script src="/assets/js/search.js"></script>
