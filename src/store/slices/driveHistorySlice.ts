import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Stats {
  distance: number;
}

export interface DriveHistoryState {
  unitId: number;
  vehicleNumber: string;
  from: string;
  till: string;
  stats: Stats;
}

const initialState: DriveHistoryState = {
  unitId: 0,
  vehicleNumber: '',
  from: '',
  till: '',
  stats: {
    distance: 0,
  },
};

export const driveHistorySlice = createSlice({
  name: 'driveHistory',
  initialState,
  reducers: {
    setVehicle: (
      state,
      action: PayloadAction<
        Pick<DriveHistoryState, 'unitId'> &
          Pick<DriveHistoryState, 'vehicleNumber'>
      >
    ) => {
      state.unitId = action.payload.unitId;
      state.vehicleNumber = action.payload.vehicleNumber;
    },
    setCalendarDate: (
      state,
      action: PayloadAction<
        Pick<DriveHistoryState, 'from'> & Pick<DriveHistoryState, 'till'>
      >
    ) => {
      state.from = action.payload.from;
      state.till = action.payload.till;
    },
    setStats: (state, action: PayloadAction<Pick<Stats, 'distance'>>) => {
      state.stats.distance = action.payload.distance;
    },
  },
});

export const { setVehicle, setCalendarDate, setStats } =
  driveHistorySlice.actions;

export default driveHistorySlice.reducer;
