import { Client } from 'boardgame.io/react';
//import { Game } from 'boardgame.io/core';
//import {initialState, drawCard} from './GameLogic';
import {CyberpunkCardGame} from './Game';
import GameRender from './GameRender';

const App = Client({
  game: CyberpunkCardGame,
  board: GameRender
});

export default App;