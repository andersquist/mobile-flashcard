import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import { Container, Header, Form, Content, Item, Input, Label, Body, Title, Button, Text } from 'native-base'
import {purple, white} from '../utils/colors'
import { addDeck } from '../actions'
import { formatDeck, generateUID } from '../utils/helpers'
import { saveDeck } from '../utils/api'

class AddDeck extends Component {
  state = {
    title: '',
  }
  addDeck = () => {
    const { dispatch, navigation } = this.props
    const { title } = this.state
    const key = generateUID()
    const deck = formatDeck(title)

    dispatch(addDeck({
      [key]: deck
    }))

    saveDeck({key, deck})

    this.setState(() => ({ title: '' }))

    // It's nicer to go back to home from DeckDetail
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: {
          key,
          deck,
        }}),
      ],
    });
    navigation.dispatch(resetAction)
  }
  render() {
    const { title } = this.state
    return (
      <Container>
        <Header hasTabs iosBarStyle='light-content' style={{backgroundColor: purple}}>
          <Body>
          <Title style={{color: white}}>Add Deck</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Item floatingLabel style={{marginTop: 20}}>
              <Label>Deck Title</Label>
              <Input value={title} onChangeText={(text) => this.setState({title: text})} />
            </Item>
            <Button
              disabled={this.state.title === ''}
              onPress={this.addDeck}
              block
              style={{backgroundColor: purple, marginTop: 20}}>
              <Text>Create Deck</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect()(AddDeck)