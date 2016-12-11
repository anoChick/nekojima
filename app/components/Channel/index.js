/**
 * A link to a certain page, an anchor tag
 */
/* eslint-disable */
import React from 'react';
import ReactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import RaisedButton from 'material-ui/RaisedButton';
import Post from 'components/Post';

export default class Channel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      open: false,
      channel:[],
      faboTarget:{},
    };
  }

  componentWillReceiveProps(nextProps){
    this.unbind("channel");
    this.firebaseRef = firebase.database().ref('channels/'+ nextProps.channelName);// eslint-disable-line
    this.bindAsArray(this.firebaseRef, 'channel');
  }
  componentWillMount() {
    this.firebaseRef = firebase.database().ref('channels/'+this.props.channelName);// eslint-disable-line
    this.bindAsArray(this.firebaseRef, 'channel');


  }
  createItem = (item,index) => {
    return (
      <Post key={item['.key']} postKey={item['.key']} channelName={this.props.channelName} />
    );
  }
  render() {
    const { channel } = this.state;
    const content = (
      <div>
        <Paper zDepth={1}>
          { channel.reverse().map(this.createItem) }
        </Paper>
      </div>
    );
    channel.reverse();
    return content;
  }
}

ReactMixin(Channel.prototype, ReactFireMixin);// eslint-disable-line

Channel.propTypes = {
  items: React.PropTypes.array,
  fabo : React.PropTypes.func,
  channelName: React.PropTypes.string,
};
