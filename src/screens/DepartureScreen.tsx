import React from 'react';
import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';
import { Clock, DepartureItem } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { departuresFetchAsync, timeTablesFetchAsync } from '../store/slices/departure.slice';
import { RootState } from '../store';
import { useInterval } from '../helpers/hooks';

const Container = styled.View(({ theme }) => ({
  background: theme.primaryColor,
  padding: 10,
  flex: 1,
}));

const ClockContainer = styled.View(({}) => ({
  padding: 5,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
}));

const DepartureContainer = styled.View(({}) => ({
  flex: 12,
}));

const Separator = styled.View(({ theme }) => ({
  height: 1,
  width: '100%',
  backgroundColor: theme.secondaryColor,
}));

const getMinuteLeft = (time: number): number => Math.floor((time - getSecondsToday()) / 60);

const getSecondsToday = (): number => {
  const d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
};

export const DepartureScreen: React.FC = () => {
  const dispatch = useDispatch();
  const departures = useSelector((state: RootState) => state.departure);

  useInterval(async () => {
    dispatch(timeTablesFetchAsync('HSL:2323251'));
  }, 30000);

  React.useEffect(() => {
    dispatch(departuresFetchAsync('1'));
    dispatch(timeTablesFetchAsync('HSL:2323251'));
  }, [dispatch]);

  return (
    <Container>
      <ClockContainer>
        <Clock />
      </ClockContainer>
      <DepartureContainer>
        {departures && departures.timeTables && (
          <FlatList
            data={departures.timeTables.timeTables}
            ListHeaderComponent={() => <Separator />}
            ItemSeparatorComponent={() => <Separator />}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => {
              return (
                <DepartureItem
                  vehicleNumber={item.shortName}
                  headSign={item.headSign}
                  distance={10}
                  minuteLeft={getMinuteLeft(item.arrival)}
                />
              );
            }}
          />
        )}
      </DepartureContainer>
    </Container>
  );
};
