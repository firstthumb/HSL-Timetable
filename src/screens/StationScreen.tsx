import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { departuresFetchAsync } from '../store/slices/departure.slice';
import { Loading, StopMarker } from '../components';
import { useNavigation } from '@react-navigation/native';

const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = 0.0122;

const Container = styled.View(({ theme }) => ({
  background: theme.secondaryColor,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const departures = useSelector((state: RootState) => state.departure);
  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      setLocation(
        await Location.getCurrentPositionAsync({
          accuracy: LocationAccuracy.Low,
          timeInterval: 10000,
          distanceInterval: 10,
        }),
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      location &&
        location.coords &&
        location.coords.latitude &&
        location.coords.longitude &&
        dispatch(
          departuresFetchAsync(
            location.coords.latitude - LATITUDE_DELTA,
            location.coords.longitude - LONGITUDE_DELTA,
            location.coords.latitude + LATITUDE_DELTA,
            location.coords.longitude + LONGITUDE_DELTA,
          ),
        );
    })();
  }, [dispatch, location]);

  return (
    <Container>
      {!location && <Loading />}
      {location && (
        <MapView
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          zoomControlEnabled={false}
          zoomEnabled={true}
          style={styles.map}
        >
          {departures.departures?.map((departure, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: departure.lat, longitude: departure.lon }}
              title={departure.name}
              description={departure.name}
              onPress={() => {
                navigation.navigate('Details', { gtfsId: departure.gtfsId });
              }}
            >
              <StopMarker />
            </Marker>
          ))}
        </MapView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
