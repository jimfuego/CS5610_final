import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';

class Info extends Component {

  makeLink(link) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }

  render() {
    const links = this.props.links.map(
        link => this.makeLink(link)
    );

    return (
        <div>
          <h2>Learn Meteor!</h2>
          <ul>{ links }</ul>
        </div>
    );
  }
}

export default withTracker(() => {
  return {
    links: Links.find().fetch(),
  };
})(Info);
