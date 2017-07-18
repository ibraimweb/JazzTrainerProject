var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var customKeys;
var temp;
var i = 0;

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var bar = new ProgressBar.Circle("#container", {
    strokeWidth: 3,
    text: {
        value: keys[0]
    },
    from: { color: '#ffffff', a: 0 },
    to: { color: '#CC6600', a: 1 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
    }
});

var set;
var isPlaying = false;

function play(keysArr) {
    if (isPlaying) return;
    isPlaying = true;
    temp = $('#temp').val() * 1000;
    metronomePlay(0, temp);
    set = setInterval(function() {
        bar.set(0);
        bar.setText(keysArr[i]);
        bar.animate(1.0, {
            duration: temp
        }, function() {

        });
        i++;
        if (i === keysArr.length) {
            i = 0;
        }
    }, temp);
}

var metronome;
var sound = new Howl({
    src: ['./MetroBar1.wav']
});

function metronomePlay(timeSign, bpm) {
    metronome = setInterval(() => {
        sound.play();
    }, bpm);
}

function stop() {
    bar.setText(keys[0]);
    isPlaying = false;
    clearInterval(set);
    clearInterval(metronome);
    i = 0;
}

function pause() {
    isPlaying = false;
    clearInterval(set);
    clearInterval(metronome);
}

$('#start').on('click', function() {
    console.log('play');
    play(keys || customKeys);
});

$('#reset').on('click', function() {
    console.log('stop');
    stop();
});

$('#pause').on('click', function() {
    console.log('pause');
    pause();
});

$('#shuffle').on('click', function() {
    shuffle(keys);
    console.log(keys)
});