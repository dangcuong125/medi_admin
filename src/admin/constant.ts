import { AdminStatus } from "./interface";

export const status = ['ACTIVE', 'BANNED'];

export const STATUS_RES_ERR = 1000;

export const defaultValuesAdmin = {
  username: '',
  password: '',
  groupPolicyKeys: []
};

export const defaultValueEditAdmin = {
  adminId: 0,
  status: AdminStatus.BANNED,
  groupPolicyKeys: [],
  username: ''
}

export const TABLE_ADMIN_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'createAt', label: 'Creation Date', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { label: '', align: 'right' },
]

export const defaultValueStatus = 'ALL'

export const adminStatusSearch = [
  defaultValueStatus, AdminStatus.ACTIVE, AdminStatus.BANNED
]