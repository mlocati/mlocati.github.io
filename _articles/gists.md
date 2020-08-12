---
title:  "My Gists"
description: List of the gists of mine.
date: 2016-06-22T09:03:42+02:00
---

* TOC
{:toc}

## Introduction

Instead of writing long and unreadable articles, from time to time I simply create GitHub gists.

## My gists

<div id="g-result">
	<p class="text-muted">Retrieving gists...</p>
</div>

<script>
$(document).ready(function() {
	'use strict';
	/*
	var protoOk = false;
	try {
		if (/^https:?$/i.test(window.location.protocol)) {
			protoOk = true;
		}
	} catch (e) {
	}
	if (protoOk !== true) {
		$('#g-result').html('<div class="alert alert-danger" role="alert">In order to retrieve the gist list you need to browse this page with the HTTPS protocol</div>');
		return;
	}
	*/
	$.ajax({
		cache: false,
		dataType: 'json',
		url: 'https://api.github.com/users/mlocati/gists'
	})
	.fail(function(xhr, status, error) {
		$('#g-result')
			.empty()
			.append($('<div class="alert alert-danger" role="alert" />')
				.text((error || status) + ' [' + xhr.status + ']')
			)
		;
	})
	.done(function(gists) {
		var $list = $('<ul />');
		gists.sort(function(a, b) {
			if (a.created_at > b.created_at) {
				return -1;
			} else {
				return 1;
			}
		});
		function text2Html(text) {
			var lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
			if (!('$o' in text2Html)) {
				text2Html.$o = $('<div />');
			}
			var result = [];
			$.each(lines, function(_, line) {
				result.push(text2Html.$o.text(line).html());
			});
			return result.join('<br />');
		}
		function to2(n) {
			return (n >= 10) ? n.toString() : '0' + n.toString();
		}
		function dt2s(dt) {
			var d = new Date(dt);
			return [
				[d.getFullYear(), to2(d.getMonth() + 1), to2(d.getDate())].join('-'),
				[to2(d.getHours()), to2(d.getMinutes())].join('.')
			].join(' ');
		}
		$.each(gists, function() {
			var $li = $('<li />'), $d;
			$li
				.append($('<a />')
					.attr('href', this.html_url)
					.html(text2Html(this.description))
				)
				.append($d = $('<p class="text-muted" />')
					.html(dt2s(this.created_at))
				)
			;
			if (this.updated_at > this.created_at) {
				$d.append(' - updated ' + dt2s(this.updated_at))
			}
			$list.append($li);
		});
		$('#g-result').empty().append($list);
	});
});
</script>
