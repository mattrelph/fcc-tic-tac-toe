//Font Awesome CSS - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
//Bootstrap CSS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css
//JQuery JS - https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
//Bootstrap JS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js

/*
<i class="fa fa-circle-thin" aria-hidden="true"></i> //Circle -O
<i class="fa fa-times" aria-hidden="true"></i> //X

*/
//Tic Tac Toe Game
//Single Player or VS Computer
//X or O
//Keep score
//Reset Game
//Computer is okay, but not too smart, so human can win sometimes. 
//Possible future improvement - multiple difficulties.

var p1Turn = true;
var nobodyTurn = false;
var p1Symbol='x';
var p2IsPC = true;
var results=[0,0,0];
var board =Array(9).fill('B');
var boardNames =['topLeftSquare', 'topMiddleSquare', 'topRightSquare', 'midLeftSquare', 'midMiddleSquare', 'midRightSquare', 'bottomLeftSquare', 'bottomMiddleSquare', 'bottomRightSquare'];


$(document).ready(function()
{
	gameReset();
});

$('.square').click(function()
{
	if (!nobodyTurn)
	{
		play(this.id);
		if (!nobodyTurn&& !p1Turn && p2IsPC)
		{
			computerPlay();
		}
	}

});

function gameReset()
{
	results=[0,0,0];
	upDateScore();
	newGame();
	p1Turn = true;	
	nobodyTurn = false;
	return false;
}

function upDateScore()
{
	$('#player1Record').empty();
	$('#player1Record').append(results[0] + '-' + results[1] + '-' + results[2]);
	$('#player2Record').empty();
	$('#player2Record').append(results[1] + '-' + results[0] + '-' + results[2]);
	
}

function newGame() //Clears the board
{
	board.fill('B');
	for (var i=0; i< boardNames.length; ++i)
	{
		$('#'+boardNames[i]).empty();
	}
	if (p1Turn)
	{
		$('#current').empty();
		$('#current').append('<strong class="bg-info">Waiting on Player 1</strong>');			
	}
	else if (p2IsPC)
	{
		$('#current').empty();
		$('#current').append('<strong class="bg-danger">Waiting on Computer</strong>');			
	}
	else
	{
		$('#current').empty();
		$('#current').append('<strong class="bg-danger">Waiting on Player 2</strong>');	
	}			
	nobodyTurn = false;
	return false;
}


function symbolToggle ()
{
	$('#symbolButton').empty();
	if (p1Symbol=='x')
	{
		$('#symbolButton').append('Player 1 is O');
		p1Symbol = 'o';
	}
	else
	{
		$('#symbolButton').append('Player 1 is X');
		p1Symbol = 'x';	
	}
	newGame();
	return false;
}

function versusToggle()
{
	$('#versusButton').empty();
	$('#player2ID').empty();
	p2IsPC = !p2IsPC;
	if (p2IsPC)
	{
		$('#versusButton').append('Human vs Computer');
		$('#player2ID').append('Computer');
	}
	else
	{
		$('#versusButton').append('Human vs Human');
		$('#player2ID').append('Player 2');		
	}
	gameReset();
	return false;
}

function play(id)
{

	var squareNumber = boardNames.indexOf(id);
	//console.log(board[squareNumber], typeof (board[squareNumber]));
	if (p1Turn && (typeof board[squareNumber]!="number"))
	{
		
		board[squareNumber]=1;
		if (p1Symbol=='x')
		{
			$('#'+id).append('<i class="h1 text-primary fa fa-times" aria-hidden="true"></i>' );	
		}
		else
		{
			$('#'+id).append('<i class="h1 text-primary fa fa-circle-thin" aria-hidden="true"></i>' );
		}
		p1Turn = false;
		if (p2IsPC)
		{
			$('#current').empty();
			$('#current').append('<strong class="bg-danger">Waiting on Computer</strong>');			
		}
		else
		{
			$('#current').empty();
			$('#current').append('<strong class="bg-danger">Waiting on Player 2</strong>');			
		}
	
		
	}
	else if (!p1Turn && !p2IsPC && (typeof board[squareNumber]!="number"))
	{
		board[boardNames.indexOf(id)]=2;
		if (p1Symbol!='x')
		{
			$('#'+id).append('<i class="h1 text-danger fa fa-times" aria-hidden="true"></i>' );	
		}
		else
		{
			$('#'+id).append('<i class="h1 text-danger fa fa-circle-thin" aria-hidden="true"></i>' );
		}	
		p1Turn = true;	
		$('#current').empty();
		$('#current').append('<strong class="bg-info">Waiting on Player 1</strong>');			
	}
	
	if (checkWin())
	{
		nobodyTurn = true;
		upDateScore();
		
		setTimeout(function()
		{
			//console.log('test');
			newGame();
			if (!p1Turn && p2IsPC)
			{
				computerPlay();
			}
		} , 3000);
	}

	return false;
}

