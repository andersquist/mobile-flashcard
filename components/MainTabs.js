import React from 'react'
import { Platform } from 'react-native'
import { Tab, Tabs } from 'native-base'
import ListDecks from './ListDecks'
import AddDeck from './AddDeck'

const MainTabs = (props) => {
  return (
    <Tabs tabBarPosition={ Platform.OS === 'ios' ? 'bottom' : 'top' }>
      <Tab heading='Decks'>
        <ListDecks navigation={props.navigation}/>
      </Tab>
      <Tab heading='Add Deck'>
        <AddDeck navigation={props.navigation}/>
      </Tab>
    </Tabs>
  )
}

export default MainTabs
