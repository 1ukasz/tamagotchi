export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1, element: null };
    this.hunger = { value: 10, importance: 3, element: null };
    this.energy = { value: 10, importance: 2, element: null };
    this.fun = { value: 10, importance: 4, element: null };
    this.currentState = null;
    console.log("Tamagotchi initialized");
  }

  displayHealth = () => {
    const displayElement = document.querySelector(this.health.element);
    displayElement.innerText = this.health.value;
  };

  displayHunger = () => {
    const displayElement = document.querySelector(this.hunger.element);
    displayElement.innerText = this.hunger.value;
  };

  displayEnergy = () => {
    const displayElement = document.querySelector(this.energy.element);
    displayElement.innerText = this.energy.value;
  };

  displayFun = () => {
    const displayElement = document.querySelector(this.fun.element);
    displayElement.innerText = this.fun.value;
  };

  mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.health.element = healthElement;
    this.displayHealth(healthElement);
    this.hunger.element = hungerElement;
    this.displayHunger(hungerElement);
    this.energy.element = energyElement;
    this.displayEnergy(energyElement);
    this.fun.element = funElement;
    this.displayFun(funElement);
  };
}
