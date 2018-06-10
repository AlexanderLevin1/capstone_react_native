import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { createUserRequestOnServer } from '../store';

class UserList extends Component {

  render() {
    const { loggedUser, ownUsers, createRequest, userRequests, organization, navigate } = this.props;
    // const { navigate } = this.props.navigation;
    return (
      <View>
      <Text h4 style={{ textAlign: 'center', marginTop: 20 }}>Pair Up!</Text>
        {
          ownUsers.map(user => {
            const requestSent = userRequests.find(request => request.requesterId === loggedUser.id && request.responderId === user.id && request.organizationId === organization.id)
            console.log(requestSent)
            return (
              <View
                key={user.id}
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 20,
                  margin: 10
                }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>{user.fullName}</Text>
                {
                  !requestSent ? (
                    <Button
                      onPress={() => createRequest({ requesterId: loggedUser.id, responderId: user.id, organizationId: organization.id })}
                      title='Send Request'
                      buttonStyle={{
                        backgroundColor: 'blue',
                        borderRadius: 10,
                        marginTop: 15
                      }}
                    />
                    ) :
                    requestSent && requestSent.status === 'pending' ? (
                     <Button
                      onPress={() => console.log("Stop pressing this button! It doesn't work!")}
                      title='Request Sent'
                      buttonStyle={{
                        backgroundColor: 'blue',
                        borderRadius: 10,
                        marginTop: 15
                      }}
                      disabled={ true }
                    />
                    )
                      : (
                      <Button
                        onPress={() => navigate('Chat', { sender: loggedUser.id, receiver: user.id })}
                        title='Chat'
                        buttonStyle={{
                          backgroundColor: 'green',
                          borderRadius: 10,
                          marginTop: 15
                        }}
                      />
                    )
                  }
              </View>
            )
          })
        }
      </View>
    );
  }
}

const mapState = ({ user, users, userRequests }, { organization, navigation }) => {
  const ownUsers = users.filter(ownUser => ownUser.checkedInId === organization.id && ownUser.id !== user.id);
  const loggedUser = user;
  const { navigate } = navigation;
  return {
    ownUsers,
    loggedUser,
    userRequests,
    organization,
    navigate
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRequest: (request) => {
      dispatch(createUserRequestOnServer(request));
    }
  }
}

export default connect(mapState, mapDispatch)(UserList)
