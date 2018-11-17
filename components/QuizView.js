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
  Left,
} from 'native-base'
import { purple } from '../utils/colors'

class QuizView extends Component {
  state = {
    index: 0,
    correct: 0,
    showQuestion: true,
  }
  toggleShowQuestion = () => {
    this.setState((state) => ({
      showQuestion: !state.showQuestion
    }))
  }
  handleNext = (correct = false) => {
    this.setState((state) => ({
      correct: correct === true ? state.correct + 1 : state.correct,
      index: state.index + 1,
      showQuestion: true,
    }))
  }
  restart = () => {
    this.setState({
      index: 0,
      correct: 0,
      showQuestion: true,
    })
  }
  render() {
    const { deck } = this.props
    const { index, correct, showQuestion } = this.state
    const { questions } = deck

    if (questions.length === 0) {
      return (
        <Container>
          <Content padder contentContainerStyle={{alignItems: 'center'}}>
            <Text
              style={{marginTop: 40, fontSize: 25 }}
            >Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
          </Content>
        </Container>
      )
    }

    if (index >= questions.length) {
      const score = ((correct / questions.length) * 100).toFixed(0)
      return (
        <Container>
          <Content padder contentContainerStyle={{alignItems: 'center'}}>
            <Text style={{marginTop: 40, fontSize: 25}}
            >Quiz complete!</Text>
            <Text style={{marginTop: 20}}>Score {score}%</Text>
            <Button
              block
              style={{backgroundColor: purple, marginTop: 40}}
              onPress={this.restart}
            >
              <Text>Restart Quiz</Text>
            </Button>
          </Content>
        </Container>
      )
    }

    const text = showQuestion === true
      ? questions[index].question
      : questions[index].answer
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>{ index + 1 }/{ questions.length }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, alignItems: 'center'}}>
                <H1 style={{ marginTop: 20 }}>{text}</H1>
                <Button
                  transparent
                  block
                  warning style={{alignItems: 'center'}}
                  onPress={this.toggleShowQuestion}
                >
                  <Text>{showQuestion === true ? 'Question' : 'Answer'}</Text>
                </Button>
                <Button
                  success
                  block
                  style={{marginTop: 40}}
                  onPress={() => this.handleNext(true)}>
                  <Text>Correct</Text>
                </Button>
                <Button
                  danger
                  block
                  style={{marginTop: 20}}
                  onPress={this.handleNext}>
                  <Text>Incorrect</Text>
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

export default connect(mapStateToProps)(QuizView)