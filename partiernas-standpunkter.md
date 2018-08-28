--- 
layout: default 
title: Partiernas ståndpunkter 
---
<div id="content">
<div class="container">
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-white mb-0 pl-1">
                    <li class="breadcrumb-item"><a class="text-dark" href="/"><i class="icon-font icon-home">&#xe801;</i></a></li>
                    <li class="breadcrumb-item active">Partiernas ståndpunkter</li>
                </ol>
            </nav>
            <h1 class="font-weight-light">{{ page.title }}</h1>
            {% if jekyll.environment == 'production' %}
            {% include ad.html %}
            {% endif %}
            <div class="amneList">
            {% assign sortera_partier = site.artiklar | sort: 'title' %}
            {% assign i = 0 %}
            {% for page in sortera_partier %}
                {% if page.layout == 'partier'  %}
                    {% assign bok = page.title | truncate: 1, "" %}
                    {% if bok != bokstav  %}
                        {% assign mod = i | modulo:2 %}
                        {% if mod == 1 %}
                            <div class="listobjekt listline"></div>
                        {% endif %}
                        {% assign i = 0 %}
                        {% if bok != "A"%}
                            </div>
                        {% endif %}
                        <div class="bokstav text-white text-center w-100 pull-left">
                            <header>{{page.title | truncate: 1, ""}}</header>
                        </div>
                        <div class="flex-wrap d-flex">
                    {% endif %}
                    {% assign bokstav = page.title | truncate: 1, "" %}
                    <div class="listobjekt pull-left">
                        <a class="text-dark d-block" href="{{ page.url }}">
                            <span class="px-2 d-inline-block">{{page.title}}</span>
                        </a>    
                    </div>
                    {% assign i = i | plus: 1 %}
                {% endif %}
            {% endfor %}
                <div class="listobjekt listline"></div>
            </div>
        </div>
    </div>
</div>
</div>
