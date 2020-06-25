//Generate Random Color pattern
const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColor);
}
