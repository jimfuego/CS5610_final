import React, { Component } from 'react';
import Home from './Home.jsx';
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from './AccountsUIWrapper.js';
import {Meteor} from "meteor/meteor";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <AccountsUIWrapper />
                <h1>WikiRender(er)</h1>
                <Home/>
            </div>
        );
    }
}

export default withTracker(() => {
    // Meteor.subscribe('tasks');
    return {
        // tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(App);
