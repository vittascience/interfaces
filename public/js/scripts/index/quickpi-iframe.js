var platform = {};
var task = null;
platform.getTaskParams = function(key, defaultValue, success, error) {
    var res = {
        minScore: 0,
        maxScore: 100,
        noScore: 0,
        randomSeed: 0
    };

    if (key && key in res) {
        res = res[key];
    }
    if (success) {
        success(res);
    }
    return res;
};

platform.showView = function(views, success) {
    task.showViews(views);
    if (success) {
        success();
    }
};

platform.initWithTask = function(newTask) {
    task = newTask;
    task.load({
        task: true,
        grader: true
    }, function() {});
};

platform.askHint = platform.openUrl = platform.validate = platform.updateDisplay = function(data, success) {
    if (success) {
        success();
    }
};

TaskProxyManager.getTaskProxy("taskIframe", function(task) {
    TaskProxyManager.setPlatform(task, platform);
    platform.initWithTask(task);
});