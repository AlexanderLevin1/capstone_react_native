import axios from 'axios';
import url from './productionUrl';

const GOT_MESSAGES = 'GOT_MESSAGES';

const gotMessages = messages => ({ type: GOT_MESSAGES, messages });

export const getMessagesFromServer = (user1, user2) => {
  return dispatch => {
    return axios.get(url + `/api/messages/${user1.id}/${user2.id}`)
      .then(result => result.data)
      .then(messages => dispatch(gotMessages(messages)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
  case GOT_MESSAGES:
    return action.messages;
  default:
    return state;
  }
}

export default store;
