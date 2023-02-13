/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import { format, parse, differenceInDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from '../constants/defaultValues';

/**
 * Gets number of days to deadline from current day.
 *
 * @param {deadline} RoleDeadline
 * @return {daysToDeadline} Days To Deadline
 */
export const getDaysToDeadline = (deadline) => {
  const daysToDeadline = differenceInDays(
    new Date(deadline),
    new Date(Date.now())
  );
  return daysToDeadline;
};

export const formatDateInArray = (array) => {
  array.forEach((item) => {
    for (const prop in item) {
      if (item.hasOwnProperty(prop)) {
        if (item[prop] instanceof Timestamp) {
          item[prop] = format(new Date(item[prop].toDate()), 'dd-MMM-yyyy');
        }
      }
    }
  });
  return array;
};

export const getDateFromString = (value) => {
  const formattedDate = parse(value, 'dd-MMM-yyyy', new Date());
  return formattedDate;
};
export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction');
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  };
};
export const setDirection = (localValue) => {
  let direction = 'ltr';
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }
  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem('currentLanguage') &&
      localeOptions.filter(
        (x) => x.id === localStorage.getItem('currentLanguage')
      ).length > 0
        ? localStorage.getItem('currentLanguage')
        : defaultLocale;
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    );
  }
};

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('currentUser') != null
        ? JSON.parse(localStorage.getItem('currentUser'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const sortCombinedRoles = (roles) => {
  return roles.sort((a, b) => b.score - a.score);
};

export const getCandidateScreeningList = (userWithRoles) => {
  const result = [];
  userWithRoles.forEach((user) => {
    user.roles.forEach((role) => {
      result.push({
        recordId: `${user.id.slice(-3)}${role.id.slice(-2)}`.toUpperCase(),
        appliedAt: role.updatedAt
          ? format(new Date(role.updatedAt.toDate()), 'dd-MMM-yyyy')
          : 'Not set',
        userFullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: role.company,
        roleTitle: role.title,
        positionType: role.positionType,
        department: role.department,
        score: role.score,
        location: user.location,
        roleLocation: role.location,
        jobType: role.locationType,
        jobTitle: role.title,
        roleDescription: role.description,
        rolling: role.rolling,
        roleStartDate: role.startDate,
        roleDeadline: role.deadline,
        areaOfInterests: role.areaOfInterests,
        rolesOfInterests: role.rolesOfInterests,
        behaviorAttributes: role.behaviourAttributesStrengths,
        degreeSubject: user.degreeSubject,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        ethnicity: user.ethnicity,
        ethnicityOther: user.ethnicityOther,
        disability: user.disability,
        disabilityAnswer: user.disabilityAnswer,
        rolesInterestedIn: user.rolesInterestedIn,
        userAreaOfInterest: user.areaOfInterests,
        visaRequired: user.visaRequired,
        graduationYear: user.graduationYear,
        userStart: user.start,
        userDiversity: user.diversity,
        companyLogoUrl: role.logoUrl,
        userCVurl: user.cvUrl,
        cvUploadDate: user.cvUploadDate,
        howToApply: role.howToApply,
        createdAt: role.createdAt,
      });
    });
  });
  return result;
};

// Function to manage the Object UseState
class StoreInUsestate {
  // handle the changes in Input field to store the data in UseState
  static handleChange = (e, stateName) => {
    const { name, value } = e.target;
    stateName((prevState) => ({
      ...prevState,
      [name]:
        name === 'appliedAt' && value !== ''
          ? format(new Date(value), 'dd-MMM-yyyy')
          : value,
    }));
  };
}
export default StoreInUsestate;

// function to return  the keys which have values
const getKeys = (searchObj) => {
  const keys = Object.keys(searchObj).filter((key) => {
    return searchObj[key] !== '' && searchObj[key] !== undefined;
  });
  return keys;
};

// Function to search the Data by multiple field
export const searchData = (searchObj, allData) => {
  const keysToSearch = getKeys(searchObj);
  if (keysToSearch <= 0) return allData;
  const filtered = [];
  for (let i = 0; i < allData.length; i += 1) {
    let check = false;
    const record = allData[i];
    for (let j = 0; j < keysToSearch.length; j += 1) {
      const key = keysToSearch[j];
      if (
        record[key]
          .toString()
          .toLowerCase()
          .includes(searchObj[key].toString().toLowerCase())
      ) {
        check = true;
      } else {
        check = false;
        break;
      }
    }
    if (check) {
      filtered.push(record);
    }
  }

  if (filtered?.length) {
    return filtered;
  }
  return [];
};

export const sortScreeningUserList = (userList, sortBy) => {
  switch (sortBy) {
    case 'companyAscending':
      return userList.sort((a, b) => a.company.localeCompare(b.company));

    case 'companyDescending':
      return userList.sort((a, b) => b.company.localeCompare(a.company));

    case 'usernameAscending':
      return userList.sort((a, b) =>
        a.userFullname.localeCompare(b.userFullname)
      );

    case 'usernameDescending':
      return userList.sort((a, b) =>
        b.userFullname.localeCompare(a.userFullname)
      );

    case 'emailAscending':
      return userList.sort((a, b) => a.email.localeCompare(b.email));

    case 'emailDescending':
      return userList.sort((a, b) => b.email.localeCompare(a.email));

    case 'departmentAscending':
      return userList.sort((a, b) => a.department.localeCompare(b.department));

    case 'departmentDescending':
      return userList.sort((a, b) => b.department.localeCompare(a.department));

    case 'appliedAtAscending':
      return userList.sort(
        (a, b) =>
          new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()
      );

    case 'appliedAtDescending':
      return userList.sort(
        (a, b) =>
          new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      );

    case 'scoreAscending':
      return userList.sort((a, b) => a.score - b.score);

    case 'scoreDescending':
      return userList.sort((a, b) => b.score - a.score);

    default:
      return userList;
  }
};

export const unCheckAllCheckbox = (cvUrl) => {
  const x = document.getElementById(cvUrl);
  x.checked = false;
};

export const downloadSelectedCVs = (cvUrls) => {
  if (cvUrls?.length) {
    for (let i = 0; i < cvUrls?.length; i += 1) {
      fetch(
        cvUrls[i],
        { mode: 'cors' },
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
        }
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${cvUrls[i]?.split('/')?.pop()}`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          unCheckAllCheckbox(cvUrls[i]);
        });
    }
  }
};

export const getOnboardedUsers = (users) => {
  return users.filter((x) => x.isOnboarded);
};

export const signUpsMinusLoop = (users) => {
  return users.filter((user) => !user.email.endsWith('@loopnotluck.com'));
};

export const getUsersNotOnboarded = (users) => {
  return users.filter((x) => !x.isOnboarded);
};

export const getUsersOnboardedWithoutCv = (users) => {
  return users.filter((x) => !x.cvUrl);
};

export const getUsersOnboardedWithCv = (users) => {
  return users.filter((x) => x.cvUrl);
};

export const getUsersWithProfileCompleted = (users) => {
  return users.filter((x) => x.hasCompletedProfile);
};

export const getUsersWithoutCompletedProfile = (users) => {
  return users.filter((x) => !x.hasCompletedProfile);
};

export const signUpsToday = (users) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const month = today.toLocaleString('default', { month: 'short' });
  let dd = today.getDate();

  if (dd < 10) dd = `0${dd}`;

  const formattedToday = `${dd}-${month}-${yyyy}`;

  return users.filter((user) => user.createdAt === formattedToday);
};

export const signUpsThisWeek = (users) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
    sevenDaysAgo
  );
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(
    sevenDaysAgo
  );
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
    sevenDaysAgo
  );

  console.log(`${da}-${mo}-${ye}`);
  const formattedWeek = `${da}-${mo}-${ye}`;

  return users.filter((user) => {
    return user.createdAt > formattedWeek;
  });
};
