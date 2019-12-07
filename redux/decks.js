// import 
import { ADD_CARD, ADD_DECK } from './actions'

// reducer
export default function decks(state ={}, action){
    switch(action.type){          
        case ADD_DECK: 
            return {
                ...state,
                [action.newDeck.id]: action.newDeck
            }

        case ADD_CARD: 
            return {
                ...state,
                [action.deckID]: {
                    ...state[action.deckID],
                    cards: state[action.deckID].cards.concat([action.newCard])
                    
                }
            }

        default: return state 
    }
}

// export reducer for create store


/*
 state = {
   Decks: {
     deckOne: {
       Cards: [{
         cardOne: {
           question: "",
           answer: ""
         } },
         { cardTwo: {
           question: "",
           answer: ""
         } } ]
       }
     },
     deckTwo: {
       Cards: [ {
         cardOne: {
           question: "",
           answer: ""
         },
         { cardTwo: {
           question: "",
           answer: ""
         }
        }]
       }
     }
   }
 };
 */