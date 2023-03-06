import Tamagotchi from "./modules/tamagotchi.js";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
    this.healthIntervalId = setInterval(this.decreaseHealth, 1000);
    this.hungerIntervalId = setInterval(this.decreaseHunger, 1000);
    this.energyIntervalId = setInterval(this.decreaseEnergy, 2000);
    this.funIntervalId = setInterval(this.decreaseFun, 1000);
  }

  start = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    btnEatId,
    btnSleepId,
    btnPlayId,
  }) => {
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });
    this.btnEatElement = btnEatId;
    this.btnSleepElement = btnSleepId;
    this.btnPlayElement = btnPlayId;
    this.tamagotchi.checkState();
    this.btnListeners();
    console.log("Game started");
  };

  decreaseHealth = () => {
    this.tamagotchi.checkState();
    if (this.tamagotchi.health.value == 0) {
      this.end();
      console.log("Game Over");
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

  nimo = document.getElementById("nimo");
  stateText = document.getElementById("petState");
  eatBtn = document.getElementById(this.btnEatElement);
  sleepBtn = document.getElementById(this.btnSleepElement);
  playBtn = document.getElementById(this.btnPlayElement);

  btnSingleListener = (stateClass, statePrompt) => {
    this.end();
    this.nimo.classList = "";
    this.nimo.classList.add(stateClass);
    this.stateText.innerText = statePrompt.toUpperCase();
  };

  handleEat = () => {
    if (this.tamagotchi.state !== this.tamagotchi.states.eating) {
      this.tamagotchi.state = this.tamagotchi.states.eating;
      clearInterval(this.sleepingIntervalId);
      clearInterval(this.playingIntervalId);
      this.btnSingleListener(
        `-${this.tamagotchi.states.eating}`,
        this.tamagotchi.states.eating
      );
      this.eatingIntervalId = setInterval(() => {
        this.tamagotchi.hunger.value += 2;
        this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
      }, 1000);
    } else {
      clearInterval(this.eatingIntervalId);
      this.tamagotchi.updateState();
      this.resume();
    }
  };

  handleSleep = () => {
    if (this.tamagotchi.state !== this.tamagotchi.states.sleeping) {
      this.tamagotchi.state = this.tamagotchi.states.sleeping;
      clearInterval(this.eatingIntervalId);
      clearInterval(this.playingIntervalId);
      this.btnSingleListener(
        `-${this.tamagotchi.states.sleeping}`,
        this.tamagotchi.states.sleeping
      );
      this.sleepingIntervalId = setInterval(() => {
        this.tamagotchi.energy.value += 2;
        this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
      }, 1000);
    } else {
      clearInterval(this.sleepingIntervalId);
      this.tamagotchi.updateState();
      this.resume();
    }
  };

  handlePlay = () => {
    if (this.tamagotchi.state !== this.tamagotchi.states.playing) {
      this.tamagotchi.state = this.tamagotchi.states.playing;
      clearInterval(this.eatingIntervalId);
      clearInterval(this.sleepingIntervalId);
      this.btnSingleListener(
        `-${this.tamagotchi.states.playing}`,
        this.tamagotchi.states.playing
      );
      this.playingIntervalId = setInterval(() => {
        this.tamagotchi.fun.value += 2;
        this.tamagotchi.energy.value--;
        if (this.tamagotchi.energy.value <= 0) {
          clearInterval(this.playingIntervalId);
          this.tamagotchi.updateState();
          this.resume();
        }
        this.tamagotchi.displayFun(this.tamagotchi.fun.element);
        this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
      }, 1000);
    } else {
      clearInterval(this.playingIntervalId);
      this.tamagotchi.updateState();
      this.resume();
    }
  };

  btnListeners = () => {
    eatBtn.addEventListener("click", () => {
      this.handleEat();
    });
    sleepBtn.addEventListener("click", () => {
      this.handleSleep();
    });
    playBtn.addEventListener("click", () => {
      this.handlePlay();
    });
  };
}
