import { Client } from 'boardgame.io/react';
import {Detetive} from './Game';
import GameRender from './GameRender';
import React from "react";
import { SocketIO } from 'boardgame.io/multiplayer'




class App extends React.Component {
  state = { playerID: null };
  render() {
    const DetetiveClient = Client({
      game: Detetive,
      board: GameRender,
      debug: false,
      numPlayers: 3,
      matchID: 'matchID',
      multiplayer: SocketIO({ server: "localhost:8000" })
    });

  
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
          <button onClick={() => this.setState({ playerID: "2" })}>
            Player 2
          </button>
        </div>
      );
    }
    return (
      <div>
        <DetetiveClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;

