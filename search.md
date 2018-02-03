--- 
layout: default 
title: Sök 
---
<div id="content">
<div class="container">
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="search page w-100">
                <form action="/search.html" method="get" autocomplete="off" class="search-form" style="width:100%">
                    <input type="text" id="search-box" name="query" placeholder="Sök" style="border-color:#00796B;width:100%;font-size:20px">
                    <input type="image" src="/media/search_alt.svg" alt="Search" class="search_img" style="margin-top:7px" >
                </form>
            </div>
            <div class="bokstav" style="text-align:left;padding-left: 5px;margin-top:10px">Sökresultat</div>
            <div id="search-results" class="noMargin"></div>
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