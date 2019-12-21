// action types
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

// generate ID function
function generateID() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}
// action creators

function addDeck(newDeck) {
  return {
    type: ADD_DECK,
    newDeck
  };
}
// export
export function handleAddDeck(title) {
  return dispatch => {
    const deckID = generateID();
    dispatch(addDeck({ id: deckID, title, cards: [] }));
  };
}


function addCard(deckID, newCard) {
  // { question, answer }, deckID
  return {
    type: ADD_CARD,
    deckID,
    newCard
  };
}

// export
export function handleAddCard(deckID, content) {
  // { question, answer }, deckID
  return dispatch => {
    content.id = generateID();
    const newCard = content;
    console.log("this is handle addd card ",deckID);
    dispatch(addCard(deckID, newCard));
  };
}

