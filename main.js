/////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнена студенткой группы 721702 БГУИР Стрижич Анжелика Олеговна
// Файл содержит функции парсинга строки для проверки формулы СКНФ и функции обработки тестовых заданий
// 05.02.2020

var checkingMessages = [ 
    "this function is in principal conjuctive normal form", // 0
    "invalid symbols", // 1
    "formula has groups divided by '|'", // 2
    "not all of subgroups have equal count of variables", // 3
    "formula contains equal elementary disjunctions", // 4
    "formula must end with ')' followed by variables", // 5
    "all symbols must be divided by '|' or '&' or end with ')'", // 6
    "formula must start with '(' and variables for next", // 7
    "some groups have extra (different from other groups sets) variables", // 8
    "all of binary operations have to be braced", // 9
    "all of negations have to be braced", // 10
    "enter formula", // 11
];

function checkFormula(formula) {
    if (!formula) {
        return 11;
    }

    if (formula.match(/([^A-Z()|&!~]|->)/)) {
        return 1;
    }

    // if (!formula.match(/[A-Z)]\\)$/)) {
    //     return 5;
    // }

    if (formula.match(/[A-Z][^|&)]/)) {
        return 6;
    }

    // if (!formula.match(new RegExp('^\\([!A-Z]'))) {
    //     return 7;
    // }

    if (formula.match(/[^()].*[&|].*[^)]/)) {
        return 9;
    }

    if (formula.match(/[^(]!.*[^)]/)) {
        return 10;
    }

    formula = formula.replace(/\((![A-Z])\)/g, '\$1');

    while (formula.match(/(\(+))\((!?[A-Z]([&|]|->)!?[A-Z])\)/g)) {
        formula = formula.replace(/(\(+)\((!?[A-Z]([&|]|->)!?[A-Z])\)([|&]|->)/g, '\$1\$2\$4');
        //formula = formula.replace(/(?<=[&|]|->)\(((!?.*)([&|]|->)(!?.*))\)(?=\)+)/g, '\$2');
    }
    console.log(formula);
    

    let groups = formula
        .split(/\([^()]*\)/)
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

            let iLiteralsCopy = [];
            let jLiteralsCopy = [];

            literalGroups[i].forEach(value => iLiteralsCopy.push(value.replace('!', '')));
            literalGroups[j].forEach(value => jLiteralsCopy.push(value.replace('!', '')));

            if (!compareArrays(iLiteralsCopy, jLiteralsCopy)) {
                return 8;
            }
        }
    }

    return 0;
}

function check() {
    let messageText = document.getElementById('messageText');
    let messageCode = checkFormula(document.getElementById('formulaInput').value);
    messageText.innerHTML = checkingMessages[messageCode];
    messageText.style.color = (messageCode == 0 ? '#b9fdc5' : '#eebebe');
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
var countOfQuestions = 10;
var currentQuestionIndex = 1;
var correctAnswers = 0;

renderQuestion();
refreshAnswers();

var confirmButton = document.getElementById('confirmButton');
var nextButton = document.getElementById('nextButton');
var questSection = document.getElementById('questSection');
var resultSection = document.getElementById('resultSection');

nextButton.style.display = 'none';
resultSection.style.display = 'none';

function confirm() {
    let currentAnswerElement = document.getElementById(currentQuestion.answer.toString());
    let isCorrectAnswered = currentAnswerElement.checked;
    highlight(
        isCorrectAnswered ? currentQuestion.answer.toString() : (!currentQuestion.answer).toString(),
        isCorrectAnswered ? 'greenyellow' : 'red'
        );

    if (isCorrectAnswered) {
        correctAnswers++;
    }

    confirmButton.style.display = 'none'; 
    nextButton.style.display = 'flex';
}

function next() {
    ++currentQuestionIndex;
    if (currentQuestionIndex === countOfQuestions) {
        document.getElementById('score').innerHTML = 10 * correctAnswers / countOfQuestions;

        questSection.style.display = 'none';
        resultSection.style.display = 'flex';
        document.
        return;
    }

    currentQuestion = generateQuestion();

    renderQuestion();
    refreshAnswers();

    confirmButton.style.display = 'flex';
    nextButton.style.display = 'none';
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
    document.getElementById('formula').innerHTML = currentQuestion.formula;
}

function refreshAnswers() {
    document.getElementById(currentQuestion.answer.toString() + 'Label').style.color = 'black';
    document.getElementById((!currentQuestion.answer).toString() + 'Label').style.color = 'black';
    document.getElementById(currentQuestion.answer.toString()).checked = false;
    document.getElementById((!currentQuestion.answer).toString()).checked = false;
}

function highlight(answerId, color) {
    let answerElement = document.getElementById(answerId + 'Label');
    answerElement.style.color = color;
}