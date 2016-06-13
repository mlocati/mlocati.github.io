---
layout: page
---
<ul class="article-list">
	{% for article in site.articles %}
		<li>
			<h2>
				<a class="article-link" href="{{article.url | prepend: site.baseurl }}">{{ article.title }}</a>
			</h2>
		</li>
	{% endfor %}
</ul>
