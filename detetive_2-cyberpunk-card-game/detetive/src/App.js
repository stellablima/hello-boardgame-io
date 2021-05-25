import { Client } from 'boardgame.io/react';
import {Detetive} from './Game';
import GameRender from './GameRender';

const App = Client({
  game: Detetive,
  board: GameRender,
  debug: false
});

export default App;