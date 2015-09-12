import Node from './node';
import NodeList from './nodeList';

import _ from 'lodash';

let nodes = [];
const traningData = [
    {rooms: 1, area: 350, type: 'apartment'},
    {rooms: 2, area: 300, type: 'apartment'},
    {rooms: 3, area: 300, type: 'apartment'},
    {rooms: 4, area: 250, type: 'apartment'},
    {rooms: 4, area: 500, type: 'apartment'},
    {rooms: 4, area: 400, type: 'apartment'},
    {rooms: 5, area: 450, type: 'apartment'},

    {rooms: 7,  area: 850,  type: 'house'},
    {rooms: 7,  area: 900,  type: 'house'},
    {rooms: 7,  area: 1200, type: 'house'},
    {rooms: 8,  area: 1500, type: 'house'},
    {rooms: 9,  area: 1300, type: 'house'},
    {rooms: 8,  area: 1240, type: 'house'},
    {rooms: 10, area: 1700, type: 'house'},
    {rooms: 9,  area: 1000, type: 'house'},

    {rooms: 1, area: 800,  type: 'flat'},
    {rooms: 3, area: 900,  type: 'flat'},
    {rooms: 2, area: 700,  type: 'flat'},
    {rooms: 1, area: 900,  type: 'flat'},
    {rooms: 2, area: 1150, type: 'flat'},
    {rooms: 1, area: 1000, type: 'flat'},
    {rooms: 2, area: 1200, type: 'flat'},
    {rooms: 1, area: 1300, type: 'flat'},
];

function bootstrap() {
  const canvas = _.merge(document.createElement('canvas'), {
    id: 'mainCanvas',
    width: 400,
    height: 400,
  })
  document.body.appendChild(canvas);
}

function run() {
  nodes = new NodeList(3);
  for (var i in traningData)
  {
      nodes.add( new Node(traningData[i]) );
  }
  var random_rooms = Math.round( Math.random() * 10 );
  var random_area = Math.round( Math.random() * 2000 );
  nodes.add( new Node({rooms: random_rooms, area: random_area, type: false}) );

  nodes.determineUnknown();
  nodes.draw("mainCanvas");
}

bootstrap();
setInterval(run, 500);
