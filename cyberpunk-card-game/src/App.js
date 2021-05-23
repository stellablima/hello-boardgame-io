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

//http://www.locogame.co.uk/blog/digital-card-game-part-p03/#1-triggered-routines
/*
Pausa para extressar o código pro board
*/