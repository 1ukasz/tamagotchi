import Tamagotchi from "./modules/tamagotchi.js";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
    this.healthIntervalId = setInterval(this.decreaseHealth, 1000);
    this.hungerIntervalId = setInterval(this.decreaseHunger, 1000);
    this.energyIntervalId = setInterval(this.decreaseEnergy, 2000);
    this.funIntervalId = setInterval(this.decreaseFun, 1000);
  }

  start = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });
    this.tamagotchi.checkState();
    this.BtnListeners();
    console.log("Game started");
  };

  decreaseHealth = () => {
    this.tamagotchi.checkState();
    if (this.tamagotchi.health.value <= 0) {
      this.end();
      console.log("Game over");
    } else {
      if (
        this.tamagotchi.hunger.value <= 0 ||
        this.tamagotchi.energy.value <= 0
      )
        this.tamagotchi.health.value--;
      this.tamagotchi.displayHealth(this.tamagotchi.health.element);
    }
    this.tamagotchi.updateState();
  };

  decreaseHunger = () => {
    this.tamagotchi.checkState();
    if (this.tamagotchi.hunger.value > 0) this.tamagotchi.hunger.value--;
    this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
    this.tamagotchi.updateState();
  };

  decreaseEnergy = () => {
    this.tamagotchi.checkState();
    if (this.tamagotchi.energy.value > 0) {
      this.tamagotchi.energy.value--;
      if (this.tamagotchi.fun.value <= 0) this.tamagotchi.energy.value--;
    }
    this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
    this.tamagotchi.updateState();
  };

  decreaseFun = () => {
    this.tamagotchi.checkState();
    if (this.tamagotchi.fun.value > 0) this.tamagotchi.fun.value--;
    this.tamagotchi.displayFun(this.tamagotchi.fun.element);
    this.tamagotchi.updateState();
  };

  end = () => {
    clearInterval(this.healthIntervalId);
    clearInterval(this.hungerIntervalId);
    clearInterval(this.energyIntervalId);
    clearInterval(this.funIntervalId);
  };

  resume = () => {
    this.healthIntervalId = setInterval(this.decreaseHealth, 1000);
    this.hungerIntervalId = setInterval(this.decreaseHunger, 1000);
    this.energyIntervalId = setInterval(this.decreaseEnergy, 2000);
    this.funIntervalId = setInterval(this.decreaseFun, 1000);
  };

  eatBtn = document.getElementById("eatBtn");
  sleepBtn = document.getElementById("sleepBtn");
  playBtn = document.getElementById("playBtn");
  nimo = document.getElementById("nimo");
  stateText = document.getElementById("petState");

  BtnListeners = () => {
    eatBtn.addEventListener("click", () => {
      this.end();
      nimo.classList = "";
      this.nimo.classList.add("-eating");
      this.stateText.innerText = "EATING";
      this.tamagotchi.hunger.value += 2;
      setTimeout(() => {
        this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
        this.resume();
        this.tamagotchi.updateState();
      }, 3000);
    });
    sleepBtn.addEventListener("click", () => {
      this.end();
      nimo.classList = "";
      this.nimo.classList.add("-sleeping");
      this.stateText.innerText = "SLEEPING";
      this.tamagotchi.energy.value += 2;
      setTimeout(() => {
        this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
        this.resume();
        this.tamagotchi.updateState();
      }, 3000);
    });
    playBtn.addEventListener("click", () => {
      this.end();
      nimo.classList = "";
      this.nimo.classList.add("-playing");
      this.stateText.innerText = "PLAYING";
      this.tamagotchi.fun.value += 2;
      setTimeout(() => {
        this.tamagotchi.displayFun(this.tamagotchi.fun.element);
        this.resume();
        this.tamagotchi.updateState();
      }, 3000);
    });
  };
}
