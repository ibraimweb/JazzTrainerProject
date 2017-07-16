var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var customKeys;
var key = $('#keySymbol');
var temp;
var i = 0;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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

// var bar = new ProgressBar.Circle(container, {
//   color: '#FFEA82',
//   trailColor: '#eee',
//   trailWidth: 1,
//   easing: 'bounce',
//   strokeWidth: 2,
//   from: {color: '#FFEA82', a:0},
//   to: {color: '#ED6A5A', a:1},
//   // Set default step function for all animate calls
//   step: function(state, circle) {
//     circle.path.setAttribute('stroke', state.color);
//   }
// });

var set;
var isPlaying = false;

function play(keysArr){
    if(isPlaying) return;
    isPlaying = true;
    temp = $('#temp').val() * 1000;
    set = setInterval(function(){
        // bar.animate(1.0, {
        //     duration: temp
        // });
        key.text(keysArr[i]);
        i++;
        if(i === keysArr.length){
            i = 0;
        }
    }, temp);
}

function stop(){
    key.text(keys[0]);
    isPlaying = false;
    clearInterval(set);
    i = 0;
}

function pause(){
    isPlaying = false;
    clearInterval(set);
}

$('#start').on('click', function(){
    play(keys || customKeys);
});

$('#reset').on('click', function(){
    stop();
});

$('#pause').on('click', function(){
    pause();
});

$('#shuffle').on('click', function(){
    shuffle(keys);
    console.log(keys)
});


