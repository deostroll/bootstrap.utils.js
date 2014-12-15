(function ($) {
    $.bsReady = function bsReady(task) {
        var bs = bsReady;
        if (!bs.calledOnce) {
            // ! first time execution
            bs.isBootstrapLoaded = false;
            bs.retries = 3;
            bs.taskQueue = [];
            bs.trialCount = 0;
            bs.calledOnce = true;
        }

        if (bs.isBootstrapLoaded) {
            console.log('executed directly');
            task();
            return;
        }
        else {
            //queue this
            bs.taskQueue.push(task);
        }

        var process = function () {

            if ($.isReady && bs.trialCount < 3) {
                bs.isBootstrapLoaded = (typeof $().modal === 'function');
                if (!bs.isBootstrapLoaded) {
                    setTimeout(process, 0);
                    bs.trialCount++;
                    return;
                }
                console.log('executed from process queue');
                bs.taskQueue.forEach(function (task) { task.call(document); });
                bs.taskQueue = [];
                return;
            }
            else {
                console.log('is not ready...');
                setTimeout(process, 0);
                return;
            }

            throw new Error('Twitter Bootstrap was not loaded...');
        };

        process();
    };
})(jQuery);
