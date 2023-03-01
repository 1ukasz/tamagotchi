import Game from "./js/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();

  // Start game
  game.start({
    healthElement: ".health",
    hungerElement: ".hunger",
    energyElement: ".energy",
    funElement: ".fun",
    // nimoClass: ".nimo",
    // happyState: ".-happy",
    // sadState: ".-sad",
    // hungryState: ".-hungry",
    // sleepyState: ".-sleepy",
    // deadState: ".-dead",
    // eatState: ".-eating",
    // playState: ".-playing",
    // sleepState: ".sleeping"
  });
});
