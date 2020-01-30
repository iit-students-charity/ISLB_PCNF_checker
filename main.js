class Literal {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

const LITERAL_TYPE = [ "sign", "var", "bracket" ]

function check() {
    let formula = document.getElementById('formula').value;
    let groups = formula
        .split(new RegExp('\([^()]*\)'))
        .filter(value => value && value !== ")" && value !== "(" && value !== "*");

    let countOfGroups = groups.length;
    let expectedCountOfLiteralsPerGroup = countOfGroups - 1;

    let totalLiteralsCount = 0;
    let totalLiterals = [];

    groups.forEach(value => {
        let literals = value.split('+').filter(value => value && value !== "+");
        totalLiterals.push(...literals);
        totalLiteralsCount += literals.length;
    });

    let uniqueLiterals = [];

    totalLiterals.forEach(value => {
        if (uniqueLiterals.indexOf(value.replace('!', "")) === -1) {
            uniqueLiterals.push(value);
        }
    });

    if (uniqueLiterals.length == expectedCountOfLiteralsPerGroup) {
        alert("This formula is not in principal conjunctive normal form");
    } else {
        alert("This formula is in principal conjunctive normal form");        
    }
}