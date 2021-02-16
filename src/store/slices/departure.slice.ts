import { createSlice } from '@reduxjs/toolkit';
import { Departure, Station } from '../../api/hsl';
import { Api } from '../../api';

export const departureSlice = createSlice({
  name: 'departure',
  initialState: {
    departures: [] as Departure[] | undefined,
    timeTables: {} as Station | undefined,
  },
  reducers: {
    setDepartures: (state, { payload }) => {
      state.departures = payload;
    },
    setTimeTables: (state, { payload }) => {
      state.timeTables = payload;
    },
  },
});

export const { setDepartures, setTimeTables } = departureSlice.actions;

export const departuresFetchAsync = (_id: string) => async (dispatch: any, getState: () => RootState) => {
  const departures = await Api.hsl.getDepartures();
  dispatch(setDepartures(departures));
  return departures;
};

export const timeTablesFetchAsync = (id: string) => async (dispatch: any, getState: () => RootState) => {
  const timeTables = await Api.hsl.getTimeTables(id);
  dispatch(setTimeTables(timeTables));
  return timeTables;
};

export default departureSlice.reducer;
