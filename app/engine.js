var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var customKeys = [];
var bpm = 600;
var i = 0;
var isPlaying = false;
var timeSignature = 4;
var metronomeCounter = 1;

var bpmText = $('#bpmText');
var bpmVal = $('#bpm');
var barText = $('#barText');
$('#chordElements td').on('click', function(e){
    if(customKeys.length === 0){ 
        alert('Choose the note first')
    }else{
        customKeys[customKeys.length-1] = customKeys[customKeys.length-1] + this.innerHTML;
        console.log(customKeys);
    }
})

$('#bar').on('change', function(e){
    barText.text(e.target.value + ' bars');
});

bpmVal.on('change', function(){
    bpm = 60000 / bpmVal.val();
    bpmText.text(bpmVal.val() + ' bpm');
    if (isPlaying) {
        pause();
        play(keys || customKeys);
    }
})

var select = $('#timeSign');
select.on('change', () => {
    timeSignature = select.val();
    if (isPlaying) {
        pause();
        play(keys || customKeys);
    }
})

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
        className: 'keySymbol',
        value: keys[0],
    },
    from: { color: '#ffffff', a: 0 },
    to: { color: '#CC6600', a: 1 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
    }
});

var set;

function play(keysArr) {
    metronomeCounter = 1;
    if (isPlaying) return;
    isPlaying = true;
    //timeSignature = $('#timeSign').val();
    metronomePlay(timeSignature, bpm);
    set = setInterval(function() {
        bar.set(0);
        bar.setText(keysArr[i]);
        bar.animate(1.0, {
            duration: bpm * timeSignature 
        }, function() {

        });
        i++;
        if (i === keysArr.length) {
            i = 0;
        }
    }, bpm * timeSignature);
}

var metronome;
var metroBar = new Howl({
    src: ['./MetroBar1.wav']
});

var metroBeat = new Howl({
    src: ['./MetroBeat1.wav']
});

function metronomePlay(timeSign, bpmRate) {
    metronome = setInterval(() => {
        if (metronomeCounter === +timeSign) {
            metroBar.play();
            metronomeCounter = 1;
        } else {
            metroBeat.play();
            metronomeCounter++;
        }

    }, bpmRate);
}

function stop() {
    bar.setText(keys[0]);
    bar.set(0);
    isPlaying = false;
    clearInterval(set);
    clearInterval(metronome);
    i = 0;
    metronomeCounter = 1;
}

function pause() {
    isPlaying = false;
    clearInterval(set);
    clearInterval(metronome);
}

$('#start').on('click', function() {
    pause();
    play(customKeys.length === 0 ? keys : customKeys);
});

$('#reset').on('click', function() {
    stop();
});

$('#pause').on('click', function() {
    pause();
});

$('#shuffle').on('click', function() {
    shuffle(customKeys.length === 0 ? keys : customKeys);
    console.log(keys)
});

$('ul.keys').children().on('click', function(){
    customKeys.push(this.id);
    notes.push(new VF.StaveNote({ keys: [this.id + "/4"], duration: "q" }));
    //VF.Formatter.FormatAndDraw(context, stave, notes);   
    console.log(customKeys);
    console.log(notes);
})

