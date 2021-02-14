var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds")
var timerDisplay = document.querySelector("#timer");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var body = document.getElementById("body");
// var button = querySelectorAll("button");
var questionId = 0;
var startButton = document.getElementById("begin");
startButton.addEventListener('click', beginQuiz);
// button.className = "btn btn-primary";
var highScore = document.getElementById("highscore");
highScore.addEventListener('click', showHighscore);
var questionId = 0;


var totalSeconds = 0;
var secondsElapsed = 0;
var status = "Working";
var interval;

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
  var secondsLeft = (totalSeconds - secondsElapsed);

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
  var minutesDisplay = 2;
  var restMinutesInput= 2;

  if (status === "Working") {
    minutes = minutesDisplay
  } else {
    minutes = restMinutesInput
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
  setTime();
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
// statusToggle.addEventListener("change", toggleStatus);




let currentQuestionId = 0

    let myQuestions = [
        {
            question: "Where is the correct place to insert a Javascript?",
            answers:{
                a: 'Both the <head> section and the <body> section are correct',
                b: '<body>',
                c: '<head>',
                d: '<title>'
            },
    
            correctAnswer: 'a'
            
        },
        {
            question: "Which operator is used to assign a value to a variable?",
            answers:{
                a: '*',
                b: '-',
                c: '=',
                d: '+'
            },
    
            correctAnswer: 'c'
            
        },
        {
            question: "What is used to store multiple values in a single variable?",
            answers:{
                a: 'object',
                b: 'string',
                c: 'arrays',
                d: 'syntax'
            },
    
            correctAnswer: 'c'
            
        }
    
    
    ];
    
    function beginQuiz() {
      var start = document.getElementById('start');
      var quiz = document.getElementById('quiz');

      start.className = "flex";
      quiz.className = "hide";

   
    }
    showQuestion();
    beginQuiz();
    setTime();

    function showQuestion() {
      var currentQuestion = myQuestions[questionId];
      var question = document.createElement("div");
      question.className += ("question");

      var answerA = document.createElement("button");
      answerA.className += "btn btn-primary";
      answerA.addEventListener('click', () => checkAnswer(currentQuestion.answers.a));

      var answerB = document.createElement("button");
      answerB.className += "btn btn-primary";
      answerB.addEventListener('click', () => checkAnswer(currentQuestion.answers.c));
      
      var answerC = document.createElement("button");
      answerC.className += "btn btn-primary";
      answerC.addEventListener('click', () => checkAnswer(currentQuestion.answers.c));

      question.textContent = currentQuestion.question;
      answerA.textContent = currentQuestion.answers.a;
      answerB.textContent = currentQuestion.answers.c;
      answerC.textContent = currentQuestion.answers.c;
      quizContainer.appendChild(question);
      quizContainer.appendChild(answerA);
      quizContainer.appendChild(answerB);
      quizContainer.appendChild(answerC);
      
    }

    function checkAnswer(answer) {
      let correctLetter = myQuestions[questionId].correctAnswer;
      if (myQuestions[questionId].answers[correctLetter] === answer) {
        alert("That's Right!");
      }
      else {
        alert("That's Wrong :(");
      }
      questionId++;
      quizContainer.innerHTML = "";
      if (questionId === myQuestions.length) {
        return endQuiz();
      }
      showQuestion();
    }
    
  function endQuiz() {
    console.log("quiz done");
 }
    addtoHighScore();
    showHighscore();


  function addtoHighScore() {
    var name = prompt("What is your name?")
    var correctAnswer = myQuestions[questionId].correctAnswer
    var finalScore = correctAnswer


    var thisScore = {
      name: name,
      score: finalScore
    };

    var scores = JSON.parse(localStorage.getItem("scores"));
    if (!scores) {
      scores = new Array();
    }
    scores.push(thisScore);
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  function showHighscore() {
    var scores = JSON.parse(localStorage.getItem("scores"));

    var scoreData = document.createElement("ul");
    for (const s in scores) {
      var score = scores[s];
      var content = `${score.name} in ${score.finalScore}`;

      var li = document.createElement("li");
      scoreData.appendChild(li);
      li.innerHTML = content;
    }

    if (resultsContainer.hasChildNodes() === true) {
      resultsContainer.replaceChild(scoreData, resultsContainer.childNodes[0])
    } else {
      resultsContainer.appendChild(scoreData);

    }
  }



    
