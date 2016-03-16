document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    document.
        getElementById("run-tests").
        addEventListener('click', function(event) {
            event.stopPropagation();

            runTest();
        });
});
