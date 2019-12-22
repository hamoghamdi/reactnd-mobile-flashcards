// deck page: title, number of cards, buttons: add card, start quiz
// Navigate to add card page when add card button clicked, send in the deck ID
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { red, white } from "../utils/colors";

class DeckPage extends Component {

    render() {
        const { deckDetails, id } = this.props
        return (
          <View>
            <View style={styles.deckCard}>
              <Text>Title: {deckDetails.title}</Text>
              <Text>Cards: {deckDetails.cards.length}</Text>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>
                this.props.navigation.navigate("AddCard", { deckID: id })
              }
            >
              <Text style={styles.submitButtonText}>Add Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>
                this.props.navigation.navigate("QuizPage", { deckID: id })
              }
            >
              <Text style={styles.submitButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

function mapStateToProps(decks, props){
    let id = props.navigation.state.params.deckID;
    const title = props.navigation.state.params.deckTitle;
    const decksValues = Object.values(decks);
    
    if(title !== undefined){
      decksValues.map(deck => {
        if (deck.title === title) {
          id = deck.id;
        }
      });
    } 
      const deckDetails = decks[id];
      console.log("deck details.. ", deckDetails);
      console.log("deckID in connect deck page..", id);

    
    return {
        decks,
        deckDetails,
        id
    }
}

export default connect(mapStateToProps)(DeckPage);

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: red,
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: white
  },
  deckCard: {
    padding: 10,
    margin: 25,
    borderWidth: 0.5,
    borderColor: red
  }
});