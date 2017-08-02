var keys = ['C', 'D<sup>&#9837</sup>', 'D', 'E<sup>&#9837</sup>', 'E', 'F', 'G<sup>&#9837</sup>', 'G', 'A<sup>&#9837</sup>', 'A', 'B<sup>&#9837</sup>', 'B'];
var customKeys = [];
var metronome;
var mainInterval;

//interators & counters
var keys_iterator = 0;
var bar_counter = 0;
var metronome_counter = 1;

var isPlaying = false;

var bpm_ms = 600;
var timeSignature = 4;

//--------audio file------------
var metroBar = new Howl({
    src: ['./MetroBar1.wav']
});
var metroBeat = new Howl({
    src: ['./MetroBeat1.wav']
});
//------------------------------

//jquery DOMElements
var chordDisplay = $('#chordDisplay');
var bpmText = $('#bpmText');
var bpmSlider = $('#bpm');
var barText = $('#barText');
var barSlider = $('#bar');
var timeSignDropDown = $('#timeSign');

var barVal = +barSlider.val();

//------------ProgressBar.js init-------------------------
var progressBar = new ProgressBar.Circle("#container", {
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
//--------------------------------------------------------

chordDisplay.html(keys.join(", "))

//control methods
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

function play(keysArr) {  
    if (isPlaying) return;
    isPlaying = true;
    metronome_counter = 1;
    metronomePlay(timeSignature, bpm_ms);
    progressBar.setText(keysArr[0]);
    //main interval init
    mainInterval = setInterval(function() {
        if (keys_iterator > keysArr.length - 1) {
            keys_iterator = 0;
        }     
        progressBar.set(0); 
        if(bar_counter === barVal){
            keys_iterator++;
            progressBar.setText(keysArr[keys_iterator]);   
            bar_counter = 1;        
        }else{
            bar_counter++;
        }
        progressBar.animate(1.0, {
            duration: bpm_ms * timeSignature 
        });
    }, bpm_ms * timeSignature);
}

function metronomePlay(timeSign, bpmRate) {
    metronome = setInterval(() => {
        if (metronome_counter === +timeSign) {
            metroBar.play();
            metronome_counter = 1;
        } else {
            metroBeat.play();
            metronome_counter++;
        }

    }, bpmRate);
}

function stop() {
    progressBar.setText(customKeys[0] || keys[0]);
    progressBar.set(0);
    isPlaying = false;
    clearInterval(mainInterval);
    clearInterval(metronome);
    i = 0;
    metronome_counter = 1;
    bar_counter = 0;
}

function pause() {
    isPlaying = false;
    clearInterval(mainInterval);
    clearInterval(metronome);
}

//on change events
barSlider.on('change', function(e){
    barText.text(e.target.value + ' bars');
    barVal = +e.target.value;
});

bpmSlider.on('change', function(){
    bpm_ms = 60000 / bpmSlider.val();
    bpmText.text(bpmSlider.val() + ' bpm');
    if (isPlaying) {
        pause();
        play(keys || customKeys);
    }
})

timeSignDropDown.on('change', () => {
    timeSignature = timeSignDropDown.val();
    if (isPlaying) {
        pause();
        play(keys || customKeys);
    }
})

//on click events
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
    chordDisplay.html(customKeys.join(", "));
});

$('ul.keys').children().on('click', function(){
    customKeys.push(this.innerHTML);
    chordDisplay.html(customKeys.join(", ")); 
    console.log(customKeys);
})

$('#chordElements td').on('click', function(e){
    if(customKeys.length === 0){ 
        alert('Press the key first')
    }else{
        customKeys[customKeys.length-1] = customKeys[customKeys.length-1] + this.innerHTML;
        chordDisplay.html(customKeys.join(", "));
        console.log(customKeys);
    }
})