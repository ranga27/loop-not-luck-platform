import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    sendJobEmail: (state, action) => {
      return { state, action };
    },
  },
});

export const { sendJobsEmail } = adminSlice.actions;

export default adminSlice.reducer;
