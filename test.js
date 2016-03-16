function promiseTest(testInvocation) {
    return new Promise(function testExecutor(resolve, reject) {
        testInvocation(function(success) {
            success ? resolve(success) : reject(success);
        });
    });
}

var runTest = (function() {
    'use strict';

    var clicks;

    function clickHandler() {
        clicks++;
    }
    function runTest(options, callback) {
        options = options || {};

        clicks = 0;
        document.addEventListener("click", clickHandler);

        var beginTime = Date.now();
        var endTime;
        var intervalId;

        yieldingMap(options.collection, options.mappingFn, options.ymOptions).
            then(function testVerify(result) {
                endTime = Date.now();
                clearInterval(intervalId);

                var correctness = options.collection.map(options.mappingFn).map(function(elem, index) {
                    return elem === result[index];
                }).reduce(function(pV, cV) {
                    return pV && cV;
                }, true);
                console.log(`Test result: ${correctness ? 'success' : 'failure'}.`);

                var numIntervals = Math.floor((endTime - beginTime) / 100);

                if(clicks === 0) {
                    console.error("Test failed completely.");
                } else {
                    console.log(`Test passed with time distortion factor ${numIntervals / clicks}.`);
                }
                console.log(`Number of intervals: ${numIntervals}`);
                console.log(`Number of registered clicks: ${clicks}`);

                return callback(correctness);
            });

        intervalId = setInterval(function() {
            document.body.click();
        }, 100);

        console.log("Test in progress.");
    }

    return runTest;
})();
