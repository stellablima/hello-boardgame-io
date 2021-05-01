function initialState(ctx, state) {
    return state ||
    {
        cards: ["one", "two", "three", "four", "five", "six", "seven", "eight"],
        player_0: {
            deck: [0, 1, 2, 3],
            hand: [],
            field: []
        },
        player_1: {
            deck: [4, 5, 6, 7],
            hand: [],
            field: []
        }
    };
}
function drawCard(currentState, ctx) {
    // TODO: we'll need a way to know which is the current player 
    // at some point.
    // but for now let's assume it's player 0.
    let playerID = "player_0";
    let currentPlayer = currentState[playerID];
    // Add the last card in the player's deck to their hand.
    let deckIndex = currentPlayer.deck.length - 1;
    let hand = [...currentPlayer.hand, currentPlayer.deck[deckIndex]];
    // Remove the last card in the deck.
    let deck = currentPlayer.deck.slice(0, deckIndex);
    // Construct and return a new state object with our changes.
    let player = { ...currentPlayer, hand, deck };
    let state = { ...currentState, [playerID]: player };
    return state;
}
function playCard(currentState, ctx, cardId) {
    let playerID = "player_0";
    let currentPlayer = currentState[playerID];
    // Find the card in their hand and add it to the field.
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let field = [...currentPlayer.field, currentPlayer.hand[handIndex]];
    // Remove the card from their hand.
    let hand = [...currentPlayer.hand.slice(0, handIndex), ...currentPlayer.hand.slice(handIndex+1)];
    // Construct and return a new state object with our changes.
    let player = {...currentPlayer, hand, field};
    let state = {...currentState, [playerID]: player};
    return state;
}

/*
let state_0 = initialState();
let state_1 = drawCard(state_0);
console.log('state_0', state_0);
console.log('state_1', state_1);
*/
export {initialState, drawCard, playCard};