// jshint esversion: 6, browser: true, jquery: true
(function () {
    "use strict";

    function calcScore () {
        let score = 0, addLater = 0, alwaysRec = false;
        $("select").each((i, el) => {
            let val = $(el).val();
            if (val === "special") {
                addLater += 1;
            } else if (val === "always-recommend") {
                alwaysRec = true;
            } else {
                val = Number(val);
                if (Number.isNaN(val)) {
                    val = 0;
                }
                score += val;
            }
        });
        if (score < 3 && $('select#format').val() === '0' && $('select#highlighting').val() === '2') {
            // not harlowe, req'd syntax highlighting, always recommend Tweego
            score = 3;
        } else if ($('select#format').val() === '1' && $('select#highlighting').val() === '2') {
            // is harlowe, syntax highlighting = no points ever
            score -= 1;
        }
        if (alwaysRec && score < 3) {
            score = 3;
        }
        if (addLater > 0 && score >= 3) {
            score += addLater;
        }
        return score;
    }

    function evaluate (score) {
        console.log(score, score >= 7);
        if (score >= 7) {
            return "<strong>Recommendation: Use Tweego.</strong> You would probably benefit greatly from Tweego.";
        }
        if (score >= 3) {
            return "<strong>Recommendation: Use Tweego.</strong> You may benefit from Tweego, but should also be fine sticking to Twine if you prefer it.";
        }
        return "<strong>Recommendation: Use Twine.</strong> You would likely gain little if any benefit from switching to Tweego.";
    }

    $(() => {
        $('#submit').click(() => {
            $('#result').empty().append(evaluate(calcScore()));
        });
    });

}());