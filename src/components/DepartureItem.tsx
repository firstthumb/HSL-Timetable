import React from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

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
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.secondaryColor,
  flex: 1,
  width: width * 0.15,
}));

const StopContainer = styled.View(({ theme }) => ({
  background: theme.primaryColor,
  flex: 6,
}));

const StopTextContainer = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: 16,
  color: theme.secondaryColor,
  flex: 2,
}));

const NextDepartureContainer = styled.View(({ theme }) => ({
  background: theme.primaryColor,
}));

const NextDepartureTextContainer = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: 25,
  fontWeight: 'bold',
  color: theme.secondaryColor,
}));

const MainPlaceText = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: 18,
  fontWeight: 'bold',
  color: theme.secondaryColor,
}));

const ViaPlaceText = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: 12,
  fontWeight: 'bold',
  color: theme.secondaryColor,
}));

interface DepartureItemProps {
  vehicleNumber: string;
  headSign: string;
  distance: number;
  minuteLeft: number;
}

const MetroSymbolText = styled.Text(({}) => ({
  background: 'orangered',
  fontSize: 14,
  color: 'white',
  textAlign: 'center',
}));
const MetroSymbol = () => <MetroSymbolText> M </MetroSymbolText>;

const OnTimeText = styled.Text(({}) => ({
  background: 'green',
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'left',
}));
const DelayedText = styled.Text(({}) => ({
  background: 'red',
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'left',
}));
const OnTime: React.FC = ({ children }) => (
  <>
    <OnTimeText>On time </OnTimeText> {children}
  </>
);
interface DelayedProps {
  delayedMin: number;
}
const Delayed: React.FC<DelayedProps> = ({ delayedMin, children }) => (
  <>
    <DelayedText>Delayed {delayedMin} min</DelayedText>
    {children}
  </>
);

interface HeadSignProps {
  sign: string;
}
const HeadSign: React.FC<HeadSignProps> = ({ sign }) => {
  const places = [...sign.split('via')];
  const mainPlace =
    places[0] && places[0].includes('(M)') ? (
      <MainPlaceText>
        {places[0].replace('(M)', '')}
        <MetroSymbol />
      </MainPlaceText>
    ) : (
      <MainPlaceText>{places[0]}</MainPlaceText>
    );
  const viaPlace =
    places[1] && places[1].includes('(M)') ? (
      <ViaPlaceText>
        {places[1].replace('(M)', '')}
        <MetroSymbol />
      </ViaPlaceText>
    ) : (
      <ViaPlaceText>{places[1]}</ViaPlaceText>
    );
  return (
    <>
      {mainPlace}
      {viaPlace}
    </>
  );
};
export const DepartureItem: React.FC<DepartureItemProps> = ({ vehicleNumber, headSign, distance, minuteLeft }) => {
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
          <OnTime>
            <Text>21:21</Text>
          </OnTime>
          <Delayed delayedMin={1}>
            <Text>21:21</Text>
          </Delayed>
        </StopTextContainer>
      </StopContainer>
      <NextDepartureContainer>
        <NextDepartureTextContainer>{minuteLeft <= 1 ? 'NOW' : `${minuteLeft} min`}</NextDepartureTextContainer>
      </NextDepartureContainer>
    </Container>
  );
};
