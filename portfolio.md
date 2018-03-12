---
layout: page
title: Portfolio
permalink: /portfolio/
---


{% for item in site.projects %}
  <h4>{{ item.title }}</h4>
  <p>{{ item.description }}</p>
  <p><a href="{{ item.url }}">See more</a></p>
{% endfor %}
