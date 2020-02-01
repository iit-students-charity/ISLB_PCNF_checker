function check(formula) {
    if (formula.match(new RegExp('[^A-Z()|&!]'))) {
        alert("Symbols must be from A to Z");
        return;
    }

    let groups = formula
        .split(new RegExp('\([^()]*\)'))
        .filter(value => value && value !== ")" && value !== "(" && value !== "&");

    let literalGroups = [];

    groups.forEach(value => {
        let literals = value.split('|').filter(value => value && value !== "|");

        literalGroups.push(literals);
    });

    for (i = 0; i < literalGroups.length - 1; i++) {
        for (j = i + 1; j < literalGroups.length; j++) {
            if (literalGroups[i].length !== literalGroups[j].length) {
                alert("Not all of subgroups have equal count of variables");
                return;
            }
            
            if (compareArrays(literalGroups[i], literalGroups[j])) {
                alert("Formula contains equal elementary disjunctions");
                return;
            }
        }
    }

    alert("This function is in principal conjuctive normal form");
}

function compareArrays(array1, array2) {
    var i = array1.length;

    while (i--) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}


///////////// quest.js

class Quest {
    constructor(countOfQuestions) {
        this.questions = generateQuestions(countOfQuestions);
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
var currentQuestionIndex = 0;

var form = document.getElementById("answer");

form.addEventListener("submit", function(event) {
  next();
  event.preventDefault();
}, false);


function nextQuestion() {
    currentQuestion = quest.questions[++currentQuestionIndex];
}

function next() {
    highlightAnswer();
    await new Promise(resolve => setTimeout(resolve, 5000));

    let answer = document.getElementById('answer').value;
    if (answer !== currentQuestion.answer) {
        highlightError();
    }
    
    nextQuestion();
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

        formula = generateFormula(countOfGroups, countOfArgs, isConjuctive);
        answer = check(formula);

        var question = new Question(formula, answer);
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
    let answer = document.getElementById(currentQuestion.answer.toString()).value;
    
}

function highlightError() {

}