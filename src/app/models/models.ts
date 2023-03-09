import DevExpress from "devextreme";

export type IDxFormItems = Array<
  | DevExpress.ui.dxFormSimpleItem
  | DevExpress.ui.dxFormGroupItem
  | DevExpress.ui.dxFormTabbedItem
  | DevExpress.ui.dxFormEmptyItem
  | DevExpress.ui.dxFormButtonItem
>;