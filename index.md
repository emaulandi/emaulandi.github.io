---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: page
title:  Information Design
lang: en
ref: index
---

### or create impact and engagement visualizing information and data

<br>

### Projects

{% assign projects=site.projects | where:"lang", page.lang %}
{% for project in projects %}

{% if project.redirect %}
<div class="projectgrid">
    <div class="thumbnail">
        <a href="{{ project.redirect }}" target="_blank">
        {% if project.img %}
        <img class="thumbnail" src="{{ project.img }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h1>{{ project.title }}</h1>
            <p>{{ project.description }}</p>
            <h5><i>{{project.categories | join: ', '}}</i></h5>
        </span>
        </a>
    </div>
</div>
{% else %}

<div class="projectgrid">
    <div class="thumbnail">
        <a href="{{ site.baseurl }}{{ project.url }}">
        {% if project.img %}
        <img class="thumbnail" src="{{ project.img }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h1>{{ project.title }}</h1>
            <p>{{ project.description }}</p>
            <h5><i>{{project.categories | join: ', '}}</i></h5>
        </span>
        </a>
    </div>
</div>

{% endif %}

{% endfor %}
