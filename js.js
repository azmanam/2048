var gridArray = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]];

$('document').ready(function() {
	newNumber();
	newNumber();
	printGrid();
});

$(document).keypress(function(event) {
	switch(event.key) {
		case "Up":
			up();
			break;
		case "Down":
			down();
			break;
		case "Left":
			left();
			break;
		case "Right":
			right();
			break;
		default:
			break;
	}
	switch(event.keyCode) {
		case 38:
			up();
			break;
		case 40:
			down();
			break;
		case 37:
			left();
			break;
		case 39:
			right();
			break;
		default:
			break;
	}
	switch(event.which) {
		case 119:
			up();
			break;
		case 115:
			down();
			break;
		case 97:
			left();
			break;
		case 100:
			right();
			break;
		default:
			break;
	}
});

var newNumber = function() {
	randContinue = true;
	do {
		randRow = Math.floor(Math.random()*4);
		randCol = Math.floor(Math.random()*4);
		randNum = Math.floor(Math.random()*10);
		randNum = randNum > 8 ? 4 : 2;
		if (gridArray[randRow][randCol] == 0) {
			gridArray[randRow][randCol] = randNum;
			randContinue = false;
		}
	} while (randContinue);
}

var printGrid = function() {
	$('#gridDiv').empty();
	for (i=0;i<4;i++) {
		for (j=0;j<4;j++) {
			gridFill = gridArray[i][j] > 0 ? gridArray[i][j] : ""
			$('#gridDiv').append("<div class='gridCell n"+gridArray[i][j]+"'>"+gridFill+"</div>");
			if (j==0) {$('#gridDiv div:last-child').addClass("firstCell")};
		}
		
	}
/*	gameOver = true;
	for (row=0;row>4;row++) {
		for (col=0;col<4;col++) {
			if (gridArray[row][col] == 0) {
				gameOver = false;
			}
		}
	}
	if (gameOver) {$('gridDiv').append("<h1>'GAME OVER!'</h1>")};
*/
}

var up = function() {
	getNew = false;
	extract = [];
	for (col=0;col<4;col++) {
		extract = [];
		for (row=0;row<4;row++) {
			if (gridArray[row][col] > 0) {
				extract.push(gridArray[row][col]);
				if (row !== extract.length-1) getNew = true;
			}
		}
		if (extract.length > 1) {
			for (item=0;item<extract.length;item++) {
				if (extract[item] == extract[item+1]) {
					extract[item] *= 2;
					extract.splice(item+1,1);
					getNew = true;
				}
			}
		}
		while (extract.length<4) {
			extract.push(0);
		}
		for (row=0;row<4;row++) {
			gridArray[row][col] = extract[row];
		}
	}
	if (getNew) {newNumber()};
	printGrid();
}

var up2 = function() {
	getNew = false;
	for (row=2;row>=0;row--) {
		for (col=0;col<4;col++) {
			if (gridArray[row][col] == gridArray[row+1][col] && gridArray[row][col] !== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row+1][col]);
				gridArray[row][col] += gridArray[row][col]+1;
				gridArray[row+1][col] = 0;
				tempRow = row+1;
				tempCol = col;
				while (tempRow <= 2) {
					gridArray[tempRow][tempCol] = gridArray[tempRow+1][tempCol];
					gridArray[tempRow+1][tempCol] = 0;
					tempRow += 1;
				}
				getNew = true;
//				printGrid();
			}
			if (gridArray[row][col] == 0 && gridArray[row+1][col] 
			!== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row+1][col]);
				gridArray[row][col] = gridArray[row+1][col];
				gridArray[row+1][col] = 0;
				tempRow = row+1;
				tempCol = col;
				while (tempRow <= 2) {
					gridArray[tempRow][tempCol] = gridArray[tempRow+1][tempCol];
					gridArray[tempRow+1][tempCol] = 0;
					tempRow += 1;
				}
				getNew = true;