function checkWin()
{

	//Winning combos are 012, 345, 678, 036, 147, 258, 048, 246
	var combos =['012', '345', '678', '036', '147', '258', '048', '246'];
	var p1Squares ='';
	var p2Squares ='';
	var re;
	var p1Won = false;
	var p2Won = false;
	for (var i=0; i<board.length; ++i)
	{
		if (board[i]==1)
		{
			p1Squares += i;
		}
		else if (board[i]==2)
		{
			p2Squares += i;
		}
	}
	for (var j=0; j<combos.length; ++j)
	{
		re = RegExp (combos[j][0]+'(.*)'+combos[j][1]+'(.*)'+ combos[j][2]);
		//console.log(re, p1Squares, p2Squares);
		if (re.test(p1Squares))
		{
			p1Won = true;
			break;
		}
		else if (re.test(p2Squares))
		{
			p2Won = true;
			break;
		}
	}
	if (p1Won)
	{
		++results[0];
		$('#current').empty();
		$('#current').append('<strong class="bg-info">Player 1 Won!</strong>');
		$('#last').empty();
		$('#last').append('<strong class="bg-info">Winner - Player 1</strong>');
		return true;
	}
	else if (p2Won)
	{
		++results[1];		
		if (p2IsPC)
		{
			$('#current').empty();
			$('#current').append('<strong class="bg-danger">Computer Won!</strong>');
			$('#last').empty();
			$('#last').append('<strong class="bg-danger">Winner - Computer</strong>');				
		}
		else
		{
			$('#current').empty();
			$('#current').append('<strong class="bg-danger">Player 2 Won!</strong>');			
			$('#last').empty();
			$('#last').append('<strong class="bg-danger">Winner - Player 2</strong>');				
		}
	
		return true;
	}
	else if ((p1Squares.length+p2Squares.length)==9) //CAT
	{
		++results[2];
		$('#last').empty();
		$('#last').append('<strong class="bg-warning">CAT</strong>');			
		return true;
	}
	else
	{
		return false;
	}
		
	
}
/*This is the Computer Player AI. Not too smart, but will but good at tackling the obvious.*/
function computerPlay()
{
	
	var pick=0;
	var picked = false;
	var temp=-1;
	//Has P1 played yet? If not, play middle.
	if (board.indexOf(1)==-1)
	{
		pick = 4;
		picked = true;
	}
	else
	{
		var boardString = board.join('');
		//Where n = New Line, B = blank, 1 = player 1, 2 = player 2
		boardString = boardString.substr(0,3)+'n'+ boardString.substr(3,3) + 'n' + boardString.substr(6,3) + 'n';
		var re;
		var regArray;	
		//console.log(boardString);		
		if (!picked && (board.indexOf(2)!=-1)) //Check if we can win
		{
			
			regArray = [ '2..n.2.n..B' , 'B..n.2.n..2' , '2..n.B.n..2' , '..Bn.2.n2', '..2n.B.n2', '..2n.2.nB', '22Bn','B22n', '2B2n', 'B...2...2', '2...B...2', '2...2...B'];
			//Every winning combo for P2
			for (var i = 0; i<regArray.length; ++i)
			{
				re =RegExp(regArray[i]);
				if (re.test(boardString))
				{
					pick = boardString.search(re) + regArray[i].indexOf('B');
					if (pick>7) //Adjust for end of line character
					{
						pick = pick-2;						
					}
					else if (pick>3)
					{
						pick = pick-1;
					}
					picked = true;
					break;
				}
			}
			//console.log('Win:' , picked, boardString, pick, boardString.search(re), i, regArray[i]);//.indexOf('B'));
		}
		if (!picked)  //Check if we need to block
		{
			regArray = [ '1..n.1.n..B' , 'B..n.1.n..1' , '1..n.B.n..1' , '..Bn.1.n1', '..1n.B.n1', '..1n.1.nB', '11Bn','B11n', '1B1n', 'B...1...1', '1...B...1', '1...1...B'];
			//Every winning combo for P1
			for (var i = 0; i<regArray.length; ++i)
			{
				re =RegExp(regArray[i]);
				if (re.test(boardString))
				{
					pick = boardString.search(re) + regArray[i].indexOf('B');
					if (pick>7) //Adjust for end of line character
					{
						pick = pick-2;						
					}
					else if (pick>3)
					{
						pick = pick-1;
					}					
					picked = true;
					break;
				}
				
			}
			//console.log('Block:' , picked, boardString, pick, boardString.search(re), i, regArray[i]);//.indexOf('B'));
		}
	}
	if (!picked)	//Basic AI strategy (fill in squares randomly) - Not too smart but it plays different every time.
	{
		
		var notUsed='';
		for (var j=0; j<board.length; ++j)
		{
			if (board[j]=="B")
			{
				notUsed += j;
				
			}
		}
		
		pick=notUsed[Math.floor(Math.random()*notUsed.length)];
		picked = true;
		//console.log('Random:' , notUsed, pick);		
	}
	//console.log(pick, picked);
	board[pick]=2;
	var id = boardNames[pick];
	if (p1Symbol!='x')
	{
		$('#'+id).append('<i class="h1 text-danger fa fa-times" aria-hidden="true"></i>' );	
	}
	else
	{
		$('#'+id).append('<i class="h1 text-danger fa fa-circle-thin" aria-hidden="true"></i>' );
	}	
	p1Turn = true;	
	$('#current').empty();
	$('#current').append('<strong class="bg-info">Waiting on Player 1</strong>');	
	if (checkWin())
	{
		nobodyTurn = true;
		upDateScore();
		
		setTimeout(function()
		{
			//console.log('test');
			newGame();
		} , 3000);
	}
	return false;
}