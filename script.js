
var myVar = setInterval(function(){ myTimer() }, 1000);
var secondlimit = 75;

function myTimer() {
if(secondlimit == 0)
{
    myStopFunction();
}

document.getElementById("timer").innerHTML = '00:' + zeroPad(secondlimit,2);
secondlimit = secondlimit  - 1;

}

function myStopFunction() {
    clearInterval(myVar);
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

var myQuestions = [
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



function generateQuiz(questions, quizContainer, resultsContainer){

    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        for(var i=0; i<questions.length; i++){
            answers = [];

            for(letter in questions[i].answers){

                answers.push(
                    '<label>'
                     + '<input type="radio" name="questions'+i+'"value="'+letter+'">'
                     + letter + ': '
                     + questions[i].answers[letter]
                     +'</label>'
                
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
        quizContainer.innerHTML = output.join('');

    }

    function showResults(questions, quizContainer, resultsContainer){

        var answerContainers = quizContainer.querySelectorAll('.answers');

        var userAnswer = '';
        var numCorrect = 0;

        for(var i=0; i<questions.length; i++){

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

            if(userAnswer===questions[i].correctAnswer){

                numCorrect++;

                answerContainers[i].style.colo = 'green';
            }
            else{

                answeContainers[i].style.color= 'red';
            }
        }
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;

    }

    showQuestions(questions, quizContainer);

    submitButton.onclick= function(){
        showResults(questions, quizContainer, resultsContainer);
    }
}

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');