//				printGrid();
			}
		}
	}
	for (row=0;row<4;row++) {
		for (col=0;col<4;col++) {
			if (gridArray[row][col]%2 !== 0) {
				gridArray[row][col] -= 1;
			}
		}
	}
	if (getNew) {newNumber()};
	printGrid();
}

var down = function() {
	getNew = false;
	extract = [];
	for (col=0;col<4;col++) {
		extract = [];
		for (row=0;row<4;row++) {
			if (gridArray[row][col] > 0) {
				extract.push(gridArray[row][col]);
				if (gridArray[row+1] && gridArray[row+1][col] == 0) getNew = true;
			}
		}
		if (extract.length > 1) {
			for (item=extract.length-1;item>0;item--) {
				if (extract[item] == extract[item-1]) {
					extract[item] *= 2;
					extract.splice(item-1,1);
					getNew = true;
				}
			}
		}
		while (extract.length<4) {
			extract.unshift(0);
		}
		for (row=0;row<4;row++) {
			gridArray[row][col] = extract[row];
		}
	}
	if (getNew) {newNumber()};
	printGrid();
}

var down2 = function() {
	getNew = false;
	for (row=1;row<=3;row++) {
		for (col=0;col<4;col++) {
/*			if (gridArray[row][col] == gridArray[row-1][col] && gridArray[row][col] !== 0) {
				gridArray[row][col] += gridArray[row][col];
				gridArray[row-1][col] = 0;
				getNew = true;
			}
*/
			if (gridArray[row][col] == gridArray[row-1][col] && gridArray[row][col] !== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row-1][col]);
				gridArray[row][col] += gridArray[row][col]+1;
				gridArray[row-1][col] = 0;
				tempRow = row-1;
				tempCol = col;
				while (tempRow >= 1) {
					gridArray[tempRow][tempCol] = gridArray[tempRow-1][tempCol];
					gridArray[tempRow-1][tempCol] = 0;
					tempRow -= 1;
				}
				getNew = true;
				printGrid();
			}
/*			if (gridArray[row][col] == 0 && gridArray[row-1][col] 
			!== 0) {
				gridArray[row][col] = gridArray[row-1][col];
				gridArray[row-1][col] = 0;
				getNew = true;
			}
*/
			if (gridArray[row][col] == 0 && gridArray[row-1][col] 
			!== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row-1][col]);
				gridArray[row][col] = gridArray[row-1][col];
				gridArray[row-1][col] = 0;
				tempRow = row-1;
				tempCol = col;
				while (tempRow >= 1) {
					gridArray[tempRow][tempCol] = gridArray[tempRow-1][tempCol];
					gridArray[tempRow-1][tempCol] = 0;
					tempRow -= 1;
				}
				getNew = true;
				printGrid();
			}
		}
	}
	for (row=0;row<4;row++) {
		for (col=0;col<4;col++) {
			if (gridArray[row][col]%2 !== 0) {
				gridArray[row][col] -= 1;
			}
		}
	}
	if (getNew) {newNumber()};
	printGrid();
}

var left = function() {
	getNew = false;
	extract = [];
	for (row=0;row<4;row++) {
		extract = gridArray[row];
		for (i=3;i>=0;i--) {
			if (extract[i]>0 && extract[i-1]==0) getNew=true;
			if (extract[i] == 0) extract.splice(i,1);
		}
		if (extract.length > 1) {
			for (item=0;item<extract.length;item++) {
				if (extract[item] == extract[item+1]) {
					extract[item] *= 2;
					extract.splice(item+1,1);
					getNew = true;
				}
			}
		}
		while (extract.length<4) {
			extract.push(0);
		}
		gridArray[row] = extract;
	}
	if (getNew) {newNumber()};
	printGrid();
}

