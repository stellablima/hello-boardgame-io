function initialState() {
    return {
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
function drawCard(currentState) {
    // TODO: we'll need a way to know which is the current player 
    // at some point.
    // but for now let's assume it's player 0.
    let playerID = "player_0";
    let player = currentState[playerID];
    // Add the last card in the player's deck to their hand.
    let deckIndex = player.deck.length - 1;
    let hand = [...player.hand, player.deck[deckIndex]];
    // Remove the last card in the deck.
    let deck = player.deck.slice(0, deckIndex);
    // Construct and return a new state object with our changes.
    let playerNew = { ...player, hand, deck };
    let state = { ...currentState, [playerID]: playerNew };
    return state;
}

let state_0 = initialState();
let state_1 = drawCard(state_0);
console.log('state_0', state_0);
console.log('state_1', state_1);