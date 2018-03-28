---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: page
title: Le temps de la dataviz est venu
lang: fr
ref: index
---

### Pourquoi ?
#### Créer de l'impact et de l'engagement grâce à la visualisation des données et de l'information 

### Comment ? 
* #### Trouver, nettoyer et explorer les données, designer et implémenter des histoires intéractives autour des données
* #### Trouver le sens dans les données et le rendre mémorable en utilisant la visualisation et l'intéractivité 
* #### Transmettre des messages forts et appeler à agir 

### Quoi ?  
#### Dataviz sur le web, article basé sur les données, expérience d'apprentissages intéractive *... et plus à venir !*

<br>

### Projets

{% for project in site.projects %}


{% if project.redirect %}

<div class="projectblock">
	<a href="{{ project.redirect }}" target="_blank">
	<div class="column left test">
	    <img src="{{ project.img }}"/>
	</div>
	<div class="column right">
	    <span>
	        <h4><b>{{ project.title }}</b></h4>
	        <p>{{ project.description }}</p>
	        <h5><i>{{project.categories | join: ', '}}</i></h5>
	    </span>
	</div>
	</a>
</div>
<br>


{% else %}

<div class="projectblock">
	<a href="{{ site.baseurl }}{{ project.url }}">
	<div class="column left test">    
	    <img src="{{ project.img }}"/>
	</div>
	<div class="column right">
	    <span>
	        <h4><b>{{ project.title }}</b></h4>
	        <p>{{ project.description }}</p>
	        <h5><i>{{project.categories | join: ', '}}</i></h5>
	    </span>
	</div>
	</a>
</div>
<br>

{% endif %}

{% endfor %}
