import React from 'react';
import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';
import { Clock, DepartureItem } from '../components';

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

const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

export const DepartureScreen: React.FC = () => {
  return (
    <Container>
      <ClockContainer>
        <Clock />
      </ClockContainer>
      <DepartureContainer>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Separator />}
          ItemSeparatorComponent={() => <Separator />}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => {
            return <DepartureItem />;
          }}
        />
      </DepartureContainer>
    </Container>
  );
};
