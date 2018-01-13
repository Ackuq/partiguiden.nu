--- 
layout: default 
title: Partiernas ståndpunkter 
---
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <ul class="breadcrumb">
                <li><a href="/"><i class="fa fa-home" aria-hidden="true"></i></a></li>
                <li class="active">{{ page.title }}</li>
            </ul>
        </div>
        <div class="col-md-8 col-md-offset-2">
            <h1 id="pageTitle">{{ page.title }}</h1>
        </div>
        <div class="col-md-8 col-md-offset-2">
            <div class="amneList">
            {% assign sortera_partier = site.artiklar | sort: 'title' %}
            {% assign i = 0 %}
            {% for page in sortera_partier %}
                {% if page.layout == 'partier'  %}
                    {% assign bok = page.title | truncate: 1, "" %}
                    {% if bok != bokstav  %}
                        {% assign mod = i | modulo:2 %}
                        {% if mod == 1 %}
                            <div class="listobjekt"></div>
                        {% endif %}
                        {% assign i = 0 %}
                        {% if bok != "A"%}
                            </div>
                        {% endif %}
                        <div class="bokstav">
                            <header>{{page.title | truncate: 1, ""}}</header>
                        </div>
                        <div class="listSection">
                    {% endif %}
                    {% assign bokstav = page.title | truncate: 1, "" %}
                    <div class="listobjekt">
                        <a href="{{ page.url }}">
                            <span>{{page.title}}</span>
                        </a>    
                    </div>
                    {% assign i = i | plus: 1 %}
                {% endif %}
            {% endfor %}
                <div class="listobjekt"></div>
            </div>
        </div>
    </div>
</div>
