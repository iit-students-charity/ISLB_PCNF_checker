function check() {
    let formula = document.getElementById('formula').value;

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