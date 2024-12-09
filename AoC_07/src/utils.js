const add = (a,b) => a+b;
const mult = (a,b) => a*b;
const concat = (a,b) => Number(a + "" + b);

const operations = [add, mult,concat];
function generateCombinations(symbols, length) {
    const result = [];

    function helper(currentCombination, depth) {
        //console.log(`Depth: ${depth}, Combination: ${currentCombination.join(',')}`);
        
        if (currentCombination.length === length) {
            result.push([...currentCombination]);
            return;
        }

        for (const symbol of symbols) {
            currentCombination.push(symbol);
            helper(currentCombination, depth + 1); // Increment depth
            currentCombination.pop();
        }
    }

    helper([], 0); // Start with depth 0
    return result;
}

function applyOp(values, operations) {
    //console.log("operations: ", operations)

    const appliedOp = values.reduce((acc,cur,i,arr) => {
        if(i === 0){
            return add(acc,cur);
        }else{
            const op = operations[i-1];
            return op(acc,cur);
        }
    },0);
    //console.log(" appliedOp = ", appliedOp)
    return appliedOp;
}

const findEvaluation = (res, values) => {
    const operationsList = generateCombinations(operations,values.length-1);
    //console.log('operationsList:',operationsList);
    const evalInput = operationsList.map((ops) => applyOp(values,ops)).filter((val) => val === res);
    //console.log(evalInput);
    return evalInput;

}

export const calibrationResult = (data) => {
    console.log("-------- START EXERCICE 7 Part 1-------");
    const lines = data.trim().split("\n");
    //console.log(lines);
    const charArray = [];
    
    let result = 0;
    const results = [];
    const inputs = []

    lines.forEach(line => {
        const array = line.trim().split(':');
        results.push(Number(array[0]));
        inputs.push(array[1].trim().split(' ').map(Number));
    });
    console.log("results: ",results);
    console.log("inputs: ",inputs);

    for (let index = 0; index < results.length; index++) {
        const evaluation = findEvaluation(results[index],inputs[index] );
        if(evaluation.length > 0){
            result += evaluation[0];
        }
    }

    // 
    return result;

}