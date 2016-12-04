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
/* eslint-disable */
import React from 'react';
import ReactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Channel from 'components/Channel';
import ChannelList from 'components/ChannelList';
const style = {
  marginRight: 20,
};
export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  changeChannel = (item) => {
    this.unbind("channel");
    const ref2 = firebase.database().ref('channels/'+ item['.value']);// eslint-disable-line
    this.bindAsArray(ref2.limitToLast(1000), 'channel');
    this.setState({currentChannelName:item['.value']});
    this.setState({open:false});
  }
  fabo = (item) => {
    let targetItem = this.state.channel.find(function(element, index, array){
      return element['.key'] == item['.key']
    });
    targetItem.fabo = targetItem.fabo + 1;
    this.setState({channel: this.state.channel}) ;
  }

  constructor(props){
    super(props);
    this.state = {
      message:'',
      open: false,
      currentChannelName:'default',
      homeMessage: {},
      channelNames:[],
      channel:[],
    };
  }

  leftButtonTouched = () => this.setState({open: !this.state.open});

  componentWillMount() {

    const ref1 = firebase.database().ref('home_message');// eslint-disable-line
    this.bindAsObject(ref1, 'homeMessage');
    const ref2 = firebase.database().ref('channels/default');// eslint-disable-line
    this.bindAsArray(ref2.limitToLast(1000), 'channel');


  }
  submit = () => {
    if(this.state.message==''){
      return;
    }
    this.firebaseRefs['channel'].push({
      index: this.state.channel.length + 1,
      message: this.state.message,
      posted_at:(new Date()).toLocaleString(),
      fabo:0,
    });
    this.setState({
        message: '',
    });
  }
  onChange = (e) => {
    this.setState({
        message: e.target.value,
      });
  };

  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.leftButtonTouched}
          title="ねこじま"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />

        <div style={{padding:30}}>
        <h2>{this.state.currentChannelName}</h2>
        <Divider />
        <br />
        <Paper zDepth={1} style= { {padding:'0 8px 8px 8px'} } >
        <TextField
          hintText="にゃーん"
          value={ this.state.message }
          multiLine={true}
          rows={3}
          name='iii'
          fullWidth
          onChange={ this.onChange }
        />
        <RaisedButton label="投稿" fullWidth primary onClick={ this.submit } />
        </Paper>
        <br />
        <Divider />
        <br />
        <Drawer
          open={this.state.open}
          docked={false}
          width={300}
          onRequestChange={open => this.setState({open})}>
          <ChannelList items={ this.state.channelNames }  changeChannel={ this.changeChannel.bind(this) } />
        </Drawer>
        <Channel fabo ={ this.fabo.bind(this) } channelName={this.state.currentChannelName} items={ this.state.channel }/>
        </div>
      </div>
    );
  }
}
ReactMixin(HomePage.prototype, ReactFireMixin);// eslint-disable-line
