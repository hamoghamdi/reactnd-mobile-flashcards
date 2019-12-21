import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, AsyncStorage } from "react-native";
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from "react-navigation-stack";
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white, red } from './utils/colors'
// redux 
import { createStore } from "redux";
import { Provider } from "react-redux";
import decks from './redux/decks'
import middleware from './redux/middleware'

import DeckPage from './components/DeckPage'
import AddCard from "./components/AddCard";
import QuizPage from './components/QuizPage'

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "flashcards:notifications";

const store = createStore(decks, middleware);
export default class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          
          <MainNav />
        </View>
      </Provider>
    );
  }
}

// from decks tab to A deck

const DecksStack = createStackNavigator({
  Decks: Decks,
  DeckPage: DeckPage,
  AddCard: AddCard,
  QuizPage: QuizPage
});
const QuizStack = createStackNavigator({
  Decks: Decks,
  DeckPage: DeckPage,
  QuizPage: QuizPage
});

// from add deck toab to A deck 
const AddDeckStack = createStackNavigator({
  AddDeck: AddDeck,
  DeckPage: DeckPage
  
});

const Tabs = {
  Decks: {
    screen: DecksStack,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeckStack,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="plus" size={30} color={tintColor} />
      )
    }
  }
};

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
// Notifications
function createNotification() {
  return {
    title: "Mobile Flashcards",
    body: "Don't forget to take your quiz for the day!",
    ios: {
      sound: true
    },
    andriod: {
      sound: true,
      vibrate: true,
      priority: "high",
      sticky: false
    }
  };
}
function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            today.setHours(14);
            today.setMinutes(38);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
// // clear notification
// function clearLocalNotification() {
//   return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
//     Notifications.cancelAllScheduledNotificationsAsync
//   );
// }