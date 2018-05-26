import axios from 'axios';

const GET_ORGANIZATIONS = 'GET_ORGANIZATIONS';

const getOrganizations = organizations => ({ type: GET_ORGANIZATIONS, organizations });

export const getOrganizationsFromServer = () => {
  return dispatch => {
    return axios.get('http://10.80.71.197:3000/api/organizations')
      .then(result => result.data)
      .then(organizations => dispatch(getOrganizations(organizations)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
  case GET_ORGANIZATIONS:
    return action.organizations;
  default:
    return state;
  }
};

export default store;

