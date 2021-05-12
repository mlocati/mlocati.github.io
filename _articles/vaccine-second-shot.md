---
title:  "Second shot of COVID-19 vaccines"
description: Calculate when you'll receive the second shot of the COVID-19 vaccine.
date: 2021-05-10T21:45:07+02:00
---

<table class="table table-striped table-bordered">
    <tbody>
        <tr>
            <td>
                Provided that between the first and the second shot you have to wait
            </td>
            <td>
                <input type="number" id="days" min="1" max="999" style="width: 4em; text-align: center;" /> days
            </td>
        </tr>
        <tr>
            <td>
                If you have the first shot on <input type="date" id="first-to-second-shot" />
            </td>
            <td>
                the second shot will be on<br /><span id="first-to-second-shot-result" style="font-weight: bold;"></span>
            </td>
        </tr>
        <tr>
            <td>
                If you want the second shot on <input type="date" id="second-to-first-shot" />
            </td>
            <td>
                your first shot should be on<br /><span id="second-to-first-shot-result" style="font-weight: bold;"></span>
            </td>
        </tr>
    </tbody>
</table>

<br />

<table class="table table-hover table-bordered">
    <tbody>
        <tr>
            <th colspan="2">Italy</th>
        </tr>
        <tr>
            <td>Comirnaty by Pfizer/BioNTech</td>
            <td><a href="#" class="days-preset" data-days="36"></a> &rarr; <a href="#" class="days-preset" data-days="42"></a> days</td>
        </tr>
        <tr>
            <td>Moderna</td>
            <td><a href="#" class="days-preset" data-days="36"></a> &rarr; <a href="#" class="days-preset" data-days="42"></a> days</td>
        </tr>
        <tr>
            <td>Vaxzevria by AstraZeneca</td>
            <td><a href="#" class="days-preset" data-days="78"></a> days</td>
        </tr>
        <tr>
            <th colspan="2">Italy (old)</th>
        </tr>
        <tr>
            <td>Comirnaty by Pfizer/BioNTech (until the first half of May 2021)</td>
            <td><a href="#" class="days-preset" data-days="21"></a> days</td>
        </tr>
        <tr>
            <td>Moderna (until the first half of May 2021)</td>
            <td><a href="#" class="days-preset" data-days="28"></a> days</td>
        </tr>
    </tbody>
</table>
<script>
(function() {
'use strict';

function dateToValue(date) {
    return [
        date.getFullYear().toString(),
        ('0' + (date.getMonth() + 1)).substr(-2),
        ('0' + date.getDate()).substr(-2),
    ].join('-')
}

function valueToDate(value) {
    var match = /^\s*0*(?<year>\d{4})-0*(?<month>[1-2]*\d)-0*(?<day>[1-3]*\d)\s*$/.exec(value);
    if (!match) {
        return null;
    }
    var year = parseInt(match.groups.year, 10);
    var month = parseInt(match.groups.month, 10);
    if (month < 1 || month > 12) {
        return null;
    }
    var day = parseInt(match.groups.day, 10);
    if (day < 1 || day > 31) {
        return null;
    }
    return new Date(year, month - 1, day, 12, 0, 0);
}

function formatDelta(date, delta) {
    var result = new Date(date.valueOf());
    result.setDate(result.getDate() + delta);
    return result.toLocaleDateString(
        undefined,
        {
            dateStyle: 'full',
        }
    );
}
function updateView(fixFields) {
    DAYS_LASTGOOD = parseInt(DAYS.value.replace(/[^\d]+/g, ''), 10) || DAYS_LASTGOOD;
    FIRST2SECOND_LASTGOOD = valueToDate(FIRST2SECOND.value) || FIRST2SECOND_LASTGOOD;
    SECOND2FIRST_LASTGOOD = valueToDate(SECOND2FIRST.value) || SECOND2FIRST_LASTGOOD;
    if (fixFields) {
        DAYS.value = DAYS_LASTGOOD.toString();
        FIRST2SECOND.value = dateToValue(FIRST2SECOND_LASTGOOD);
        SECOND2FIRST.value = dateToValue(SECOND2FIRST_LASTGOOD);
    }
    FIRST2SECOND_RESULT.innerText = formatDelta(FIRST2SECOND_LASTGOOD, DAYS_LASTGOOD);
    SECOND2FIRST_RESULT.innerText = formatDelta(SECOND2FIRST_LASTGOOD, -DAYS_LASTGOOD);
}

var DAYS = document.getElementById('days');
var DAYS_LASTGOOD = 36;
var FIRST2SECOND = document.getElementById('first-to-second-shot');
var FIRST2SECOND_LASTGOOD = valueToDate(dateToValue(new Date()));
var FIRST2SECOND_RESULT = document.getElementById('first-to-second-shot-result');
var SECOND2FIRST = document.getElementById('second-to-first-shot');
var SECOND2FIRST_LASTGOOD = valueToDate(dateToValue(new Date()));
var SECOND2FIRST_RESULT = document.getElementById('second-to-first-shot-result');

DAYS.value = DAYS_LASTGOOD.toString();
DAYS.addEventListener('input', function() {
    updateView(false);
});
DAYS.addEventListener('blur', function() {
    updateView(true);
});

FIRST2SECOND.value = dateToValue(FIRST2SECOND_LASTGOOD);
FIRST2SECOND.addEventListener('input', function() {
    updateView(false);
});
FIRST2SECOND.addEventListener('blur', function() {
    updateView(true);
});

SECOND2FIRST.value = dateToValue(SECOND2FIRST_LASTGOOD);
SECOND2FIRST.addEventListener('input', function() {
    updateView(false);
});
SECOND2FIRST.addEventListener('blur', function() {
    updateView(true);
});

Array.prototype.forEach.call(
    document.getElementsByClassName('days-preset'),
    function(a) {
        var days = a.getAttribute('data-days');
        a.innerText = days;
        a.addEventListener('click', function(e) {
            e.preventDefault();
            DAYS.value = days;
            updateView(true);
            return e.returnValue = false;
        })
    }
);

updateView(true);

})();
</script>