import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      store: STORE
    }
    this.handleDeleteCard= this.handleDeleteCard.bind(this)
  }


  // state = {
  //   store: STORE,
  // };


  
  handleDeleteCard = (cardId) => {
    const { lists, allCards } = this.state.store;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
    console.log('In handleDeleteCard')
  };

  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDelete={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;