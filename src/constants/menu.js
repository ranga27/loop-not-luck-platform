import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'review-roles',
    icon: 'simple-icon-eyeglass',
    label: 'menu.review',
    to: `${adminRoot}`,
    roles: [UserRole.super],
  },
  {
    id: 'post',
    icon: 'simple-icon-pencil',
    label: 'menu.post',
    to: 'post',
    roles: [UserRole.super],
  },
  {
    id: 'test',
    icon: 'iconsminds-test-tube',
    label: 'menu.test',
    to: 'test',
    roles: [UserRole.super],
  },
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
    roles: [UserRole.candidate, UserRole.super],
  },
  {
    id: 'help',
    icon: 'simple-icon-question',
    label: 'menu.help',
    to: `${adminRoot}`,
    roles: [UserRole.candidate, UserRole.super],
  },
];
export default data;
