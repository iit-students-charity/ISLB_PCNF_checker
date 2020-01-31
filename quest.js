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
    let answer = document.getElementById('answer').value;
    if (answer !== currentQuestion.answer) {
        // ....
    }
    
    quest.nextQuestion();
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

        //quest.addQuestion(new Question(text, isConjuctive));
        var question = new Question("sdfsdfdsffs", isConjuctive);
        quest.addQuestion(new Question(question));
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

    return formula;
}

// both of ans & que must be rendered on the page start
function renderQuestion(question) {
    // add dom elements
}

function refreshAnswers() {
    // once render, on next() update radiobuttons state
}