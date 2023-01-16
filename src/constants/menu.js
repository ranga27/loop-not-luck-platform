import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-security-check',
    label: 'menu.dashboard',
    to: 'dashboard',
    roles: [UserRole.super],
  },
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
    id: 'screening',
    icon: 'iconsminds-monitor',
    label: 'menu.screening',
    to: 'screening',
    roles: [UserRole.super],
  },
  {
    id: 'companies',
    icon: 'iconsminds-building',
    label: 'menu.companies',
    to: 'companies',
    roles: [UserRole.super],
  },
  {
    id: 'templates',
    icon: 'iconsminds-column',
    label: 'menu.templates',
    to: 'templates',
    roles: [UserRole.super],
  },
  {
    id: 'profiles',
    icon: 'iconsminds-user',
    label: 'menu.profiles',
    to: 'profiles',
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
    to: `applications`,
    roles: [UserRole.candidate],
  },
  {
    id: 'saved-roles',
    icon: 'iconsminds-disk',
    label: 'menu.saved-roles',
    to: 'saved',
    roles: [UserRole.candidate],
  },
  {
    id: 'messages',
    icon: 'simple-icon-speech',
    label: 'menu.messages',
    to: `messages`,
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
    to: 'help',
    roles: [UserRole.candidate, UserRole.super],
  },
];
export default data;
