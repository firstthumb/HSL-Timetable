import React from 'react';
import styled from 'styled-components/native';

const ScheduledText = styled.Text(({ theme }) => ({
  background: theme.primaryColor,
  fontSize: theme.fontSizes.small,
  fontWeight: 'bold',
  color: theme.secondaryColor,
  textAlign: 'left',
}));

export const Scheduled: React.FC = ({ children }) => (
  <>
    <ScheduledText>Scheduled </ScheduledText> {children}
  </>
);
