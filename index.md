---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: page
title: data visualization + information design
lang: en
ref: index
---

<h3> Current highlight </h3>

{% assign clientsprojects=site.projectshighlight | where:"lang", page.lang %}

{% for proj in clientsprojects %}

<div class="clearfix">
  <div class="projecthighlight">
    <div class="thumbnail standard">

        <img class="thumbnail" src="{{ proj.img }}"/>

    </div>
  </div>

  <div class="projecthighlight darkgrid">
    <h4>{{ proj.title }}</h4>
    <p >{{ proj.content }}</p>
    <p class="description-text"> Tech : {{ proj.tech | join: ', '}} </p>
  </div>
</div>

{% endfor %}

<h3> Clients' projects </h3>

{% assign clientsprojects=site.clientsprojects | where:"lang", page.lang %}

{% for proj in clientsprojects %}

<div class="clearfix">
  <div class="clientsprojects client-img">
    <div class="thumbnail half">
        <img class="thumbnail " src="{{ proj.img }}"/>
    </div>
  </div>
  <div class="clientsprojects client-text darkgrid ">
    <h4>{{ proj.title }}</h4>
    <p class="greytext"> {{ proj.status }} </p>
    <div class="client-description">{{ proj.content }}</div>
    <p class="description-text"> Tech : {{ proj.tech | join: ', '}} </p>
  </div>
</div>
<hr>
{% endfor %}

### Personal projects

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
            <hr class="hr-border-small">
            <p>{{ project.description }}</p>
            <p><i>{{project.categories | join: ', '}}</i></p>
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
            <hr class="hr-border-small">
            <p>{{ project.description }}</p>
            <p><i>{{project.categories | join: ', '}}</i></p>
        </span>
        </a>
    </div>
</div>

{% endif %}

{% endfor %}
