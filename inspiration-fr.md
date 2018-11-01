---
layout: page
title: Inspiration
ref: inspiration
lang: fr
---

S'inspirer d'autres manières de faire et visions des choses nous fait grandir. Ces 3 personnes / collectifs en particulier me challenge au quotidien et me donne envie d'explorer de nouveaux champs de la visualisation de données 😍

<hr>
{% assign inspiration=site.inspiration | where:"lang", page.lang %}

{% for i in inspiration %}

<div class="clearfix">
  <div class="projecthighlight">
    <div class="thumbnail standard">
        <a href="{{ i.redirect }}" target="_blank">
        <img class="thumbnail" src="{{ i.img }}"/>
        </a>
    </div>
  </div>

  <div class="projecthighlight darkgrid">
    <h4>{{ i.title }}</h4>
    <p>{{ i.description }}</p>
    <div class="inspiration-text description-text"> {{ i.content }} </div>
  </div>
</div>

<hr>

{% endfor %}
