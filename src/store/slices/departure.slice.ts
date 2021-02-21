import { createSlice } from '@reduxjs/toolkit';
import { Departure, Station } from '../../api/hsl';
import { Api } from '../../api';
import { RootState } from '..';

export const departureSlice = createSlice({
  name: 'departure',
  initialState: {
    departures: [] as Departure[] | undefined,
    timeTable: {} as Station | undefined,
  },
  reducers: {
    setDepartures: (state, { payload }) => {
      state.departures = payload;
    },
    setTimeTable: (state, { payload }) => {
      state.timeTable = payload;
    },
  },
});

export const { setDepartures, setTimeTable } = departureSlice.actions;

export const departuresFetchAsync = (minLat: number, minLon: number, maxLat: number, maxLon: number) => async (
  dispatch: any,
  _getState: () => RootState,
) => {
  const departures = await Api.hsl.getDepartures(minLat, minLon, maxLat, maxLon);
  dispatch(setDepartures(departures));
};

export const timeTablesFetchAsync = (id: string) => async (dispatch, _getState: () => RootState) => {
  const timeTable = await Api.hsl.getTimeTable(id);
  dispatch(setTimeTable(timeTable));
};

export default departureSlice.reducer;
