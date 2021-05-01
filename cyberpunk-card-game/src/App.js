// file: src/App.js
import { Client } from 'boardgame.io/react';
//import { Game } from 'boardgame.io/core';
//import {initialState, drawCard} from './GameLogic';
import {CyberpunkCardGame} from './Game';


const App = Client({
  game: CyberpunkCardGame
});

export default App;