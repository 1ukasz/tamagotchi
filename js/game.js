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
    this.btnListeners();
    console.log("Game started");
  };

  decreaseHealth = () => {
    this.tamagotchi.checkState();
    if (this.tamagotchi.health.value == 0) {
      this.end();
    } else {
      if (
        this.tamagotchi.hunger.value <= 0 ||
        this.tamagotchi.energy.value <= 0
      )
        this.tamagotchi.health.value--;
      this.tamagotchi.displayHealth(this.tamagotchi.health.element);
      this.tamagotchi.updateState();
    }
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
      if (this.tamagotchi.fun.value <= 0 && this.tamagotchi.energy.value > 0)
        this.tamagotchi.energy.value--;
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

  btnSingleListener = (stateClass, statePrompt) => {
    this.end();
    nimo.classList = "";
    this.nimo.classList.add(stateClass);
    this.stateText.innerText = statePrompt;
  };

  displayTimeout = (displayMethod, element) => {
    setTimeout(() => {
      displayMethod(element); // this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
      this.resume();
      this.tamagotchi.checkState();
      this.tamagotchi.updateState();
    }, 3000);
  };

  btnListeners = () => {
    eatBtn.addEventListener("click", () => {
      this.btnSingleListener("-eating", "EATING");
      this.tamagotchi.hunger.value += 2;
      this.displayTimeout(
        this.tamagotchi.displayHunger,
        this.tamagotchi.hunger.element
      );
    });
    sleepBtn.addEventListener("click", () => {
      this.btnSingleListener("-sleeping", "SLEEPING");
      this.tamagotchi.energy.value += 2;
      this.displayTimeout(
        this.tamagotchi.displayEnergy,
        this.tamagotchi.energy.element
      );
    });
    playBtn.addEventListener("click", () => {
      this.btnSingleListener("-playing", "PLAYING");
      this.tamagotchi.fun.value += 2;
      this.displayTimeout(
        this.tamagotchi.displayFun,
        this.tamagotchi.fun.element
      );
    });
  };
}