var left2 = function() {
	getNew = false;
	for (row=0;row<4;row++) {
		for (col=2;col>=0;col--) {
			if (gridArray[row][col] == gridArray[row][col+1] && gridArray[row][col] !== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row+1][col]);
				gridArray[row][col] += gridArray[row][col]+1;
				gridArray[row][col+1] = 0;
				tempRow = row;
				tempCol = col+1;
				while (tempCol <= 2) {
					gridArray[tempRow][tempCol] = gridArray[tempRow][tempCol+1];
					gridArray[tempRow][tempCol+1] = 0;
					tempCol += 1;
				}
				getNew = true;
				printGrid();
			}
			if (gridArray[row][col] == 0 && gridArray[row][col+1] 
			!== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row+1][col]);
				gridArray[row][col] = gridArray[row][col+1];
				gridArray[row][col+1] = 0;
				tempRow = row;
				tempCol = col+1;
				while (tempCol <= 2) {
					gridArray[tempRow][tempCol] = gridArray[tempRow][tempCol+1];
					gridArray[tempRow][tempCol+1] = 0;
					tempCol += 1;
				}
				getNew = true;
				printGrid();
			}
		}
	}
	for (row=0;row<4;row++) {
		for (col=0;col<4;col++) {
			if (gridArray[row][col]%2 !== 0) {
				gridArray[row][col] -= 1;
			}
		}
	}
	if (getNew) {newNumber()};
	printGrid();
}

var right = function() {
	getNew = false;
	extract = [];
	for (row=0;row<4;row++) {
		extract = gridArray[row];
		for (i=3;i>=0;i--) {
			if (extract[i] == 0) {
				if (extract[i-1] && extract[i-1] > 0) getNew = true;
				//if (extract[i-1]>0) getNew = true;
				extract.splice(i,1);
			}
		}
		if (extract.length > 1) {
			for (item=extract.length-1;item>0;item--) {
				if (extract[item] == extract[item-1]) {
					extract[item] *= 2;
					extract.splice(item-1,1);
					item--
					getNew = true;
				}
			}
		}
		while (extract.length<4) {
			extract.unshift(0);
		}
		gridArray[row] = extract;
	}
	if (getNew) {newNumber()};
	printGrid();
}

var right2 = function() {
	getNew = false;
	for (row=0;row<4;row++) {
		for (col=1;col<=3;col++) {
/*			if (gridArray[row][col] == gridArray[row-1][col] && gridArray[row][col] !== 0) {
				gridArray[row][col] += gridArray[row][col];
				gridArray[row-1][col] = 0;
				getNew = true;
			}
*/
			if (gridArray[row][col] == gridArray[row][col-1] && gridArray[row][col] !== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row-1][col]);
				gridArray[row][col] += gridArray[row][col]+1;
				gridArray[row][col-1] = 0;
				tempRow = row;
				tempCol = col-1;
				while (tempCol >= 1) {
					gridArray[tempRow][tempCol] = gridArray[tempRow][tempCol-1];
					gridArray[tempRow][tempCol-1] = 0;
					tempCol -= 1;
				}
				getNew = true;
				printGrid();
			}
/*			if (gridArray[row][col] == 0 && gridArray[row-1][col] 
			!== 0) {
				gridArray[row][col] = gridArray[row-1][col];
				gridArray[row-1][col] = 0;
				getNew = true;
			}
*/
			if (gridArray[row][col] == 0 && gridArray[row][col-1] 
			!== 0) {
//				alert("("+row+","+col+"): "+gridArray[row][col]+" vs "+gridArray[row-1][col]);
				gridArray[row][col] = gridArray[row][col-1];
				gridArray[row][col-1] = 0;
				tempRow = row;
				tempCol = col-1;
				while (tempCol >= 1) {
					gridArray[tempRow][tempCol] = gridArray[tempRow][tempCol-1];
					gridArray[tempRow][tempCol-1] = 0;
					tempCol -= 1;
				}
				getNew = true;
				printGrid();
			}
		}
	}
	for (row=0;row<4;row++) {
		for (col=0;col<4;col++) {
			if (gridArray[row][col]%2 !== 0) {
				gridArray[row][col] -= 1;
			}
		}
	}
	if (getNew) {newNumber()};
	printGrid();
}

