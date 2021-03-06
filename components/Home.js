import React from 'react';
import { Text, View, ScrollView, Button, AsyncStorage, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getOrganizationsFromServer, getUserFromToken } from '../store';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { refreshing: false }
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { user, navigation } = this.props;
    if(!user.id) {
      navigation.navigate('Login');
    }
  }

  onRefresh() {
    const { getOrganizations } = this.props;
    this.setState({ refreshing: true })
    getOrganizations()
      .then(() => this.setState({ refreshing: false }))
  }

  render() {
    const { myOrgs } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }
      >
        <List>
          {
            myOrgs.map((organization, index) => (
              <ListItem
                roundAvatar
                avatar={{uri: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg'}}
                title={organization.name}
                subtitle={organization.organization_type}
                key={index}
                onPress={() => navigate('Details', { organization })}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

const mapState = ({ userOrganizations, organizations, user }) => ({
  myOrgs: userOrganizations.reduce((array, userOrg) => {
    const organization = organizations.find(org => userOrg.userId === user.id && userOrg.organizationId === org.id);
    if(organization) {
      array.push(organization);
    }
    return array;
  }, []),
  user
});

const mapDispatch = dispatch => ({
  getOrganizations: () => dispatch(getOrganizationsFromServer()),
  getUser: (token) => dispatch(getUserFromToken(token))
});

export default connect(mapState, mapDispatch)(Home);
