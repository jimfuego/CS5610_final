import React, { Component } from 'react';
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      query: "",
      history: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  makeButton(query){
    return(
      <button onClick={() => this.registerQuery()}>{query}</button>
    );
  }

  addHistory() {
    this.setState({ history: [...this.state.history, this.state.query]});
  }

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  registerQuery(evt){
    this.addHistory();
  }

  render() {
    let historyButtons = this.state.history.map(
        historyButton => this.makeButton(historyButton)
    );

    return (
      <div>
        <label>Query:</label>
        <input type="text" name="query" onChange={this.handleChange} />
        <button onClick={() => this.registerQuery()}>Click Me</button>
        <div>{ historyButtons }</div>
        <p>History: {this.state.history} </p>
      </div>
    );
  }
}

// export default withTracker(() => {
//   return {
//     user: Meteor.userId()
//   };
// })(Home);
