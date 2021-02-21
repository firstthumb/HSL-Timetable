import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';

const StopMarkerComponent: React.FC = () => {
  const theme = useTheme();

  return <Ionicons name="bus-outline" size={scale(15)} color={theme.colors.primary} />;
};

export const StopMarker = React.memo(StopMarkerComponent);
