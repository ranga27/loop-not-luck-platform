export const UserRole = {
  super: 'super',
  admin: 'admin',
  editor: 'editor',
  employer: 'employer',
  candidate: 'candidate',
};

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyASO7xWsWqUHXXxkcMlbmaLWBuI6hOK5gA',
  authDomain: 'loop-luck.firebaseapp.com',
  databaseURL: 'https://loop-luck.firebaseio.com',
  projectId: 'loop-luck',
  storageBucket: 'loop-luck.appspot.com',
  messagingSenderId: '254916519702',
  appId: '1:254916519702:web:bd8ba9a53a0f27486c9237',
  measurementId: 'G-VYCHZLSDJZ',
};

export const adminRoot = '/app';
export const buyUrl = '';
export const searchPath = `${adminRoot}/#`;
export const servicePath = '';

/* export const currentUser = {
  id: 1,
  title: 'Admin User',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.superAdmin,
}; */

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
