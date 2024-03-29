/* jshint unused:vars, undef:true, browser:true, jquery:true, -W083 */
$(document).ready(function() {

'use strict';
var $tool = $('#tool');

// LineComparer
(function() {
    var parsed = ['', ''], parsedCaseSensitive = null, parsedSplitWords = null;
    var $inputList = [$('#tlc-input-1'),$('#tlc-input-2')];
    var $outputList = [$('#tlc-output-1'), $('#tlc-output-1-2'), $('#tlc-output-2')];
    var $outputListCount = [$('#tlc-output-1-count'), $('#tlc-output-1-2-count'), $('#tlc-output-2-count')];
    $inputList[0].add($inputList[1]).add($tool).on('change keydown keyup keypress blur', function() {
        var parsing = [$inputList[0].val(), $inputList[1].val()];
        var parsingCaseSensitive = $('#tool option:selected').data('case-sensitive') === 'yes';
        var parsingSplitWords = $('#tool option:selected').data('split-words') === 'yes';
        if (parsing[0] === parsed[0] && parsing[1] === parsed[1] && parsedCaseSensitive === parsingCaseSensitive && parsedSplitWords === parsingSplitWords) {
            return;
        }
        function inList(value, list) {
            if (parsingCaseSensitive) {
                return list.indexOf(value) >= 0;
            }
            var valueLC = value.toLowerCase();
            for (var i = 0; i < list.length; i++) {
                if (valueLC === list[i].toLowerCase()) {
                    return true;
                }
            }
            return false;
        }
        var inputList = [], outputList = [[], [], []], i, items;
        for (i = 0; i < 2; i++) {
            inputList[i] = [];
            if (parsingSplitWords) {
                items = $inputList[i].val().replace(/\s+/g, ' ').split(' ');
            } else {
                items = $inputList[i].val().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
            }
            $.each(items, function(_, line) {
                line = $.trim(line);
                if (line !== '') {
                    inputList[i].push(line);
                }
            });
        }
        for (i = 0; i < inputList[0].length; i++) {
            if (inList(inputList[0][i], inputList[1])) {
                outputList[1].push(inputList[0][i]);
            } else {
                outputList[0].push(inputList[0][i]);
            }
        }
        for (i = 0; i < inputList[1].length; i++) {
            if (!inList(inputList[1][i], inputList[0])) {
                outputList[2].push(inputList[1][i]);
            }
        }
        $outputList[0].val(outputList[0].join('\n'));
        $outputListCount[0].text(outputList[0].length.toString());
        $outputList[1].val(outputList[1].join('\n'));
        $outputListCount[1].text(outputList[1].length.toString());
        $outputList[2].val(outputList[2].join('\n'));
        $outputListCount[2].text(outputList[2].length.toString());
        parsed = parsing; 
        parsedCaseSensitive = parsingCaseSensitive;
        parsedSplitWords = parsingSplitWords;
    }); 
})();

$tool
    .on('change', function() {
        $('div.tool').hide();
        $('div#tool-' + this.value).show();
    })
    .trigger('change');

});
