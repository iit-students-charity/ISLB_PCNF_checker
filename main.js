function check() {
    let formula = document.getElementById('formula').value;

    if (formula.match(new RegExp('[^A-Z()|&!]'))) {
        alert("Symbols must be from A to Z");
        return;
    }

    let groups = formula
        .split(new RegExp('\([^()]*\)'))
        .filter(value => value && value !== ")" && value !== "(" && value !== "&");

    let countOfGroups = groups.length;
    let expectedCountOfLiteralsPerGroup = countOfGroups - 1;

    let totalLiterals = [];
    let totalLiteralsCount = 0;
    let literalGroups = [];

    groups.forEach(value => {
        let literals = value.split('|').filter(value => value && value !== "|");

        totalLiterals.push(...literals);
        literalGroups.push(literals);

        totalLiteralsCount += literals.length;
    });

    for (i = 0; i < literalGroups.length - 1; i++) {
        for (j = i + 1; j < literalGroups.length; j++) {
            if (compareArrays(literalGroups[i], literalGroups[j])) {
                alert("Formula contains equal elementary disjunctions");
                return;
            }
        }

        if (new Set(literalGroups[i]).size !== expectedCountOfLiteralsPerGroup) {
            alert("Subgroup N" + i + " contains extra/less/equal propositional vaiables");
            return;
        }
    }

    if (totalLiteralsCount / countOfGroups != expectedCountOfLiteralsPerGroup) {
        alert("Formula is not valid (contains syntax errors) or has extra/less subgroups or literals in subgroups");
        return;
    }

    let uniqueLiterals = [];

    totalLiterals.forEach(value => {
        if (uniqueLiterals.indexOf(value.replace('!', "")) === -1) {
            uniqueLiterals.push(value);
        }
    });

    if (uniqueLiterals.length == expectedCountOfLiteralsPerGroup) {
        alert("This formula is in principal conjunctive normal form");
    } else {
        alert("This formula is not in principal conjunctive normal form");        
    }
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