export function findGears(x,y, schematic){
    if(schematic[y][x] !== '*')return [];

    const numbers = [];

    //up
    if(y !== 0)addNumber(x,y-1,schematic,numbers);
    //up left
    if(y !== 0 && x !== 0)addNumber(x-1,y-1,schematic,numbers);
    //up right
    if(y !== 0 && x < schematic[y].length-1)addNumber(x+1,y-1,schematic,numbers);
    //left
    if(x !== 0 )addNumber(x-1,y,schematic,numbers);
    //right
    if(x < schematic[y].length-1 )addNumber(x+1,y,schematic,numbers);
    //down
    if(y < schematic.length-1)addNumber(x,y+1,schematic,numbers);
    //down right
    if(y < schematic.length-1 && x < schematic[y].length-1)addNumber(x+1,y+1,schematic,numbers);
    //down left
    if(y < schematic.length-1 && x !== 0)addNumber(x-1,y+1,schematic,numbers);

    return numbers.map(number => checkNumber(number, schematic).value);

}

export function findNumberNeigbour(direction, x, y, schematic, numbers){
    if(Number(schematic[y][x+direction]) || schematic[y][x+direction] === '0'){
        if(direction < 0){;
            return findNumberNeigbour(direction, x+direction, y, schematic, [{value: schematic[y][x+direction], x: x+direction, y}, ...numbers]);
        }else{
            return findNumberNeigbour(direction, x+direction, y, schematic, [...numbers, {value: schematic[y][x+direction], x: x+direction, y}]);
        }
    }
    return numbers;
}
export function checkNumber(numbers, schematic){
    let numberString = '';
    let isPartNumber = false;
    for(const number of numbers){
        numberString += number.value;
        if(!isPartNumber){
            isPartNumber = checkNeighbours(number.x, number.y, schematic);
        }
        
    }
    return {
        value: Number(numberString),
        isPartNumber
    };
}

export function checkNeighbours(x, y, schematic){
    //up
    if(y !== 0 && checkCell(schematic[y-1][x]))return true;
    //up left
    if(y !== 0 && x !== 0 && checkCell(schematic[y-1][x-1]))return true;
    //up right
    if(y !== 0 && x < schematic[y].length-1 && checkCell(schematic[y-1][x+1]))return true;
    //left
    if(x !== 0 && checkCell(schematic[y][x-1]))return true;
    //right
    if(x < schematic[y].length-1 && checkCell(schematic[y][x+1]))return true;
    //down
    if(y < schematic.length-1 && checkCell(schematic[y+1][x]))return true;
    //down right
    if(y < schematic.length-1 && x < schematic[y].length-1 && checkCell(schematic[y+1][x+1]))return true;
    //down left
    if(y < schematic.length-1 && x !== 0 && checkCell(schematic[y+1][x-1]))return true;
}
export function checkCell(cell){
    return !isNumber(cell) && cell !== '.' 
}

export function isNumber(value){
    return Number(value) || value === '0'
}

export function createNumberLine(x,y,schematic){
    return [...findNumberNeigbour(-1, x, y, schematic, []), {value: schematic[y][x], x, y}, ...findNumberNeigbour(1, x, y, schematic, [])]
}

export function addNumber(x,y,schematic, numbers){
    if(isNumber(schematic[y][x])){
        const number = createNumberLine(x,y,schematic);
        if(!numbers.find(i => {
            return i[0].x === number[0].x && i[0].y === number[0].y
        })){
            numbers.push(number);
        }

    }
}