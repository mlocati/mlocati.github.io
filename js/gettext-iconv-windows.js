/* jshint unused:vars, undef:true, browser:true, jquery:true */
$(document).ready(function() {
'use strict';

$.ajax({
	headers: {
		Accept: 'application/vnd.github.v3+json'
	},
	cache: false,
	dataType: 'json',
	type: 'GET',
	url: 'https://api.github.com/repos/mlocati/gettext-iconv-windows/releases'
})
.fail(function(xhr, status, error) {
	$('#giw-download-stats').empty().append($('<div class="alert alert-danger" />').text(error));
})
.done(function(data) {
	var groups = [], error = null;
	var rNames = [
		'shared32exe',
		'shared32zip',
		'shared64exe',
		'shared64zip',
		'static32exe',
		'static32zip',
		'static64exe',
		'static64zip'
	];
	function to2(n) {
		return (n >= 10) ? n.toString() : ('0' + n.toString());
	}
	function itoa(n, decs) {
		if (decs) {
			return n.toFixed(decs).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		}
		return n.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}
	$.each(data, function() {
		const versions = this.tag_name.split('-');
		if (versions.length !== 2) {
			return;
		}
		if (versions.length !== 2) {
			return;
		}
		if (!versions.every((version, index) => {
			const match = /^(v\.?)?(?<v>\d+(\.\d+)+[A-Za-z]?)$/.exec(version);
			if (!match) {
				return false;
			}
			versions[index] = match.groups.v;
			return true;
		})) {
			return false;
		}
		var group = {
			createdOn: new Date(this.created_at),
			vGettext: versions[0],
			vIconv: versions[1],
			shared32exe: 0,
			shared32zip: 0,
			shared64exe: 0,
			shared64zip: 0,
			static32exe: 0,
			static32zip: 0,
			static64exe: 0,
			static64zip: 0,
			total : 0
		};
		$.each(this.assets, function() {
			var m = this.name.match(/(shared|static).(32|64)\.(exe|zip)$/);
			if (m === null) {
				error = 'Unrecognized asset name: ' + this.name;
				return false;
			}
			m.shift();
			group[m.join('')] += this.download_count;
		});
		if (error !== null) {
			return false;
		}
		$.each(rNames, function(_, key) {
			group.total += group[key];
		});
		groups.push(group);
	});
	if (error !== null) {
		$('#giw-download-stats').empty().append($('<div class="alert alert-danger" />').text(error));
		return;
	}
	groups.sort(function(a, b) {
		if (a.createdOn < b.createdOn) {
			return 1;
		}
		if (a.createdOn > b.createdOn) {
			return -1;
		}
		return 0;
	});
	var totals = {
		total: 0
	};
	$.each(rNames, function(_, key) {
		totals[key] = 0;
		$.each(groups, function() {
			totals[key] += this[key];
			totals.total += this[key];
		});
	});
	var $table, $tbody, $tr;
	$('#giw-download-stats').empty().append($table = $('<table class="table table-striped" style="width: auto" />'));
	$table.append([
		'<thead>',
			'<tr>',
				'<th rowspan="3" style="text-align: center">Date</th>',
				'<th rowspan="2" colspan="2" style="text-align: center">Version</th>',
				'<th colspan="4" style="text-align: center">Shared</th>',
				'<th colspan="4" style="text-align: center">Static</th>',
				'<th rowspan="3" style="text-align: center">Total</th>',
				'<th rowspan="3" style="text-align: center">Downloads/day</th>',
			'</tr>',
			'<tr>',
				'<th colspan="2" style="text-align: center">32 bits</th>',
				'<th colspan="2" style="text-align: center">64 bits</th>',
				'<th colspan="2" style="text-align: center">32 bits</th>',
				'<th colspan="2" style="text-align: center">64 bits</th>',
			'</tr>',
			'<tr>',
				'<th rowspan="2" style="text-align: center">gettext</th>',
				'<th rowspan="2" style="text-align: center">iconv</th>',
				'<th style="text-align: center">exe</th>',
				'<th style="text-align: center">zip</th>',
				'<th style="text-align: center">exe</th>',
				'<th style="text-align: center">zip</th>',
				'<th style="text-align: center">exe</th>',
				'<th style="text-align: center">zip</th>',
				'<th style="text-align: center">exe</th>',
				'<th style="text-align: center">zip</th>',
			'</tr>',
		'</thead>'
	].join(''));
	$table.append($tbody = $('<tbody />'));
	var toDate = new Date();
	$.each(groups, function() {
		var group = this;
		$tbody.append($tr = $('<tr />'));
		$tr
			.append($('<td style="text-align: center" />').text(
				[group.createdOn.getFullYear(), to2(1 + group.createdOn.getMonth()), to2(group.createdOn.getDate())].join('-')
			))
			.append($('<td style="text-align: center" />').text(
				group.vGettext
			))
			.append($('<td style="text-align: center" />').text(
				group.vIconv
			))
		;
		$.each(rNames, function(_, key) {
			$tr.append($('<td style="text-align: center" />').text(itoa(group[key])));
		});
		$tr.append($('<td style="text-align: center" />').text(itoa(group.total)));
		var deltaDays = (toDate.getTime() - group.createdOn.getTime()) / (1000 * 3600 * 24);
		var downloadsPerDay = group.total / deltaDays;
		$tr.append($('<td style="text-align: center" />').text(itoa(downloadsPerDay, 1)));
		toDate = group.createdOn;
	});
	$tbody.append($tr = $('<tr><th colspan="3" style="text-align: right">Total</th></tr>'));
	$.each(rNames, function(_, key) {
		$tr.append($('<td style="text-align: center" />').text(itoa(totals[key])));
	});
	$tr.append($('<td style="text-align: center" />').text(itoa(totals.total)));
});

});