import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { useInterval } from '../helpers/hooks';

const { width, height } = Dimensions.get('window');

const Container = styled.View(({ theme }) => ({
  background: theme.secondaryColor,
  borderRadius: 5,
  width: width * 0.3,
  height: height * 0.06,
}));

const ClockText = styled.Text(({ theme }) => ({
  fontSize: theme.fontSizes.large,
  fontWeight: 'bold',
  color: theme.primaryColor,
  textAlign: 'center',
  textAlignVertical: 'center',
  flex: 1,
}));

type TimeObject = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getTime = (): TimeObject => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { hours, minutes, seconds };
};

export const Clock: React.FC = () => {
  const [time, setTime] = useState(getTime);

  useInterval(() => {
    setTime(getTime);
  }, 60000);

  return (
    <Container>
      <ClockText>
        {time.hours.toString().padStart(2, '0')}:{time.minutes.toString().padStart(2, '0')}
      </ClockText>
    </Container>
  );
};
