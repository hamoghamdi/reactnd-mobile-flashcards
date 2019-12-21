import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import { red, white, incorrectRed, green } from "../utils/colors";

class QuizPage extends Component {
  state = {
    score: 0,
    step: 0,
    showQuestion: true
  };
  correctSubmit = () => {
    this.setState((prev, props)=>{
      return {
        step: prev.step+1,
        score: prev.score+1,
        showQuestion: true
      }
    })
  };
  incorrectSubmit = () => {
    this.setState((prev, props)=>{
      return {
        step: prev.step + 1,
        showQuestion: true
      };
  })
}
  showAnswer = () =>{
    this.setState(()=>{
      return {
        showQuestion: false
      }
    })
  }
  reset = () => {
    this.setState(()=>{
      return {
        score: 0,
        step: 0,
        showQuestion: true
      };
    })
  }

  render() {
    const { cards, deckDetails, id } = this.props;
    const { score, step, showQuestion } = this.state;
    if (step < cards.length) {
      // step 1/3, card 1/3
      // show question (question+show answer button)
      if (showQuestion) {
        return (
          <View style={styles.adddeck}>
            <Text>
              This is card {step+1} of {cards.length}
            </Text>
            <Text>Question is: {cards[step].question}</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.showAnswer}
            >
              <Text style={styles.submitButtonText}>show answer</Text>
            </TouchableOpacity>
          </View>
        );
        // show answer (correct+incorrect buttons)
      } else {
        return (
          <View style={styles.adddeck}>
            <Text>
              This is card {step+1} of {cards.length}
            </Text>
            <Text>answer is: {cards[step].answer}</Text>
            <TouchableOpacity
              style={styles.correctButton}
              onPress={this.correctSubmit}
            >
              <Text style={styles.submitButtonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrectButton}
              onPress={this.incorrectSubmit}
            >
              <Text style={styles.submitButtonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } // else, score 'page'
    return (
      <View style={styles.adddeck}>
        <Text>Your score is {score}</Text>
        <TouchableOpacity style={styles.submitButton} onPress={this.reset}>
          <Text style={styles.submitButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.props.navigation.navigate("DeckPage", { deckID: id })
          }
        >
          <Text style={styles.submitButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
// cards = [ {id, quistion, answer}, {id, question, answer}]
function mapStateToPrpos(decks, props){
   const id = props.navigation.state.params.deckID;
   const deckDetails = decks[id];
   console.log(" deckDetails in Quiz page", deckDetails)
   const cards = deckDetails.cards
    return {
        decks,
        deckDetails,
        cards,
        id
    }

}
export default connect(mapStateToPrpos)(QuizPage);

const styles = StyleSheet.create({
  adddeck: {
    marginTop: 50,
    flex: 1
  },
  submitButton: {
    backgroundColor: red,
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: white
  },
  correctButton: {
    backgroundColor: green,
    padding: 10,
    margin: 15,
    height: 40
  },
  incorrectButton: {
    backgroundColor: incorrectRed,
    padding: 10,
    margin: 15,
    height: 40
  }
});