import { Client } from 'boardgame.io/react';
import {Detetive} from './Game';
import GameRender from './GameRender';
import { Local } from 'boardgame.io/multiplayer';
import React, { Component } from "react";

class App extends Component {
  state = {
    numPlayers: 3,
  };

  render() {

    const { numPlayers } = this.state;
    const DetetiveClient = Client({
      board: GameRender,
      game: Detetive,
      multiplayer: Local(),
      numPlayers,
      //debug: false,
    });

    return (
    <div>
      <div className="homeDiv">
        <DetetiveClient playerID="0"/>
      </div>
      <div className="homeDiv">
        <DetetiveClient playerID="1"/>
      </div>
      <div className="homeDiv">
        <DetetiveClient playerID="2"/>
      </div>
    </div>
    );
  }
}


export default App;
