import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'my-loop',
    icon: 'iconsminds-record',
    label: 'menu.my-loop',
    to: `${adminRoot}`,
    roles: [UserRole.candidate],
  },
  {
    id: 'applications',
    icon: 'simple-icon-note',
    label: 'menu.applications',
    to: `${adminRoot}`,
    roles: [UserRole.candidate],
  },
  {
    id: 'saved-roles',
    icon: 'iconsminds-disk',
    label: 'menu.saved-roles',
    to: `${adminRoot}`,
    roles: [UserRole.candidate],
  },
  {
    id: 'messages',
    icon: 'simple-icon-speech',
    label: 'menu.messages',
    to: `${adminRoot}`,
    roles: [UserRole.candidate],
  },
  {
    id: 'profile',
    icon: 'simple-icon-user',
    label: 'menu.profile',
    to: 'account',
    roles: [UserRole.candidate],
  },
  {
    id: 'logout',
    icon: 'simple-icon-logout',
    label: 'menu.logout',
    to: 'logout',
    roles: [UserRole.candidate],
  },
  {
    id: 'help',
    icon: 'simple-icon-question',
    label: 'menu.help',
    to: `${adminRoot}`,
    roles: [UserRole.candidate],
  },
];
export default data;
