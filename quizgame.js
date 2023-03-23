const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: 'What is the capital of India',
        choice1: 'Delhi',
        choice2: 'Chennai',
        choice3: 'Mumbai',
        choice4: 'Kolkatta',
        answer: 1,
    },
    {
        question:
            "Who was the founder of the Apple Inc. ??",
        choice1: "Bill Gates",
        choice2: "Mark Zukerberg",
        choice3: "Steve Jobs",
        choice4: "Elon Musk",
        answer: 3,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
        if(availableQuesions.length == 0 || questionCounter >= MAX_QUESTIONS){
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign("./end.html");
        }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    
    const questionIndex =  Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number =  choice.dataset['number'];
        choice.innerText = currentQuestion["choice" +  number];

});

    availableQuesions.splice(questionIndex, 1);
    console.log(availableQuesions);
    acceptingAnswers = true;
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply);   
        
        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);

            getNewQuestion();
        }, 1500);
        


    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;

}

startGame();







