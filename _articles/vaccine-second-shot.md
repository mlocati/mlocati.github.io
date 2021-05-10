---
title:  "Second shot of COVID-19 vaccines"
description: Calculate when you'll receive the second shot of the COVID-19 vaccine.
date: 2021-05-10T21:45:07+02:00
---

<div style="min-height: 100px">
    If you get the first shot on <input type="date" id="first-shot" />,
    and if the second shot is after <input type="number" id="days" min="1" max="999" style="width: 4em; text-align: center;" /> days,
    it will be on <span id="second-shot" style="font-weight: bold;"></span>.
</div>

<br />

<table class="table table-hover table-bordered">
    <tbody>
        <tr>
            <th colspan="2">Italy</th>
        </tr>
        <tr>
            <td>Comirnaty by Pfizer/BioNTech</td>
            <td><a href="#" class="preset" data-days="36">36</a> &rarr; <a href="#" class="preset" data-days="42">42 days</a></td>
        </tr>
        <tr>
            <td>Moderna</td>
            <td><a href="#" class="preset" data-days="36">36</a> &rarr; <a href="#" class="preset" data-days="42">42 days</a></td>
        </tr>
        <tr>
            <td>Vaxzevria by AstraZeneca</td>
            <td><a href="#" class="preset" data-days="78">78 days</a></td>
        </tr>
        <tr>
            <th colspan="2">Italy (old)</th>
        </tr>
        <tr>
            <td>Comirnaty by Pfizer/BioNTech (until the first half of May 2021)</td>
            <td><a href="#" class="preset" data-days="21">21 days</a></td>
        </tr>
        <tr>
            <td>Moderna (until the first half of May 2021)</td>
            <td><a href="#" class="preset" data-days="28">28 days</a></td>
        </tr>
    </tbody>
</table>
<script>
(function() {
'use strict';

var FIRST_SHOT = document.getElementById('first-shot');
var DAYS = document.getElementById('days');
var SECOND_SHOT = document.getElementById('second-shot');
var LAST_GOOD_DAYS = 36;

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

function updateView(fixFields) {
    var firstShot = valueToDate(FIRST_SHOT.value) || new Date();
    LAST_GOOD_DAYS = parseInt(DAYS.value.replace(/[^\d]+/g, ''), 10) || LAST_GOOD_DAYS;
    if (fixFields) {
        FIRST_SHOT.value = dateToValue(firstShot);
        DAYS.value = LAST_GOOD_DAYS.toString();
    }
    var secondShot = new Date(firstShot.valueOf());
    secondShot.setDate(secondShot.getDate() + LAST_GOOD_DAYS);
    SECOND_SHOT.innerText = secondShot.toLocaleDateString(undefined, {
        dateStyle: 'full',
    });
}
Array.prototype.forEach.call(
    document.getElementsByClassName('preset'),
    function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            DAYS.value = a.getAttribute('data-days');
            updateView(true);
            return e.returnValue = false;
        })
    }
);
FIRST_SHOT.addEventListener('input', function() {
    updateView(false);
});
FIRST_SHOT.addEventListener('blur', function() {
    updateView(true);
});
DAYS.addEventListener('input', function() {
    updateView(false);
});
DAYS.addEventListener('blur', function() {
    updateView(true);
});

DAYS.value = LAST_GOOD_DAYS.toString();
FIRST_SHOT.value = dateToValue(new Date());
updateView(true);

})();
</script>