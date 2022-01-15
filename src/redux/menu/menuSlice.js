import { createSlice } from '@reduxjs/toolkit';
import {
  defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
} from '../../constants/defaultValues';

const initialState = {
  containerClassnames: defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
  menuClickCount: 0,
  selectedMenuHasSubItems: defaultMenuType === 'menu-default', // if you use menu-sub-hidden as default menu type, set value of this variable to false
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export default menuSlice.reducer;
