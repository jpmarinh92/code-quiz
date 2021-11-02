var start = document.querySelector("#startBtn");
var questionBox = document.querySelector("#questionBox");
var options = document.querySelector("#options");
var answered = document.querySelector("#options");
var button = document.querySelector("#startBtn");
var timer = document.querySelector(".timer");
var confirm = document.querySelector("#confirm");
var form = document.querySelector("#user");
var end = document.querySelector("#end");
var finalP = document.querySelector("#finalScoreP");
var submit = document.querySelector("#submit");
var highScores = document.querySelector("#high-scores");
var scoreList = document.querySelector("#past-scores");
var h1 = document.querySelector("#h1");
var goBack = document.querySelector("#goBack");
var clear = document.querySelector("#delete");
var viewHS = document.querySelector("#highScore");
var over = false;
var time = 75;
var counter = 0;
var finalScore = 0;

//create questions as objs
var question1 = {
  title: "Commonly used data types DO NOT include",
  option1: "1. strings",
  option2: "2. booleans",
  option3: "3. alerts",
  option4: "4. numbers",
  correct: "option3"
}

var question2= {
  title: "The condition in an if/else element is enclosed within _____.",
  option1: "1. quotes",
  option2: "2. curly brackets",
  option3: "3. parenthesis",
  option4: "4. square brackets",
  correct: "option3"
}

var question3 = {
  title: "Arrays in JavaScript can be used to store _____.",
  option1: "1. numbers and strings",
  option2: "2. other arrays",
  option3: "3. booleans",
  option4: "4. all the above",
  correct: "option4"
}

var question4 = {
  title: "String values must be enclosed within _____ when being assigned to variables.",
  option1: "1. commas",
  option2: "2. curly brackets",
  option3: "3. quotes",
  option4: "4. parenthesis",
  correct: "option3"
}

var question5 = {
  title: "A very useful toll used during development and debugging for printing content to the debugger is:",
  option1: "1. JavaScript",
  option2: "2. terminal/bash",
  option3: "3. for loops",
  option4: "4. console.log",
  correct: "option4"
}

//create an array with all the questions and answers
var questions = [question1, question2, question3, question4, question5]
var startHandler= function(event) {

  end.hidden = true;
  options.hidden = false;
  highScores.hidden=true;

  if (counter >= questions.length  || time < 1) {
    finalScore = time;
    over = true
    highScore(finalScore, event);
  }else {

  //start timer, hide the start button and show questions
  timer.textContent = "Time:" + time;
  button.hidden = true;
  questionBox.innerHTML = "<h3>"+ questions[counter].title+"</h3>";
  var correct = questions[counter].correct

  //iterate through the keys of the obj to get the options for the answers
  for (const [key, value] of Object.entries(questions[counter])) {
    if(key.startsWith("option")){
      if (key == correct){
        options.innerHTML += "<li class='option' data-right='true'><a href='#' data-right='true'>" + value + "</a></li>";
      }else{
        options.innerHTML += "<li class='option' data-right='false'><a href='#' data-right='false'>" + value + "</a></li>";
      }
    }
    }     
  }
};

//function for when the user selects an answer
var answeredHandler= function(event) {

  confirm.hidden = false;
  //checks to see if the selected answer is the right one
  if(event.target.getAttribute("data-right") == "false"){
    confirm.textContent = "WRONG"
    time -= 10 ;
    timer.textContent = "Time" + time
  }else{
    confirm.textContent = "CORRECT"
    counter++
  }

  //clears the options so when the new options load they are not added to the old ones
  options.innerHTML = "";
  startHandler(event);
};

//starts timers
var startTimerHandler = function() {

  var timeInterval = setInterval(function(){
    if(over){
      timer.textContent = "Time:" + time;
      clearInterval(timeInterval);
    }else {
      time--
      timer.textContent = "Time:" + time;
    }

    if(time < 1){
      clearInterval(timeInterval)
      finalScore = 0;
      highScore(finalScore);
    }

  }, 1000);
}

var highScore = function() {
  end.hidden=false;
  h1.hidden=true;
  confirm.hidden=true;
  options.hidden=true;
  questionBox.hidden=true;

  finalP.textContent = "Your final score was " + finalScore;
  submit.addEventListener("click", submitScoreHandler);
};

var submitScoreHandler = function() {
  var initials = document.querySelector("#initials").value
  var scores = {'initials':initials, 'score':finalScore}
  var storagedScores =JSON.parse(localStorage.getItem('scores'));
  if(storagedScores === null) {
    storagedScores = [];
  }
  storagedScores.push(scores)
  localStorage.setItem('scores', JSON.stringify(storagedScores));

  displayScores();
}

var displayScores = function() {

  end.hidden = true;
  h1.hidden= true;
  button.hidden=true;
  questionBox.hidden = true;
  confirm.hidden = true;
  highScores.hidden = false;
  scoreList.innerHTML = "";

  var storagedScores =JSON.parse(localStorage.getItem('scores'));

  if(storagedScores==null){
    scoreList.innerHTML = ""
  }else{
    for (i=0; i < storagedScores.length ; i++) {
    scoreList.innerHTML += "<li>" + storagedScores[i].initials + " - " + storagedScores[i].score + "</li>"
  }
  }


}

var goBackHandler = function() {
  h1.hidden = false;
  questionBox.hidden = false;
  highScore.hidden = true;
  highScores.hidden = true;
  button.hidden = false;
  counter=0;
  time = 75;
  over = false;

  questionBox.innerHTML = ""
  questionBox.innerHTML = "Try to answer the following code-related questions within the time<br> limit. Keep in mind that incorrect answers will penalize your scortime<br> by ten seconds!";
  timer.textContent = "Time: 0";
}

var clearHSHandler = function() {
  localStorage.clear('scores');
  displayScores();

}


start.addEventListener("click", startHandler);
start.addEventListener("click", startTimerHandler)
answered.addEventListener("click", answeredHandler); 
goBack.addEventListener("click", goBackHandler);
viewHS.addEventListener("click", displayScores);
clear.addEventListener("click", clearHSHandler);