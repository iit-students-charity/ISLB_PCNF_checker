var checkingMessages = [ 
    "this function is in principal conjuctive normal form",
    "symbols must be from A to Z", 
    "formula has groups divided by '|'", 
    "not all of subgroups have equal count of variables", 
    "formula contains equal elementary disjunctions"];

function check(formula) {
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
    let messageCode = check(document.getElementById('formula').value);
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
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

var variablesCodes = [ 'A', 'B', 'C', 'D' ];

var currentQuestion = generateQuestion();
var countOfQuestions = getRandomInt(10);
var currentQuestionIndex = 1;

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
    let countOfArgs = getRandomInt(3);
    let countOfGroups = getRandomInt(Math.pow(2, countOfArgs));

    let formula = generateFormula(countOfGroups, countOfArgs);
    let answer = check(formula);

    return new Question(formula, answer);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function generateFormula(countOfGroups, countOfArgs) {
    let formula = '';

    console.log("groups, args " + countOfGroups + " " + countOfArgs);

    for (i = 0; i < countOfGroups; i++) {
        let group = '(';
        console.log(i);

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
    console.log(formula);

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