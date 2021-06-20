import { Client } from 'boardgame.io/react';
import {Detetive} from './Game';
import GameRender from './GameRender';
import { Local } from 'boardgame.io/multiplayer';

const DetetiveClient = Client({
  game: Detetive,
  board: GameRender,
  multiplayer: Local(),
  //debug: false,
  numPlayers: 2,

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


const App = () => (
  <div>
    <DetetiveClient playerID="0" />
    <DetetiveClient playerID="1" />
  </div>
);

export default App;