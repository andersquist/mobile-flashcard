import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {
  Container,
  Header,
  Button,
  Body,
  Right,
  Icon,
  Title,
  Left,
} from 'native-base'
import { purple, white } from '../utils/colors'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header hasTabs iosBarStyle='light-content' style={{backgroundColor: purple}}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title style={{color: white}}>Deck Detail</Title>
        </Body>
        <Right />
      </Header>
    )
  })
  render () {
    return (
      <View>
        <Text>DeckDetail</Text>
      </View>
    )
  }
}

export default DeckDetail
