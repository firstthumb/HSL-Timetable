import React from 'react';
import styled from 'styled-components/native';

const OnTimeText = styled.Text(({ theme }) => ({
  background: theme.successColor,
  fontSize: theme.fontSizes.small,
  fontWeight: 'bold',
  color: theme.secondaryColor,
  textAlign: 'left',
}));

export const OnTime: React.FC = ({ children }) => (
  <>
    <OnTimeText>On time </OnTimeText> {children}
  </>
);
