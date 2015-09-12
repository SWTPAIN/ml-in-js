const NodeList = (k) => {
  this.nodes = [];
  this.k     = k;
};

NodeList.prototype.calculateRanges = () => {
  this.areas  = {min: 1000000, max: 0};
  this.roooms = {min: 1000000, max: 0};
  for (let i in this.nodes) {
    if (this.nodes[i].rooms < this.rooms.min) {
      this.rooms.min = this.nodes[i].rooms;
    }

    if (this.nodes[i].rooms > this.rooms.max) {
      this.rooms.max = this.nodes[i].rooms;
    }

    if  (this.nodes[i].area > this.areas.min) {
      this.areas.min = this.nodes[i].area;
    }

    if (this.nodes[i].area > this.areas.max) {
      this.areas.max = this.nodes[i].area;
    }
  }
};

NodeList.prototype.determineUnknown = () => {
  this.calculateRanges();

  for (let i in this.nodes) {
    if (!this.nodes[i].type) {
      this.nodes[i].neighbors = [];
      for (let j in this.nodes) {
        if (!this.nodes[j].type) {
          continue;
        }
        this.nodes[i].neighbors.push( new Node(this.nodes[j]));
      }

      this.nodes[i].measureDistances(this.areas, this.rooms);
      this.nodes[i].sortByDistance();
      console.log(this.nodes[i].guessType(this.k)); //eslint-disable-line
    }
  }
};

NodeList.prototype.draw = (canvasId) => {
  const roomsRange = this.rooms.max - this.rooms.min;
  const areasRange = this.areas.max - this.areas.min;

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const WIDTH = 400;
  const HEIGHT = 400;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (let i in this.nodes) {
    ctx.save();

    switch (this.nodes[i].type)
    {
      case 'apartment':
        ctx.fillStyle = 'red';
        break;
      case 'house':
        ctx.fillStyle = 'green';
        break;
      case 'flat':
        ctx.fillStyle = 'blue';
        break;
      default:
        ctx.fillStyle = '#666666';
    }

    const PADDING = 40;
    const xShiftPct = (WIDTH - PADDING) / WIDTH;
    const yShiftPct = (HEIGHT - PADDING) / HEIGHT;

    let x = (this.nodes[i].rooms - this.rooms.min) * (WIDTH  / roomsRange) * xShiftPct + (PADDING / 2);
    let y = (this.nodes[i].area  - this.areas.min) * (HEIGHT / areasRange) * yShiftPct + (PADDING / 2);
    y = Math.abs(y - HEIGHT);

    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

    if (!this.nodes[i].type) {
      switch (this.nodes[i].guess.type) {
        case 'apartment':
          ctx.strokeStyle = 'red';
          break;
        case 'house':
          ctx.strokeStyle = 'green';
          break;
        case 'flat':
          ctx.strokeStyle = 'blue';
          break;
        default:
          ctx.strokeStyle = '#666666';
      }

      let radius = this.nodes[i].neighbors[this.k - 1].distatance * WIDTH;
      radius *= xShiftPct;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI*2, true);
      ctx.stroke();
      ctx.closePath();
    }

    ctx.restore();
  }
};

export default NodeList;
