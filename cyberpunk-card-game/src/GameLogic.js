import CardPrototypes from './CardPrototypes.json';
import GameHelper  from './GameHelper';

const util = require('util');

function initialState(ctx, state) {
    let cardId = 0;
    let cards = [];
    CardPrototypes.forEach(card => {
				// Add 3 copies of each card to the game.
        for (let duplicate = 0; duplicate < 3; duplicate++) {
            cards.push({
                id: cardId++,
                proto: card
            });
        }
    });
    return state || {
        cards,
        player_0: {
            deck: [0, 1, 2, 3],
            hand: [],
            field: [],
            maxCpu: 0,
            cpu: 0,
            memory: 4,
            trash: []
        },
        player_1: {
            deck: [4, 5, 6, 7],
            hand: [],
            field: [],
            maxCpu: 0,
            cpu: 0,
            memory: 4,
            trash: []
        }
    };
}
function drawCard(currentState, ctx) {
    const help = new GameHelper(currentState, ctx);
    let {currentPlayer, playerId} = help.getCurrentPlayer();
    // Add the last card in the player's deck to their hand.
    let deckIndex = currentPlayer.deck.length - 1;
    let hand = ImmutableArray.append(currentPlayer.hand, currentPlayer.deck[deckIndex]);
    // Remove the last card in the deck.
    let deck = ImmutableArray.removeAt(currentPlayer.deck, deckIndex);
    // Construct and return a new state object with our changes.
    return help.constructStateForPlayer(playerId, {hand, deck});
}
function playCard(currentState, ctx, cardId) {
    const help = new GameHelper(currentState, ctx);
    let {currentPlayer, playerId} = help.getCurrentPlayer();
    // Find the card in their hand and add it to the field.
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let card = currentState.cards[cardId];
    //console.log('currentPlayer:'+util.inspect(currentPlayer, false, null, true))
    // Ensure the card is in the player's hand and they can afford it.
    if (handIndex !== -1 
            && card 
            && currentPlayer.cpu >= card.proto.cpu_cost 
            && currentPlayer.memory >= card.proto.memory_cost) {
        // Add the card to the player's field. 
        //console.log('Ensure the card is in the players hand and they can afford it')
        let field = ImmutableArray.append(currentPlayer.field, currentPlayer.hand[handIndex]);
        // Remove the card from their hand.
        let hand = ImmutableArray.removeAt(currentPlayer.hand, handIndex);
        // Pay the CPU cost.
        let cpu = currentPlayer.cpu - card.proto.cpu_cost;
        // Pay the Memory cost.
        let memory = currentPlayer.memory - card.proto.memory_cost;
        // Construct and return a new state object with our changes.
        return help.constructStateForPlayer(playerId, {hand, field, cpu, memory});
    } else {
        // We return the unchanged state if we can't play a card.
        return currentState;
    }
}
/* 
os turnos estão bugados. o jogo nao tem turno
*/
function onTurnStart(currentState, ctx) {
    const help = new GameHelper(currentState, ctx);
    let {currentPlayer, playerId} = help.getCurrentPlayer();
    
    let maxCpu = currentPlayer.maxCpu + 1;
    // Iterate through all cards on the player's field.
    //a essa altura o player nao tem carta nenhuma carta em campo?
    //let cardUpdates = currentPlayer.cards.map(cardId => {
        //let currentCard = cardId; //e que ele retorna o proprio obj e nao o indice
        //a função na ta sendo executada
    let cardUpdates = currentPlayer.field.map(cardId => {
        let currentCard = currentState.cards[cardId];
        // Reset card strength, clear usedAttacks and finish booting.
        let card = {
            ...currentCard, 
            usedAttacks: [],// currentCard.usedAttacks,
            strength: currentCard.proto.strength,
            booted: true, 
        };
        //return {index: cardId.id, value: card};
        return {card};
    });
    // Create a new cards array, with the updated cards.

    let cards = ImmutableArray.multiSet(currentState.cards, (cardUpdates[0] ? [cardUpdates[0].card] : []));
    // Return the new state object.

    //console.log('currentState:'+util.inspect(currentState, false, null, true))
    //console.log('state:'+util.inspect(state, false, null, true)) //atualizou
    const state = drawCard(currentState, ctx);
    const help2 = new GameHelper(state, ctx);
    return {...help2.constructStateForPlayer(playerId, {maxCpu, cpu: maxCpu}), cards}; //mas no front nao F

    //return {...help.constructStateForPlayer(playerId, {maxCpu, cpu: maxCpu}), cards}; //nao consigo fazer comprar automaticamente n sei pq
}
const ImmutableArray = {
    append(arr, value) {
        return [...arr, value];
    },
    removeAt(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    },
    multiSet: (currentStateCards, cardUpdates) => {
        console.log('currentStateCards:'+util.inspect(currentStateCards, false, null, true))
        console.log('cardUpdates:'+util.inspect(cardUpdates, false, null, true))
        let newCurrentStateCards = currentStateCards.map(currentCard => {
            cardUpdates.map(cardUpdated => {
                if (cardUpdated && cardUpdated.id === currentCard.id)
                    currentCard = cardUpdated
            })
            return currentCard;
        });
        return [...newCurrentStateCards];
    }    
};
function attack(currentState, ctx, instigatorId, attackIndex, targetId) {
    const help = new GameHelper(currentState, ctx);
    let { currentPlayer, playerId } = help.getCurrentPlayer();
    let { opponentPlayer, opponentPlayerId } = help.getOpponentPlayer();
    // Get the card that instigates the attack, and the attack target from the current state.
    let instigator = currentState.cards[instigatorId];
    let target = currentState.cards[targetId];
    // Check that the cards are valid and in the correct zones.
    let areCardsValid = instigator
        && target
        && currentPlayer.field.includes(instigatorId)
        && opponentPlayer.field.includes(targetId)
       
    if (areCardsValid) {

        let attack = instigator.proto.attacks[attackIndex];
       

        // Check if the player can afford the cpu cost of the attack and the attack has not already
        // been used this turn.
        let didUseAttack = (instigator.usedAttacks && instigator.usedAttacks.includes(attackIndex));
        let canAttack = !didUseAttack && instigator.booted && currentPlayer.cpu >= attack.cpu_cost;
        
        if (canAttack) {
            // Pay the CPU cost.
            let {getProp, getAttackProp} = GameHelper;
            let cpu = currentPlayer.cpu - getAttackProp(instigator, attackIndex, 'cpu_cost');
            // Reduce the target's strength.
        
            let strength = getProp(target, 'strength') - getAttackProp(instigator, attackIndex, 'damage');
            let nTarget = { ...target, strength };
            // 'Use' up the attack for this turn.
            let usedAttacks = instigator.usedAttacks || [];
            usedAttacks = [...usedAttacks, attackIndex];
            let nInstigator = { ...instigator, usedAttacks };
            // Return the new state object.
            /*
            let cards = ImmutableArray.multiSet(currentState.cards, [
                { index: instigatorId, value: nInstigator },
                { index: targetId, value: nTarget }
            ]);*/
            let cards = ImmutableArray.multiSet(currentState.cards, [nInstigator, nTarget]);
           
            /*
            console.log('currentState.cards:'+util.inspect(currentState.cards, false, null, true))
            console.log('...:'+util.inspect([
                { index: instigatorId, value: nInstigator },
                { index: targetId, value: nTarget }
            ], false, null, true))*/
            //console.log('attack return:'+util.inspect({...constructStateForPlayer(currentState, playerId, {cpu}), cards}, false, null, true))
            
            if (strength <= 0) {
                currentState = trashCard(currentState, ctx, opponentPlayerId, "field", targetId);
            }
            //console.log('currentState:'+util.inspect(currentState, false, null, true))
            
            return ({...help.constructStateForPlayer(playerId, {cpu}), cards});
        }
    }
    
    return currentState;
}
function trashCard(currentState, ctx, playerId, zoneId, cardId) {
    const help = new GameHelper(currentState, ctx);
    const card = currentState.cards[cardId];
    const player = currentState[playerId];
    const currentZone = player[zoneId];
    const isCardValid = card && currentZone.includes(cardId);
    if (isCardValid) {
        // Add the card to the player's trash.
        const trash = ImmutableArray.append(player.trash, cardId);
        //console.log('player:'+util.inspect(player, false, null, true))
        // Remove the card from it's current location.
        let currentZoneIndex = currentZone.indexOf(cardId);
        const zone = ImmutableArray.removeAt(currentZone, currentZoneIndex);
        return help.constructStateForPlayer(playerId, {trash, [zoneId]: zone});
    }
    return currentState;
}

export {initialState, drawCard, playCard, onTurnStart, attack};