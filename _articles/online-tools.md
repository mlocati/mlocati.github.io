---
title: Online Tools
description: A set of online helper utilities (compare text lines, ...)
date: 2018-05-04T17:04:00+02:00
layout: article-notoc
---


<form class="form-inline">
	<div class="form-group">
		<label for="tool">Tool</label>
		<select class="form-control" id="tool">
			<option value="line-comparer" data-case-sensitive="no" selected="selected">Line comparer (case insensitive)</option>
			<option value="line-comparer" data-case-sensitive="yes">Line comparer (case sensitive)</option>
		</select>
	</div>
</form>

<div class="tool" id="tool-line-comparer" style="display: none">
	<div class="row">
		<div class="col-md-6">
			<h3>Input #1</h3>
			<textarea id="tlc-input-1" class="form-control" style="resize: vertical" rows="10"></textarea>
		</div>
		<div class="col-md-6">
			<h3>Input #2</h3>
			<textarea id="tlc-input-2" class="form-control" style="resize: vertical" rows="10"></textarea>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<h3>Only in #1</h3>
			<textarea id="tlc-output-1" class="form-control" style="resize: vertical" rows="10" readonly="readonly"></textarea>
			<span style="float: right">(<span id="tlc-output-1-count">0</span>)</span>
		</div>
		<div class="col-md-4">
			<h3>In #1 and in #2</h3>
			<textarea id="tlc-output-1-2" class="form-control" style="resize: vertical" rows="10" readonly="readonly"></textarea>
			<span style="float: right">(<span id="tlc-output-1-2-count">0</span>)</span>
		</div>
		<div class="col-md-4">
			<h3>Only in #3</h3>
			<textarea id="tlc-output-2" class="form-control" style="resize: vertical" rows="10" readonly="readonly"></textarea>
			<span style="float: right">(<span id="tlc-output-2-count">0</span>)</span>
		</div>
	</div>
</div>

<script src="{{ "/js/online-tools.js" | prepend: site.baseurl }}"></script>
