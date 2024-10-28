

export function parseInput(input){
    return input.split('\r\n').map(card => {
        const [cardNo, cardData] = card.split(': '); 
        const [winners, numbers] = cardData.split(' | ');
        return {
            cardNo : Number(cardNo.replaceAll(' ', '').split('d')[1]),
            winners: winners.split(' ').filter(i => i),
            numbers: numbers.split(' ').filter(i => i),
        };
    });
}

export function scoreCard(card){
    const score = card.numbers.filter(number =>
        isWinner(number, card.winners)
    ).length
    return {
        score : score === 0? 0: 2**(score-1),
        length: score,
        ...card
    };
}

export function visualizeCard(card){
    return `
    <div class="card">
        <div class="card-no">Card ${card.cardNo} Score: ${card.score}</div>
        <div class="numbers">
            <div class="winners numbers-line">&#9<b>Winners</b>${card.winners.map(no => visualizeNumber(no, 'winner')).reduce((a,r) => a+r)}</div>
            <div class="numbers-line"><b>Numbers&#9</b>${card.numbers.map(no => visualizeNumber(no, isWinner(no, card.winners)?'winner':'')).reduce((a,r) => a+r)}</div>
        </div>
    </div>
    `
}
function visualizeNumber(number, type){
    return `<div class="number ${type}">${number}</div>`;
}
function isWinner(number, winners){
    return winners.find(i => i === number)?true:false
}