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

  checkState() {
    if (this.health.value <= 0) {
      this.state = "dead";
    } else if (this.energy.value <= 6) {
      this.state = "sleepy";
    } else if (this.hunger.value <= 6) {
      this.state = "hungry";
    } else if (this.fun.value <= 6) {
      this.state = "bored";
    } else if (
      this.hunger.value >= 7 &&
      this.energy.value >= 7 &&
      this.fun.value >= 7
    ) {
      this.state = "happy";
    }
  }

  updateState() {
    this.checkState();

    const nimo = document.getElementById("nimo");
    const stateText = document.getElementById("petState");

    nimo.classList = "";

    switch (this.state) {
      case "dead":
        nimo.classList.add("-dead");
        stateText.innerText = "DEAD";
        break;
      case "sleepy":
        nimo.classList.add("-sleepy");
        stateText.innerText = "SLEEPY";
        break;
      case "hungry":
        nimo.classList.add("-hungry");
        stateText.innerText = "HUNGRY";
        break;
      case "sleeping":
        nimo.classList.add("-sleeping");
        stateText.innerText = "SLEEPING";
        break;
      case "playing":
        nimo.classList.add("-playing");
        stateText.innerText = "PLAYING";
        break;
      case "eating":
        nimo.classList.add("-eating");
        stateText.innerText = "EATING";
        break;
      case "bored":
        nimo.classList.add("-bored");
        stateText.innerText = "BORED";
        break;
      default:
        nimo.classList.add("-happy");
        stateText.innerText = "HAPPY";
        break;
    }
  }
}
