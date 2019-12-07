import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'

function Deck ({title, cards}){
return (
    <View>
        <Text>{title}</Text>
        <Text>cards: {cards.length}</Text>
    </View>
)
}

class Decks extends Component {
  

  renderItem = ({item}) => {
      return <Deck {...item} />
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Decks 
        </Text>
          <FlatList
          data={this.props.decksToArray} 
          renderItem={this.renderItem}/>
        {/* <Text>This is Decks</Text> */}
      </View>
    );
  }
}

function mapStateToProps(decks){
  // console.log("this is connect in Decks.js", decks)
  const decksToArray = Object.values(decks)
  console.log("decks to array ", decksToArray)
  return {
    decksToArray,
    decks
  }
  
}
export default connect(mapStateToProps)(Decks);

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        flex: 1
    }
})

// deck must be touchable opacity
// stack navigation to the deck page 
// deck page: title, number of cards, buttons: add card, start quiz