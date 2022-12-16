import React from "react";
import './CardEditor.css';
import { Link } from 'react-router-dom';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            front: '', 
            back: '',
            cards: [
                { front: 'front1', back: 'back1'},
                { front: 'front2', back: 'back2'},
            ], 
        };
    }

    addCard = () => {
        if(!this.state.front.trim() || !this.state.back.trim()) {
            alert("Cannot add empty card");
            return;
        }

        const newCard = { front: this.state.front, back: this.state.back }
        const cards = this.state.cards.slice().concat(newCard);

        this.setState({ cards, front: '', back: '' });
    };

    deleteCard = index => {
        if (this.state.cards.length > 1) {
            const cards = this.state.cards.slice();
            cards.splice(index, 1);
            this.setState({ cards });
        }
    };

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    render() {
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick={() => this.deleteCard(index)}>Delete card</button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <h2>Card Editor</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br/>
                <input 
                    name="front"
                    onChange={this.handleChange} 
                    placeholder="Front of card" 
                    value={this.state.front} 
                />
                <input 
                    name="back"
                    onChange={this.handleChange}
                    placeholder="Back of card" 
                    value={this.state.back} 
                />
                <button onClick={this.addCard} >Add card</button>
                <hr/>
                <Link to="/viewer">Go to card viewer</Link>
            </div>
        );
    }
}

export default CardEditor;