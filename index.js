document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    document.
        getElementById("run-tests").
        addEventListener('click', function(event) {
            event.stopPropagation();

            //  Test cases
            var testCases = [function(callback) {
                runTest({
                    'collection' : (function() {
                        var collection = [];
                        for(var count = 0; count < 10000; count++) {
                            collection.push(count > 1023 ? 1023 : count);
                        }
                        return collection;
                    })(),
                    mappingFn : function(element) {
                        return Math.pow(2, element);
                    },
                    ymOptions : {
                        batchSize : 1000,
                        delayPeriod : 1000
                    }
                }, callback);
            },
            function(callback) {
                runTest({
                    'collection' : (function() {
                        var collection = [];
                        for(var count = 0; count < 10000; count++) {
                            collection.push(count > 1023 ? 1023 : count);
                        }
                        return collection;
                    })(),
                    mappingFn : function(element) {
                        return Math.pow(2, element);
                    },
                    ymOptions : {
                        batchSize : 100
                    }
                }, callback);
            },
            function(callback) {
                runTest({
                    'collection' : (function() {
                        var collection = [];
                        for(var count = 0; count < 10000; count++) {
                            collection.push(count > 1023 ? 1023 : count);
                        }
                        return collection;
                    })(),
                    mappingFn : function(element) {
                        return Math.pow(2, element);
                    }
                }, callback);
            }];
            //  ... more test cases, if desired

            testCases.reduce(function(pV, cV) {
                return pV.then(function() {
                    return promiseTest(cV);
                });
            }, Promise.resolve()).then(function() {
                console.log("All tests completed successfully.");
            }).catch(function() {
                console.error("Tests failed!");
            });
        });
});
