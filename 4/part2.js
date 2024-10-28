import { parseInput, scoreCard, visualizeCard } from "./utils.js";

export default function part2(input){

    const cards = parseInput(input);
    const cardsToRepeat = {};

    for(const card of cards){
        if(!cardsToRepeat[card.cardNo]){
            cardsToRepeat[card.cardNo] = 1;
        }
        const score = scoreCard(card);
        for(let i = 0; i < cardsToRepeat[card.cardNo]; i++){
            for(let j = 0; j < score.length; j++){
                if(cardsToRepeat[card.cardNo + 1 + j]){
                    cardsToRepeat[card.cardNo + 1 + j] ++;
                }else{
                    cardsToRepeat[card.cardNo + 1 + j] = 2;
                }
            }
        }
    }
    return {
        sum: Object.values(cardsToRepeat).reduce((a,r) => a+r),
        list: cards.map(card => {return visualizeCard({...card, score: cardsToRepeat[card.cardNo]})}).reduce((a,r) => a+r)
    };
}