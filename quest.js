import './main';

class Quest {
    constructor(countOfQuestions) {
        this.questions = generateQuestions(countOfQuestions);
        this.currentQuestionIndex = 0;
    }

    nextQuestion() {
        currentQuestion = this.questions[++currentQuestionIndex];
    }

    addQuestion(question) {
        this.questions.push(question);
    }
}

class Question {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

var quest = new Quest(getRandomInt(10));
var currentQuestion = new Question();

function next() {
    highlightAnswer();
    await new Promise(resolve => setTimeout(resolve, 5000));

    let answer = document.getElementById('answer').value;
    if (answer !== currentQuestion.answer) {
        highlightError();
    }
    
    quest.nextQuestion();
    refreshAnswers();
}

function generateQuestions(countOfQuestions) {
    let countOfGroups;
    let countOfArgs;
    let isConjuctive;

    for (i = 0; i < countOfQuestions; i++) {
        countOfGroups = getRandomInt(5);
        countOfArgs = getRandomInt(4);
        isConjuctive = (Math.random() >= 0.5);

        //generate formula......
        //answer......
        //generate text......

        var question = new Question(
            generateFormula(countOfGroups, countOfArgs, isConjuctive), 
            isConjuctive
        );
        quest.addQuestion(question);
        renderQuestion(question);
    }
    
    return questions;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function generateFormula(countOfGroups, countOfArgs, isConjuctive) {
    // npm install randexp
    // generate formula based on regex & input parameters
    let formula = "adfsdasdad";

    return formula;
}

// both of ans & que must be rendered on the page start
function renderQuestion(question) {
    // add dom elements
}

function refreshAnswers() {
    // once render, on next() update radiobuttons state
}

function highlightAnswer() {
    let answer = document.getElementById('answer').value;
    
}

function highlightError() {
    
}