
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

export const computeSum = (data) => {
    console.log("-------- START EXERCICE 5 Part 1-------");
    const lines = data.trim().split("\n");

    let order = new Map();
    let instructions = new Array();
    lines.forEach(line => {
        
        if(line.includes('|')){
            const array = line.trim().split('|').map(Number);
            if(order.has(array[0])){
                order.get(array[0]).push(array[1]);
            }else{
                order.set(array[0],[array[1]]);
            }

        }
        else{
            const list = line.trim().split(',').map(Number);
            if(list.length > 0){
                instructions.push(list);
            }
        }
    });

    console.log('order:', order);
    console.log('instructions:', instructions);


    const result = instructions
    .filter((values)=> isValid(values,order))
    .reduce((acc, cur) => acc + middleVal(cur), 0);

    console.log('result:', result);
    return result;

}