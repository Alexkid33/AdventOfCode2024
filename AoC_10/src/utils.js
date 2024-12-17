
const topoArray = [];

function findNextHeights(height,pathSet) {
    console.log('==> findNextHeights:', height)
    const {val, x:xPosid, y:yPosId} = JSON.parse(height);

    const nextVal = val+1;
    const left = xPosid-1 >=0 ? topoArray[yPosId][xPosid-1] : null;
    const right = xPosid+1 <topoArray[0].length ? topoArray[yPosId][xPosid+1] : null;
    const bottom = yPosId+1 <topoArray.length ? topoArray[yPosId+1][xPosid] : null;
    const top = yPosId-1 >= 0 ? topoArray[yPosId-1][xPosid] : null;

    if(nextVal > 0 && nextVal <10){
        if(left && left === nextVal){
            pathSet.add(JSON.stringify({
                val:nextVal,
                x: xPosid-1,
                y: yPosId
            }))    
        }
        if(right && right === nextVal){
            pathSet.add(JSON.stringify({
                val:nextVal,
                x: xPosid+1,
                y: yPosId
            })    )
        }
        if(top && top === nextVal){
            pathSet.add(JSON.stringify({
                val:nextVal,
                x: xPosid,
                y: yPosId-1
            })    )
        }
        if(bottom && bottom === nextVal){
            pathSet.add(JSON.stringify({
                val:nextVal,
                x: xPosid,
                y: yPosId+1
            }) )   
        }
    }

    return pathSet

}

function findNeighbors(path) {
    console.log('==> findNeighbors')
    const lastHeights = path.slice(-1)[0]
    const pathSet = new Set();
    lastHeights.forEach((height) => {
        findNextHeights(height,pathSet)        
    })
    if(pathSet.size === 0){
        return null
    }
    path.push(pathSet)
    return path
}
    


function fillMap(yPosArray, yPosId){
    yPosArray.map((xPos, xPosid) => {
        if(xPos === 0){
            const count = 0;
            const path = [];
            let initialTrailhead = {
                val:xPos,
                x: xPosid,
                y: yPosId
            }

            console.log('initialTrailhead:',initialTrailhead)
            const initSet = new Set();
            initSet.add(JSON.stringify(initialTrailhead))
            path.push(initSet);
            let isPathValid = true;
            while(isPathValid){
                if(findNeighbors(path) === null){
                    isPathValid = false;
                }
                console.log('path:', path)

            }
            if(path.length === 10){
                const currentScore = path.slice(-1)[0].size
                console.log('current Score : ',currentScore)
                totalCount = totalCount + currentScore;    
            }

        }

    });
}
let totalCount = 0;
export const computeSum = (data) => {
    console.log("-------- START EXERCICE 10 Part 1-------");

    const lines = data.trim().split("\n");

    lines.forEach(line => {
        const array = line.trim().split('').map(Number);
        topoArray.push(array);
    });
    console.log(topoArray);
    topoArray.map((x,i) => fillMap(x,i))

    return totalCount

}