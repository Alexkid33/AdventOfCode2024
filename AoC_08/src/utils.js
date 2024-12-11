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
function computePosition(currPos,nextPos, isUp){
    const diff = Math.abs(currPos-nextPos);
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

        // Set upper Antenna antinode
        if((antennaId-diffId) >= 0){
            const upAntennaForAntinode = antennas[(antennaId-diffId)];
            const pos = computePosition(position,nextPosition, true)
            if(pos >=0 && pos < upAntennaForAntinode.length){
                if(antennas[(antennaId-diffId)][pos] !== "#"){
                    antennas[(antennaId-diffId)][pos] = "#";
                    count += 1;                    
                }

            }
        }

        // Set lower Antenna antinode
        if((nextAntennaId+diffId) < antennas.length){
            const lowAntennaForAntinode = antennas[nextAntennaId+diffId];
            const pos = computePosition(position,nextPosition, false)
            if(pos >=0 && pos < lowAntennaForAntinode.length){
                if(antennas[nextAntennaId+diffId][pos] !== "#"){
                    antennas[nextAntennaId+diffId][pos] = "#";
                    count += 1;                    
                }
            }
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
    console.log('count : ',count);


    return count;
}