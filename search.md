--- 
layout: default 
title: Sök 
---
<div id="content">
<div class="container">
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="search page w-100">
                <form action="/search.html" method="get" autocomplete="off" class="search-form">
                    <input type="text" id="search-box" class="w-100 lead" name="query" placeholder="Sök">
                    <button class="btn search-button" type="submit">
                        <i class="icon-font icon-search text-black h3">&#xe800;</i>
                    </button>
                </form>
            </div>
            <div class="bokstav text-white pl-1 mt-2">Sökresultat</div>
            <div id="search-results" class="m-0"></div>
        </div>
    </div>
</div>
<script>
    window.store ={
        {% for page in site.artiklar %}
            "{{page.url | slugify}}": {
                "title": "{{page.title | xml_escape}}",
                "url": "{{page.url | xml_escape}}",
                "tags": "{% for tag in page.tags %}{{tag}}{% unless forloop.last %}, {% endunless %}{% endfor %}"
            }
            {% unless forloop.last %},{% endunless %}
        {% endfor %}
    }
</script>
<script src="/js/lunr.min.js"></script>
<script src="/js/search.js"></script>
</div>