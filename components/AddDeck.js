//  title input and a 'Create Deck' button
// Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {red, white} from '../utils/colors'

import { connect } from 'react-redux'
import { handleAddDeck } from '../redux/actions'

class AddDeck extends Component {
    state = {
        text:""
    }

    handleSubmit = () => {
      this.props.dispatch(handleAddDeck(this.state.text))
        this.setState(()=>{
            return { text: ""}
        })
    }
    render() {
        return (
          <View style={styles.adddeck}>
            <Text> This is add deck</Text>
            <TextInput
            label="Title"
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={text => this.setState({ text })}
              placeholder="Deck Title"
              value={this.state.text}
            />
            <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmit}>
                <Text style={styles.submitButtonText}>Create Deck</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

function mapStateToProps(decks){
  // console.log("state . decks", decks)
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck);

const styles = StyleSheet.create({
  adddeck: {
    marginTop: 50,
    flex: 1
  },
  submitButton: {
    backgroundColor: red,
    padding: 10,
    margin: 15,
    height: 40,
    
  },
  submitButtonText: {
    color: white
  }
});

// connect to store -DONE 
// get title from input -handle change ---onChangeText -DONE
// dispatch add deck - DONE
// handle submit => redirect to decks page , something.navigate() 