function findNextHeights(height,pathSet) {
    //console.log('==> findNextHeights:', height)
    let hasNextPath = false;
    const {val, x:xPosid, y:yPosId} = JSON.parse(height);

    const nextVal = val+1;
    const left = xPosid-1 >=0 ? topoArray[yPosId][xPosid-1] : null;
    const right = xPosid+1 <topoArray[0].length ? topoArray[yPosId][xPosid+1] : null;
    const bottom = yPosId+1 <topoArray.length ? topoArray[yPosId+1][xPosid] : null;
    const top = yPosId-1 >= 0 ? topoArray[yPosId-1][xPosid] : null;

    if(nextVal > 0 && nextVal <10){
        if(left && left === nextVal){
            hasNextPath = true;
            pathSet.push(JSON.stringify({
                val:nextVal,
                x: xPosid-1,
                y: yPosId
            }))    
        }
        if(right && right === nextVal){
            hasNextPath = true;
            pathSet.push(JSON.stringify({
                val:nextVal,
                x: xPosid+1,
                y: yPosId
            })    )
        }
        if(top && top === nextVal){
            hasNextPath = true;
            pathSet.push(JSON.stringify({
                val:nextVal,
                x: xPosid,
                y: yPosId-1
            })    )
        }
        if(bottom && bottom === nextVal){
            hasNextPath = true;
            pathSet.push(JSON.stringify({
                val:nextVal,
                x: xPosid,
                y: yPosId+1
            }) )   
        }
    }else{
        hasNextPath = true;
    }

    return hasNextPath;

}

function findNeighbors(path,pathId) {
    const path0 = path[pathId]
    const pathSet = []
    path0.forEach((height) => {
        findNextHeights(height,pathSet)
    })
    if(pathSet.length === 0){
        return null
    }
    path.push(pathSet)
    return path
}
    


function fillMap(yPosArray, yPosId){
    yPosArray.map((xPos, xPosid) => {
        if(xPos === 0){
            const path = [];
            let initialTrailhead = {
                val:xPos,
                x: xPosid,
                y: yPosId
            }

            console.log('initialTrailhead:',initialTrailhead)
            const initSet = [];
            initSet.push(JSON.stringify(initialTrailhead))
            path.push(initSet);
            let isPathValid = true;
            let pathId = 0;
            while(isPathValid){
                if(findNeighbors(path,pathId) === null){
                    isPathValid = false;
                }else{
                    console.log('path:', path)
                    pathId++;
                }

            }
            if(path.length === 10){
                //part 2
                let currentNote = path.slice(-1)[0].length
                console.log('current Note : ',currentNote)
                totalNote = totalNote + currentNote;
            }

        }

    });
}

const topoArray = [];
let totalCount = 0;
let totalNote = 0;
export const computeSum = (data) => {
    console.log("-------- START EXERCICE 10 Part 2-------");
    totalCount = 0;
    totalNote = 0;
    const lines = data.trim().split("\n");

    lines.forEach(line => {
        const array = line.trim().split('').map(Number);
        topoArray.push(array);
    });
    console.log(topoArray);
    topoArray.map((x,i) => fillMap(x,i))

    // part 2:
    return totalNote

}