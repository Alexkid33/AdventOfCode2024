
function decodeInputCheckum(data){
    const dataLen = data.length;
    let i = 0;
    const fileBlocks = [];
    const freeSpace = [];
    while( i < dataLen){
        fileBlocks.push(data[i]);
        i++;    
        if(i < dataLen){
            freeSpace.push(data[i]);
        }
        i++;    
    }
    console.log('fileBlocks: ', fileBlocks)
    console.log('freeSpace: ', freeSpace)

    let rearrangedDataArray = [];
    for (let index = 0; index < fileBlocks.length; index++) {
        for (let j = 0; j < fileBlocks[index]; j++) {
            rearrangedDataArray.push(String(index));
        }

        if(index < freeSpace.length){
            for (let k = 0; k < freeSpace[index]; k++) {
                rearrangedDataArray.push(".");
            }
        }       
    }

    console.log('rearrangedDataArray: ', rearrangedDataArray)
    const nbPoints = rearrangedDataArray.filter((x) => x === '.').length;
    const rearrangedDataLength = rearrangedDataArray.length;

    let continueProcess = true;
    while(continueProcess){
       const firstPointId = rearrangedDataArray.indexOf(".");
       const lastFileBlock = rearrangedDataArray.findLastIndex((element) => element !== '.');
       if(firstPointId > (rearrangedDataLength-nbPoints-1)){
            continueProcess = false;
            break;
       }else{
           let tmp = rearrangedDataArray[lastFileBlock];
            rearrangedDataArray[firstPointId] = tmp;
            rearrangedDataArray[lastFileBlock] = "."; 
       }


    }

    const compactedData =rearrangedDataArray.join('');

    console.log('compactedData: ', compactedData)
    const compactedDataArray = rearrangedDataArray.slice(0,rearrangedDataLength-nbPoints)
    console.log('compactedDataArray: ', compactedDataArray)

    const checksum = compactedDataArray.reduce((acc,cur, i) => acc += Number(cur)*i, 0);
    console.log('checksum: ', checksum)
    return checksum

}

export const computeChecksum = (data) => {
    console.log("-------- START EXERCICE 9 Part 1-------");

    const input = data.trim();
    //console.log('input: ', input)

    return decodeInputCheckum(input)

}