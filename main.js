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
        .filter(value => value && value !== ")" && value !== "(" && value !== "&");

    let countOfGroups = groups.length;
    console.log(countOfGroups + " " + groups);
    let expectedCountOfLiteralsPerGroup = countOfGroups - 1;

    let totalLiterals = [];
    let totalLiteralsCount = 0;

    groups.forEach(value => {
        let literals = value.split('|').filter(value => value && value !== "|");
        totalLiterals.push(...literals);
        totalLiteralsCount += literals.length;
    });

    if (totalLiteralsCount / countOfGroups != expectedCountOfLiteralsPerGroup) {
        alert("Formula is not valid (contains syntax errors)");
        console.log(groups)
        return;
    }

    let uniqueLiterals = [];

    totalLiterals.forEach(value => {
        if (uniqueLiterals.indexOf(value.replace('!', "")) === -1) {
            uniqueLiterals.push(value);
        }
    });

    console.log(expectedCountOfLiteralsPerGroup + " " + uniqueLiterals.length)

    if (uniqueLiterals.length == expectedCountOfLiteralsPerGroup) {
        alert("This formula is in principal conjunctive normal form");
    } else {
        alert("This formula is not in principal conjunctive normal form");        
    }
}