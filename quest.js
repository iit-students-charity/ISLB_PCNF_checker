class Quest {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    nextQuestion() {
        currentQuestion = this.questions[++currentQuestionIndex];
    }
}

class Question {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

var quest = new Quest(generateQuestions());
var currentQuestion = new Question();

function next() {
    let answer = document.getElementById('answer').value;
    if (answer !== currentQuestion.answer) {
        // ....

    }
    
    quest.nextQuestion();
}

function generateQuestions() {
    
    return questions;
}