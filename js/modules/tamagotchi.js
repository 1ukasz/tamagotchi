export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1, element: ".health" };
    this.hunger = { value: 10, importance: 3, element: ".hunger" };
    this.energy = { value: 10, importance: 2, element: ".energy" };
    this.fun = { value: 10, importance: 4, element: ".fun" };
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
    this.displayHunger(hungerElement);
    this.displayEnergy(energyElement);
    this.displayFun(funElement);
  };
}
