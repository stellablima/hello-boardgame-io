import { Client } from 'boardgame.io/client';
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

const app = new DetetiveClient();*/
class DetetiveClient {
  constructor(rootElement) {
    this.client = Client({ game: Detetive });
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
    // We’ll use the empty <p> to display the game winner later.
    this.rootElement.innerHTML = `
      <table id="tabuleiro">${rows.join('')}</table>
      <p class="winner"></p>
    `;

    //configuração de 600 celulas a mão 
    //selecionar tabela matriz, fazer formula paga pegar linha e coluna pelo id
    // id(23)[0-23][0-24]       id(26)[0-23][0-24]
    // 23//24 = 0 linha         26//24 = 1 linha
    // 23%24 = 23 coluna        26%24  = 2 coluna

    // starts
    document.getElementById('tabuleiro').rows[0].cells[9].className += " cellStart";
    document.getElementById('tabuleiro').rows[0].cells[14].className += " cellStart";
    // inativos
    // salas
    // passagem livre
    // portas
    // passagem secreta

    //this.rootElement.querySelectorAll('.cell');
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
      messageEl.textContent = '';
    }
  }
}

const appElement = document.getElementById('app');
const app = new DetetiveClient(appElement);