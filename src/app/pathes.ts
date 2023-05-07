import { IGuardPathes } from "./models/models";

export const guardPathes: IGuardPathes[] = [
  {
    regExp: /^\/sign/,
    roles: [],
    message: "You are already logged in",
    additionalRule: "tokenDosentExists"
  },
  {
    regExp: /^\/sign\/in/,
    roles: [],
    message: "You are already logged in",
    additionalRule: "tokenDosentExists"
  },
  {
    regExp: /^\/sign\/up/,
    roles: [],
    message: "You are already logged in",
    additionalRule: "tokenDosentExists"
  },
  {
    regExp: /^\/account/,
    roles: [],
    message: "You can't access this page",
    additionalRule: "tokenDosentExpired"
  }
]