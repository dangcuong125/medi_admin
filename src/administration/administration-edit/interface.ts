export interface IInitialState {
  groupNameValue: string;
  isOpenConfirmModal: boolean;
  defaultGroupNameValue: string;
  groupName: string;
  status: string;
  description: string;
}
export interface IGroupNameValue {
  value: string;
  label: string;
}
export interface IEditFormValue {
  groupName: string;
  description: string;
}
export interface INewDataEditAdmin {
  key: string | undefined;
  name: string;
  description: string;
  policiesIds: null | number[];
  status: string;
}
export interface IUserToGroupPolicyRes {
  userId: number;
  groupPolicyKey: string;
  groupPolicy: {
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    version: number;
    key: string;
    name: string;
    description: string;
  };
}
