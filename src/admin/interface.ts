import { Dayjs } from "dayjs";

export enum AdminStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
}

export interface IFormAdmin {
  id: number;
  username: string;
  status: AdminStatus;
  createdAt: string;
  user: {
    userToGroupPolicies: [
      {
        groupPolicy: {
          key: string,
          name: string,
        }
      }
    ]
  }
}

export interface ISubmitDataAdmin {
  username: string,
  password: string,
  groupPolicyKeys: IPolicyType[]
}

export interface IPostNewAdmin {
  username: string,
  password: string,
  groupPolicyKeys: string[]
}

export interface IValidateEditAdmin {
  adminId: number,
  status: AdminStatus,  
  username?: string,
  groupPolicyKeys?: IPolicyType[]
}

export interface IPatchAdmin {
  adminId: number,
  status: AdminStatus,  
  groupPolicyKeys: string[],
  username?: string,
}

export interface IResAdmins {
  items: IFormAdmin[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export type IAdminCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
}
export interface IShowMessage {
  type: MessageType;
  message: string;
}
export interface IPropsAdminTable {
  row: IFormAdmin;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
}

export interface FilterAdminProps {
  filterName: string | undefined,
  onChangeFilterName: (value: string) => void
}

export interface IAdminParams {
  endDate?: string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: string;
  limit?: number;
  status?: string;
}

export interface IResGroupPolicy {
  items: [{
    key: string,
    description: string,
    createdAt: string,
    name: string,
    updatedAt: string,
    version: number,
    deletedAt: string | null
  }];
  meta: {
    itemCount: number,
    totalItems: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number
  }
}
export interface IPolicyType {
    label: string,
    value: string,
}

export type StateProps = {
  confirmPopup: boolean;
  filterName: string | undefined;
  selectIdsAdmin: number[];
  showSkeleton: boolean;
  createdDate: Dayjs | null;
  groupPolicy: string[];
  infoNewAdmin: IPostNewAdmin;
  infoEditAdmin: IPatchAdmin;
  statusSearch: string | undefined;
  showPassword: boolean;
  showConfirmPassword: boolean;
};
