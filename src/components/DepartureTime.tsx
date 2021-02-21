import React from 'react';
import styled from 'styled-components/native';
import { formatTime, getMinuteLeft } from '../helpers/utils';

const DepartureTimeText = styled.Text(({ theme }) => ({
  color: theme.secondaryColor,
  fontSize: theme.fontSizes.medium,
}));

const DepartureTimeNowText = styled.Text(({ theme }) => ({
  color: theme.secondaryColor,
  fontSize: theme.fontSizes.large,
}));

interface DepartureTimeProps {
  arrival: number; // Arrival time in seconds
}

export const DepartureTime: React.FC<DepartureTimeProps> = ({ arrival }) => {
  const minuteLeft = getMinuteLeft(arrival);

  if (minuteLeft <= 1) {
    return <DepartureTimeNowText>NOW</DepartureTimeNowText>;
  } else if (minuteLeft <= 20) {
    return <DepartureTimeText>{minuteLeft} min</DepartureTimeText>;
  } else {
    return <DepartureTimeText>{formatTime(arrival)}</DepartureTimeText>;
  }
};
