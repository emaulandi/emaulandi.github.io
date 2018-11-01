---
layout: page
title: Inspiration
ref: inspiration
lang: en
---

To be inspired from others methods and perspective is what makes us growth. In particular, those 3 individuals & collective challenge me everyday and push me to explore further the large data visualization field 😍

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
