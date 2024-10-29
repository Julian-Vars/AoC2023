import day1 from './1/main.js'
import solvePart2 from './1/part2.js';
import day2 from './2/main.js'
import day3 from './3/main.js'
import day4 from './4/main.js'


const days = [
    day1,
    day2,
    day3,
    day4
];

let currentDay = 0;
let selectedPart = 1;

const main = document.getElementsByTagName('main')[0];
const header = document.getElementsByTagName('header')[0];

const styles = document.getElementById('style');



const buttonPart1 = document.getElementById('part1');
const buttonPart2 = document.getElementById('part2');
const buttonBack = document.getElementById('back');
const buttonNewInput = document.getElementById('new-input');
const buttonSubmit = document.getElementById('submit');
const inputText = document.getElementById('input-text');
const inputFile = document.getElementById('input-file');

buttonSubmit.onclick = () => {
    console.log(inputText.value)
    if(inputText.value){
        defaultInput = inputText.value;
        loadInput();
        inputText.value = '';
    }
    
}

inputFile.onchange = (event) => readFile(event.target.files[0]);

buttonBack.onclick = displayDays;
buttonNewInput.onclick = () => modal.classList.toggle('visible');

const modal = document.getElementsByClassName('modal')[0];
modal.onclick = (e) => {
    if(e.target === e.currentTarget) modal.classList.toggle('visible')
}

let defaultInput = '';

const solution = document.getElementById("solution");

displayDays();



function displayDays(){
    
    let visualizer = '<header style="display:block;"><h1>Advent of Code 2023</h1></header><div class="day-wrapper">';
    for(const [index, day] of days.entries()){
        visualizer += `
            <div class="day" id="${index+1}">
                <h2>Day ${index +1 }</h2>
            </div>
        `;
    }
    main.innerHTML = visualizer + '</div>';
    styles.href = 'style.css';
    for(const day of document.getElementsByClassName('day')){
        day.onclick = async () => {
            currentDay = Number(day.id);
            styles.href = `/AoC2023/${day.id}/style.css`
            main.innerHTML = '';
            const response = await fetch(`/AoC2023/${day.id}/input.txt`);
            if(!response.ok){
                main.innerHTML = 'Cannot read file';
                return;
            }
            const input = await response.text();
            buttonPart1.onclick = ()=>solvePart(buttonPart1, buttonPart2, 1, defaultInput?defaultInput:input);
            buttonPart2.onclick = ()=>solvePart(buttonPart2, buttonPart1, 2, defaultInput?defaultInput:input);
        }
    }
}

function readFile(file){
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener('load',()=>{
        defaultInput = fileReader.result;
        loadInput();
        inputFile.value = null;
    })
}

function solvePart(activeButton, deactiveButton, part, input) {
    const results = days[currentDay-1]['part'+part](input);
    
    main.innerHTML = results.list;
    solution.innerHTML = results.sum;
    activeButton.classList.add('selected');
    deactiveButton.classList.remove('selected');
}

function loadInput(){
    try{
        if(selectedPart === 1){
            solvePart(buttonPart1, buttonPart2, 1, defaultInput)
        }else{
            solvePart(buttonPart2, buttonPart1, 2, defaultInput);
        }
        modal.classList.remove('visible');
    }catch(e){
        alert('Something\'s wrong with this input');
    }

}