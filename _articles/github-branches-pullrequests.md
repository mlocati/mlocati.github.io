---
title: Map branches and pull requests for GitHub
description: Map repository branches to pull requests
date: 2017-11-29T10:24:13+02:00
layout: article-notoc
---
<div class="row" id="ml-gh-options">
	<div class="col-md-4">
		<fieldset>
			<legend>Source repository</legend>
			<div class="form-group">
				<label for="ml-gh-base-owner">Owner</label>
				<input type="text" class="form-control" id="ml-gh-base-owner" />
			</div>
			<div class="form-group">
				<label for="ml-gh-base-owner">Repository</label>
				<input type="text" class="form-control" id="ml-gh-base-repository" />
			</div>
		</fieldset>
	</div>
	<div class="col-md-4">
		<fieldset>
			<legend>Forked repository</legend>
			<div class="form-group">
				<label for="ml-gh-fork-owner">Owner</label>
				<input type="text" class="form-control" id="ml-gh-fork-owner" />
			</div>
			<div class="form-group">
				<label for="ml-gh-fork-owner">Repository</label>
				<input type="text" class="form-control" id="ml-gh-fork-repository" />
			</div>
		</fieldset>
	</div>
	<div class="col-md-4">
		<fieldset>
			<legend>
				Access
				<div class="pull-right">
					<a
						href="#" onclick="return false"
						data-toggle="popover"
						data-container="body"
						data-trigger="focus"
						data-placement="left"
						data-html="true"
						data-content="
							Anonymous users are limited to 60 requests per hour.&lt;br /&gt;
							&lt;br /&gt;
							By specifying your GitHub username and password, you'll be able to perform 5000 requests per hour.&lt;br /&gt;
							&lt;br /&gt;
							Your credentials are only sent to GitHub (you can check that by inspecting the javascript of this page, as well as checking the network traffic in your browsers developer tools).
						"
					><i class="fa fa-info-circle"></i></a>
				</div>
			</legend>
			<div class="form-group">
				<label for="ml-gh-form-owner">Username</label>
				<input type="text" class="form-control" id="ml-gh-access-username" />
			</div>
			<div class="form-group">
				<label for="ml-gh-form-owner">Password</label>
				<input type="password" class="form-control" id="ml-gh-access-password" />
			</div>
		</fieldset>
	</div>
</div>
<div class="pull-right">
	<button class="btn btn-primary" id="ml-gh-go">Go</button>
</div>

<table id="ml-gh-out-table" class="table table-hover table-bordered" style="margin-top: 20px; display: none">
	<thead>
		<tr>
			<th>Branch</th>
			<th>Open pull requests</th>
			<th>Merged pull requests</th>
			<th>Closed pull requests</th>
		</tr>
	</thead>
	<tbody id="ml-gh-out">
	</tbody>
</table>
<script type="text/javascript">
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
</script>
<script src="{{ "/js/github-branches-pullrequests.js" | prepend: site.baseurl }}"></script>
