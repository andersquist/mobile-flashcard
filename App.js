import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import UdaciStatusBar from './components/UdaciStatusBar'
import { purple, white } from './utils/colors'
import { Font } from 'expo'
import { Container } from 'native-base'

import DeckDetail from './components/DeckDetail'
import MainTabs from './components/MainTabs'

const store = createStore(reducer)

const MainNavigator = createStackNavigator({
  home: {
    screen: MainTabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
})

export default class App extends React.Component {
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Container>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator/>
        </Container>
      </Provider>
    );
  }
}
