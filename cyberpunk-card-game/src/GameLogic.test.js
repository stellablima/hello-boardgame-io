// file: src/GameLogic.test.js
import {initialState, drawCard} from './GameLogic';

let mockState = {
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

// The test function is provided automatically by the 
// framework that was installed when we used create-react-app.
test('drawing a card', () => {
    let state_0 = initialState(mockState);
    let state_1 = drawCard(state_0);
    expect(state_0.player_0.deck).toEqual([0, 1, 2, 3]);
    expect(state_1.player_0.deck).toEqual([0, 1, 2]);
    expect(state_0.player_0.hand).toEqual([]);
    expect(state_1.player_0.hand).toEqual([3]);
});