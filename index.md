---
layout: page
---

This is a kind of a personal list of notes for myself.   
Somebody found these notes quite useful, so I decided to share them.

<ul class="article-list">
	{% assign sortedArticles = site.articles | sort: 'date' | reverse %}
	{% for article in sortedArticles %}
		{% capture u %}
			{% if article.actual_url %}
				{{ article.actual_url }}
			{% else %}
				{{ article.url | prepend: site.baseurl }}
			{% endif %}
		{% endcapture %}
		<li>
			<h3 style="margin-bottom: 0"><a class="article-link" href="{{ u | strip}}">{{ article.title }}</a></h3>
			{% if article.description %}
				{{ article.description }}
			{% endif %}
		</li>
	{% endfor %}
</ul>

<p style="text-align:right">
	<br />
	<a href="https://paypal.me/mlocati"><img src="images/paypal-donate-100.png" alt="Donate with PayPal" /></a>
</p>