/* eslint-disable default-param-last */
import { CHANGE_LOCALE } from '../actions';
import { getCurrentLanguage } from '../../helpers/utils';

const INIT_STATE = {
  locale: getCurrentLanguage(),
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };

    default:
      return { ...state };
  }
};
