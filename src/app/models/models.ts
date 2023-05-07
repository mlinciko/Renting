import DevExpress from "devextreme";

export type IDxFormItems = Array<
  | DevExpress.ui.dxFormSimpleItem
  | DevExpress.ui.dxFormGroupItem
  | DevExpress.ui.dxFormTabbedItem
  | DevExpress.ui.dxFormEmptyItem
  | DevExpress.ui.dxFormButtonItem
>;

export interface IUser {
  id: number,
  username: string,
  enabled: boolean,
  lastName: string,
  firstName: string,
  patronymic: string,
  email: string,
  phoneNumber: string,
  balance: number
  rating: number,
  roles: IRole[],
  imagePath: string,
}

export interface IRole {
  name: string;
}

export interface IGuardPathes {
  regExp: RegExp | string;
  roles: string[];
  message: string;
  additionalRule?: "tokenDosentExists" | "tokenDosentExpired",
}

export interface IDefaultResponse {
  status: boolean,
  message: string,
}