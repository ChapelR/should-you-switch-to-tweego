// jshint esversion: 6, browser: true, jquery: true
(function () {
    "use strict";

    function calcScore () {
        let score = 0;
        $("select").each((i, el) => {
            score += Number($(el).val());
        });
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