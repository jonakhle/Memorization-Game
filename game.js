//Generate Random Color pattern
const buttonColours = [ 'red', 'blue', 'green', 'yellow' ];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
	if (!started) {
		//3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
		$('#level-title').text('Level ' + level);
		nextSequence();
		started = true;
	}
});

$('.btn').on('click', function() {
	let userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	level++;
	$('#level-title').text('Level ' + level);
	const randomNumber = Math.floor(Math.random() * 4);
	const randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}

function playSound(name) {
	let audio = new Audio('sounds/' + name + '.mp3');
	audio.play();
}

function animatePress(currentColour) {
	$('.' + currentColour).addClass('pressed');
	setTimeout(function() {
		$('.' + currentColour).removeClass('pressed');
	}, 100);
}

function restartGame() {
	$('h1').text('Game Over, Press Any Key to Restart');
	started = false;
	level = 0;
	gamePattern.length = 0;
	userClickedPattern.length = 0;
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log('success');

		//4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
		if (userClickedPattern.length === gamePattern.length) {
			//5. Call nextSequence() after a 1000 millisecond delay.
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	}
	else {
		let audio = new Audio('sounds/wrong.mp3');
		audio.play();
		$('body').addClass('game-over');
		setTimeout(function() {
			$('body').removeClass('game-over');
		}, 200);
		restartGame();
	}
}
