import { Client } from 'boardgame.io/client';
//import { Local } from 'boardgame.io/multiplayer';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Detetive } from './Game';
//podemos usar qqr ferramenta pra fazer o tabuleiro, aqui é js puro,
//construir tabuleiro aqui, declarar como um array unico no game.js
//o estilo ficou no index.html mesmo
/*
class DetetiveClient {
  constructor() {
    this.client = Client({ game: Detetive });
    this.client.start();
  }
}
//client.updateMatchID('newID');
const app = new DetetiveClient();*/
/*Local({
  // Enable localStorage cache.
  persist: true,

  // Set custom prefix to store data under. Default: 'bgio'.
  storageKey: 'bgio',
}); */
class DetetiveClient {
  constructor(rootElement, { playerID } = {}) {
    this.client = Client({ 
      game: Detetive,
      matchID: 'matchID',
      multiplayer: SocketIO({ server: 'localhost:8000' }),
      playerID,
      numPlayers: 3,
    });
    this.client.start();
    this.rootElement = rootElement;
    this.createBoard();
    this.attachListeners();
    this.client.subscribe(state => this.update(state)); //callbacks for every state change
  }

  createBoard() { 
    const rows = [];
    for (let i = 0; i < 25; i++) {
      const cells = [];
      for (let j = 0; j < 24; j++) {
        const id = 24 * i + j;
        cells.push(`<td class="cell" data-id="${id}"></td>`);
      }
      rows.push(`<tr>${cells.join('')}</tr>`);
    }

    // Add the HTML to our app <div>.
    this.rootElement.innerHTML = `
      <table id="tabuleiro">${rows.join('')}</table>
      <p class="winner"></p>
    `;

      //configuração de 600 celulas
      // id(23)[0-23][0-24]    |   id(26)[0-23][0-24]
      // 23//24 = 0 linha      |   26//24 = 1 linha
      // 23%24 = 23 coluna     |   26%24  = 2 coluna
      //this.rootElement.querySelectorAll('.cell');
      document.getElementById('tabuleiro').rows[0].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[7].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[8].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[9].className += " cellStart";
      document.getElementById('tabuleiro').rows[0].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[14].className += " cellStart";
      document.getElementById('tabuleiro').rows[0].cells[15].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[16].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[0].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[1].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[1].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[1].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[14].className += " cellLivre";
      document.getElementById('tabuleiro').rows[1].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[1].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[1].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[1].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[2].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[2].cells[8].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[15].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[2].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[2].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[2].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[3].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[3].cells[8].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[15].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[3].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[3].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[3].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[4].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[4].cells[8].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[15].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[4].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[4].cells[18].className += " cellPorta";
      document.getElementById('tabuleiro').rows[4].cells[19].className += " cellPassagem";
      document.getElementById('tabuleiro').rows[4].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[4].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[4].className += " cellPassagem";
      document.getElementById('tabuleiro').rows[5].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[5].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[5].cells[8].className += " cellPorta";
      document.getElementById('tabuleiro').rows[5].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[15].className += " cellPorta";
      document.getElementById('tabuleiro').rows[5].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[5].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[5].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[5].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[4].className += " cellPorta";
      document.getElementById('tabuleiro').rows[6].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[8].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[15].className += " cellNull";
      document.getElementById('tabuleiro').rows[6].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[18].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[19].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[20].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[21].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[22].className += " cellLivre";
      document.getElementById('tabuleiro').rows[6].cells[23].className += " cellStart";
      document.getElementById('tabuleiro').rows[7].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[7].cells[1].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[2].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[3].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[4].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[5].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[8].className += " cellNull";
      document.getElementById('tabuleiro').rows[7].cells[9].className += " cellPorta";
      document.getElementById('tabuleiro').rows[7].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[7].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[7].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[7].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[7].cells[14].className += " cellPorta";
      document.getElementById('tabuleiro').rows[7].cells[15].className += " cellNull";
      document.getElementById('tabuleiro').rows[7].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[18].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[19].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[20].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[21].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[22].className += " cellLivre";
      document.getElementById('tabuleiro').rows[7].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[8].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[8].cells[1].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[2].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[3].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[4].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[5].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[10].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[11].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[12].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[13].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[14].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[8].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[8].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[8].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[8].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[8].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[8].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[5].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[10].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[11].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[12].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[13].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[14].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[9].cells[18].className += " cellPorta";
      document.getElementById('tabuleiro').rows[9].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[9].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[7].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[10].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[10].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[10].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[10].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[10].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[10].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[7].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[11].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[11].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[11].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[11].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[11].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[11].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[7].className += " cellPorta";
      document.getElementById('tabuleiro').rows[12].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[12].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[12].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[12].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[12].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[12].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[12].cells[22].className += " cellPorta";
      document.getElementById('tabuleiro').rows[12].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[7].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[13].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[18].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[19].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[20].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[21].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[22].className += " cellLivre";
      document.getElementById('tabuleiro').rows[13].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[7].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[14].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[14].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[14].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[14].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[14].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[20].className += " cellPorta";
      document.getElementById('tabuleiro').rows[14].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[14].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[6].className += " cellPorta";
      document.getElementById('tabuleiro').rows[15].cells[7].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[15].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[15].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[15].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[15].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[15].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[16].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[16].cells[1].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[2].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[3].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[4].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[5].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[10].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[11].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[12].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[13].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[14].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[16].cells[17].className += " cellPorta";
      document.getElementById('tabuleiro').rows[16].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[16].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[16].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[16].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[16].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[16].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[17].cells[0].className += " cellStart";
      document.getElementById('tabuleiro').rows[17].cells[1].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[2].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[3].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[4].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[5].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[9].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[10].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[11].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[12].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[13].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[14].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[17].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[17].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[17].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[17].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[17].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[17].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[17].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[1].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[2].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[3].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[4].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[5].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[6].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[11].className += " cellPorta";
      document.getElementById('tabuleiro').rows[18].cells[12].className += " cellPorta";
      document.getElementById('tabuleiro').rows[18].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[18].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[18].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[5].className += " cellPorta";
      document.getElementById('tabuleiro').rows[19].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[19].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[18].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[19].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[20].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[21].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[22].className += " cellLivre";
      document.getElementById('tabuleiro').rows[19].cells[23].className += " cellStart";
      document.getElementById('tabuleiro').rows[20].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[5].className += " cellPassagem";
      document.getElementById('tabuleiro').rows[20].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[20].cells[14].className += " cellPorta";
      document.getElementById('tabuleiro').rows[20].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[17].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[18].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[19].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[20].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[21].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[22].className += " cellLivre";
      document.getElementById('tabuleiro').rows[20].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[21].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[21].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[21].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[21].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[18].className += " cellPorta";
      document.getElementById('tabuleiro').rows[21].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[21].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[22].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[22].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[22].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[22].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[18].className += " cellPassagem";
      document.getElementById('tabuleiro').rows[22].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[22].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[7].className += " cellLivre";
      document.getElementById('tabuleiro').rows[23].cells[8].className += " cellLivre";
      document.getElementById('tabuleiro').rows[23].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[15].className += " cellLivre";
      document.getElementById('tabuleiro').rows[23].cells[16].className += " cellLivre";
      document.getElementById('tabuleiro').rows[23].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[23].cells[23].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[0].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[1].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[2].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[3].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[4].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[5].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[6].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[7].className += " cellStart";
      document.getElementById('tabuleiro').rows[24].cells[8].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[9].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[10].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[11].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[12].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[13].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[14].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[15].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[16].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[17].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[18].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[19].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[20].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[21].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[22].className += " cellNull";
      document.getElementById('tabuleiro').rows[24].cells[23].className += " cellNull";
       
  }

