import { Client } from 'boardgame.io/react';
import {Detetive} from './Game';
import GameRender from './GameRender';

const App = Client({
  game: Detetive,
  board: GameRender,
  debug: false,

  //this.client.start();
  //this.rootElement = rootElement;
  //this.createBoard(); //isso ta no renderGame?
  //this.attachListeners();
  //this.client.subscribe(state => this.update(state)); //callbacks for every state change
  
});



export default App;