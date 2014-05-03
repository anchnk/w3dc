/*global soundsKit, window */
/** PART II **/
function createBlock(obj) {

  var audio,
    block,
    p,
    textNode,
    mp3Support;

  //1) create a div with document.createElement
  block = document.createElement('div');

  //2) set the class to "block" for example, 
  //set id to the object name and set style attribute of the newly-created div element (block):
  //(HINT: className, id and style.backgroundColor)
  block.className = 'block';
  block.id = obj.name;
  block.style.backgroundColor = obj.color;

  //3) creates a new p element:
  //// creates a new text-node with the value of the key.letter object property.
  // appends the text-node to the newly-created p element:
  // appends the p element to the block 
  //(HINT: appendChild)
  p = document.createElement('p');
  textNode = document.createTextNode(obj.key.letter);

  p.appendChild(textNode);
  block.appendChild(p);

  //4) instantiate a new Audio object
  audio = document.createElement('audio');

  //5) check if the browser can play mp3 file ('audio/mpeg') with the canPlayType function
    //yes: sets the src attribute of the audio object: path + the first filenames (mp3)
    //no:  sets the src attribute of the audio object: path + the second filenames (ogg)
  mp3Support = audio.canPlayType('audio/mpeg');

  if (mp3Support) {
    // set src to mp3 file
    audio.src = obj.url.path + obj.url.filenames[0];
  } else {
    // set src to ogg file
    audio.src = obj.url.path + obj.url.filenames[1];
  }
  //6)  sets the controls attribute of the audio object to false (we do not want to see the controls)
  audio.controls = false;
  // OR
  //audio.setAttribute('control', false); // if using controls it doesn't works
  //7) append the audio to the block
  block.appendChild(audio);
  //8) returns the block

  // add the reference of the HTML Element to the object
  obj.htmlElementRef = block;

  return block;
}

/** PART III **/

// the history part (part III 3)  
//An idea is to factorize the code keyPressed and clickBlock (create a new function playSound) 
//or you can just create a new function appendToHistory and call it each time a sound is played
function playSound(audioElem, historyElem) {
  var parentDiv;
  var keyLetter;
  var letters = [];

  parentDiv = audioElem.parentNode;
  soundsKit.forEach(function searchKeyLetter(sampleObj) {
    if (sampleObj.htmlElementRef === parentDiv) {
      keyLetter = sampleObj.key.letter;
    }
  });
  letters.push(keyLetter);
  historyElem.textContent += letters;
  audioElem.currentTime = 0;
  audioElem.play();
}
//1) Click event
//the listener for click events 
function clickBlock(blockDiv, historyElem) {

  //1) get the audioElement with the keyword this and a querySelector
  var audioElement = blockDiv.querySelector('audio');

  // console.log(this); //may help
  //2) set the currentTime of the audioElement properties to 0 
  //(by this way we can play the sound quickly several times in a row. )
  //3) then call the play method of the audioElement
  playSound(audioElement, historyElem);
}

//2) optional key event

function keyPressed(historyElem) {

  var audioElement,
    keyCode;
  // console.log(event.which || event.keyCode);
  //1)get the keyCode or the which 
  //2)loop over the soundsKit
  //3)check if the key pressed correspond to the keyCode of an object
  //4) if yes: get the corresponding htmlAudioElement 
  //(by finding the corresponding id - or if you have add to each object the reference to each Html elements ...  )
  //5) set the currentTime of the audioElement properties to 0  
  //5) then call the play method of the audioElement
  keyCode = window.event.which || window.event.keyCode;
  soundsKit.forEach(function checkKeyCode(sampleObj) {
    if (keyCode === sampleObj.key.keyCode) {
      audioElement = sampleObj.htmlElementRef.querySelector('audio');
      // OR
      //audioElement = document.getElementById(sampleObj.name);
      playSound(audioElement, historyElem);
    }
  });
}





/** PART IV **/

function checkAudioSupport() {
  //create a new Audio object
  //then check if for example the function play exist
  //if it raise an error: catch it, display a message (in a alert window or in the warning div) and return false
  //else return true
}



function init() {
  // Cache variable, selectors run only once
  var container = document.getElementById('container');
  var history = document.querySelector('#history');

  console.log('--- Assignment 2 --- ');
  console.log('the soundsKit: ', soundsKit);
  //PART IV checkaudioSupport
  //call checkaudioSupport if it returns false break else continue

  // PART II 
  // iterate over the soundsKit Array
  // for each object:
    // appends the result of the createBlock function to the container
    //PART II 1) bind the click event on the result of the createBlock 
    //end of the loop 
  soundsKit.forEach(function buildDrumSample(sampleObj) {
    var block = createBlock(sampleObj);
    container.appendChild(block);
    block.addEventListener('click', function () {
      clickBlock(this, history);
    });
  });
  // //PART III 2) bind the keydown on document
  document.addEventListener('keydown', function () {
    keyPressed(history);
  });
}

init();