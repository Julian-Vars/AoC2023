const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]
/**
 * Prepares the line for visualization
 * Known bug: If two numbers share letters, only the first will be highlights
 * example:
 * "oneight" Will highlight only the one
 * @param string line 
 * @returns an html formatted version of the line with every digit or spelled out number highlighted
 */
function visualizeLine(line){
    let visualizedLine = "";
    for(const character of line){
        if(Number(character)){
            visualizedLine += `<b>${character}</b>`;
        }else{
            visualizedLine += character;
        }
    }
    for(const number of numbers){
        visualizedLine = visualizedLine.replaceAll(number, `<i>${number}</i>`);
    }
    return visualizedLine;
}
/**
 * This parses each spelled out number as an actual number. It wraps the number in spelled out numbers to avoid numbers sharing letters.
 * @param string line 
 * @returns a list of all the spelled out numbers replaced with numbers
 */
function numberizeLine(line){
    let numberedLine = line;
    for(const [index, number] of numbers.entries()){
        numberedLine = numberedLine.replaceAll(number, `${number}${index+1}${number}`);
    }
    return numberedLine;
}
/**
 * Solves part 2 of https://adventofcode.com/2023/day/1
 * @param string input 
 * @returns 
 */
export default function solvePart2(input){
    let sum = 0;
    let visualizedList = ""

    for(const line of input.split('\n')){
        let lineNumber = "";
        visualizedList += "<div>";
        visualizedList += visualizeLine(line);

        const numberedLine = numberizeLine(line);
        for(const character of numberedLine){
            if(Number(character)){
                lineNumber += character;
            }
        }
        
        visualizedList += `<span>${Number(lineNumber[0] + lineNumber[lineNumber.length-1])}</span></div>`;
        sum += Number(lineNumber[0] + lineNumber[lineNumber.length-1]);
    }

    return {
        list: visualizedList,
        sum: sum,
    }
}

