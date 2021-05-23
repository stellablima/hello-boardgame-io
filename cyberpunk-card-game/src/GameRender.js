import React from 'react';
import GameHelper  from './GameHelper';
//https://material-ui.com/pt/components/cards/

class Stat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statClass: 'stat'
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                statClass: 'stat highlight'
            });
            setTimeout(() => {
                this.setState({
                    statClass: 'stat'
                });
            }, 2000);
        }
    }

    render() {
        let {icon, value} = this.props;
        let statClass = []
        return <span>
            <img src={"/icon/"+icon+".png"} width="32" className="icon"/>
            <span className={this.state.statClass}>{value}</span>
        </span>;
    }
}

// This is a React component.
// If you've not used React before I recommend you read up on it.
// TODO: Change the Renderer to use three.js
class GameRender extends React.Component {
    renderCard(cardId, zone){
        //quando nao precisa de current state nem ctx
        let {getProp, getAttackProp} = GameHelper;
        let card = this.props.G.cards[cardId];
        let cpuCost = getProp(card, 'cpu_cost');
        let memoryCost = getProp(card, 'memory_cost');
        let strength = getProp(card, 'strength');
        let attacks = card.proto.routines.map((attack, index) => {
            let cpuCost = getAttackProp(card, index, 'cpu_cost');
            let damage = getAttackProp(card, index, 'damage');
            let isDisabled = (card.usedAttacks && card.usedAttacks.includes(index)) || !card.booted;
            let onClick = () => this.prepareAttack(card.id, index);
            return <div key={index}><button onClick={onClick} disabled={isDisabled}>{cpuCost} CPU: Deal {damage} damage.</button></div>;
        });

        let additionalButtons = [];
        if (this.state.currentAttack && zone !== 'hand') {
            // Display a button to cancel an attack.
            if (card.id === this.state.currentAttack.instigatorId) {
                additionalButtons.push(<button key="cancel-attack" onClick={this.cancelAttack}>Cancel Attack</button>);
            } else {
                // Display a button to target a card.
                let onClick = () => {
                    this.attack(this.state.currentAttack.instigatorId, this.state.currentAttack.attackIndex, card.id);
                };
                additionalButtons.push(<button key="target" onClick={onClick}>Target</button>);
            }
        }

        if (zone === 'hand') {
            let onClick = () => this.playCard(card.id);
            additionalButtons.push(<button key="play" onClick={onClick}>Play</button>);
        }
        
        return <div key={card.id} className={`card card-${card.proto.category} card-${card.booted ? 'booted' : 'unbooted'}`}>
            { card.booted || zone === 'hand' ? null : 'booting...'}
            <p>{card.proto.title} [#{card.id}]</p>
                <div class="stats">
                <Stat icon="processor" value={cpuCost} />
                <Stat icon="ram" value={memoryCost} />
                <Stat icon="heart-beats" value={strength} />
            </div>
                {attacks}
                {additionalButtons}
            </div>;
    }

    render() {
        const state = this.props.G;
        const ctx = this.props.ctx;
        const helper = this.helper = new GameHelper(state, ctx);
        const {currentPlayer, playerId} = helper.getCurrentPlayer();
        const {opponentPlayer, opponentPlayerId} = helper.getOpponentPlayer();

        //const playerHand = currentPlayer.hand.map(this.renderCard.bind(this));
        //const opponentHand = opponentPlayer.hand.map(this.renderCard.bind(this));

        const playerHand = currentPlayer.hand.map(c => this.renderCard(c, 'hand'));
        const playerField = currentPlayer.field.map(c => this.renderCard(c, 'field'));
        const opponentHand = opponentPlayer.hand.map(c => this.renderHiddenCard(c, 'hand'));
        const opponentField = opponentPlayer.field.map(c => this.renderCard(c, 'field'));
        return <div>
            <div className="board">
                <div id="hand-player" className="hand">
                    <div class="header">
                        <h4>{playerId}</h4>
                        <h4>Hand:</h4>
                        <div className="stats">
                            <Stat icon="processor" value={currentPlayer.cpu} /><br></br>
                            <Stat icon="ram" value={currentPlayer.memory} />
                        </div>
                    </div>
                    {playerHand}
                </div>
                <div id="field-player" className="field"><h4>Field:</h4>{playerField}</div>
                <div id="field-opponent" className="field"><h4>Field:</h4>{opponentField}</div>
                <div id="hand-opponent" className="hand">
                    <div class="header">
                        <h4>{opponentPlayerId}</h4>
                        <h4>Hand:</h4>
                        <div className="stats">
                            <Stat icon="processor" value={opponentPlayer.cpu} />
                            <Stat icon="ram" value={opponentPlayer.memory} />
                        </div>
                    </div>
                    {opponentHand}
                </div>
            </div>
        </div>;
    }


    // file: src/GameRender.js
    // The constructor method gets called when the GameRender class
    // is instantiated.
    constructor(props) {
        super(props);
        this.state = {};
        // Why .bind? One of Javascript's many pitfalls.
        // When you pass a function to a React callback,
        // the function is called but it loses it's "this" reference
        // to the instantiated class. The .bind fixes that.
        this.prepareAttack = this.prepareAttack.bind(this);
        this.attack = this.attack.bind(this);
        this.cancelAttack = this.cancelAttack.bind(this);
        this.playCard = this.playCard.bind(this);
    }

    // Store the instigator and attack index.
    // We need to wait until the user has selected their target.
    prepareAttack(instigatorId, attackIndex) {
        this.setState({
            currentAttack: {instigatorId, attackIndex},
        });
    }

    attack(instigatorId, attackIndex, targetId) {
        this.props.moves.attack(instigatorId, attackIndex, targetId);
        this.setState({currentAttack: null});
    }

    playCard(cardId) {
        this.props.moves.playCard(cardId);
    }

    cancelAttack() {
        this.setState({currentAttack: null});
    }

    renderHiddenCard(index) {
        return <div key={index} className="card card-hidden"></div>
    }

}

export default GameRender;