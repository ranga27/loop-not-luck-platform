import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'opportunities',
    icon: 'simple-icon-rocket',
    label: 'menu.opportunities',
    to: `${adminRoot}/opportunities`,
    subs: [
      {
        icon: 'simple-icon-drawer',
        label: 'menu.view-roles',
        to: `${adminRoot}/opportunities/view`,
      },
      {
        icon: 'iconsminds-notepad',
        label: 'menu.post',
        to: `${adminRoot}/opportunities/roles`,
        roles: [UserRole.Admin, UserRole.Editor],
      },
    ],
  },
  {
    id: 'candidates',
    icon: 'iconsminds-students',
    label: 'menu.candidates',
    to: `${adminRoot}/candidates`,
    roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'iconsminds-3d-eyeglasses',
        label: 'menu.view',
        to: `${adminRoot}/candidates/view`,
      },
    ],
  },
  {
    id: 'admin',
    icon: 'iconsminds-security-settings',
    label: 'menu.admin',
    to: `${adminRoot}/admin`,
    roles: [UserRole.super],
    subs: [
      {
        icon: 'iconsminds-3d-eyeglasses',
        label: 'menu.users',
        to: `${adminRoot}/admin/users`,
      },
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.companies',
        to: `${adminRoot}/admin/companies`,
      },
      {
        icon: 'iconsminds-idea',
        label: 'menu.test',
        to: `${adminRoot}/admin/test`,
      },
    ],
  },
];
export default data;
