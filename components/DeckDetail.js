import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  Button,
  Body,
  H1,
  Card,
  CardItem,
  Text,
} from 'native-base'
import { purple } from '../utils/colors'
import { removeDeck } from '../actions'
import { deleteDeck } from '../utils/api'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck
    return {
      title,
  }}
  removeDeck = () => {
    const { dispatch, id, navigation } = this.props

    dispatch(removeDeck(id))

    deleteDeck(id)

    navigation.navigate('home')
  }
  render () {
    const { deck, id } = this.props

    if (deck === undefined) {
      return null
    }

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <H1 style={{ marginTop: 20 }}>{deck.title}</H1>
                <Text note>{deck.questions.length} card(s)</Text>
                <Button
                  block
                  style={{backgroundColor: purple, marginTop: 40}}
                  onPress={() => this.props.navigation.navigate('AddCard', {
                    key: id,
                  })}
                  >
                  <Text>Add Card</Text>
                </Button>
                <Button
                  block
                  style={{backgroundColor: purple, marginTop: 40}}
                  onPress={() => this.props.navigation.navigate('QuizView', {
                    key: id,
                  })}
                >
                  <Text>Start Quiz</Text>
                </Button>
                <Button
                  transparent
                  block
                  danger
                  onPress={this.removeDeck}
                >
                  <Text>Delete Deck</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const deck = decks[navigation.state.params.key]
  return {
    id: navigation.state.params.key,
    deck,
    navigation,
  }
}

export default connect(mapStateToProps)(DeckDetail)
