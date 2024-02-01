
export const TABLE_HEAD = [
  { id: 'id', label: 'Id', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'createdAt', label: 'Registration Date', align: 'left' },
  { id: 'updatedAt', label: 'Update Date', align: 'left'},
  { id: 'rank', label: 'Rank', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];
export const defaultValues = {
  email: '',
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
  rank: '',
  status: '',
};

export const newMerchantDefaultValues = {
  email: '',
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
  rank: 'BASIC',
  status: 'ACTIVE',
}

export const statusOptions = ['ACTIVE', 'CHECKING', 'BLOCK'];

export const merchantRankOptions = ['BASIC'];
export const STATUS_RES_ERR = 1000;
