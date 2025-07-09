export class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  get brand() {
    return this.#brand;
  }

  get model() {
    return this.#model;
  }

  go() {
    if (this.isTrunkOpen) {
      console.log(`Cannot drive: the trunk is open.`);
      return;
    }
    this.speed = Math.min(this.speed + 5, 200);
  }

  brake() {
    this.speed = Math.max(this.speed - 5, 0);
  }

  openTrunk() {
    if (this.speed > 0) {
      console.log(`Cannot open trunk while moving.`);
      return;
    }
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.brand} ${this.model}, speed: ${this.speed} km/h, trunk: ${trunkStatus}`);
  }
}

export class RaceCar extends Car {
  acceleration;

  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }

  go() {
    this.speed = Math.min(this.speed + this.acceleration, 300);
  }

  openTrunk() {
    console.log(`Race cars do not have a trunk.`);
  }

  closeTrunk() {
    console.log(`Race cars do not have a trunk.`);
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, speed: ${this.speed} km/h (Race Car)`);
  }
}
