import Tamagotchi from "./modules/tamagotchi.js";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
  }

  start = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement
  }) => {
    this.tamagotchi.mount({
      healthElement,
      hungerElement,
      energyElement,
      funElement,
    });

    console.log("Game started");

    const decreaseHealth = () => {
      if (this.tamagotchi.hunger.value <= 0) this.tamagotchi.health.value--;
      this.tamagotchi.mount({
        healthElement,
        hungerElement,
        energyElement,
        funElement,
      })
      
      if (this.tamagotchi.health.value <= 0) {
        clearInterval(healthId);
        clearInterval(hungerId);
        clearInterval(energyId);
        clearInterval(funId);
        console.log("You lost")
      }
    };

    const decreaseHunger = () => {
      this.tamagotchi.hunger.value--;
      this.tamagotchi.mount({
        healthElement,
        hungerElement,
        energyElement,
        funElement,
      })
    };

    const decreaseEnergy = () => {
      this.tamagotchi.energy.value--;
      if (this.tamagotchi.fun.value <= 0) this.tamagotchi.energy.value--;
      this.tamagotchi.mount({
        healthElement,
        hungerElement,
        energyElement,
        funElement,
      })
    };

    const decreaseFun = () => {
      this.tamagotchi.fun.value--;
      this.tamagotchi.mount({
        healthElement,
        hungerElement,
        energyElement,
        funElement,
      })
    };

    let healthId = setInterval(decreaseHealth, 1000);
    let hungerId = setInterval(decreaseHunger, 1000);
    let energyId = setInterval(decreaseEnergy, 2000);
    let funId = setInterval(decreaseFun, 1000);

  };

}