export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1, element: null };
    this.hunger = { value: 10, importance: 3, element: null };
    this.energy = { value: 10, importance: 2, element: null };
    this.fun = { value: 10, importance: 4, element: null };
    console.log("Tamagotchi initialized");
  }

  displayHealth = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.health.value;
  };

  displayHunger = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.hunger.value;
  };

  displayEnergy = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.energy.value;
  };

  displayFun = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.fun.value;
  };

  mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.displayHealth(healthElement);
    this.health.element = healthElement;
    this.displayHunger(hungerElement);
    this.hunger.element = hungerElement;
    this.displayEnergy(energyElement);
    this.energy.element = energyElement;
    this.displayFun(funElement);
    this.fun.element = funElement;
  };
}
