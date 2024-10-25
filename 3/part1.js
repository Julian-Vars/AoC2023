import {
    checkNumber,
    isNumber,
    createNumberLine,
    findNumberNeigbour
} from './utils.js'

export default function part1(input){
    const schematic = input.split('\n').map(row => row.trim().split(''));
    let visualizer = ''
    let sum = 0;

    for(const [y,row] of schematic.entries()){
        visualizer += '<div class="row">';
        for(const [x,cell] of row.entries()){
            if(isNumber(cell)){
                const number = checkNumber(createNumberLine(x,y,schematic), schematic);
                if(number.isPartNumber){
                    if(findNumberNeigbour(-1, x, y, schematic, []).length === 0){
                        sum += number.value;
                    }
                    visualizer += `<div class="cell partNo">${cell}</div>`;
                }else{
                    visualizer += `<div class="cell">${cell}</div>`;
                }
            }else if(cell === '.'){
                visualizer += `<div class="cell"> </div>`;
            }else{
                visualizer += `<div class="cell symbol">${cell}</div>`;
            }
        }
        visualizer += '</div>';
    }
    return {
        sum,
        list: visualizer
    };
}

