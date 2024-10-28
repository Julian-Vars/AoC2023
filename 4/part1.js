import { parseInput, scoreCard, visualizeCard } from "./utils.js";

export default function part1(input){

    const cards = parseInput(input).map(scoreCard);
    const sum = cards.map(i => i.score).reduce((a,r) => a+r);
    const visualizer = cards.map(visualizeCard).reduce((a,r) => a+r);
    return {
        sum,
        list: visualizer
    };
}

