/**
 * @param {Array} collection The collection to iterate over.
 * @param {Function} mappingFn The function invoked each iteration.
 *
 * @returns {Promise} Returns a Promise fulfilled with the result of the map.
 */

function yieldingMap(collection, mappingFn, options) {
    'use strict';

    options = options || {};
    var length = collection.length;
    var count = 0;
    var result = [];

    return new Promise(function ymExecutor(resolve) {
        setTimeout(function step() {
            //  effectively loop condition
            if(count === length) {
                return resolve(result);
            }

            //  effectively loop body and increment statement
            if(options.batchSize && options.batchSize > 1) {
                for(var index = 0; index < options.batchSize && count < length; index++, count++) {
                    result.push(mappingFn(collection[count]));
                }
            } else {
                result.push(mappingFn(collection[count++]));
            }


            setTimeout(step, options.delayPeriod || 0);
        }, options.delayPeriod || 0);
    });
}
