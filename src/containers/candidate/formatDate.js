/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */

import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */

const formatDate = (roles) => {
  roles.forEach((role) => {
    for (const prop in role) {
      if (role.hasOwnProperty(prop)) {
        if (role[prop] instanceof Timestamp) {
          role[prop] = format(new Date(role[prop].toDate()), 'dd-MMM-yyyy');
        }
      }
    }
  });
  return roles;
};

export default formatDate;
