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
  Spinner, Content,
} from 'native-base'
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
        {
          Object.keys(decks).length === 0
          ? (
              <Content padder contentContainerStyle={{alignItems: 'center'}}>
                <Text
                  style={{marginTop: 40, fontSize: 25 }}
                >There are no decks. Go ahead and add.</Text>
              </Content>
            )
          : (
              <List>
                <Header hasTabs iosBarStyle='light-content' style={{backgroundColor: purple}}>
                  <Body>
                  <Title style={{color: white}}>Decks</Title>
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
          )
        }
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