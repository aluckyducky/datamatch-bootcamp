import logo from './logo.svg';
import CardEditor from './CardEditor';
import React from 'react';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import { Switch, Route } from 'react-router-dom';

// import { Route, Routes } from 'react-router-dom';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1'},
        { front: 'front2', back: 'back2'},
      ],
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>

        <Route exact path="/editor">
          <CardEditor 
              addCard={this.addCard} 
              cards={this.state.cards} 
              deleteCard={this.deleteCard}
          />
        </Route>

        <Route exact path="/viewer/:deckId">
          <CardViewer cards={this.state.cards}/>
        </Route>
      </Switch>

      // <Routes>
      //   <Route 
      //     path="/"
      //     element={<Homepage/>}
      //   />
      //   <Route 
      //     path="/editor"
      //     element={
      //       <CardEditor 
      //         addCard={this.addCard} 
      //         cards={this.state.cards} 
      //         deleteCard={this.deleteCard}
      //       />
      //     }
      //   />
      //   <Route 
      //     path="/viewer/:deckId" 
      //     element={<CardViewer cards={this.state.cards}/>}
      //   />
      // </Routes>
    );
  }
}

export default App;