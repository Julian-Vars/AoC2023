

/**
 * Solves part 1 of https://adventofcode.com/2023/day/1
 * @param string inputFile path to file
 * @returns returns stringified HTML to visualize the solutionhttps://adventofcode.com/2023/day/1
 */
export default function solvePart1(input){
    let sum = 0;
    let visualizedList = ""

    for(const line of input.split('\n')){
        let lineNumber = "";
        visualizedList += "<div>";

        for(const character of line.split("")){
            if(Number(character) || character === '0'){
                lineNumber += character;
                visualizedList += `<b>${character}</b>`;
            }else{
                visualizedList += character;
            }
        }
        
        visualizedList += `<span>${Number(lineNumber[0] + lineNumber[lineNumber.length-1])}</span></div>`;
        sum += Number(lineNumber[0] + lineNumber[lineNumber.length-1])
    }

    return {
        list: visualizedList,
        sum: sum
    }
}