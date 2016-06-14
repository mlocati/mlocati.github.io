---
layout: page
---

This is a kind of a personal list of notes for myself.   
Somebody found these notes quite useful, so I decided to share them.

<ul class="article-list">
	{% for article in site.articles %}
		<li>
			<h2>
				<a class="article-link" href="{{article.url | prepend: site.baseurl }}">{{ article.title }}</a>
			</h2>
		</li>
	{% endfor %}
</ul>
