import './main.css';

const Node = function(object) {
  for (let key in object) {
    this[key] = object[key];
  }
};

Node.prototype.measureDistances = function(areaRangeObj, roomsRangeObj) {
  const roomsRange = roomsRangeObj.max - roomsRangeObj.min;
  const areaRange  = areaRangeObj.max - areaRangeObj.min;

  for (let i in this.neighbors) {
    const neighbor = this.neighbors[i];
    let deltaRooms = (neighbor.rooms - this.rooms) / roomsRange;
    let deltaArea  = (neighbor.area - this.area) / areaRange;

    neighbor.distance = Math.sqrt( deltaRooms * deltaRooms + deltaArea * deltaArea);
  }
};

Node.prototype.sortByDistance = function() {
  this.neighbors.sort((a, b) => {
    return a.distance - b.distance;
  });
};

Node.prototype.guessType = function(k) {
  let types = {};

  for (let i in this.neighbors.slice(0, k)) {
    let neighbor = this.neighbors[i];

    if (!types[neighbor.type]) {
      types[neighbor.type] = 0;
    }
    types[neighbor.type] += 1;
  }
  let guess = {type: false, count: 0};
  for (let type in types) {
    if (types[type] > guess.count) {
      guess.type = type;
      guess.count = types[type];
    }
  }

  this.guess = guess;
  return this.guess.type;
};

export default Node;
