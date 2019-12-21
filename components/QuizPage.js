import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { connect } from "react-redux";

import { red, white } from "../utils/colors";

// function Card({ question, answer }) {
//   return (
//     <View>
//         <Text>{question}</Text>
//     </View>
//   );
// }
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

  render() {
    const { cards, deckDetails } = this.props;
    const { score, step, showQuestion } = this.state;
    if (step < cards.length) {
      // step 1/3, card 1/3
      // show question (question+show answer button)
      if (showQuestion) {
        return (
          <View style={styles.adddeck}>
            <Text>
              This is card {step} of {cards.length}
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
              This is card {step} of {cards.length}
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
    backgroundColor: "#33cc33",
    padding: 10,
    margin: 15,
    height: 40
  },
  incorrectButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    margin: 15,
    height: 40
  }
});

// main page: quistion, show answer button
// => answer shown, buttons: correct, incorrect that keep track of score (2/4 correct answers)
// wehn a button is clicked(correct/incorrect), 1- update score, 2- go to the next card (question)

//  <View>
//         <Text>This is Quiz page</Text>
//         {cards.map((index, item)=>{
//             return <Card {...item} correct={this.correctSubmit} incorrect={this.incorrectSubmit}/>
//         })}
//       </View>