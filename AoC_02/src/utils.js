// function isIncreasing(array,hasDampener) {
//     const lenArray = array.length;
//     let dampenerUsed = false;
//     console.log('isIncreasing');

//     return array.map((_,i) => {
//         if(i+1 < lenArray){
//             const diff = array[i] - array[i+1] ;
//             console.log(diff);
            
//             if(diff < 0 && diff > -4){
//                 return true;
//             }
//             else if(hasDampener && !dampenerUsed){
//                 dampenerUsed = true;
//                 if(i+2 < lenArray){
//                     const diffNext = array[i] - array[i+2];
//                     console.log('diffNext=',diffNext);
//                     if(diffNext < 0 && diffNext > -4){
//                         return true;
//                     }
//                     return false;
//                 }
//                 else if(i+2 === lenArray){
//                     return true;
//                 }
//                 return false;
//             }
//             return false;
//         }
//         return true;
//     }
//     )
//     .reduce((acc,cur) => acc && cur,true);
// }

// function isDecreasing(array,hasDampener) {
//     const lenArray = array.length;
//     let dampenerUsed = false;
//     console.log('isDecreasing');

//     return array.map((_,i) => {
//         if(i+1 < lenArray){
//             const diff = array[i] - array[i+1];
//             console.log(diff);

//             if(diff > 0 && diff < 4){
//                 return true;
//             }
//             else if(hasDampener && !dampenerUsed){
//                 dampenerUsed = true;
//                 if(i+2 < lenArray){
//                     const diffNext = array[i] - array[i+2];
//                     console.log('diffNext=',diffNext);
//                     if(diffNext > 0 && diffNext < 4){
//                         return true;
//                     }
//                     return false;
//                 }
//                 else if(i+2 === lenArray){
//                     return true;
//                 }

//                 return false;
//             }
//             return false;
//         }
//         return true;
//     }
//     )
//     .reduce((acc,cur) => acc && cur,true);
// }


function isIncreasing(array, hasDampener) {
    const arrayLen = array.length;
    let dampenerUsed = false; // Track if the Problem Dampener has been used

    for (let i = 0; i < arrayLen - 1; i++) {
        const diff = array[i] - array[i + 1];
        //console.log('diff:' ,diff)

        // Check if current step satisfies the increasing rule
        if (diff >= 0 || diff <= -4) {
            //console.log('dampenerUsed:' ,dampenerUsed)
            if (hasDampener && !dampenerUsed) {
                dampenerUsed = true;
                if(i > 1){
                    const skipDiffPrevious = array[i-1] - array[i + 1];
                    if (skipDiffPrevious < 0 && skipDiffPrevious > -4)  {
                        i++; // Skip the next element
                        continue;
                    }
                }

                if(i + 2 < arrayLen){
                    // Check if skipping one level makes it valid
                    const skipDiff = array[i] - array[i + 2];
                    const skipDiffNext = array[i+1] - array[i + 2];
                    if ((skipDiff < 0 && skipDiff > -4) || (skipDiffNext < 0 && skipDiffNext > -4)) {
                        i++; // Skip the next element
                        continue;
                    }
                }

                if(i + 2 === arrayLen){
                    continue;
                }

            }
            //console.log('isIncreasing: ',false);
            return false; // Rule broken, even with the dampener
        }
    }
    //console.log('isIncreasing: ',true);
    return true; // All checks passed
}

function isDecreasing(array, hasDampener) {
    const arrayLen = array.length;
    let dampenerUsed = false; // Track if the Problem Dampener has been used

    for (let i = 0; i < arrayLen - 1; i++) {
        const diff = array[i] - array[i + 1];
        //console.log('diff:' ,diff)

        // Check if current step satisfies the decreasing rule
        if (diff <= 0 || diff >= 4) {
            if (hasDampener && !dampenerUsed) {
                dampenerUsed = true;
                if(i > 1){
                    const skipDiffPrevious = array[i-1] - array[i + 1];
                    if (skipDiffPrevious > 0 && skipDiffPrevious < 4)  {
                        i++; // Skip the next element
                        continue;
                    }
                }

                if(i + 2 < arrayLen){
                    // Check if skipping one level makes it valid
                    const skipDiff = array[i] - array[i + 2];
                    const skipDiffNext = array[i+1] - array[i + 2];
                    //console.log('skipDiff:' ,skipDiff)
                    if ((skipDiff > 0 && skipDiff < 4) || (skipDiffNext > 0 && skipDiffNext < 4)){
                        i++; // Skip the next element
                        continue;
                    }
                }
                else if(i + 2 === arrayLen){
                    continue;
                }
            }
            //console.log('isDecreasing: ',false);
            return false; // Rule broken, even with the dampener
        }
    }
    //console.log('isDecreasing: ',true);
    return true; // All checks passed
}


export const computeSafeReports = (data) => {
    console.log("-------- START EXERCICE 2 Part 1-------");
    const lines = data.trim().split("\n");
    console.log(lines);
    
    let nbValid = 0;
    lines.forEach(line => {
        const array = line.trim().split(' ').map(Number);
        console.log(array);
        if(isIncreasing(array,false) || isDecreasing(array,false)){
            nbValid+=1;
        }
    }
    );
    return nbValid;
}

export const computeSafeReportsDampener = (data) => {
    console.log("-------- START EXERCICE 2 Part 2-------");
    const lines = data.trim().split("\n");
    //console.log(lines);
    
    let nbValid = 0;
    lines.forEach(line => {
        const array = line.trim().split(' ').map(Number);
        if(isIncreasing(array,true) || isDecreasing(array,true)){
            nbValid+=1;
        }else{
            console.log(array);
        }
    }
    );
    return nbValid;
}
