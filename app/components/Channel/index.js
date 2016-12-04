/**
 * A link to a certain page, an anchor tag
 */
/* eslint-disable */
import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import RaisedButton from 'material-ui/RaisedButton';
export default class Channel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      items: props.items,
      newChannelName: '',
      open: false,
    };
  }

  createItem = (item,index) => {
    return (
      <div style={{ padding: 8 }} key={index} >
        <h5>:{ item.index }　<small>{item.posted_at}</small></h5>
        <p>{ item.message }</p>
        <Divider />
      </div>
    );
  }
  render() {
    const { items } = this.props;
    const content = (
      <div>
        <Paper zDepth={1}>
          { this.props.items.reverse().map(this.createItem) }
        </Paper>
      </div>
    );
    items.reverse();
    return content;
  }
}

Channel.propTypes = {
  items: React.PropTypes.array,
  fabo : React.PropTypes.func,
  currentChannelName: React.PropTypes.string,
};
