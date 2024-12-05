
function isValid(values, order) {
    for (let index = values.length -1; index > 0; index--) {
        const element = values[index];
        const precedentElement = values[index-1];
        if(order.has(precedentElement)){
            if(order.get(precedentElement).includes(element)){
                continue;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
        
    }
    return true;
}

function middleVal(arr){
    const midId = (arr.length-1)/2;
    return arr[midId];
}

function fixInstruction(values, order) {
    while(!isValid(values, order)){
        for (let index = 0; index < values.length-1; index++) {
            const element = values[index];
            const nextElement = values[index+1];
            // console.log('index:',index, '/',values.length -1)
            // console.log('element:',element)
            // console.log('nextElement:',nextElement)
    
            if(order.has(element) &&
                order.get(element).includes(nextElement)){
                    // console.log('invalid : newInstr:',values);
                    continue;
    
            }else{
                let tmp = values[index]
                values[index] = values[index+1];
                values[index+1] = tmp;
                //console.log('invalid : newInstr:',values);
    
            }
    
        }
    
    }

    //console.log('newInstr:',values);
    return values;
}

const initData = (lines) => {
    let order = new Map();
    let instructions = new Array();
    lines.forEach(line => {

        if (line.includes('|')) {
            const array = line.trim().split('|').map(Number);
            if (order.has(array[0])) {
                order.get(array[0]).push(array[1]);
            } else {
                order.set(array[0], [array[1]]);
            }

        }
        else {
            const list = line.trim().split(',').map(Number);
            if (list.length > 0) {
                instructions.push(list);
            }
        }
    });

    console.log('order:', order);
    console.log('instructions:', instructions);

    return {order,instructions};
}

export const computeSum = (data) => {
    console.log("-------- START EXERCICE 5 Part 1-------");
    const lines = data.trim().split("\n");
    const {order, instructions} = initData(lines);

    const result = instructions
    .filter((values)=> isValid(values,order))
    .reduce((acc, cur) => acc + middleVal(cur), 0);

    console.log('result:', result);
    return result;

}

export const computeSum2 = (data) => {
    console.log("-------- START EXERCICE 5 Part 2-------");
    const lines = data.trim().split("\n");
    const {order, instructions} = initData(lines);

    const result2 = instructions
    .filter((values)=> !isValid(values,order))
    .map((values)=> fixInstruction(values,order))
    .reduce((acc, cur) => acc + middleVal(cur), 0);

    console.log('result2:', result2);
    return result2;

}