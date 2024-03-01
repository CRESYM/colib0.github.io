---
layout: page
title: Models-search
---

<noscript><h2>ERROR</h2>You need JavaScript to search.</noscript>


<div>
 <br><br>
<form class="d-inline-flex form-inline" action="{{ site.baseurl }}/pages/models/models-search" method="get">
    <!-- px-2 py-1 like in form-control-sm but overriden by vesper.css so put it back -->
    <input class="form-control form-control-sm px-2 py-1" id="models-search-box" name="query"
        type="text" placeholder="Search for models" aria-label="Search" />
    <button type="submit"><i class="fa fa-search"></i></button>
</form>
</div>
<div id="models-search-results"></div>

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
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.6/lunr.min.js" integrity="sha256-M/Awbb/BYh+Rh0aGjpQid26p1b2OBsrk2k9yAvQxPV0=" crossorigin="anonymous"></script>
<script src="{{ site.baseurl }}/assets//js/models_search.js"></script>
