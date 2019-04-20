import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Community } from "../api/community";
import PropTypes from 'prop-types';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // subscription: {
      //   communityHistory: Meteor.subscribe('community'),
      // },
      title:"",
      links: [],
      body: "",
      query: "",
      history: [],
      communityHistory: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addHistory = this.addHistory.bind(this);
    this.increment = this.increment.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.registerQuery = this.registerQuery.bind(this);
  }

  //
  increment() {
    this.setState({
      counter: this.state.index + 1
    });
  }

  //
  clickButton(query){
    // get index
    this.setState({
      query: query
    });
    this.registerQuery(query);
  }

  //
  makeButton(query){
    return(
        <button onClick={ () => this.clickButton(query) }> {query} </button>
    );
  }

  //
  callWiki(query){
    Meteor.call("wiki.getWiki", query, (err,res) => {
      if (err) {
        console.log("wikiError:", err);
      }
      else{
        let data = res;
        this.setState({
          title : data.title,
          links : data.links,
          body : data.text
        });
      }
      console.log("link", this.state.links[1]["*"]);
    });
  }

  // add term to personal history and community history
  addHistory(query) {
    this.setState({query: query});
    this.setState({ history: [...this.state.history, query]});
    Meteor.call("community.insert", query, (err) => {
      if (err){
        console.log(err);
      }
      else{
        console.log("insert successful (probably)", this.state.query);
      }
    });
  }

  //
  registerQuery(query){
    this.addHistory(query);
    this.callWiki(query);
    this.setState({
      communityHistory: Meteor.call("community.gerHistory", (err) => {
        if (err){ console.log(err)}
      })
    });
  }

  // handles text input bar
  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  clearHistory(){
    this.setState({ history : []} );
  }

  render() {
    //make history buttons
    let historyButtons = this.state.history.map(
        (historyButton) => this.makeButton(historyButton)
    );

    // //make community buttons
    // let communityButtons = this.state.communityHistory.map(
    //     (communityButton) =>  this.makeButton(communityButton)
    // );

    //make link buttons
    let links = this.state.links.map(
        (link) => this.makeButton(link["*"])
    );

    return (
      <div>
        <div>
        <label>Query: </label>
        <input type="text" name="query" onChange={this.handleChange} />
        <button onClick={() => this.registerQuery(this.state.query)}>Search Wiki</button>
        <button onClick={() => this.clearHistory()}>Clear History</button>

        </div>

        <div><h2>Session History</h2></div>
        <div>{ historyButtons }</div>

        {/*<div><h2>Community History</h2></div>*/}
        {/*<div>{ communityButtons }</div>*/}

        <div><h3>Title</h3></div>
        <div>{this.state.title}</div>

        <div><label>Links: </label></div>
        <div>{links}</div>

        <div><h3>Body</h3></div>
        <span dangerouslySetInnerHTML={{__html: this.state.body["*"]}}/>
      </div>
    );
  }
}

// Home.propTypes = {
//   communityHistory: PropTypes.array.isRequired,
// };

export default withTracker(() => {
  Meteor.subscribe("community");
  return {
    user: Meteor.userId(),
    communityHistory:  Community.find()
  };
})(Home);
