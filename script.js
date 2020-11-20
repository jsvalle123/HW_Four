var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds")
var timerDisplay = document.querySelector("#timer");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");

var totalSeconds = 0;
var secondsElapsed = 0;
var status = "Working";
var interval;

getTimePreferences();

// These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {
  //
  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 2) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

/* This function retrieves the values from the html input elements; Sort of
   getting run in the background, it sets the totalSeconds variable which
   is used in getFormattedMinutes/Seconds() and the renderTime() function.
   It essentially resets our timer */
function setTime() {
  var minutes;

  if (status === "Working") {
    minutes = minutesDisplay.value.trim();
  } else {
    minutes = restMinutesInput.value.trim();
  }

  clearInterval(interval);
  totalSeconds = minutes * 60;
}

// This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();

 // ..and then checks to see if the time has run out
  if (secondsElapsed >= totalSeconds) {
    if (status === "Working") {
      alert("Get Results!");
    } else {
      alert("Time to get back to work!");
    }

    stopTimer();
  }
}

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
  setTime();

  // We only want to start the timer if totalSeconds is > 0
  if (totalSeconds > 0) {
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
      interval = setInterval(function() {
        secondsElapsed++;

        // So renderTime() is called here once every second.
        renderTime();
      }, 1000);
  } else {
    alert("Minutes of work/rest must be greater than 0.")
  }
}

/* This function stops the setInterval() set in startTimer but does not
   reset the secondsElapsed variable and does not reset the time by calling "setTime()" */
function pauseTimer() {
  clearInterval(interval);
  renderTime();
}

/* This function stops the interval and also resets secondsElapsed
   and calls "setTime()" which effectively reset the timer
   to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

/* Our timer is fancy enough to handle 2 different settings at once this toggle
   function basically just specifies which of our 2 timer settings to use. */
function toggleStatus(event) {
  var checked = event.target.checked;

  if (checked) {
    status = "Working";
  } else {
    status = "Resting";
  }

  statusSpan.textContent = status;

  secondsElapsed = 0;
  setTime();
  renderTime();
}





playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);





function myQuiz(question, answers, correctAnswer) {
    var myQuestions = [
        {
            question1: "Where is the correct place to insert a Javascript?",
            answers1:{
                a: 'Both the <head> section and the <body> section are correct',
                b: '<body>',
                c: '<head>',
                d: '<title>'
            },
    
            correctAnswer3: 'a'
            
        },
        {
            question2: "Which operator is used to assign a value to a variable?",
            answers2:{
                a: '*',
                b: '-',
                c: '=',
                d: '+'
            },
    
            correctAnswer3: 'c'
            
        },
        {
            question3: "What is used to store multiple values in a single variable?",
            answers3:{
                a: 'object',
                b: 'string',
                c: 'arrays',
                d: 'syntax'
            },
    
            correctAnswer3: 'c'
            
        }
    
    
    ];
    for (var i = 0; i < myQuestions.length; i++) {
        
        console.log(myQuestions[i]);
      }

    var quiz = document.querySelector("#quiz");
    quiz.textContent.innerHTML = myQuestions;
    console.log(myQuestions);


    
     
}

myQuiz();

    
localStorage.setItem("answers", JSON.stringify(answers));
var lastanswers = JSON.parse(localStorage.getItem("answers"));
    
      

var resultsContainer = document.querySelector("#results");
var submitButton = document.querySelector("#submit");


