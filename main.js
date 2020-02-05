var checkingMessages = [ 
    "this function is in principal conjuctive normal form",
    "symbols must be from A to Z", 
    "formula has groups divided by '|'", 
    "not all of subgroups have equal count of variables", 
    "formula contains equal elementary disjunctions"];

function checkFormula(formula) {
    if (formula.match(new RegExp('[^A-Z()|&!]'))) {
        return 1;
    }

    // if (!formula.match(new RegExp('^(\((!?[A-Z](\|(!?[A-Z]))*)\))(\&(\((!?[A-Z](\|(!?[A-Z]))*)\)))*$'))) {
    //     alert("invalid syntax");
    //     return;
    // }

    let groups = formula
        .split(new RegExp('\([^()]*\)'))
        .filter(value => value && value !== ")" && value !== "(" && value !== "&");

    if (groups.indexOf('|') !== -1) {
        return 2;
    }

    let literalGroups = [];

    groups.forEach(value => {
        let literals = value.split('|').filter(value => value && value !== "|");

        literalGroups.push(literals);
    });

    for (i = 0; i < literalGroups.length - 1; i++) {
        for (j = i + 1; j < literalGroups.length; j++) {
            if (literalGroups[i].length !== literalGroups[j].length) {
                return 3;
            }
            
            if (compareArrays(literalGroups[i], literalGroups[j])) {
                return 4;
            }
        }
    }

    return 0;
}

function check() {
    let messageCode = checkFormula(document.getElementById('formula').value);
    alert(checkingMessages[messageCode]);
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

class Question {
    constructor(formula, answer) {
        this.formula = formula;
        this.answer = answer;
    }
}

var variablesCodes = [ 'A', 'B', 'C', 'D' ];

var currentQuestion = generateQuestion();
var countOfQuestions = getRandomInt(10);
var currentQuestionIndex = 1;
var correctAnswers = 0;

renderQuestion();
refreshAnswers();

var form = document.getElementById('answer');
var confirmButton = document.getElementById('confirmButton');
var nextButton = document.getElementById('nextButton');

function confirm() {

    let currentAnswerElement = document.getElementById(currentQuestion.answer.toString());
    let isCorrectAnswered = currentAnswerElement.checked;
    highlight(isCorrectAnswered ? currentQuestion.answer.toString() : (!currentQuestion.answer).toString(), isCorrectAnswered ? 'greenyellow'  : 'red');

    if (isCorrectAnswered) {
        correctAnswers++;
    }

    confirmButton.hidden = true; 
    nextButton.hidden = false;   
}

function next() {

    

    currentQuestionIndex = ++currentQuestionIndex;
    if (currentQuestionIndex === countOfQuestions) {
        // show results, end quest

        return;
    }

    currentQuestion = generateQuestion();

    renderQuestion();
    refreshAnswers();

    confirmButton.hidden = false;
    nextButton.hidden = true;
}

function generateQuestion() {
    let countOfArgs = getRandomInt(3);
    let countOfGroups = getRandomInt(Math.pow(2, countOfArgs));

    let formula = generateFormula(countOfGroups, countOfArgs);
    let answer = checkFormula(formula) === 0 ? true : false;

    return new Question(formula, answer);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function generateFormula(countOfGroups, countOfArgs) {
    let formula = '';

    for (i = 0; i < countOfGroups; i++) {
        let group = '(';

        let countOfArgsInParticualrGroup = countOfArgs - getRandomInt(countOfArgs) + 1;
        for (j = 0; j < countOfArgsInParticualrGroup; j++) {
            let isNegative = (Math.random() >= 0.5);
            group += (isNegative ? '!' : '') + variablesCodes[j];
            if (j < countOfArgsInParticualrGroup - 1) {
                group += ((Math.random() >= 0.1) ? '|' : '&');
            }
        }

        group += ')';
        formula += group;
        if (i < countOfGroups - 1) {
            formula += ((Math.random() >= 0.1) ? '&' : '|');
        }
    }

    return formula;
}

function renderQuestion() {
    console.log(currentQuestion.formula);
    document.getElementById('formula').innerHTML = currentQuestion.formula;
}

function refreshAnswers() {
    // once render, on next() update radiobuttons state
}

function highlight(answerId, color) {
    let answerElement = document.getElementById(answerId + 'Label');
    answerElement.style.color = color;
}