import React from "react";
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";

import { connect } from "react-redux";
import { compose } from "redux";

const Homepage = (props) => {    

    console.log(props.decks)

    if (!isLoaded(props.decks)){
        return <div>Loading...</div>
    }

    else {
        const deckNames = Object.keys(props.decks).map((deckId, index) => {
            return (
                <div key={index}>
                    <Link key={index} to={`/viewer/${deckId}`}>{props.decks[deckId].name}</Link>
                    <br />
                </div>
            )
        })
        
        return(
            <div>
                <h2>Welcome to Flashcards!</h2>
                <Link to="/editor">Go to card editor</Link>
                <br/>

                <h2>Flashcards</h2>
                {deckNames}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const decks = state.firebase.data.homepage;
    return { decks: decks };
}

export default compose(
    firebaseConnect([{ path: "/homepage", storeAs: "homepage" }]),
    connect(mapStateToProps),
)(Homepage);