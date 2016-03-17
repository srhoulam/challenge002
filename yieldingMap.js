/**
 * @param {Array}       collection          The collection to iterate over.
 * @param {Function}    mappingFn           The function invoked each iteration.
 * @param {Object}      options             An optional object with performance options.
 * @param {Number}      options.batchSize   The number of elements to process at once.
 * @param {Number}      options.delayPeriod The number of milliseconds to wait between batches.
 *
 * @returns {Promise} Returns a Promise fulfilled with the result of the map.
 */

function yieldingMap(collection, mappingFn, options) {
    'use strict';

    options = options || {};
    var length = collection.length;
    var count = 0;
    var result = [];

    var delayPeriod = options.delayPeriod || 0;
    var batchSize = (options.batchSize && options.batchSize > 1) ? options.batchSize : 1;

    return new Promise(function ymExecutor(resolve) {
        setTimeout(function step() {
            //  effectively loop condition
            if(count === length) {
                return resolve(result);
            }

            //  effectively loop body and increment statement
            for(var index = 0; index < batchSize && count < length; index++, count++) {
                result.push(mappingFn(collection[count]));
            }

            setTimeout(step, delayPeriod);
        }, delayPeriod);
    });
}
