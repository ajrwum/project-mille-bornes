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
  { id: 0 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 1 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 2 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 3 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 4 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 5 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 6 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 7 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 8 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 9 , name: 'snail', type: 'distance', img: 'img/distance-snail.png', alt: 'distance snail' },
  { id: 10 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 11 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 12 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 13 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 14 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 15 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 16 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 17 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 18 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 19 , name: 'duck', type: 'distance', img: 'img/distance-duck.png', alt: 'distance duck' },
  { id: 20 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 21 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 22 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 23 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 24 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 25 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 26 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 27 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 28 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 29 , name: 'butterfly', type: 'distance', img: 'img/distance-butterfly.png', alt: 'distance butterfly' },
  { id: 30 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 31 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 32 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 33 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 34 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 35 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 36 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 37 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 38 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 39 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 40 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 41 , name: 'rabbit', type: 'distance', img: 'img/distance-rabbit.png', alt: 'distance rabbit' },
  { id: 42 , name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: 'distance swallow' },
  { id: 43 , name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: 'distance swallow' },
  { id: 44 , name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: 'distance swallow' },
  { id: 45 , name: 'swallow', type: 'distance', img: 'img/distance-swallow.png', alt: 'distance swallow' },
  { id: 46 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 47 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 48 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 49 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 50 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 51 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 52 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 53 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 54 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 55 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 56 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 57 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 58 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 59 , name: 'drive', type: 'remedy', img: 'img/remedy-drive.png', alt: 'remedy drive' },
  { id: 60 , name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: 'remedy end of speed limit' },
  { id: 61 , name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: 'remedy end of speed limit' },
  { id: 62 , name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: 'remedy end of speed limit' },
  { id: 63 , name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: 'remedy end of speed limit' },
  { id: 64 , name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: 'remedy end of speed limit' },
  { id: 65 , name: 'speed', type: 'remedy', img: 'img/remedy-speed.png', alt: 'remedy end of speed limit' },
  { id: 66 , name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: 'remedy gas' },
  { id: 67 , name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: 'remedy gas' },
  { id: 68 , name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: 'remedy gas' },
  { id: 69 , name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: 'remedy gas' },
  { id: 70 , name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: 'remedy gas' },
  { id: 71 , name: 'gas', type: 'remedy', img: 'img/remedy-gas.png', alt: 'remedy gas' },
  { id: 72 , name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: 'remedy spare tire' },
  { id: 73 , name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: 'remedy spare tire' },
  { id: 74 , name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: 'remedy spare tire' },
  { id: 75 , name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: 'remedy spare tire' },
  { id: 76 , name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: 'remedy spare tire' },
  { id: 77 , name: 'tire', type: 'remedy', img: 'img/remedy-tire.png', alt: 'remedy spare tire' },
  { id: 78 , name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: 'remedy accident' },
  { id: 79 , name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: 'remedy accident' },
  { id: 80 , name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: 'remedy accident' },
  { id: 81 , name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: 'remedy accident' },
  { id: 82 , name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: 'remedy accident' },
  { id: 83 , name: 'accident', type: 'remedy', img: 'img/remedy-accident.png', alt: 'remedy repairs' },
  { id: 84 , name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: 'hazard stop' },
  { id: 85 , name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: 'hazard stop' },
  { id: 86 , name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: 'hazard stop' },
  { id: 87 , name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: 'hazard stop' },
  { id: 88 , name: 'stop', type: 'hazard', img: 'img/hazard-stop.png', alt: 'hazard stop' },
  { id: 89 , name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: 'hazard speed limit' },
  { id: 90 , name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: 'hazard speed limit' },
  { id: 91 , name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: 'hazard speed limit' },
  { id: 92 , name: 'speed', type: 'hazard', img: 'img/hazard-speed.png', alt: 'hazard speed limit' },
  { id: 93 , name: 'gas', type: 'hazard', img: 'img/hazard-gas.png', alt: 'hazard out of gas' },
  { id: 94 , name: 'gas', type: 'hazard', img: 'img/hazard-gas.png', alt: 'hazard out of gas' },
  { id: 95 , name: 'gas', type: 'hazard', img: 'img/hazard-gas.png', alt: 'hazard out of gas' },
  { id: 96 , name: 'tire', type: 'hazard', img: 'img/hazard-tire.png', alt: 'hazard flat tire' },
  { id: 97 , name: 'tire', type: 'hazard', img: 'img/hazard-tire.png', alt: 'hazard flat tire' },
  { id: 98 , name: 'tire', type: 'hazard', img: 'img/hazard-tire.png', alt: 'hazard flat tire' },
  { id: 99 , name: 'accident', type: 'hazard', img: 'img/hazard-accident.png', alt: 'hazard accident' },
  { id: 100 , name: 'accident', type: 'hazard', img: 'img/hazard-accident.png', alt: 'hazard accident' },
  { id: 101 , name: 'accident', type: 'hazard', img: 'img/hazard-accident.png', alt: 'hazard accident' },
  { id: 102 , name: 'ev', type: 'safety', img: 'img/safety-emergency-vehicle.png', alt: 'safety emergency vehicle' },
  { id: 103 , name: 'ft', type: 'safety', img: 'img/safety-fuel-truck.png', alt: 'safety fuel truck' },
  { id: 104 , name: 'pp', type: 'safety', img: 'img/safety-puncture-proof.png', alt: 'safety puncture proof' },
  { id: 105 , name: 'da', type: 'safety', img: 'img/safety-driving-ace.png', alt: 'safety driving ace' },
];

const memoCard = { id: 200, name: 'memo', type: 'help', img: 'img/memo.png', alt: 'memo card' };

const noCard = { id: 300, name: 'no-card', type: 'empty', img: 'img/no-card.png', alt: 'empty pile: no card' };

const turnedCard = { id: 400, name: 'turned-card', type: 'down', img: 'img/turned-card-decor.png', alt: 'turned card: card face down' };

export { cards, memoCard, noCard, turnedCard }
