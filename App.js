import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import QuestionScreen from './screens/QuestionScreen';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://graphql-server-dev.herokuapp.com/graphql'
});

const AppStackNavigator = createStackNavigator({
  HomeScreen: {screen: HomeScreen},
  QuestionScreen: {screen: QuestionScreen}
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppStackNavigator />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  
});
