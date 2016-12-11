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
export default class Post extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      fabo:{},
      index:0,
      message:'',
      posted_at:'',
      item: {},
    };
  }

    fabo = () => {
      this.firebaseRefs.fabo.set(this.state.fabo['.value'] + 1);
    }
  componentWillMount() {
    const itemPath = 'channels/'+this.props.channelName+'/'+this.props.postKey;
    this.bindAsObject(firebase.database().ref(itemPath), 'item');
    this.bindAsObject(firebase.database().ref(itemPath+'/fabo'), 'fabo');
    this.bindAsObject(firebase.database().ref(itemPath+'/index'), 'index');
    this.bindAsObject(firebase.database().ref(itemPath+'/message'), 'message');
    this.bindAsObject(firebase.database().ref(itemPath+'/posted_at'), 'posted_at');
  }

  render() {
    const {fabo,index,message,posted_at,item} = this.state
    const content = (
      <div style={{ padding: '8px 16px' ,position:'relative'}} >
        <h5>名無し:{ index['.value'] }　<small>{posted_at['.value']}</small></h5>
        <p>{ message['.value'] }</p>
        <RaisedButton
          label={ ""+this.state.fabo['.value'] }
          onClick = {this.fabo}
          secondary={true}
          style={ {position:'absolute',top:'30px',right:'16px'} }
          icon={<ActionGrade />}
        />
        <br />
        <Divider />
      </div>
    );
    return content;
  }
}

ReactMixin(Post.prototype, ReactFireMixin);// eslint-disable-line
Post.propTypes = {
  fabo : React.PropTypes.func,
};
