import React from "react";
import './CardViewer.css';
import { Link } from 'react-router-dom';

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

export default CardViewer;