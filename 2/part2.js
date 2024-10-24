
export default function part2(input){
    let visualizer = ""
    let sum = 0;
    for(const line of input.split('\n')){
        const [gameId, cubes] = line.split(': ');
        

        const rounds = []

        for(const round of cubes.split('; ')){
            const bag = {
                red: 0,
                blue: 0,
                green: 0,
                possible: false,
                fewest:{
                    red: false,
                    blue: false,
                    green: false
                }
            }

            for(const cube of round.split(', ')){
                const [num, color] = cube.split(' ');
                bag[color.trim()] += Number(num);
            }
            bag.possible = bag.red <= 12 && bag.blue <= 14 && bag.green <= 13;
            rounds.push(bag);
    
        }
        const fewest = {
            red: 0,
            blue: 0,
            green: 0,
        };

        for(const round of rounds){
            if(round.red > fewest.red){
                fewest.red = round.red;
            }
            if(round.blue > fewest.blue){
                fewest.blue = round.blue;
            }
            if(round.green > fewest.green){
                fewest.green = round.green;
            }
        }
        for(const round of rounds){
            if(round.red === fewest.red){
                round.fewest.red = true;
            }
            if(round.blue === fewest.blue){
                round.fewest.blue = true;
            }
            if(round.green === fewest.green){
                round.fewest.green = true;
            }
        }
        

        sum += fewest.red * fewest.blue * fewest.green

        const gamePossible = rounds.filter(round => round.possible).length === rounds.length;
        visualizer += `
        <div class="game ${gamePossible? 'possible':'impossible'}">
            <div class="gameId"><h1>${gameId}</h1></div>
            <h2 style="text-align:center">Power: ${fewest.red * fewest.blue * fewest.green}</h2>
            <div class="fewest-row">${visualizeCubes('red', fewest.red) + visualizeCubes('blue', fewest.blue) + visualizeCubes('green', fewest.green)}</div>
            <div class="rounds ">
        `;
        for(const [index, round] of rounds.entries()){
            visualizer += `<div class="round ${round.possible?'possible':'impossible'}"><h2>Round ${index+1}</h2><div class="cubes">`;
            visualizer += visualizeCubes('red', round.red, round.fewest.red);
            visualizer += visualizeCubes('blue', round.blue, round.fewest.blue);
            visualizer += visualizeCubes('green', round.green, round.fewest.green);
            visualizer += '</div></div>';
        }

        visualizer += '</div></div>';

    }

    return {
        sum: sum,
        list: visualizer
    };
}

function visualizeCubes(color, num, fewest=false){
    let visualized = '<div class="cube-line">';
    for(let i = 0; i < num; i++){
        visualized += `<div class="cube ${color} ${fewest?'fewest':''}"> </div>`;
    }
    visualized += '</div>';

    return visualized;
}