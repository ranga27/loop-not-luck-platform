// eslint-disable-next-line import/no-cycle
import { SELECT_OPPORTUNITY_TO_REVIEW } from '../actions';

// eslint-disable-next-line import/prefer-default-export
export const selectOpportunityToReview = (opportunity) => {
  return {
    type: SELECT_OPPORTUNITY_TO_REVIEW,
    payload: opportunity,
  };
};
