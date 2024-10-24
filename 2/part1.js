
export default function part1(input){
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
                possible: false
            }

            for(const cube of round.split(', ')){
                const [num, color] = cube.split(' ');
                bag[color.trim()] += Number(num);
            }
            bag.possible = bag.red <= 12 && bag.blue <= 14 && bag.green <= 13;
            rounds.push(bag);
    
        }
        const gamePossible = rounds.filter(round => round.possible).length === rounds.length;
        if(gamePossible)sum += Number(gameId.split(" ")[1]);
        visualizer += `
        <div class="game ${gamePossible? 'possible':'impossible'}">
            <div class="gameId"><h1>${gameId}</h1></div>
            <div class="rounds ">
        `;
        for(const [index, round] of rounds.entries()){
            visualizer += `<div class="round ${round.possible?'possible':'impossible'}"><h2>Round ${index+1}</h2><div class="cubes">`;
            visualizer += visualizeCubes('red', round.red);
            visualizer += visualizeCubes('blue', round.blue);
            visualizer += visualizeCubes('green', round.green);
            visualizer += '</div></div>';
        }

        visualizer += '</div></div>';

    }

    return {
        sum: sum,
        list: visualizer
    };
}

function visualizeCubes(color, num){
    let visualized = '<div class="cube-line">';
    for(let i = 0; i < num; i++){
        visualized += `<div class="cube ${color}"> </div>`;
    }
    visualized += '</div>';

    return visualized;
}