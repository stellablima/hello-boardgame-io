const { Server } = require('boardgame.io/server');
const { Detetive } = require('./Game');
const server = Server({ games: [Detetive] });

server.run(8000);