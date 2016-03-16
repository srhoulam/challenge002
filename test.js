var runTest = (function() {
    'use strict';

    var clicks;

    function clickHandler() {
        clicks++;
    }
    function runTest(options) {
        options = options || {};

        clicks = 0;
        document.addEventListener("click", clickHandler);

        var beginTime = Date.now();
        var endTime;
        var intervalId;

        yieldingMap(options.collection, options.mappingFn, options.ymOptions).
            then(function testVerify() {
                endTime = Date.now();
                clearInterval(intervalId);

                var numIntervals = Math.floor((endTime - beginTime) / 100);

                if(clicks === 0) {
                    console.error("Test failed completely.");
                } else {
                    console.log(`Test passed with time distortion factor ${numIntervals / clicks}.`);
                }
                console.log(`Number of intervals: ${numIntervals}`);
                console.log(`Number of registered clicks: ${clicks}`);
            });

        intervalId = setInterval(function() {
            document.body.click();
        }, 100);

        console.log("Test in progress.");
    }

    return runTest;
})();
