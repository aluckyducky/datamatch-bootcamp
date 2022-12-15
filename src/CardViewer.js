import React from "react";
import './CardViewer.css';

import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import 'firebase/database';
import { connect } from "react-redux";
import { compose } from "redux";

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {onFront: true, index: 0 };
    }

    handleCardClick = () => {
        this.setState({ onFront: !this.state.onFront })
    };

    prevClick = () => {
        if (this.state.index > 0) {
            this.setState({index: this.state.index - 1});
            if (!this.state.onFront) {
                this.setState({ onFront: true })
            }
        }
    };

    nextClick = () => {
        if (this.state.index < this.props.cards.length) {
            this.setState({index: this.state.index + 1});
            if (!this.state.onFront) {
                this.setState({ onFront: true })
            }
        }
    };

    render() {
        if (!isLoaded(this.props.cards)){
            return <div>Loading...</div>
        }

        const cardFront = this.state.onFront;
        const index = this.state.index;

        return (
            <div>
                <h2>Card Viewer</h2>
                <p id="card" onClick={this.handleCardClick}>
                    {cardFront 
                        ? this.props.cards[index].front
                        : this.props.cards[index].back
                    }
                </p>
                <div id="card-flipper">
                    <button disabled={index == 0} onClick={this.prevClick}>Previous Card</button>
                    <p id="counter">{index + 1}/{this.props.cards.length}</p>
                    <button disabled={index == this.props.cards.length - 1} onClick={this.nextClick}>Next Card</button>
                </div>
                <hr/>
                <Link to="/editor">Go to card editor</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    // const deck = state.firebase.data.deck1;
    // const name = deck && deck.name;
    // const cards = deck && deck.cards;
    // return { cards: cards, name: name };
    const flashcards = state.firebase.data;
    return flashcards;
}

// export default compose(
//     firebaseConnect(["/flashcards"]),
//     connect(mapStateToProps),
// )(CardViewer);

// { path: '/flashcards/deck1', storeAs: 'deck1' }

export default firebaseConnect(() => [{ path: '/flashcards' }])(CardViewer);

// export default CardViewer;
