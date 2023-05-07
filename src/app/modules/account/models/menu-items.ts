import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { IMenuItem } from "./menu-item.interface";
import { faCalendar, faCircleQuestion, faEye, faUser } from "@fortawesome/free-regular-svg-icons";

export const MENU_ITEMS: IMenuItem[] = [
  {
    path: "my-announcements",
    title: "My Announcements",
    icon: faCalendar,
  },
  {
    path: "profile",
    title: "Profile",
    icon: faUser,
  },
  {
    title: "Dark Mode",
    template: "select",
    icon: faEye
  },
  {
    path: "help-center",
    title: "Help Center",
    icon: faCircleQuestion
  },
  {
    title: "Logout",
    template: "logout",
    icon: faSignInAlt,
  },
] 