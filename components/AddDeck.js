import React from 'react'
import {Container, Header, Form, Content, Item, Input, Label, Body, Title, Button, Text} from 'native-base'
import {purple, white} from '../utils/colors'

const AddDeck = (props) => {
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
            <Input />
          </Item>
          <Button block style={{backgroundColor: purple, marginTop: 20}}>
            <Text>Create Deck</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default AddDeck