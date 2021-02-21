import React from 'react';
import styled from 'styled-components/native';

const DelayedText = styled.Text(({ theme }) => ({
  background: theme.warningColor,
  fontSize: theme.fontSizes.small,
  fontWeight: 'bold',
  color: theme.secondaryColor,
  textAlign: 'left',
}));

interface DelayedProps {
  min: number;
}

export const Delayed: React.FC<DelayedProps> = ({ min, children }) => (
  <>
    <DelayedText>Delayed {min} min</DelayedText>
    {children}
  </>
);
