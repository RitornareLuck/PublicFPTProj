const gstatus = document.getElementsByClassName("gstatus")[0];
var isEnd = false;
var turn = 0;
var phe1 = [];
var phe2 = [];

window.onload = function(){
	nextTurn()
}

function onClick(event) {
    if(isEnd) return;
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
	if(clickedCell.style.color) return;

    clickedCell.style.color = turn % 2 ? "#00eaff" : "#ff002b";
	if(turn % 2)
		phe1.push(clickedCell.innerHTML*1);
	else
		phe2.push(clickedCell.innerHTML*1);
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


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', onClick));
function initGame(){
	turn = 0
	isEnd = false
	phe1 = []
	phe2 = []
	document.querySelectorAll('.cell').forEach(cell => cell.style.color = "");
	nextTurn()
}
document.querySelector('.grestart').addEventListener('click', initGame);
