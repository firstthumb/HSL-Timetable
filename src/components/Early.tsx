import React from 'react';
import styled from 'styled-components/native';

const EarlyText = styled.Text(({ theme }) => ({
  background: theme.warningColor,
  fontSize: theme.fontSizes.small,
  fontWeight: 'bold',
  color: theme.secondaryColor,
  textAlign: 'left',
}));

interface EarlyProps {
  min: number;
}

export const Early: React.FC<EarlyProps> = ({ min, children }) => (
  <>
    <EarlyText>Early {min} min</EarlyText>
    {children}
  </>
);
