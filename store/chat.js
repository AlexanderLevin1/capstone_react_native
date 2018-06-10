import axios from 'axios';
import url from './productionUrl';

const GOT_MESSAGES = 'GOT_MESSAGES';

const gotMessages = messages => ({ type: GOT_MESSAGES, messages });

export const getMessagesFromServer = (user1, user2) => {
  return dispatch => {
    return axios.get(url + `/api/chat/${user1}/${user2}`)
      .then(result => result.data)
      .then(messages => {
        dispatch(gotMessages(messages))
      });
  };
};

export const postMessagesToServer = (chatId, messages) => {
  return dispatch => {
    return axios.post(url + `/api/chat/${chatId}`, messages)
      .then(result => result.data)
      .then(messages => dispatch(gotMessages(messages)));
  }
}

const store = (state = [], action) => {
  switch (action.type) {
  case GOT_MESSAGES:
    return action.messages;
  default:
    return state;
  }
}

export default store;
