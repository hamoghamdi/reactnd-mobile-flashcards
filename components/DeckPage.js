// deck page: title, number of cards, buttons: add card, start quiz

import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class DeckPage extends Component {
    render() {
        return (
            <View>
                <Text>
                    hello to deck page, deck id: ....
                </Text>
            </View>
        );
    }
}

export default connect()(DeckPage)