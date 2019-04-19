import React, { Component } from 'react';
import Home from './Home.jsx';
import Info from './Info.jsx';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Welcome to Meteor!</h1>
                <Home/>
                <Info/>
            </div>
        );
    }
}

export default App;
