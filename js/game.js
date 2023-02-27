import Tamagotchi from "./modules/tamagotchi.js";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
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
          healthInterval: healthId,
          hungerInterval: hungerId,
          energyInterval: energyId,
          funInterval: funId,
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

    let healthId = setInterval(decreaseHealth, 1000);
    let hungerId = setInterval(decreaseHunger, 1000);
    let energyId = setInterval(decreaseEnergy, 2000);
    let funId = setInterval(decreaseFun, 1000);
  };

  end = ({ healthInterval, hungerInterval, energyInterval, funInterval }) => {
    clearInterval(healthInterval);
    clearInterval(hungerInterval);
    clearInterval(energyInterval);
    clearInterval(funInterval);
    console.log("Game over");
  };
}
