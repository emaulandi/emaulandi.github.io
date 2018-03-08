---
title: Viz for Social Good - March 2018
layout: projects
---



### Starting from a Viz for Social Good project ...


 [**Viz for social good**](https://www.vizforsocialgood.com/) is a platform for data visualization enthusiasts who aspire to empower mission-driven organizations and increase awareness of social issues through beautiful and informative visualizations. 

| ![Votewomen Logo](http://votewomen.pollicy.org/wp-content/uploads/2018/02/votewomenlogotiny.png) | This time, [**Pollicy**](https://www.vizforsocialgood.com/join-a-project/pollicy) organisation bring a topic through its initiative **Vote: Women**, which aims to empower women to follow their ambitions of civic leadership and women’s representation.

Through this **Viz for social good** project, the goal of **Vote: Women**  is to create dialogue on women's leadership in Uganda and the overall East Africa region, and from there launch their capacity programs. They are interested in :

> Opportunities to support more women in leadership positions, and particularly, women leaders focused on women's issues. 

> Data showing the general overview of issues around promoting women in political positions their needs and challenges.

<br/>
### ...raising the question of what bring more gender equality ?
From there, I wondered. Even if I do believe more women emporwement in politics is key, does it relate to more gender equality at the end ? Is it the only way to achieve more equality ?
And also, is there facts and discrimination that prevent women to access politics ?

<br/>
### Let’s have an overview of this complex topic :
1. Women in politics today, view from history of women’s right to vote. Are quotas related to more Women in politics ?
2. Is the current women proportion in politics enough to reach gender equality on the ground ? Does it actually matter ?
3. Making stories with data, do not forget the people stories behind: real stories from East Africa
4. The case for gender equality, and how are we gonna get there ?


<br/>

## 1 - Women in politics today, view from history of women’s right to vote
### All countries don't come from the same way, yet women in parliament spread all over the world

<div>
	<div id="playbutton">
		<g> <b>This is the average percentage of women in parliament for each continent</b> <br/>
		<i>Click play to see how it relates to women's vote right year</i><br/>
		</g>
	</div> 
	<svg id="vote"></svg>
</div>
Africa and Oceania, on average with women's right vote 30 years after Europe, have 10 to 24% of women in parliament. Asia with 20 years difference comes just above 15%.

Africa and Europe especially have countries that range on almost the whole spectrum of parliament representation for women.

_Sources :_
- _[Women in parliament as of 1st January 2018](http://archive.ipu.org/wmn-e/classif.htm)_
- _[The women suffrage timeline](http://womensuffrage.org/?page_id=69)_
<br/>

### Did quotas bring more Women into Politics ?
Given the spreading of women in parliament percentage all over the world, yet with a different background of women suffrage, we can wonder wheter the use of quotas is directly related to women representation today.

*Let's explore this for each contient:*
<div>
	<div id ="continentDropdown"></div>
	<svg id="quotas"></svg>
</div>
Overall, quotas use and no use spread all over the spectrum of women representation in parliament. In South America, a majority of countries set up quotas, with women representation range from 10 to 50%

Well the impact of quotas is not that simple. Each country situations might be specific, and a lot of research as been done on quotas efficiency depending on countries situation. ADD LINK HERE.

_Sources :_
- _[Women in parliament as of 1st January 2018](http://archive.ipu.org/wmn-e/classif.htm)_
- _[The women suffrage timeline](http://womensuffrage.org/?page_id=69)_
- _[OECD 2014 SIGI Index with quotas in political subindex](http://stats.oecd.org/Index.aspx)_

<br/>

## 2 - Is the current women proportion in Politics enough to reach gender equality on the ground ? 
*And does it actually matter ?*

First, let's consider how the gender equality is measured out there. I found two main approches :
* Measure **outcome indicators** focusing on the facts related to gender equality : *litteracy rate for women and men, XXX.*
Mainly this is the Gender Gap Index of the World Economic Forum ADD LINK
* Measure **income indicators** focusing on what might cause gender equality as *laws and pollicies : XXXX.*
Mainly this is the SIGI index of OCDEA ADD LINK.

The principal motive for **outcome indicators** is not to focus on spotting policies or specific actions *(which real impact might be difficult to assess precisly)* but facts to encourage closing the actual gap. 
Yet knowing the actual state of discrimination by laws against women is important, and we will have a look at **income indicators** as well.

### Outcome indocators by the World Economic Forum
As per the 2017 Gender Gap Report, the gender gap on health and education is near to be closed 
Behind, the global economic gender gap is XXX. And way, way behind is the political empowerment gap.

WEF see correlation between political empowerment and economic participation and opportunity.
[![WEF chart](wef.png)](http://reports.weforum.org/global-gender-gap-report-2017/?doing_wp_cron=1520443171.7792630195617675781250)
<br/>

### Policy indicator and  measures of discrimination against women in social institutions 
Using the most recent SIGI Index (2014) and percentage of women in parliament in 2014, let's have a look at discrimination on four main topics for each country.

A value of 0 mean no discrimination, so we will highlight all country above 0.5.
* Family
* Eco
* Bli
* Bla

<div>
	<svg id="sub1"></svg>
	<svg id="sub2"></svg>
</div>

<div>
	<svg id="sub3"></svg>
	<svg id="sub4"></svg>
</div>
Conclusion

_Source :_
* _[OECD 2014 SIGI Index](http://stats.oecd.org/Index.aspx)_
* _Data parliament from Viz DATA_


## 3 - Making stories with data, do not forget the people stories behind, looking in East Africa

Let’s take a step back from overall data and the big picture. 
Focusing on the rise of Women in parliament is East Africa, let’s take a closer look at more grounded stories.

### The daily life of girls in Rwanda, highest percentage of women in parliament in Africa 
Description

### The 2016 election campaign for women in Uganda
Description

## 4 - The case for gender equality
Description

So maybe gender equality should be everybody's business ?

### So how are we gonna get there ?
Description
* Invest political power 
  - With more women in politics (and they should focus or not on gender equality !), with dedicated measure to overcome discrimination if needed as **Vote:Women**
  - Sensibilisating to gender issue overall, not women


* Create gender framework as OECD : Link to awesome paprer, that highlight that
  - all institutions within a country must work together
  - one major requirement to plan gender action and measure its impact is data collection !!


* Civic action 
* And surely many others !!


<script src="d3.min.js"></script>
<script src="votescatter.js">	</script>
<script src="sigiscatter.js">	</script>

<link rel="stylesheet" href="sigisubindex.css">
