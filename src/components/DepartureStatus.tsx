import React from 'react';
import styled from 'styled-components/native';
import { getMinuteLeft, formatTime } from '../helpers/utils';
import { OnTime } from './OnTime';
import { Delayed } from './Delayed';
import { Early } from './Early';
import { Scheduled } from './Scheduled';

const DelayedTimeText = styled.Text(({}) => ({
  textDecorationLine: 'line-through',
}));

const EarlyTimeText = styled.Text(({}) => ({
  textDecorationLine: 'line-through',
}));

interface DepartureStatusProps {
  arrival: number;
  scheduledArrival: number;
}

export const DepartureStatus: React.FC<DepartureStatusProps> = ({ arrival, scheduledArrival }) => {
  const minuteLeft = getMinuteLeft(arrival);
  const arrivalTime = formatTime(arrival);
  const scheduledArrivalTime = formatTime(scheduledArrival);

  if (minuteLeft <= 10) {
    if (arrival === scheduledArrival) {
      return <OnTime />;
    } else if (arrival > scheduledArrival) {
      const delayed = Math.ceil((arrival - scheduledArrival) / 60);
      return (
        <Delayed min={delayed}>
          <DelayedTimeText>{scheduledArrivalTime}</DelayedTimeText>
        </Delayed>
      );
    } else {
      const early = Math.ceil((scheduledArrival - arrival) / 60);
      return (
        <Early min={early}>
          <EarlyTimeText>{scheduledArrivalTime}</EarlyTimeText>
        </Early>
      );
    }
  } else {
    return <Scheduled>{arrivalTime}</Scheduled>;
  }
};
