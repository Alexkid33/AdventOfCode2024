let COUNT = 0;
const direction = {
    TOP: "^",
    BOTTOM: "v",
    LEFT: "<",
    RIGHT: ">",
};

const isDirection = (x) => Object.values(direction).includes(x);

const guardPosition = {
    x: 0,
    y: 0,
    direction: direction.TOP,
};

const getDirection = (dir) => direction[{
    "^": "TOP",
    "v": "BOTTOM",
    "<": "LEFT",
    ">": "RIGHT"
}[dir]] || null;

const areaDimension = {
    height:0,
    width:0,
}

//const obstruction
const getInitialPositions = (charArray) => {
    
    // init Area
    areaDimension.height = charArray.length;
    areaDimension.width = charArray[0].length;

    for (let i = 0; i < areaDimension.height; i++) {
        for (let j = 0; j < areaDimension.width; j++) {
            const element = charArray[i][j];

            if(isDirection(element)){
                guardPosition.x = j;
                guardPosition.y = i;
                guardPosition.direction = getDirection(element);
            }
            
        }
        
    }

}

const inArea = (x,y) => {
    return (x>=0 && x<areaDimension.width) && (y>=0 && y<areaDimension.height)
}
const map = [];

const findObstruction= (guardPosition) =>{
    //console.log('map[',guardPosition.y,'][',guardPosition.x,'] : ' , map[guardPosition.y][guardPosition.x]);
    if(map[guardPosition.y][guardPosition.x] === "#"){
        return true;
    }
    else{
        return false;
    }
}
const turnGuard = (guardPosition) => {
    if(guardPosition.direction === direction.TOP){
        guardPosition.y++;
        guardPosition.direction = direction.RIGHT;
    }
    else if(guardPosition.direction === direction.BOTTOM){
        guardPosition.y--;
        guardPosition.direction = direction.LEFT;
    }
    else if(guardPosition.direction === direction.LEFT){
        guardPosition.x++;
        guardPosition.direction = direction.TOP;
    }
    else if(guardPosition.direction === direction.RIGHT){
        guardPosition.x--;
        guardPosition.direction = direction.BOTTOM;
    }
}

const setMapVisited = (i,j) => {
    //console.log('map[',i,'][',j,'] : ' , map[i][j]);
    if(map[i][j] === "."  || isDirection(map[i][j]) ){
        map[i][j] = "X"
        COUNT++;
    }
}
const moveGuard = (guardPosition) =>{
    while(!findObstruction(guardPosition)){
        setMapVisited(guardPosition.y,guardPosition.x);
        if(guardPosition.direction === direction.TOP){
            guardPosition.y--;
        }
        else if(guardPosition.direction === direction.BOTTOM){
            guardPosition.y++;
        }
        else if(guardPosition.direction === direction.LEFT){
            guardPosition.x--;
        }
        else if(guardPosition.direction === direction.RIGHT){
            guardPosition.x++;
        }
        //console.log('guardPosition:', guardPosition);

        const isInArea = inArea(guardPosition.x,guardPosition.y);
        //console.log('isInArea:', isInArea);
        if(!isInArea){
            return false;
        }
    }
    return true
}

export const computePosition = (data) => {
    console.log("-------- START EXERCICE 6 Part 1-------");
    COUNT = 0;
    const lines = data.trim().split("\n");
    //console.log(lines);
    
    lines.forEach(line => {
        const array = line.trim().split('');
        map.push(array);
    });

    getInitialPositions(map);
    console.log(areaDimension);
    console.log(guardPosition);
    let continueMoveGuard = true;
    while(continueMoveGuard){
        
        if(moveGuard(guardPosition)){
            turnGuard(guardPosition);
            console.log(guardPosition);
        }
        else{
            continueMoveGuard = false;
        }
    }
    

    return COUNT;
}
