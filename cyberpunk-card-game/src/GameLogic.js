import CardPrototypes from './CardPrototypes.json';
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
            memory: 4
        },
        player_1: {
            deck: [4, 5, 6, 7],
            hand: [],
            field: [],
            maxCpu: 0,
            cpu: 0,
            memory: 4
        }
    };
}
function drawCard(currentState, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    // Add the last card in the player's deck to their hand.
    let deckIndex = currentPlayer.deck.length - 1;
    let hand = ImmutableArray.append(currentPlayer.hand, currentPlayer.deck[deckIndex]);
    // Remove the last card in the deck.
    let deck = ImmutableArray.removeAt(currentPlayer.deck, deckIndex);
    // Construct and return a new state object with our changes.
    return constructStateForPlayer(currentState, playerId, {hand, deck});
}
function playCard(currentState, ctx, cardId) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    // Find the card in their hand and add it to the field.
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let card = currentState.cards[cardId];
    // Ensure the card is in the player's hand and they can afford it.
    if (handIndex !== -1 
            && card 
            && currentPlayer.cpu >= card.proto.cpu_cost 
            && currentPlayer.memory >= card.proto.memory_cost) {
        // Add the card to the player's field.
        let field = ImmutableArray.append(currentPlayer.field, currentPlayer.hand[handIndex]);
        // Remove the card from their hand.
        let hand = ImmutableArray.removeAt(currentPlayer.hand, handIndex);
        // Pay the CPU cost.
        let cpu = currentPlayer.cpu - card.proto.cpu_cost;
        // Pay the Memory cost.
        let memory = currentPlayer.memory - card.proto.memory_cost;
        // Construct and return a new state object with our changes.
        return constructStateForPlayer(currentState, playerId, {hand, field, cpu, memory});
    } else {
        // We return the unchanged state if we can't play a card.
        return currentState;
    }
}
function onTurnStart(currentState, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    let maxCpu = currentPlayer.maxCpu + 1;
     // Iterate through all cards on the player's field.
    let cardUpdates = currentPlayer.field.map(cardId => {
        let currentCard = currentState.cards[cardId];
        // Reset card strength, clear usedAttacks and finish booting.
        let card = {
            ...currentCard, 
            usedAttacks: [],// currentCard.proto.usedAttacks,
            strength: currentCard.proto.strength,
            booted: true, 
        };
        return {index: cardId, value: card};
    });
    // Create a new cards array, with the updated cards.
    let cards = ImmutableArray.multiSet(currentState.cards, cardUpdates);
    // Return the new state object.
    return {...constructStateForPlayer(currentState, playerId, {maxCpu, cpu: maxCpu}), cards};
   // return constructStateForPlayer(currentState, playerId, {maxCpu, cpu: maxCpu});
}
function getCurrentPlayer(state, ctx) {
    let playerId = "player_" + ctx.currentPlayer;
    let currentPlayer = state[playerId];
    return {currentPlayer, playerId};
}
function getOpponentPlayer(state, ctx) {
    let opponentPlayerId;
    if(ctx.currentPlayer){
        opponentPlayerId = "player_0";
    }
    else{
        opponentPlayerId = "player_1";
    }
    let opponentPlayer = state[opponentPlayerId];
    return {opponentPlayer, opponentPlayerId};
}
/*
getOpponentPlayer() {
    let opponentPlayerId = "player_" + ((this.ctx.currentPlayer === "0") ? "1" : "0");
    let opponentPlayer = this.state[opponentPlayerId];
    return {opponentPlayer, opponentPlayerId};
}*/

function constructStateForPlayer(currentState, playerId, playerState) {
    let newPlayerState = Object.assign({}, currentState[playerId], playerState);
    return {...currentState, [playerId]: newPlayerState};
}
const ImmutableArray = {
    append(arr, value) {
        return [...arr, value];
    },
    removeAt(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    },
    multiSet: (currentStateCards, cardUpdates) => {
        //ImmutableArray.multiSet: should return a new array, with the listed indices changed to the listed values.
        return [...currentStateCards];
    }

};
function attack(currentState, ctx, instigatorId, attackIndex, targetId) {
    let { currentPlayer, playerId } = getCurrentPlayer(currentState, ctx);
    let { opponentPlayer, opponentPlayerId } = getOpponentPlayer(currentState, ctx);
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
            let cpu = currentPlayer.cpu - getAttackProp(instigator, attackIndex, 'cpu_cost');
            // Reduce the target's strength.
            let strength = getProp(target, 'strength') - getAttackProp(instigator, attackIndex, 'damage');
            let nTarget = { ...target, strength };
            // 'Use' up the attack for this turn.
            let usedAttacks = instigator.usedAttacks || [];
            usedAttacks = [...usedAttacks, attackIndex];
            let nInstigator = { ...instigator, usedAttacks };
            // Return the new state object.
            let cards = ImmutableArray.multiSet(currentState.cards, [
                { index: instigatorId, value: nInstigator },
                { index: targetId, value: nTarget }
            ]);
            return {...constructStateForPlayer(currentState, playerId, {cpu}), cards};
        }
    }
    if (strength <= 0) {
        currentState = trashCard(currentState, ctx, opponentPlayerId, "field", targetId);
    }
    return currentState;
}
function getProp(card, propName) {
    return card[propName] || card.proto[propName];
}
function getAttackProp(card, attackIndex, propName) {
    let protoAttack = card.proto.attacks[attackIndex];
    if (card.attacks) {
        return card.attacks[attackIndex][propName] || protoAttack[propName]
    } else {
        return protoAttack[propName];
    }
}
/*
let state_0 = initialState();
let state_1 = drawCard(state_0);
console.log('state_0', state_0);
console.log('state_1', state_1);
*/
function trashCard(currentState, ctx, playerId, zoneId, cardId) {
    const card = currentState.cards[cardId];
    const player = currentState[playerId];
    const currentZone = player[zoneId];
    const isCardValid = card && currentZone.includes(cardId);
    if (isCardValid) {
        // Add the card to the player's trash.
        const trash = ImmutableArray.append(player.trash, cardId);
        // Remove the card from it's current location.
        let currentZoneIndex = currentZone.indexOf(cardId);
        const zone = ImmutableArray.removeAt(currentZone, currentZoneIndex);
        return constructStateForPlayer(currentState, playerId, {trash, [zoneId]: zone});
    }
    return currentState;
}


export {initialState, drawCard, playCard, onTurnStart, attack};