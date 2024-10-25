import { findGears } from "./utils.js";

export default function part2(input){
    const schematic = input.split('\n').map(row => row.trim().split(''));
    let visualizer = ''
    let sum = 0;
    const gears = []

    for(const [y,row] of schematic.entries()){
        visualizer += '<div class="row">';
        for(const [x,cell] of row.entries()){
            const gear = findGears(x,y,schematic);
            if(gear.length == 2){
                console.log(gear, gear[0]*gear[1], sum);
                sum += gear[0] * gear[1];
                visualizer += `<div class="cell symbol">${cell}</div>`;

            }else if(cell === '.'){
                visualizer += `<div class="cell"> </div>`;
            }else{
                visualizer += `<div class="cell">${cell}</div>`;
            }


            
        }
        visualizer += '</div>';
    }

    return {
        sum,
        list: visualizer
    };
}