import { adminRoot } from "./defaultValues";
// import { UserRole } from "../helpers/authHelper"

const data = [
  {
    id: 'dashbaord',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboard',
    to: `${adminRoot}/dashboard`,
  },
  {
    id: 'secondmenu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.second-menu',
    to: `${adminRoot}/second-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: `${adminRoot}/second-menu/second`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
];
export default data;
