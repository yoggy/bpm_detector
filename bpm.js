//
// bpm.js - https://github.com/yoggy/bpm_detector 
//
var ts = [];

function calc_bpm() {
    if (ts.length < 2) return 0;

    var count = ts.length - 1;
    var total = 0.0;
    for (var i = 0; i < count; i++) {
        var diff = ts[i+1] - ts[i];
        total += diff;
    }

    var t = total / count / 1000.0; // the average duration of a beat (second)
    var bpm = Math.round(60.0 / t);
    console.log("bpm=" + bpm);
    return bpm;
}

function push_time(t) {
    ts.push(t);
    if (ts.length > 8) {
        ts.shift();
    }
}

function on_beat() {
    var t = new Date().getTime(); // millisecons since 1970/1/1
    push_time(t);
    var bpm = calc_bpm();

    $("#bpm_text").text(bpm);
}

function init() {
    $("body").mousedown(on_beat); // don't use click()...
    $("body").keydown(function(e){
        if(e.keyCode == 0x20){
            on_beat();
        }
    });
}
$(document).ready(init);

