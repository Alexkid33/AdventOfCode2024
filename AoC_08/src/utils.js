function findFrequencies(antenna, antennaId){
    antenna.map((element, i) => {
        if(element !== '.'){
            if (frequencyMap.has(element)) {
                frequencyMap.get(element).push({antennaId,position: i});
            } else {
                frequencyMap.set(element, [{antennaId,position: i}]);
            }

        }
    });
}
function computePosition(currPos,nextPos,diff, isUp){
    if(isUp){
        if(currPos > nextPos){
            return currPos+diff;
        }
        else{
            return currPos-diff;
        }
    }else{
        if(currPos > nextPos){
            return nextPos-diff;
        }
        else{
            return nextPos+diff;
        }

    }
}
function processAntenna({antennaId, position}, otherAntennas){
    console.log(otherAntennas);
    console.log({antennaId, position});
    
    otherAntennas.forEach((item) => {
        const {antennaId:nextAntennaId, position:nextPosition} = item;
        const diffId = nextAntennaId-antennaId;
        const diffPos = Math.abs(position-nextPosition);

        // Set upper Antennas antinodes
        let upPos = computePosition(position,nextPosition,diffPos, true)
        for (let upId = antennaId-diffId; upId >= 0; upId-=Math.abs(diffId)) {
            
            const upAntennaForAntinode = antennas[upId];
            if(upPos >=0 && upPos < upAntennaForAntinode.length){
                if(antennas[upId][upPos] !== "#"){
                    antennas[upId][upPos] = "#";
                    //count += 1;                    
                }

            }
            upPos = computePosition(upPos,position,diffPos, true)
    
        }

        // Set lower Antenna antinode
        let lowPos = computePosition(position,nextPosition,diffPos, false)
        for (let lowId = nextAntennaId+diffId; lowId < antennas.length; lowId+=Math.abs(diffId)) {
            const lowAntennaForAntinode = antennas[lowId];
            if(lowPos >=0 && lowPos < lowAntennaForAntinode.length){
                if(antennas[lowId][lowPos] !== "#"){
                    antennas[lowId][lowPos] = "#";
                    //count += 1;                    
                }
            }
            lowPos = computePosition(nextPosition,lowPos,diffPos, false)
    
        }       
        
    })
}

function createAntinodes(frequency, properties){
    console.log("frequency: ", frequency);
    for (let index = 0; index < properties.length-1; index++) {
        const {antennaId, position} = properties[index];
        console.log(properties.slice(index+1));

        processAntenna({antennaId, position}, properties.slice(index+1));
    }
    
    
    
}
const frequencyMap = new Map();
const antennas = [];
let count;

export const antinodesCompute = (data) => {
    console.log("-------- START EXERCICE 8 Part 1-------");
    count = 0;

    const lines = data.trim().split("\n");

    lines.forEach(line => {
        const array = line.trim().split('');
        antennas.push(array);
    });
    console.log(antennas);
    antennas.map((x,i) => findFrequencies(x,i))
    console.log(frequencyMap);

    frequencyMap.forEach((value, key) => createAntinodes(key, value))
    console.log("new Antenna: ", antennas);
    antennas.forEach(row => {
        row.forEach(cell => {
            if (cell !== '.') {
                count++;
            }
        });
    });
    console.log('count : ',count);


    return count;
}