import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View(({ theme }) => ({
  background: theme.primaryColor,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
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
}));

const StopContainer = styled.View(({ theme }) => ({
  background: theme.primaryColor,
}));

const StopTextContainer = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: 16,
  color: theme.secondaryColor,
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

export const DepartureItem: React.FC = () => {
  return (
    <Container>
      <VehicleContainer>
        <VehicleTextContainer>543</VehicleTextContainer>
      </VehicleContainer>
      <StopContainer>
        <StopTextContainer>KivenlahtiEspoonlahti</StopTextContainer>
        <StopTextContainer>Itäportti, Stop E3241: 426 m</StopTextContainer>
      </StopContainer>
      <NextDepartureContainer>
        <NextDepartureTextContainer>1 min</NextDepartureTextContainer>
      </NextDepartureContainer>
    </Container>
  );
};
