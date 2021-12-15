/**
DISTANCE
snail
duck
butterfly
rabbit
swallow

REMEDY
drive
end of speed limit
gas
spare tire
repairs

HAZARD
stop
speed limit
out of gas
flat tire
accident

SAFETY
emergency vehicle
extra tank
puncture proof
driving ace
 */

let cards = [
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: "distance snail" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: "distance duck" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: "distance butterfly" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: "distance rabbit" },
  { name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: "distance swallow" },
  { name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: "distance swallow" },
  { name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: "distance swallow" },
  { name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: "distance swallow" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: "remedy drive" },
  { name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: "remedy end of speed limit" },
  { name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: "remedy end of speed limit" },
  { name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: "remedy end of speed limit" },
  { name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: "remedy end of speed limit" },
  { name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: "remedy end of speed limit" },
  { name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: "remedy end of speed limit" },
  { name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: "remedy gas" },
  { name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: "remedy gas" },
  { name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: "remedy gas" },
  { name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: "remedy gas" },
  { name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: "remedy gas" },
  { name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: "remedy gas" },
  { name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: "remedy spare tire" },
  { name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: "remedy spare tire" },
  { name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: "remedy spare tire" },
  { name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: "remedy spare tire" },
  { name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: "remedy spare tire" },
  { name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: "remedy spare tire" },
  { name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: "remedy accident" },
  { name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: "remedy accident" },
  { name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: "remedy accident" },
  { name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: "remedy accident" },
  { name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: "remedy accident" },
  { name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: "remedy repairs" },
  { name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: "hazard stop" },
  { name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: "hazard stop" },
  { name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: "hazard stop" },
  { name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: "hazard stop" },
  { name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: "hazard stop" },
  { name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: "hazard speed limit" },
  { name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: "hazard speed limit" },
  { name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: "hazard speed limit" },
  { name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: "hazard speed limit" },
  { name: 'gas', type: 'hazard', img: 'img/hazard-gas.png', alt: "hazard out of gas" },
  { name: 'gas', type: 'hazard', img: 'img/hazard-gas.png', alt: "hazard out of gas" },
  { name: 'gas', type: 'hazard', img: 'img/hazard-gas.png', alt: "hazard out of gas" },
  { name: 'tire', type: 'hazard', img: 'img/hazard-tire.png', alt: "hazard flat tire" },
  { name: 'tire', type: 'hazard', img: 'img/hazard-tire.png', alt: "hazard flat tire" },
  { name: 'tire', type: 'hazard', img: 'img/hazard-tire.png', alt: "hazard flat tire" },
  { name: 'accident', type: 'hazard', img: 'img/hazard-accident.png', alt: "hazard accident" },
  { name: 'accident', type: 'hazard', img: 'img/hazard-accident.png', alt: "hazard accident" },
  { name: 'accident', type: 'hazard', img: 'img/hazard-accident.png', alt: "hazard accident" },
  { name: 'ev', type: 'safety', img: 'img/safety-emergency-vehicle.png', alt: "safety emergency vehicle" },
  { name: 'ft', type: 'safety', img: 'img/safety-fuel-truck.png', alt: "safety fuel truck" },
  { name: 'pp', type: 'safety', img: 'img/safety-puncture-proof.png', alt: "safety puncture proof" },
  { name: 'da', type: 'safety', img: 'img/safety-driving-ace.png', alt: "safety driving ace" },
];
// adding an id attribute to reference cards into piles
cards = cards.map((card, index) => { return { id: index, ...card } });

const memoCard = { id: 200, name: 'memo', type: 'help', img: 'img/memo.png', alt: "memo card" };

const noCard = { id: 300, name: 'no-card', type: 'empty', img: 'img/no-card.png', alt: "empty pile: no card" };

const turnedCard = { id: 400, name: 'turned-card', type: 'down', img: 'img/turned-card-decor.png', alt: "turned card: card face down" };

export { cards, memoCard, noCard, turnedCard }
