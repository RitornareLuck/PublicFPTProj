const gstatus = document.getElementsByClassName("gstatus")[0];
var isEnd = false;
var turn = 0;
const leftOffset = 10;
const rightOffset = 90;
var phe1 = [];
var phe2 = [];
window.onload = function(){
	initGame()
}
async function loadNumber(){
	var numbers = document.getElementsByClassName("number");
	for(var i = 0; i < numbers.length; i++) {
		e = numbers[i];
		e.style.left = (8 + e.innerHTML*8) + "%";
		e.style.top = "18vh";
		await sleep(300);
	}
}
function clickNumber(e){
	if(e.style.top != `18vh` || isEnd) return;
	let move = Math.floor(turn/2)*6;
	e.style.top = '40vh';
	if(turn % 2){
		move+=leftOffset;
		phe1.push(e.innerHTML*1);
	} else {
		move=rightOffset-move;
		phe2.push(e.innerHTML*1);
	}
	e.style.left = move + '%';
	nextTurn();
}
function nextTurn(){
	let NN1 = calculateScore(phe1);
	let NN2 = calculateScore(phe2);
	turn++;
	if(NN1){
		gstatus.textContent = "Người chơi 1 đã chiến thắng với các số\n" + NN1;
		isEnd = true;
		return
	}
	if(NN2){
		gstatus.textContent = "Người chơi 2 đã chiến thắng với các số\n" + NN2;
		isEnd = true;
		return
	}
	if(turn >= 10){
		gstatus.textContent = "Cả 2 người chơi hoà vì đã hết lượt đi";
		isEnd = true;
		return
	}
	gstatus.textContent = "Lượt người chơi "+((turn-1)%2+1);
}
function calculateScore(numbers){
	let len = numbers.length;
	for (var i = 0; i < len - 2;i++)
		for (var j = 0; j < len - 1;j++)
			for(var k = 0; k < len;k++){
				if(i == j || i == k || j == k) continue;
				let current = numbers[i] + numbers[j] + numbers[k];
				if(current == 15)
					return `${numbers[i]} + ${numbers[j]} + ${numbers[k]} = 15`;
			}
	return null;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function initGame(){
	turn = 0
	isEnd = false
	phe1 = []
	phe2 = []
	loadNumber()
	nextTurn()
}
document.querySelector('.grestart').addEventListener('click', initGame);