const findHorizontal = (array) => {
    const XMAS = /(XMAS)/g;
    const SAMX = /(SAMX)/g;

    let count = 0;
    array.map( (line) => {
        count += [...line.join('').matchAll(XMAS)].length;
        count += [...line.join('').matchAll(SAMX)].length;
    })
    return count;
}

const findDiagonal = (array, nbRow,nbCol) => {
    let count = 0;
    for (let i = 0; i < nbRow-3; i++) {
        for (let j = 0; j < nbCol-3; j++) {
            const word = array[i][j]+array[i+1][j+1]+array[i+2][j+2]+array[i+3][j+3];
            if(word === "XMAS" || word === "SAMX"){
                count += 1;
            }
            
        }
    }

    for (let i = 0; i < nbRow-3; i++) {
        for (let j = nbCol-1; j > 2; j--) {
            const word = array[i][j]+array[i+1][j-1]+array[i+2][j-2]+array[i+3][j-3];
            if(word === "XMAS" || word === "SAMX"){
                count += 1;
            }
        }
    }
    return count;
}

const findDiagonal2 = (array, nbRow,nbCol) => {
    let count = 0;
    for (let i = 0; i < nbRow-2; i++) {
        for (let j = 0; j < nbCol-2; j++) {
            const word1 = array[i][j]+array[i+1][j+1]+array[i+2][j+2];
            const word2 = array[i+2][j]+array[i+1][j+1]+array[i][j+2];
            if((word1 === "MAS" || word1 === "SAM") && (word2 === "MAS" || word2 === "SAM")){
                count += 1;;
            }
            
        }
    }

    return count;
}

export const computeXmas = (data) => {
    console.log("-------- START EXERCICE 4 Part 1-------");
    const lines = data.trim().split("\n");
    //console.log(lines);
    const charArray = [];
    
    let result = 0;

    lines.forEach(line => {
        const array = line.trim().split('');
        charArray.push(array);
    }
    );
    const nbRow = charArray.length;
    const nbCol = charArray[0].length;

    // Find horizontal
    //console.log(charArray);
    const val1 = findHorizontal(charArray);

    // Transpose and Find horizontal
    const transposedCharArray = charArray[0].map((_, colIndex) => charArray.map(row => row[colIndex]));
    //console.log(transposedCharArray);
    const val2 = findHorizontal(transposedCharArray);

    // Diagonal 
    const val3 = findDiagonal(charArray,nbRow,nbCol);

    result += val1 + val2 + val3;
    return result;
}
export const computeXmas2 = (data) => {
    console.log("-------- START EXERCICE 4 Part 2-------");
    const lines = data.trim().split("\n");
    //console.log(lines);
    const charArray = [];
    
    let result = 0;

    lines.forEach(line => {
        const array = line.trim().split('');
        charArray.push(array);
    }
    );
    const nbRow = charArray.length;
    const nbCol = charArray[0].length;

    // Diagonal 
    const val3 = findDiagonal2(charArray,nbRow,nbCol);
    result = val3;

    return result;

}