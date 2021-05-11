import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'opportunities',
    icon: 'simple-icon-rocket',
    label: 'menu.opportunities',
    to: `${adminRoot}/opportunities`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.post',
        to: `${adminRoot}/opportunities/post`,
      },
      {
        icon: 'simple-icon-paper-clip',
        label: 'menu.review',
        to: `${adminRoot}/opportunities/review`,
        roles: [UserRole.super, UserRole.admin],
      },
      /*       {
        icon: 'simple-icon-paper-clip',
        label: 'menu.open',
        to: `${adminRoot}/opportunities/open`,
      }, */
    ],
  },
  {
    id: 'candidates',
    icon: 'iconsminds-students',
    label: 'menu.candidates',
    to: `${adminRoot}/candidates`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'iconsminds-3d-eyeglasses',
        label: 'menu.view',
        to: `${adminRoot}/candidates/view`,
      },
    ],
  },
  /*   {
    id: 'dashbaord',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboard',
    to: `${adminRoot}/dashboard`,
  }, */
  /* {
    id: 'onboarding',
    icon: 'simple-icon-note',
    label: 'menu.onboarding',
    to: `${adminRoot}/onboarding`,
    // roles: [UserRole.Candidate, UserRole.Editor],
  }, */
  {
    id: 'admin',
    icon: 'iconsminds-security-settings',
    label: 'menu.admin',
    to: `${adminRoot}/admin`,
    roles: [UserRole.super],
  },
];
export default data;
