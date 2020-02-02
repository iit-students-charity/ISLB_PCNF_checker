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

class Question {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

var currentQuestion = new Question(null, false);
var countOfQuestions = getRandomInt(10);
var currentQuestionIndex = 0;

renderQuestion();
refreshAnswers();

var form = document.getElementById('answer');

function next() {
    highlightAnswer();

    let answer = document.getElementById(currentQuestion.answer.toString()).value; // to bool
    if (answer !== currentQuestion.answer) {
        highlightError();
    }

    currentQuestionIndex = ++currentQuestionIndex;
    if (currentQuestionIndex === countOfQuestions) {
        // show results, end quest

        return;
    }

    currentQuestion = generateQuestion();

    renderQuestion();
    refreshAnswers();
}

function generateQuestion() {
    let countOfGroups = getRandomInt(5);
    let countOfArgs = getRandomInt(4);
    let isConjuctive = (Math.random() >= 0.5);

    let formula = generateFormula(countOfGroups, countOfArgs, isConjuctive);
    let answer = check(formula);

    return new Question(formula, answer);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function generateFormula(countOfGroups, countOfArgs, isConjuctive) {
    // npm install randexp
    // generate formula based on regex & input parameters
    let formula = "ASD";

    return formula;
}

function renderQuestion() {
    document.getElementById('formula').innerHTML = currentQuestion.formula;
}

function refreshAnswers() {
    // once render, on next() update radiobuttons state
}

function highlightAnswer() {
    let answerElement = document.getElementById(currentQuestion.answer.toString());
    
}

function highlightError() {

}