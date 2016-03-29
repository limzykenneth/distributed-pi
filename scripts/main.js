function start(e) {
	var val = $("#calc").val();
    worker.postMessage({
        'cmd': 'start',
        'msg': 'Hi',
        'dec': val
    });
}

function stop(e) {
    // worker.postMessage({
    //     'cmd': 'stop',
    //     'msg': 'Bye'
    // });
    worker.terminate();
}

var worker = new Worker('./scripts/task.js');

worker.addEventListener('message', function(e) {
    $("#result").html(e.data);
}, false);

$(document).ready(function() {
    $("#start").click(start);
    $("#stop").click(stop);
});