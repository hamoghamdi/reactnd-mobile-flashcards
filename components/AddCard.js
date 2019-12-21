import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from 'react-redux'
import { red, white } from "../utils/colors";

import { handleAddCard } from "../redux/actions";

class AddCard extends Component {
    state = {
        question: "",
        answer: ""
    }
    handleSubmit = () =>{
        const { question, answer } = this.state
        const deckID = this.props.deckID; /// from connect
        console.log("this is handle submit in add card ", deckID);
        this.props.dispatch(handleAddCard(deckID, { question, answer }));
        this.setState(()=>{
            return {
              question: "",
              answer: ""
            };
        })

    }
    render() {
        return (
          <View style={styles.addcard}>
            <Text>Question</Text>
            <TextInput
              label="Question"
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={text => this.setState({ question: text })}
              placeholder="Question"
              value={this.state.question}
            />
            <Text>Answer</Text>
            <TextInput
              label="Answer"
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={text => this.setState({ answer: text })}
              placeholder="Answer"
              value={this.state.answer}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.handleSubmit}
            >
              <Text style={styles.submitButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

function mapStateToProps(decks, props){
    const deckID = props.navigation.state.params.deckID;
    console.log("this is connect in add card ", deckID);
    console.log(
      " props.navigation.state.params ",
      props.navigation.state.params
    );
    return {
        decks,
        deckID
    }
}

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  addcard: {
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
  }
});
// two fileds: qustion and answer - DONE
// no need to redirect anywhere
// submit button => dispatch 

// Add card