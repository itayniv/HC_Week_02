
let onLoad = false;
let container;

let classifier;
let video;
let stream;
let pitch = [];




let thingsArr = [];


const synth1 = window.speechSynthesis;

/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {

});

//on page load finish do the next things:

window.onload = function() {
  onLoad = true;
  console.log('hello from script');
  init();
};





function init(){


  video = document.getElementById('MediaStreamVideo');
  //promise
  navigator.mediaDevices.getUserMedia({
    video: true
  })
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err) {
    console.log('error', err);
  });

  video.onplay = function() {
    console.log("The video has started to play");
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  };

}


function modelReady() {
  // Change the status of the model once its ready
  // select('#status').html('Model Loaded');
  // document.getElementById(""status").innerHTML = "Model Loaded";
  console.log("* Model Loaded* ");
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}


// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.

  if (results){
    let currGuess = results[0].className;
    let currGuessProb = results[0].probability;
    // console.log(currGuess);
    if (currGuessProb >= .4){
      thingsArr.push(currGuess);
      let i = thingsArr.length;
      if ( thingsArr[i-1] == thingsArr[i-2] ){
        // console.log("same");
      } else {
          console.log("trigger",thingsArr[i-1]);
          // document.getElementById("result").innerHTML = thingsArr[i-1];
          // playNote(2.6,2);

          for (let i = 0; i < 6; i++) {
              pitch[i] = document.getElementById("Pitch"+ (i+1)).value;
          }
          let Currsound = RiTa.similarBySound(thingsArr[i-1]);
          Currsound.length = 10;
          // console.log("Currsound", Currsound[0]);

          let speakThis1 = Currsound[0];
          let speakThis2 = Currsound[1];
          let speakThis3 = Currsound[2];
          let speakThis4 = Currsound[3];
          let speakThis5 = Currsound[4];
          let speakThis6 = Currsound[5];
          let speakThis7 = Currsound[6];
          let speakThis8 = Currsound[7];

          console.log("allwords",thingsArr[i-1], Currsound);
          console.log(pitch);

          // document.getElementById("speech-msg1").innerHTML = Currsound[0];

          if(speakThis1){
            speak(speakThis1, pitch[0]);
          }
          if(speakThis2){
            speak(speakThis2, pitch[1]);

          }
          if(speakThis3){
            speak(speakThis3, pitch[2]);

          }
          if(speakThis4){
            speak(speakThis4, pitch[3]);

          }
          if(speakThis5){
            speak(speakThis5, pitch[4]);

          }
          if(speakThis6){
            speak(speakThis6, pitch[5]);

          }

          if(speakThis6){
            speak(speakThis6, pitch[6]);

          }




          // speak(speakThis1, pitch[0]);
          // speak(speakThis2, pitch[1]);
          // speak(speakThis3, pitch[2]);
          // speak(speakThis4, pitch[3]);
          // speak(speakThis5, pitch[4]);
          // speak(speakThis6, pitch[5]);
          // speak(speakThis6, pitch[6]);

      }
    }
  }
  classifyVideo();
}







// Get the 'speak' button
let button = document.getElementById('speak1');

// Get the text input element.
let speechMsgInput1 = document.getElementById('speech-msg1');
let speechMsgInput2 = document.getElementById('speech-msg2');
let speechMsgInput3 = document.getElementById('speech-msg3');
let speechMsgInput4 = document.getElementById('speech-msg4');
let speechMsgInput5 = document.getElementById('speech-msg5');
let speechMsgInput6 = document.getElementById('speech-msg6');

// Get the voice select element.
let voiceSelect1 = document.getElementById('voice1');
let voiceSelect2 = document.getElementById('voice2');

// Get the attribute controls.
let volumeInput = document.getElementById('volume');
let rateInput = document.getElementById('rate');
let pitchInput = document.getElementById('pitch');


// Fetch the list of voices and populate the voice options.
function loadVoices1() {

  // Fetch the available voices.
  let voices = speechSynthesis.getVoices();
  // Loop through each of the voices.
  voices.forEach(function(voice, i) {
    // Create a new option element.
    let option = document.createElement('option');
    // Set the options value and text.
    option.value = voice.name;
    option.innerHTML = voice.name;

    // Add the option to the voice selector.
    voiceSelect1.appendChild(option);
  });
}


// Fetch the list of voices and populate the voice options.


// Execute loadVoices.
loadVoices1();



// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices1();
};

// Create a new utterance for the specified text and add it to
// the queue.

function speak(text, pitch) {

            // Create a new instance of SpeechSynthesisUtterance.
            let utterThis = new SpeechSynthesisUtterance();

            // Set the attributes.
            utterThis.volume = 1;
            utterThis.rate = 1;
            // utterThis.pitch = parseFloat(pitchInput.value);
            utterThis.pitch = pitch;
            // console.log("talking");

            // Set the text.
            utterThis.text = text;
            utterThis.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect1.value; })[0];
            // Queue this utterance.
            window.speechSynthesis.speak(utterThis);
}



// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function(e) {

  //get all pitch
    for (let i = 0; i < 6; i++) {
        pitch[i] = document.getElementById("Pitch"+ (i+1)).value;
    }

    speak(speechMsgInput1.value, pitch[0] );
    speak(speechMsgInput2.value, pitch[1] );
    speak(speechMsgInput3.value, pitch[2] );
    speak(speechMsgInput4.value, pitch[3] );
    speak(speechMsgInput5.value, pitch[4] );
    speak(speechMsgInput6.value, pitch[5] );


  if (speechMsgInput1.value.length > 0) {
  console.log("working");
  }

});
