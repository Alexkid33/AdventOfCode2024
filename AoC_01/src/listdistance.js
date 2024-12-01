
const getTables = (lines) => {
    const column1 = [];
    const column2 = [];

    lines.forEach(element => {
        const [col1, col2] = element.trim().split(/\s+/);
        column1.push(parseInt(col1));
        column2.push(parseInt(col2));
    });

    return {column1,column2};

}
function add(accumulator, a){
    return accumulator + a;
}

export const computeTotalDistance = (data) => {
    console.log("-------- START EXERCICE 1 Part 1-------");
    const lines = data.trim().split("\n");
    console.log(lines);
    const {column1,column2} = getTables(lines);
    const sorted1 = column1.sort((a,b) => a - b);
    const sorted2 = column2.sort((a,b) => a - b);
    const zipped = sorted1.map((x, i) => Math.abs(x - sorted2[i]));
    const sum = zipped.reduce(add, 0);


    console.log(sorted1);
    console.log(sorted2);
    console.log(zipped);
    return sum;
}

function similarity(x, arr){
    const initialValue = 0;
    const sim = arr.reduce((accumulator, currentValue) => {
        return currentValue===x ? accumulator + 1: accumulator }, initialValue,
    );
    return sim;
}

export const computeSimilarity = (data) => {
    console.log("-------- START EXERCICE 1 Part 2-------");
    const lines = data.trim().split("\n");
    console.log(lines);
    const {column1,column2} = getTables(lines);
    const zipped = column1.map((x) => x*similarity(x,column2));
    console.log(zipped);
    const similaritySum = zipped.reduce(add, 0);
    console.log(similaritySum);

    return similaritySum
}
