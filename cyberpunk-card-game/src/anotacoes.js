let cardUpdates = [
    {
      index: 0,
      value: {
        id: 0,
        proto: {
          id: 'cracker_01a',
          title: 'Cracker v1.0',
          category: 'program',
          cpu_cost: 1,
          memory_cost: 1,
          strength: 1,
          attacks: [ { cpu_cost: 1, damage: 2 } ]
        },
        usedAttacks: [ 0 ],
        strength: 1,
        booted: true
      }
    },
    {
      index: 1,
      value: {
        id: 1,
        proto: {
          id: 'cracker_01a',
          title: 'Cracker v1.0',
          category: 'program',
          cpu_cost: 1,
          memory_cost: 1,
          strength: 1,
          attacks: [ { cpu_cost: 1, damage: 2 } ]
        },
        usedAttacks: [],
        strength: -1,
        booted: true
      }
    }
]

let currentStateCards = [
    {
      id: 0,
      proto: {
        id: 'cracker_01a',
        title: 'Cracker v1.0',
        category: 'program',
        cpu_cost: 1,
        memory_cost: 1,
        strength: 1,
        attacks: [ { cpu_cost: 1, damage: 2 } ]
      },
      usedAttacks: [ 0 ],
      strength: 1,
      booted: true
    },
    {
      id: 1,
      proto: {
        id: 'cracker_01a',
        title: 'Cracker v1.0',
        category: 'program',
        cpu_cost: 1,
        memory_cost: 1,
        strength: 1,
        attacks: [ { cpu_cost: 1, damage: 2 } ]
      },
      usedAttacks: [],
      strength: -1,
      booted: true
    },
    {
      id: 2,
      proto: {
        id: 'cracker_01a',
        title: 'Cracker v1.0',
        category: 'program',
        cpu_cost: 1,
        memory_cost: 1,
        strength: 1,
        attacks: [ { cpu_cost: 1, damage: 2 } ]
      },
      usedAttacks: [],
      strength: 1,
      booted: true
    },
    {
      id: 3,
      proto: {
        id: 'cracker_01b',
        title: 'Cracker v1.1',
        category: 'program',
        cpu_cost: 1,
        memory_cost: 1,
        strength: 2,
        attacks: [ { cpu_cost: 1, damage: 1 } ]
      },
      usedAttacks: [],
      strength: 2,
      booted: true
    },
    {
      id: 4,
      proto: {
        id: 'cracker_01b',
        title: 'Cracker v1.1',
        category: 'program',
        cpu_cost: 1,
        memory_cost: 1,
        strength: 2,
        attacks: [ { cpu_cost: 1, damage: 1 } ]
      },
      usedAttacks: [],
      strength: 2,
      booted: true
    },
    {
      id: 5,
      proto: {
        id: 'cracker_01b',
        title: 'Cracker v1.1',
        category: 'program',
        cpu_cost: 1,
        memory_cost: 1,
        strength: 2,
        attacks: [ { cpu_cost: 1, damage: 1 } ]
      },
      usedAttacks: [],
      strength: 2,
      booted: true
    },
    {
      id: 6,
      proto: {
        id: 'cracker_02',
        title: 'Cracker v2.0',
        category: 'program',
        cpu_cost: 2,
        memory_cost: 1,
        strength: 2,
        attacks: [ { cpu_cost: 1, damage: 2 }, { cpu_cost: 2, damage: 3 } ]
      },
      usedAttacks: [],
      strength: 2,
      booted: true
    },
    {
      id: 7,
      proto: {
        id: 'cracker_02',
        title: 'Cracker v2.0',
        category: 'program',
        cpu_cost: 2,
        memory_cost: 1,
        strength: 2,
        attacks: [ { cpu_cost: 1, damage: 2 }, { cpu_cost: 2, damage: 3 } ]
      },
      usedAttacks: [],
      strength: 2,
      booted: true
    },
    {
      id: 8,
      proto: {
        id: 'cracker_02',
        title: 'Cracker v2.0',
        category: 'program',
        cpu_cost: 2,
        memory_cost: 1,
        strength: 2,
        attacks: [ { cpu_cost: 1, damage: 2 }, { cpu_cost: 2, damage: 3 } ]
      },
      usedAttacks: [],
      strength: 2,
      booted: true
    }
]



init(currentStateCards, cardUpdates)
function init (currentStateCards, cardUpdates) {

    cardUpdates.map(card => {
    /*socorrr arrumar, seila meio que ja retorna atualizada HELP im fadigada*/
    })

    return currentStateCards;
}
multiSet: (currentStateCards, cardUpdates) => {

    let newCurrentStateCards = cardUpdates.map(card => {
        
        let currentCardId = card.index; 
        let currentCardValue = card.value; 

        currentStateCards[currentCardId] = currentCardValue;
        return currentCardValue;
    });

    //console.log('newCurrentStateCards:'+util.inspect(newCurrentStateCards, false, null, true))

    return [...newCurrentStateCards];
}
    //ImmutableArray.multiSet: should return a new array, with the listed indices changed to the listed values.
    //ARRRRRRRRRRRRRRRRRRRR

    /*
    no caso cardUpdates sstate tem id e value
    e currentStateCards tem as cartas limpas é pra retornar as cartas limpas com as alterações

    cardUpdates0 quem vai atacar - instigator
    cardUpdates1 atacado - target

    currentStateCards recebe os 9 cards completinhos
    */
    //console.log('cardUpdates:'+util.inspect(cardUpdates, false, null, true))
    //console.log('currentStateCards:'+util.inspect(currentStateCards, false, null, true))
    //console.log('[...newCurrentStateCards]:'+util.inspect([...newCurrentStateCards], false, null, true))



    multiSet: (currentStateCards, cardUpdates) => {
      let newCurrentStateCards = cardUpdates.map(card => {
          let currentCardValue = card.value; 
          
          return currentCardValue;
      });
     
      console.log('[...newCurrentStateCards]:'+util.inspect([...newCurrentStateCards], false, null, true))
      return [...newCurrentStateCards];
      
  }

  multiSet: (currentStateCards, cardUpdates) => {
    console.log('currentStateCards:'+util.inspect(currentStateCards, false, null, true))
    console.log('cardUpdates:'+util.inspect(newCurrentStateCards, false, null, true))
    let newCurrentStateCards = currentStateCards.map(card => {
        cardUpdates.map(cardUpdated => {
            if (cardUpdated.id === card.id)
                card = cardUpdated
        })
        return card;
    });
    //console.log('[...newCurrentStateCards]:'+util.inspect([...newCurrentStateCards], false, null, true))
    return [...newCurrentStateCards];
    
}


multiSet: (currentStateCards, cardUpdates) => {
  let newCurrentStateCards = currentStateCards.map(card => {
      let currentCardId = card.id; 
      
      return currentCardValue;
  });
 
  console.log('[...newCurrentStateCards]:'+util.inspect([...newCurrentStateCards], false, null, true))
  return [...newCurrentStateCards];
  
}