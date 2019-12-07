import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white, purple, red } from './utils/colors'
// redux 
import { createStore } from "redux";
import { Provider } from "react-redux";
import decks from './redux/decks'
import middleware from './redux/middleware'

const store = createStore(decks, middleware);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, marginTop: 80 }}>
          <Text>Open up App.js to start working on your app!</Text>
          <MainNav />
        </View>
      </Provider>
    );
  }
}


const Tabs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="plus" size={30} color={tintColor} />
      )
    }
  }
}

  const TabsNavConfig = {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? white : red,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? red : white,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  };

const TabsContainer = Platform.OS === "ios"? createBottomTabNavigator(Tabs, TabsNavConfig) 
: createMaterialTopTabNavigator(Tabs, TabsNavConfig)

const MainNav = createAppContainer(TabsContainer)

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
