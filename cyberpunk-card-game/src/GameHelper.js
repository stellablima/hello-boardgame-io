class GameHelper {
    constructor(currentState, ctx) {
        this.state = currentState;
        this.ctx = ctx
    }
    
    // These are marked static because
    // they don't need access to state or ctx.
    static getProp(card, propName) {
        return card[propName] || card.proto[propName];
    }

    static getAttackProp(card, attackIndex, propName) {
        let protoAttack = card.proto.attacks[attackIndex];
        if (card.attacks) {
            return card.attacks[attackIndex][propName] || protoAttack[propName]
        } else {
            return protoAttack[propName];
        }
    }
    
    getCurrentPlayer() {
        let playerId = "player_" + this.ctx.currentPlayer;
        let currentPlayer = this.state[playerId];
        return {currentPlayer, playerId};
    }

    getOpponentPlayer() {
        let opponentPlayerId = "player_" + ((this.ctx.currentPlayer === "0") ? "1" : "0");
        let opponentPlayer = this.state[opponentPlayerId];
        return {opponentPlayer, opponentPlayerId};

        /*
            let opponentPlayerId; 
            if(ctx.currentPlayer === '0'){//console.log('AQUI: ctx.currentPlayer:'+ctx.currentPlayer)
                opponentPlayerId = "player_1";
            }
            else{
                opponentPlayerId = "player_0";
            }
            let opponentPlayer = state[opponentPlayerId];
            return {opponentPlayer, opponentPlayerId};
        */
    }

    updateState(state) {
        this.state = state;
    }
/*rever a logica de passar parametros x e atualizar os x e tentar arrumar função multset em cima disso

rever onde retorna {hand, field, cpu, memory} e rever quais sao necessariaos se falta mais algum pra enviar

*/
    constructStateForPlayer(playerId, playerState) {
        let newPlayerState = Object.assign({}, this.state[playerId], playerState);
        return {...this.state, [playerId]: newPlayerState};
    }
}//const help = new GameHelper(currentState, ctx);

export default GameHelper;