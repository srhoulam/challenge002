var runTest = (function() {
    'use strict';

    var clicks;

    function clickHandler() {
        clicks++;
    }
    function runTest() {
        clicks = 0;
        document.addEventListener("click", clickHandler);

        var beginTime = Date.now();
        var endTime;
        var intervalId;
        var collection = [];
        for(var count = 0; count < 10000; count++) {
            collection.push(count > 1023 ? 1023 : count);
        }

        yieldingMap(collection, function(element) {
            return Math.pow(2, element);
        }).then(function testVerify() {
            endTime = Date.now();
            clearInterval(intervalId);

            var numIntervals = Math.floor((endTime - beginTime) / 100);
            if(clicks === 0) {
                console.error("Test failed completely.");
            } else {
                console.log(`Test passed with time distortion factor ${numIntervals / clicks}.`);
            }
        });

        intervalId = setInterval(function() {
            document.body.click();
        }, 100);
    }

    return runTest;
})();
