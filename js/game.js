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

    const decreaseHealth = () => {
      if (this.tamagotchi.health.value <= 0) {
        this.end({
          healthInterval: this.healthIntervalId,
          hungerInterval: this.hungerIntervalId,
          energyInterval: this.energyIntervalId,
          funInterval: this.funIntervalId,
        });
      } else {
        if (
          this.tamagotchi.hunger.value <= 0 ||
          this.tamagotchi.energy.value <= 0
        )
          this.tamagotchi.health.value--;
        this.tamagotchi.displayHealth(healthElement);
      }
    };

    const decreaseHunger = () => {
      if (this.tamagotchi.hunger.value > 0) this.tamagotchi.hunger.value--;
      this.tamagotchi.displayHunger(hungerElement);
    };

    const decreaseEnergy = () => {
      if (this.tamagotchi.energy.value > 0) {
        this.tamagotchi.energy.value--;
        if (this.tamagotchi.fun.value <= 0) this.tamagotchi.energy.value--;
      }
      this.tamagotchi.displayEnergy(energyElement);
    };

    const decreaseFun = () => {
      if (this.tamagotchi.fun.value > 0) this.tamagotchi.fun.value--;
      this.tamagotchi.displayFun(funElement);
    };

    this.healthIntervalId = setInterval(decreaseHealth, 1000);
    this.hungerIntervalId = setInterval(decreaseHunger, 1000);
    this.energyIntervalId = setInterval(decreaseEnergy, 2000);
    this.funId = setInterval(decreaseFun, 1000);
  };

  end = ({ healthInterval, hungerInterval, energyInterval, funInterval }) => {
    clearInterval(healthInterval);
    clearInterval(hungerInterval);
    clearInterval(energyInterval);
    clearInterval(funInterval);
    console.log("Game over");
  };
}
