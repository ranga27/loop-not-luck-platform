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
  reducers: {
    changeSelectedMenuHasSubItems: (state, action) => {
      return { ...state, selectedMenuHasSubItems: action.payload };
    },
    changeDefaultClassnames: (state, action) => {
      return { ...state, containerClassnames: action.payload };
    },
    addContainerClassname: (state, action) => {
      return { ...state, containerClassnames: action.payload };
    },
    clickOnMobileMenu: (state, action) => {
      return { ...state, containerClassnames: action.payload };
    },
    setContainerClassnames: (state, action) => {
      return { ...state, containerClassnames: action.payload };
    },
  },
});

export default menuSlice.reducer;
