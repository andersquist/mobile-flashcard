import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Container, Form, Content, Item, Input, Label, Button, Text } from 'native-base'
import { purple } from '../utils/colors'
import { addCard } from '../actions'
import { formatCard } from '../utils/helpers'
import { saveDeck } from '../utils/api'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }}

  state = {
    question: '',
    answer: '',
  }
  addCard = () => {
    const { dispatch, id, deck } = this.props
    const { question, answer } = this.state
    const card = formatCard(question, answer)
    const updatedDeck = {
      ...deck,
      questions: deck.questions.concat(card),
    }

    dispatch(addCard(id, card))

    saveDeck({key: id, deck: updatedDeck})

    this.setState(() => ({ question: '', answer: '' }))

    this.goBack()
  }
  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back('DeckDetail'))
  }
  render() {
    const { question, answer } = this.state
    return (
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel style={{marginTop: 20}}>
              <Label>Question</Label>
              <Input value={question} onChangeText={(text) => this.setState({question: text})} />
            </Item>
            <Item floatingLabel style={{marginTop: 20}}>
              <Label>Answer</Label>
              <Input value={answer} onChangeText={(text) => this.setState({answer: text})} />
            </Item>
            <Button
              disabled={question === '' || answer === ''}
              onPress={this.addCard}
              block
              style={{backgroundColor: purple, marginTop: 20}}>
              <Text>Submit</Text>
            </Button>
          </Form>
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

export default connect(mapStateToProps)(AddCard)