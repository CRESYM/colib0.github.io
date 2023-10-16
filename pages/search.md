{% include search.html %}
<ul id="search-results"></ul>

<script>
  window.store = {
    {% for page in site.pages %}
      "{{ page.url | relative_url | slugify }}": {
        "title": "{{ page.title | xml_escape }}",
        "author": "{{ page.author | xml_escape }}",
        "category": "{{ page.category | xml_escape }}",
        "content": {{ page.content | strip_html | strip_newlines | jsonify }},
        "tags": {{ page.tags | strip_html | strip_newlines | jsonify }},
        "url": "{{ page.url | relative_url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>
<script src="{{'/assets/js/lunr.min.js' | relative_url}}"></script>
<script src="{{'/assets/js/search.js' | relative_url}}"></script>