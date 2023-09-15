<form action="{{ 'search.html' | relative_url }}" method="get">
  <label for="search-box">Search</label>
  <input type="text" id="search-box" name="query">
  <input type="submit" value="search">
</form>

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
<script src="/assets/js/lunr.min.js"></script>
<script src="/assets/js/search.js"></script>

"{{ page.url | absolute_url }}"