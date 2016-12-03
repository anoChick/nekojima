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
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginRight: 20,
};
export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
  children: React.PropTypes.any
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }
  getStyles(){
    const styles = {
      appBar: {
        display: 'flex'
      }
    };
    return styles;
  }

  leftButtonTouched = () => this.setState({open: !this.state.open});

  menuItemTouched = (e) => {
    this.setState({open: !this.state.open});
  }
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
          onLeftIconButtonTouchTap={this.leftButtonTouched}
          title="ねこじま"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <h1>
          { this.state.homeMessage['.value'] }
        </h1>
        <Paper zDepth={1} style= { {padding:'0 8px 8px 8px'} } >
        <TextField
          hintText="にゃーん"
          multiLine={true}
          rows={3}
          fullWidth
        />
        <RaisedButton label="投稿" fullWidth primary />
        </Paper>
        <Drawer
          open={this.state.open}
          docked={false}
          width={200}
          onRequestChange={open => this.setState({open})}>

        </Drawer>
        <Paper zDepth={2}>
          <p> Neko</p>
          <Divider />
          <TextField hintText="Middle name" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Last name" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Email address" style={style} underlineShow={false} />
          <Divider />
        </Paper>
      </div>
    );
  }
}
ReactMixin(HomePage.prototype, ReactFireMixin);// eslint-disable-line
