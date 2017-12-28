--- 
layout: default 
title: Partiernas ställning 
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
            <h1 id="pageTitle">Partiernas ställning</h1>
        </div>
        <div class="col-md-8 col-md-offset-2">
            {% assign sortera_partier = site.artiklar | sort: 'title' %}
            {% for page in sortera_partier %}
                {% if page.layout == 'partier'  %}
                    {% assign bok = page.title | truncate: 1, "" %}
                    {% if bok != bokstav  %}
                        <div class="bokstav">
                            <header>{{page.title | truncate: 1, ""}}</header>
                        </div>
                    {% endif %}
                    {% assign bokstav = page.title | truncate: 1, "" %}
                    <div class="listobjekt">
                        <a href="{{ page.url }}">
                            <span>{{page.title}}</span>
                        </a>    
                    </div>
                {% endif %}
            {% endfor %}
        </div>
    </div>
</div>
