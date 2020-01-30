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

    alert(totalLiterals);

    alert(totalLiteralsCount / countOfGroups + " == " + expectedCountOfLiteralsPerGroup + " (expected)");
}