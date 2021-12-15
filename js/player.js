import { SWALLOW_CARD_NAME, CARD_DISTANCE_VALUE } from "./data.js";


class Player {
  constructor(id, name, age) {
    this.id = id,
    this.name = name,
    this.age = age,
    this.handPile = [],
    this.speedPile = [],
    this.battlePile = [],
    this.distancePile = [],
    this.safetyPile = [],
    this.isDrivingAce = {status: false, coupFourre: false},
    this.isEmergencyVehicle = {status: false, coupFourre: false},
    this.isFuelTruck = {status: false, coupFourre: false},
    this.isPunctureProof = {status: false, coupFourre: false}
  }

  // hasDrivingAce() {}
  // hasEmergencyVehicle() {}
  // hasFuelTruck() {}
  // hasPunctureProof() {}
  // checkCoupFourre() {}
  // setCoupFourre() {}

  countSwallows() {
    if (this.distancePile.length === 0) return 0;
    return this.distancePile.filter(distanceCard => {
      return distanceCard.name === SWALLOW_CARD_NAME; 
    }).length;
  }

  countDistance() {
    if (this.distancePile.length === 0) return 0;
    return this.distancePile.reduce((distanceDone, card) => {
      return distanceDone + CARD_DISTANCE_VALUE[card.name];
    });
  }

  updateSafetyStatus(isCoupFourre) {
    if (this.safetyPile.length > 0) {
      console.log(`this.safetyPile`, this.safetyPile, this.safetyPile.length);
      for (const card of this.safetyPile) {
        console.log(`--- updateSafetyStatus: card`, card);
        switch (card.name) {
          case 'ev':
            this.isEmergencyVehicle.status = true;
            this.isEmergencyVehicle.coupFourre = isCoupFourre;
            break;
          case 'ft':
            this.isFuelTruck.status = true;
            this.isFuelTruck.coupFourre = isCoupFourre;
            break;
          case 'pp':
            this.isPunctureProof.status = true;
            this.isPunctureProof.coupFourre = isCoupFourre;
            break;
          case 'da':
            this.isDrivingAce.status = true;
            this.isDrivingAce.coupFourre = isCoupFourre;
            break;
          default:
            console.log('No such safety card!');
            break;
        }
      }
    }
  }
} 

export { Player }