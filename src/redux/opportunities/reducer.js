import { SELECT_OPPORTUNITY_TO_REVIEW } from '../actions';

const INIT_STATE = {
  opportunities: [],
  selectedOpportunity: {
    title: '',
    organisation: '',
    location: [],
    positionType: [],
    department: '',
    description: '',
    qualification: '',
    howToApply: '',
    email: '',
    website: '',
    deadline: '',
    startDate: '',
    checkboxCoverLetter: false,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SELECT_OPPORTUNITY_TO_REVIEW:
      return { ...state, selectedOpportunity: action.payload };
    default:
      return { ...state };
  }
};
