import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { getMessagesFromServer } from '../store';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.onSend = this.onSend.bind(this);
  }

  onSend(messages = []) {
    this.setState({ messages });
  }

  componentWillMount() {
    getMessagesFromServer(this.props.sender, this.props.receiver);
  }

  render() {
    return (
      <GiftedChat
        messages={ this.state.messages }
        onSend={messages => {this.onSend(messages)}}
        user={{
          _id: this.props.receiver,
        }}
      />
    );
  }
}

const mapState = ({ chat }, { navigation }) => ({
  messages: chat.messages,
  receiver: navigation.getParam('receiver'),
  sender: navigation.getParam('sender')
})

export default connect(mapState)(Chat);
