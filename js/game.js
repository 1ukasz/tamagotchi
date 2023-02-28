import Tamagotchi from "./modules/tamagotchi.js";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
    this.healthIntervalId = null;
    this.hungerIntervalId = null;
    this.energyIntervalId = null;
    this.funIntervalId = null;
  }

  start = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });
    console.log("Game started");

    this.healthIntervalId = setInterval(this.decreaseHealth, 1000);
    this.hungerIntervalId = setInterval(this.decreaseHunger, 1000);
    this.energyIntervalId = setInterval(this.decreaseEnergy, 2000);
    this.funIntervalId = setInterval(this.decreaseFun, 1000);
  };

  decreaseHealth = () => {
    if (this.tamagotchi.health.value <= 0) {
      this.end();
    } else {
      if (
        this.tamagotchi.hunger.value <= 0 ||
        this.tamagotchi.energy.value <= 0
      )
        this.tamagotchi.health.value--;
      this.tamagotchi.displayHealth(this.tamagotchi.health.element);
    }
  };

  decreaseHunger = () => {
    if (this.tamagotchi.hunger.value > 0) this.tamagotchi.hunger.value--;
    this.tamagotchi.displayHunger(this.tamagotchi.hunger.element);
  };

  decreaseEnergy = () => {
    if (this.tamagotchi.energy.value > 0) {
      this.tamagotchi.energy.value--;
      if (this.tamagotchi.fun.value <= 0) this.tamagotchi.energy.value--;
    }
    this.tamagotchi.displayEnergy(this.tamagotchi.energy.element);
  };

  decreaseFun = () => {
    if (this.tamagotchi.fun.value > 0) this.tamagotchi.fun.value--;
    this.tamagotchi.displayFun(this.tamagotchi.fun.element);
  };

  end = () => {
    clearInterval(this.healthIntervalId);
    clearInterval(this.hungerIntervalId);
    clearInterval(this.energyIntervalId);
    clearInterval(this.funIntervalId);
    console.log("Game over");
  };
}
