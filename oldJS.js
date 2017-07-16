//array of keys to be sequenced
var SelectedKeys = [];
var Keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var Qualities = ['min', 'maj', 'aug', 'dim', '7th']
var Seconds;
var StartButton = document.querySelector('#StartButton');
var ShuffleButton = document.querySelector('#ShuffleButton');
var KeySymbol = document.querySelector('#KeySymbol');
var ResetButton = document.querySelector('#ResetButton');
var quality = document.querySelector('#quality');
var LeftFrameMiddle = document.querySelector('.LeftFrameMiddle')
var counter = 0;
var counterQ = 0;
var stop;

var C = document.querySelector('#C')
C.addEventListener('click', function(){
SelectedKeys.push("C");
LeftFrameMiddle.innerHTML = "[" + SelectedKeys + "]";
})

var Db = document.querySelector('#Db')
Db.addEventListener('click', function(){
SelectedKeys.push("Db");
LeftFrameMiddle.innerHTML = "[" + SelectedKeys + "]";
})

ShuffleButton.addEventListener('click', function(){
reset(stop);
  Seconds = document.getElementById('InputBox').value 
  Seconds = Seconds ? Seconds * 1000 : 1000;
randomizeKeys(Seconds);
randomizeQual(Seconds);
})

StartButton.addEventListener('click', function(e){
  e.preventDefault();
  reset(stop);
  Seconds = document.getElementById('InputBox').value 
  Seconds = Seconds ? Seconds * 1000 : 1000;
  if (SelectedKeys.length = 0) {
  sequenceLoop(Keys, KeySymbol, Seconds);
  }
  else {
  sequenceLoop(SelectedKeys, KeySymbol, Seconds);
  }
  /*sequence(Keys, Seconds, KeySymbol)*/
})


ResetButton.addEventListener('click', function(){
reset(stop);
})

function reset(val) {
window.clearInterval(val);
counter = -1;
KeySymbol.innerHTML = " ";
quality.innerHTML = " ";
}

function sequenceLoop(arr, el, sec){
stop = window.setInterval(sequence(arr, el), sec);
  }
    
function sequence(arr, el) {
counter = counter + 1;
if (counter > 11) {
counter = 0;
}
el.innerHTML = arr[counter];
}
//Sequences over all the keys in a natural order
/*function sequence(arr, sec, el){
	var i = 0;
	var id = setInterval(run, sec);
  function run(){
  if(i > 6) 
    	clearInterval(id);
		else
    	el.innerHTML = arr[i++];
  }
} */
//Sequences over all the keys in a random order
function randomizeKeys(sec) {
stop = window.setInterval(randomize, sec)
}

function randomize() {
counter = Math.round( Math.random() * Keys.length);
if (counter > 11) {
counter = 0;
}
KeySymbol.innerHTML = Keys[counter]; 
}

function randomizeQual(sec) {
stop = window.setInterval(randomizeQ, sec)
}

function randomizeQ() {
counterQ = Math.round( Math.random() * 10);
if (counterQ > 3) {
counterQ = 0;
}
quality.innerHTML = Qualities[counterQ]; 
}

var timeout;

function play(keysArr, temp){
    keysArr.forEach(function(key){
        // do something with key
        currentKey = key;
        timeout = setTimeout(temp);
    })
}




