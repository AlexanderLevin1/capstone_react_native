import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {
  render() {
    return (
      <GiftedChat
        messages={['one', 'two', 'three']}
        onSend={messages => {this.onSend(messages)}}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Chat;
