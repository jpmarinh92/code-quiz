var start = document.querySelector("#startBtn");
var questionBox = document.querySelector("#questionBox");
var options = document.querySelector("#options");
var answered = document.querySelector("#options");
var button = document.querySelector("#startBtn");
var timer = document.querySelector(".timer");
var time = 75;
var counter = 0;

//create questions as objs
var question1 = {
  title: "Commonly used data types DO NOT include",
  option1: "strings",
  option2: "booleans",
  option3: "alerts",
  option4: "numbers",
  correct: "option3"
}

var question2= {
  title: "The condition in an if/else element is enclosed within _____.",
  option1: "quotes",
  option2: "curly brackets",
  option3: "parenthesis",
  option4: "square brackets",
  correct: "option3"
}

var question3 = {
  title: "Arrays in JavaScript can be used to store _____.",
  option1: "numbers and strings",
  option2: "other arrays",
  option3: "booleans",
  option4: "all the above",
  correct: "option4"
}

var question4 = {
  title: "String values must be enclosed within _____ when being assigned to variables.",
  option1: "commas",
  option2: "curly brackets",
  option3: "quotes",
  option4: "parenthesis",
  correct: "option3"
}

var question5 = {
  title: "A very useful toll used during development and debugging for printing content to the debugger is:",
  option1: "JavaScript",
  option2: "terminal/bash",
  option3: "for loops",
  option4: "console.log",
  correct: "option4"
}

//create an array with all the questions and answers
var questions = [question1, question2, question3, question4, question5]
var startHandler= function() {
  //start timer, hide the start button and show questions
  timer.textContent = "Time:" + time;
  button.hidden = true;
  questionBox.innerHTML = "<h3>"+ questions[counter].title+"</h3>";
  var correct = questions[counter].correct

  //iterate through the keys of the obj to get the options for the answers
  for (const [key, value] of Object.entries(questions[counter])) {
    if(key.startsWith("option")){
      if (key == correct){
        options.innerHTML += "<li class='option' data-right='true'>" + value + "</li>";
      } else {
        options.innerHTML += "<li class='option' data-right='false'>" + value + "</li>";
      }
    }
    }     
};

//function for when the user selects an answer
var answeredHandler= function(event) {
  //checks to see if the selected answer is the right one
  if(event.target.getAttribute("data-right") == "false"){
    console.log("wrong")
    time -= 10 ;
    timer.textContent = "Time" + time
  }else{
    counter++
  }

  //clears the options so when the new options load they are not added to the old ones
  options.innerHTML = "";
  startHandler();
};

//starts timers
var startTimerHandler = function() {
  setInterval(function(){
    time--
    timer.textContent = "Time:" + time;
  
  }, 1000);
}


start.addEventListener("click", startHandler);
start.addEventListener("click", startTimerHandler)
answered.addEventListener("click", answeredHandler); 