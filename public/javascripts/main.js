function start(e) {

}

function stop(e) {
    worker.terminate();
}

var worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {
    if(!(e.data instanceof Array)){
        console.log(e.data);
    }else{
        $("#result").html((e.data[0]/e.data[1]*100) + "%");
        document.getElementById('compute').value = e.data[0] / e.data[1];
    }
}, false);

$(document).ready(function() {
    // $("#start").click(start);
    $("#stop").click(stop);

    $("#get-pi").click(function(){
    	$.get("pi", function(data) {
    		$("#pi").text(data);
    	});
    });
});