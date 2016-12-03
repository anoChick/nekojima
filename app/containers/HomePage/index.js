/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import ReactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';
import AppBar from 'material-ui/AppBar';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.state = {
      homeMessage: {},
    };
    const ref = firebase.database().ref('home_message');// eslint-disable-line
    this.bindAsObject(ref, 'homeMessage');
  }

  render() {
    return (
      <div>
        <AppBar
          title="Title"
        />
        <h1>
          { this.state.homeMessage['.value'] }
        </h1>
      </div>
    );
  }
}
ReactMixin(HomePage.prototype, ReactFireMixin);// eslint-disable-line