  attachListeners() { //passando pra game.js qual id da celular clicada
    // This event handler will read the cell id from a cell’s
    // `data-id` attribute and make the `clickCell` move.
    const handleCellClick = event => {
      const id = parseInt(event.target.dataset.id);
      this.client.moves.clickCell(id); //trigger the moves
    };
    // Attach the event listener to each of the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.onclick = handleCellClick;
    });
  }

  //para aparecer visualmente no campo a mudança na casa
  update(state) {
    if (state === null) return;
    // Get all the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    // Update cells to display the values in game state.
    cells.forEach(cell => {
      const cellId = parseInt(cell.dataset.id);
      const cellValue = state.G.cells[cellId];
      cell.textContent = cellValue !== null ? cellValue : '';
    });
    // Get the gameover message element.
    const messageEl = this.rootElement.querySelector('.winner');
    // Update the element to show a winner if any.
    if (state.ctx.gameover) {
      messageEl.textContent =
        state.ctx.gameover.winner !== undefined
          ? 'Winner: ' + state.ctx.gameover.winner
          : 'Draw!';
    } else {
      messageEl.textContent = `It’s player ${state.ctx.currentPlayer}’s turn`;
    }
  }
}

//const appElement = document.getElementById('app');
//const app = new DetetiveClient(appElement);
/*
const appElement = document.getElementById('app');
const playerIDs = ['0', '1']; 
const clients = playerIDs.map(playerID => {
  const rootElement = document.createElement('div');
  appElement.append(rootElement);
  return new DetetiveClient(rootElement, { playerID });
});*/


class App{
  constructor(rootElement) {
    SplashScreen(rootElement).then(playerID => {
      this.client = new DetetiveClient(rootElement, { playerID });
    });
  }
}
function SplashScreen(rootElement) {
  return new Promise(resolve => {
    const createButton = playerID => {
      const button = document.createElement('button');
      button.textContent = 'Player ' + playerID;
      button.onclick = () => resolve(playerID);
      rootElement.append(button);
    };
    rootElement.innerHTML = ` <p>Play as</p>`;
    const playerIDs = ['0', '1', '2'];
    playerIDs.forEach(createButton);
  });
}
const appElement = document.getElementById('app');
const app = new App(appElement);