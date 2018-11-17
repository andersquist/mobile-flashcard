import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  List,
  ListItem,
  Body,
  Right,
  Text,
  Icon,
  Title,
  Spinner,
} from 'native-base'
import { Text as TTExt } from 'react-native'
import {purple, white} from '../utils/colors'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

class ListDecks extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState({ ready: true }))
  }
  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <Spinner color={purple} />
    }

    return (
      <Container>
        <List>
          <Header hasTabs iosBarStyle='light-content' style={{backgroundColor: purple}}>
            <Body>
            <Title style={{color: white}}>Flash Cards</Title>
            </Body>
          </Header>
          {Object.keys(decks)
            .map((key) => (
              <ListItem
                key={key}
                button
                onPress={() => this.props.navigation.navigate('DeckDetail', {
                  key,
                  deck: decks[key],
                })} >
                <Body>
                <Text>{decks[key].title}</Text>
                <Text note>{decks[key].questions.length} card(s)</Text>
                </Body>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
            ))}
        </List>
        <TTExt>{JSON.stringify(decks)}</TTExt>
      </Container>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(ListDecks)