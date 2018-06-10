import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { getMessagesFromServer, postMessagesToServer } from '../store';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.props.getMessages(this.props.sender, this.props.receiver);
  }

  onSend(message = []) {
    const messages = [ this.props.messages, message ];
    console.log(messages)
    this.props.postMessages(this.props.chatId, messages);
  }

  render() {
    return (
      <GiftedChat
        messages={ this.props.messages }
        onSend={message => {this.onSend(message)}}
        user={{
          _id: this.props.receiver,
        }}
      />
    );
  }
}

const mapState = ({ chat }, { navigation }) => ({
  chat: chat,
  chatId: chat.id,
  messages: chat.messages ? chat.messages : [],
  receiver: navigation.getParam('receiver'),
  sender: navigation.getParam('sender')
});

const mapDispatch = dispatch => ({
  getMessages(user1, user2) {
    dispatch(getMessagesFromServer(user1, user2));
  },
  postMessages(chatId, messages) {
    dispatch(postMessagesToServer(Number(chatId), messages));
  }
});

export default connect(mapState, mapDispatch)(Chat);
