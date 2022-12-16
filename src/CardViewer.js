import React from "react";
import './CardViewer.css';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
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
        if (this.state.index < this.props.cards.length -1 ) {
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

        if (isEmpty(this.props.cards)){
            return <div>Page not found!</div>
        }

        const cardFront = this.state.onFront;
        const index = this.state.index;

        return (
            <div>
                <h2>{ this.props.name }</h2>
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
                <Link to="/">Home</Link>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name };
}

export default compose(
    withRouter,
    firebaseConnect((props) => {
        const deckId = props.match.params.deckId;
        return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
    }),
    connect(mapStateToProps),
)(CardViewer);

// { path: '/flashcards/deck1', storeAs: 'deck1' }

// export default firebaseConnect(() => [{ path: '/flashcards' }])(CardViewer);
// export default firebaseConnect(['flashcards'])(CardViewer);

// export default CardViewer;
