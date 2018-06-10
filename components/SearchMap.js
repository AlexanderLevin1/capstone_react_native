import React from 'react';
import { Text, View, ScrollView, Button, AsyncStorage, RefreshControl, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView, { Marker, Callout } from 'react-native-maps';

class SearchMap extends React.Component {

  constructor() {
    super();
    this.state = { refreshing: false }
  }


  render() {
    const { organizations, user } = this.props;
    const { navigate } = this.props.navigation;
    // console.log(user);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.705076,
            longitude: -74.009160,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* <MapView.Marker
            coordinate={{
              latitude: 40.705076,
              longitude: -74.009160,
            }}
          >
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>

          </MapView.Marker> */}

          {organizations.map((organization) => {
            const latitude = Number(organization.latitude)
            const longitude = Number(organization.longitude)
            const id = organization.id
            return (
              <Marker
                key={id}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude
                }}
              >
                <Callout
                  // style={mapCalloutStyles.calloutContainer}
                  //tooltip
                >
                  {/* <MapCallout
                    title={organization.name}
                  /> */}
                  <Text>{organization.name}</Text>
                  <Button title='Detail'
                    onPress={() => navigate('Details', { organization })}
                  ></Button>
                </Callout>

              </Marker>
            )
          }
          )}

          }

          {/* <MapView.Marker
            coordinate={{
              latitude: 40.705076,
              longitude: -74.009160,
            }}
           >
          </MapView.Marker> */}

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  }

})

const mapState = ({ organizations, user }) => ({
  organizations, user
});

const mapDispatch = dispatch => ({

});

export default connect(mapState, mapDispatch)(SearchMap);
