import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { DepartureItem, Loading } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { timeTablesFetchAsync } from '../store/slices/departure.slice';
import { RootState } from '../store';
import { useInterval } from '../helpers/hooks';
import { RootStackParamList } from './types';

const Container = styled.View(({ theme }) => ({
  background: theme.primaryColor,
  padding: 10,
  flex: 1,
}));

const DepartureContainer = styled.View(({}) => ({
  flex: 12,
}));

const Separator = styled.View(({ theme }) => ({
  height: 1,
  width: '100%',
  backgroundColor: theme.secondaryColor,
}));

type DepartureScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

export const DepartureScreen: React.FC<DepartureScreenProps> = ({ route }: DepartureScreenProps) => {
  const { gtfsId } = route.params;
  const dispatch = useDispatch();
  const departures = useSelector((state: RootState) => state.departure);

  useInterval(async () => {
    dispatch(timeTablesFetchAsync(gtfsId));
  }, 30000);

  React.useEffect(() => {
    dispatch(timeTablesFetchAsync(gtfsId));
  }, [dispatch, gtfsId]);

  return (
    <Container>
      <DepartureContainer>
        {!departures && <Loading />}
        {departures && departures.timeTable && (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={departures.timeTable.timeTables}
            ItemSeparatorComponent={() => <Separator />}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => {
              return (
                <DepartureItem
                  vehicleNumber={item.shortName}
                  headSign={item.headSign}
                  arrival={item.arrival}
                  scheduledArrival={item.scheduledArrival}
                />
              );
            }}
          />
        )}
      </DepartureContainer>
    </Container>
  );
};
