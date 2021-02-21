import React from 'react';
import styled from 'styled-components/native';

const MetroSymbolText = styled.Text(({ theme }) => ({
  background: 'orangered',
  fontSize: theme.fontSizes.small,
  color: 'white',
  textAlign: 'center',
}));
const MetroSymbol = () => <MetroSymbolText> M </MetroSymbolText>;

const MainPlaceText = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: theme.fontSizes.medium,
  fontWeight: 'bold',
  color: theme.secondaryColor,
}));

const ViaPlaceText = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: theme.fontSizes.small,
  fontWeight: 'bold',
  color: theme.secondaryColor,
}));

interface HeadSignProps {
  sign: string;
}

export const HeadSign: React.FC<HeadSignProps> = ({ sign }) => {
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
