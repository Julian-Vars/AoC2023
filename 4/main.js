import part1 from './part1.js'
import part2 from './part2.js'

const input = await(await fetch('/AoC2023/4/input.txt')).text();

const main = document.getElementsByTagName('main')[0]
console.log(input);

const buttonPart1 = document.getElementById('part1');
const buttonPart2 = document.getElementById('part2');

const solution = document.getElementById("solution");

buttonPart1.onclick = () => {
    const result = part1(input);
    main.innerHTML = result.list
    solution.innerText = result.sum;
    buttonPart1.classList.add('selected');
    buttonPart2.classList.remove('selected');
}

buttonPart2.onclick = () => {
    const result = part2(input);
    main.innerHTML = result.list
    solution.innerText = result.sum;
    buttonPart2.classList.add('selected');
    buttonPart1.classList.remove('selected');
}