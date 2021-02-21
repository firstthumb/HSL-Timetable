import React from 'react';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { DepartureStatus } from './DepartureStatus';
import { DepartureTime } from './DepartureTime';
import { HeadSign } from './HeadSign';

const Container = styled.View(({ theme }) => ({
  background: theme.primaryColor,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: 10,
  paddingBottom: 10,
}));

const VehicleContainer = styled.View(({ theme }) => ({
  background: theme.primaryColor,
}));

const VehicleTextContainer = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: theme.fontSizes.large,
  fontWeight: 'bold',
  color: theme.secondaryColor,
  flex: 1,
  width: scale(70),
}));

const StopContainer = styled.View(({ theme }) => ({
  background: theme.primaryColor,
  flex: 6,
}));

const StopTextContainer = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: theme.fontSizes.medium,
  color: theme.secondaryColor,
  flex: 2,
}));

const NextDepartureContainer = styled.View(({ theme }) => ({
  background: theme.primaryColor,
}));

const NextDepartureTextContainer = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: theme.fontSizes.large,
  fontWeight: 'bold',
  color: theme.secondaryColor,
}));

interface DepartureItemProps {
  vehicleNumber: string;
  headSign: string;
  arrival: number;
  scheduledArrival: number;
}

export const DepartureItem: React.FC<DepartureItemProps> = ({ vehicleNumber, headSign, arrival, scheduledArrival }) => {
  return (
    <Container>
      <VehicleContainer>
        <VehicleTextContainer>{vehicleNumber}</VehicleTextContainer>
      </VehicleContainer>
      <StopContainer>
        <StopTextContainer>
          <HeadSign sign={headSign} />
        </StopTextContainer>
        <StopTextContainer>
          <DepartureStatus arrival={arrival} scheduledArrival={scheduledArrival} />
        </StopTextContainer>
      </StopContainer>
      <NextDepartureContainer>
        <NextDepartureTextContainer>
          <DepartureTime arrival={arrival} />
        </NextDepartureTextContainer>
      </NextDepartureContainer>
    </Container>
  );
};
