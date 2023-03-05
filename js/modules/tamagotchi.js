export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1, element: null };
    this.hunger = { value: 10, importance: 3, element: null };
    this.energy = { value: 10, importance: 2, element: null };
    this.fun = { value: 10, importance: 4, element: null };
    this.state = null;
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

  states = {
    dead: "dead",
    sleepy: "sleepy",
    hungry: "hungry",
    bored: "bored",
    happy: "happy",
    sleeping: "sleeping",
    playing: "playing",
    eating: "eating",
  };

  checkState() {
    if (this.health.value <= 0) {
      this.state = this.states.dead;
    } else if (this.energy.value <= 6) {
      this.state = this.states.sleepy;
    } else if (this.hunger.value <= 6) {
      this.state = this.states.hungry;
    } else if (this.fun.value <= 6) {
      this.state = this.states.bored;
    } else if (
      this.hunger.value >= 7 &&
      this.energy.value >= 7 &&
      this.fun.value >= 7
    ) {
      this.state = this.states.happy;
    }
  }

  updateState() {
    this.checkState();

    const nimo = document.getElementById("nimo");
    const stateText = document.getElementById("petState");

    nimo.classList = "";

    switch (this.state) {
      case this.states.dead:
        nimo.classList.add(`-${this.states.dead}`);
        stateText.innerText = this.states.dead.toUpperCase();
        break;
      case this.states.sleepy:
        nimo.classList.add(`-${this.states.sleepy}`);
        stateText.innerText = this.states.sleepy.toUpperCase();
        break;
      case this.states.hungry:
        nimo.classList.add(`-${this.states.hungry}`);
        stateText.innerText = this.states.hungry.toUpperCase();
        break;
      case this.states.sleeping:
        nimo.classList.add(`-${this.states.sleeping}`);
        stateText.innerText = this.states.sleeping.toUpperCase();
        break;
      case this.states.playing:
        nimo.classList.add(`-${this.states.playing}`);
        stateText.innerText = this.states.playing.toUpperCase();
        break;
      case this.states.eating:
        nimo.classList.add(`-${this.states.eating}`);
        stateText.innerText = this.states.eating.toUpperCase();
        break;
      case this.states.bored:
        nimo.classList.add(`-${this.states.bored}`);
        stateText.innerText = this.states.bored.toUpperCase();
        break;
      default:
        nimo.classList.add(`-${this.states.happy}`);
        stateText.innerText = this.states.happy.toUpperCase();
        break;
    }
  }
}
