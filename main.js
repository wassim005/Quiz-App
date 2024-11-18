const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyperlinks and Text Markup Language", correct: "false"},
            {text: "Hyper Text Markup Language", correct: "true"},
            {text: "Hyperlinks Markup Language", correct: "false"},
            {text: "Home Tool Markup Language", correct: "false"}
        ]
    },
    {
        question: "Choose the correct HTML tag for the largest heading",
        answers: [
            {text: "heading", correct: "false"},
            {text: "h6", correct: "false"},
            {text: "head", correct: "false"},
            {text: "h1", correct: "true"}
        ]
    },
    {
        question: "What is the correct HTML tag for inserting a line break?",
        answers: [
            {text: "br", correct: "true"},
            {text: "lb", correct: "false"},
            {text: "b", correct: "false"},
            {text: "span", correct: "false"}
        ]
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        answers: [
            {text: "a url='http://www.eeeee.com' /a", correct: "false"},
            {text: "a name='http://www.eeeee.com' /a", correct: "false"},
            {text: "a href='http://www.eeeee.com' /a", correct: "true"},
            {text: "a http://www.eeeee.com /a", correct: "false"}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Creative Style Sheets", correct: "false"},
            {text: "Cascading Style Sheets", correct: "true"},
            {text: "Computer Style Sheets", correct: "false"},
            {text: "Colorful Style Sheets", correct: "false"}
        ]
    },
    {
        question: "What is the correct HTML for referring to an external style sheet?",
        answers: [
            {text: "stylesheetmystyle.css/stylesheet", correct: "false"},
            {text: "style src='mystyle.css'", correct: "false"},
            {text: "stylesheet src='mystyle.css'/stylesheet", correct: "false"},
            {text: "link rel='stylesheet' type='text/css' href='mystyle.css'", correct: "true"}
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "javascript", correct: "false"},
            {text: "script", correct: "true"},
            {text: "scripting", correct: "false"},
            {text: "js", correct: "false"}
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: [
            {text: "script url='xxx.js'", correct: "false"},
            {text: "script href='xxx.js'", correct: "false"},
            {text: "script src='xxx'", correct: "false"},
            {text: "script src='xxx.js'", correct: "true"}
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: "function:myFunction()", correct: "false"},
            {text: "function myFunction", correct: "false"},
            {text: "function myFunction()", correct: "true"},
            {text: "function = myFunction ()", correct: "false"}
        ]
    },
    {
        question: "Question: Can you guess what will be the output of the code =>   console.log(typeof NaN);",
        answers: [
            {text: "NaN", correct: "false"},
            {text: "number", correct: "true"},
            {text: "null", correct: "false"},
            {text: "indefiend", correct: "false"}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button);
        if (answer.correct === "true") {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length} questions`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})


startQuiz();