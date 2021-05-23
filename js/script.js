var highScores = []
let multipleChoiceQuestion = [{
    question: "What does HTML stand for?",
    choice1: "Hyperlinks and Text Markup Language",
    choice2: "Hyper Text Markup Language",
    choice3: "Hyper Text Making Language",
    choice4: "Hyper Text Mark Language",
    answer: 1
},
{
    question: "What does CSS stand for?",
    choice1: "Colorful StyleSheet",
    choice2: "Creative Style Sheet",
    choice3: "Cascading Style Sheet",
    choice4: "Computer Style Sheet",
    answer: 2
},
{
    question: "Which HTML tag is used to define an internal style sheet?",
    choice1: "<script>",
    choice2: "<style>",
    choice3: "<html>",
    choice4: "<svg>",
    answer: 1
},
{
    question: "Which is the correct CSS syntax?",
    choice1: "body{color:black}",
    choice2: "{body{color:black}",
    choice3: "body={color:black}",
    choice4: "body:color{black}",
    answer: 0
},
{
    question: "How do you insert a comment in a CSS file?",
    choice1: "/*This is Comment*/",
    choice2: "//This Is Comment",
    choice3: "<!--- This Is Comment --->",
    choice4: "//This Is Comment//",
    answer: 1
},
{
    question: "How do you insert a comment in a HTML file?",
    choice1: "/*This is Comment*/",
    choice2: "//This Is Comment",
    choice3: "<!--- This Is Comment --->",
    choice4: "//This Is Comment//",
    answer: 2
},
{
    question: "Which property is used to change the background color?",
    choice1: "backgroundColor",
    choice2: "BgColor",
    choice3: "Color-Background",
    choice4: "background",
    answer: 3
},
{
    question: "How to write an IF statement in JavaScript?",
    choice1: "if i==5",
    choice2: "if(i==5)",
    choice3: "if(i==5)then",
    choice4: "if i==5 then",
    answer: 2
},
{
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<js></js>",
    choice2: "<javascript></javascript>",
    choice3: "<script></script>",
    choice4: "<scripting>",
    answer: 2
},
{
    question: "How does a WHILE loop start?",
    choice1: "while(i <= 0)",
    choice2: "while(i <= 0 i++)",
    choice3: "while i <= 0",
    choice4: "while (i++ i <= 0)",
    answer: 0
}];

//Start Section
let start = document.querySelector("#start");

//guide Section
var person = prompt("Please enter your name:", "Anon");
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let saveScore = document.querySelector("#saveScore");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (multipleChoiceQuestion)
let choice_question = document.querySelectorAll(".choice_question");


let index = 0;
let timer = 0;
let interval = 0;

//total points
let correct = 0;

//store Answer Value
let UserAns = undefined;

//what happens when 'Start' is clicked
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//what happen when 'Exit' is clicked
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 0) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer--;
        time.innerText = timer;
    }
}

//setInterval(countDown,1000);

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = multipleChoiceQuestion[index].question;
    option1.innerText = multipleChoiceQuestion[index].choice1;
    option2.innerText = multipleChoiceQuestion[index].choice2;
    option3.innerText = multipleChoiceQuestion[index].choice3;
    option4.innerText = multipleChoiceQuestion[index].choice4;

    //    timer start
    timer = 20;
}

loadData();

//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    remove all classes when continue is clicked

    choice_question.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} Out Of ${multipleChoiceQuestion.length} Questions`;
});

choice_question.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === multipleChoiceQuestion[index].answer) {
            correct++;
        } else {
            correct += 0;
        }
        //stop Counter
        clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_question[i].classList.add("disabled");
        }
    })
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then multipleChoiceQuestion.length
    if (index !== multipleChoiceQuestion.length - 1) {
        index++;
        choice_question.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} Out Of ${multipleChoiceQuestion.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //when Quiz Question Complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `${person} You Got ${correct} Out Of ${multipleChoiceQuestion.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_question[i].classList.remove("disabled");
    }
})

//save score
saveScore.addEventListener("click", function (event){ 
    event.preventDefault();
        var name = person
        var score = correct

        console.log(name, score)

        var userObj = {
            name: name,
            score: score,
        }
        highScores.push(userObj)
localStorage.setItem("highScores", JSON.stringify(highScores));
    start.style.display = "block";
    result.style.display = "none";
});

//what happens when restart is clicked
startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
});
