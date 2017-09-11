//
// bpm.js - https://github.com/yoggy/bpm_detector
//
// license:
//     Copyright (c) 2017 yoggy <yoggy0@gmail.com>
//     Released under the MIT license
//     http://opensource.org/licenses/mit-license.php;
//

// index.htmlの<div id="bpm_component">に対応するコンポーネント定義
var bpm_component = new Vue({
    el: '#bpm_component',
    data: {
        bpm : 0
    },
    methods: {
        on_beat : function () {
            console.log("on_beat()");

            var t = new Date().getTime(); // millisecons since 1970/1/1
            push_time(t);
            this.bpm = calc_bpm();
        }
    },
    // 1.0ではreadyだったが、2.0からmountedという名称に変更されているので注意 https://jp.vuejs.org/v2/guide/migration.html#ready-置き換え
    mounted: function() {
        var _this = this;
        window.addEventListener('keydown', function(event) {
            // スペースキーを押したとき
            if (event.keyCode == 0x20) { 
                _this.on_beat();
            }
        });
    }
});

/////////////////////////////////////////////////////////////////////////
// 以後、bpm計算用

var ts = [];

function calc_bpm () {
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

function push_time (t) {
    ts.push(t);
    if (ts.length > 8) {
        ts.shift();
    }
}
