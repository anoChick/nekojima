/**
 * A link to a certain page, an anchor tag
 */
/* eslint-disable */
import React from 'react';
import ReactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';
import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
export default class ChannelList extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      channelNames: [],
      newChannelName: '',
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillMount() {
    const ref3 = firebase.database().ref('channel_names');// eslint-disable-line
    this.bindAsArray(ref3, 'channelNames');
  }

  createItem = (channelName,index) => {
    return (
      <ListItem
        primaryText={ channelName['.value'] }

        key={ index }
        onClick = { this.props.changeChannel.bind(this, channelName) }
      />
    );
  }
  createChannel = () => {
    if (this.state.newChannelName===''){
      return;
    }
    this.firebaseRefs['channelNames'].push(this.state.newChannelName);
    this.setState({
        newChannelName: '',
    });
    this.setState({ open: false });
  }
  handleChange = (event) => {

    this.setState({newChannelName: event.target.value});
  }
  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={ this.createChannel }
      />,
    ];
    let content = (
      <div>
        <Subheader>チャンネル一覧</Subheader>

        <List>
          { this.state.channelNames.map(this.createItem) }
        </List>

        <div style={{textAlign:'center',marginLeft:-20}}>
          <FloatingActionButton mini style={ {position:'absolute'} }
            onTouchTap={this.handleOpen}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <Dialog
          title="チャンネル作成"
          actions={ actions }
          modal
          open={ this.state.open }
        >
          <TextField
            name='iii'
            value= { this.state.newChannelName }
            onChange={ this.handleChange }
            fullWidth
          />
        </Dialog>

      </div>
    );
    return content;
  }
}

ReactMixin(ChannelList.prototype, ReactFireMixin);// eslint-disable-line
ChannelList.propTypes = {
  items: React.PropTypes.array,
  changeChannel : React.PropTypes.func,
};
