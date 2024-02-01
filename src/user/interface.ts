interface EventCode {
  code: string;
  expiresAt: string;
  useTime: number;
  eventId: number;
  event: {};
}
export interface IUserRow {
  id: number;
  phoneNumber: string;
  email: string;
  address: string;
  createAt: string;
  updateAt?: string;
  deleteAt?: string;
  version?: number;
  fullName?: string;
  eventCode?: EventCode;
}
export interface IUserCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
  onSuccessSend?: VoidFunction;
}
export interface IPropsUserTableRow {
  row: IUserRow;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onViewRow: VoidFunction;
}
export interface ISearchParamsProps {
  searchText: string;
}
export interface IUserParams {
  page?: number;
  searchBy?: string;
  searchText?: string;
  limit?: number;
}

export interface IUserResponse {
  items: IUserRow[];
  meta: {
    totalItem?: number;
    itemCount: number;
    itemsPerPage: number;
    totalPage?: number;
    currentPage: number;
  };
}
export interface IUserSlice {
  searchFilter: string;
  searchRole: string;
}
