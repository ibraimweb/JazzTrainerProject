var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

var key = $('#keySymbol');
var temp;
var i = 0;

var set;
var isPlaying = false;

function play(keysArr){
    if(isPlaying) return;
    isPlaying = true;
    temp = $('#temp').val() * 1000;
    set = setInterval(function(){
        key.text(keysArr[i]);
        i++;
        if(i === keysArr.length){
            i = 0;
        }
    }, temp);
}

function stop(){
    isPlaying = false;
    clearInterval(set);
    i = 0;
}

function pause(){
    isPlaying = false;
    clearInterval(set);
}

$('#start').on('click', function(){
    play(keys);
});

$('#reset').on('click', function(){
    stop();
});

$('#pause').on('click', function(){
    pause();
});

