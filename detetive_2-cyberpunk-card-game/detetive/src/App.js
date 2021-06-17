import { Client } from 'boardgame.io/react';
import {Detetive} from './Game';
import GameRender from './GameRender';

const App = Client({
  game: Detetive,
  board: GameRender,
  //debug: false,
  numPlayers: 3,

  //this.client.start();
  //this.rootElement = rootElement;
  //this.createBoard(); //isso ta no renderGame?
  //this.attachListeners();
  //this.client.subscribe(state => this.update(state)); //callbacks for every state change
  
  /*
  tentar colocar dinamica de mais de um jogador, telas individuais ou algo assim
  https://github.com/boardgameio/boardgame.io/blob/main/docs/documentation/turn-order.md
  */
});



export default App;