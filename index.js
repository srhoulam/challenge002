document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    document.
        getElementById("run-tests").
        addEventListener('click', function(event) {
            event.stopPropagation();

            //  Test cases
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
            });
            //  ... more test cases, if desired
        });
});
