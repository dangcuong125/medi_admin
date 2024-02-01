// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/dashboard';

const ROOTS_EVENT = '/event';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: '/',
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    shop_invitation: path(ROOTS_DASHBOARD, '/shop-invitation'),
    user: path(ROOTS_DASHBOARD, '/user'),
    administrationList: path(ROOTS_DASHBOARD, '/administration/list'),
    administrationCreateGroup: path(ROOTS_DASHBOARD, '/administration/create-group'),
    administrationEdit: path(ROOTS_DASHBOARD, '/administration/edit/:key'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    view: (userId: number) => path(ROOTS_DASHBOARD, `/user/${userId}`),
  },
  merchant: {
    root: path(ROOTS_DASHBOARD, '/merchants'),
    list: path(ROOTS_DASHBOARD, '/merchants/list'),
    create: path(ROOTS_DASHBOARD, '/merchants/create'),
    edit: (merchantId: number) => path(ROOTS_DASHBOARD, `/merchants/${merchantId}`),
  },
  admin: {
    list: path(ROOTS_DASHBOARD, '/admin/admin-list'),
    create: path(ROOTS_DASHBOARD, '/admin/admin-create'),
    edit: (adminId: number) => path(ROOTS_DASHBOARD, `/admin/admin-edit/${adminId}`),
  },
  event: {
    list: path(ROOTS_DASHBOARD, '/event/list'),
    createEvent: path(ROOTS_DASHBOARD, '/event/create'),
    editEvent: path(ROOTS_DASHBOARD, '/event/edit'),
    detail: path(ROOTS_DASHBOARD, '/event/detail/:id'),
  },
  gift: {
    root: path(ROOTS_DASHBOARD, '/gift'),
    list: path(ROOTS_DASHBOARD, '/gift/list'),
    detail: path(ROOTS_DASHBOARD, '/gift/:id')
  },
  product: {
    root: path(ROOTS_DASHBOARD, '/products'),
    list: path(ROOTS_DASHBOARD, '/products/list'),
    create: path(ROOTS_DASHBOARD, '/products/create'),
    edit: path(ROOTS_DASHBOARD, '/products/edit/:id'),
    detail: path(ROOTS_DASHBOARD, '/products/detail/:id'),
  },
};

export const PATH_EVENT = {
  listEvent: path(ROOTS_EVENT, '/list'),
  createEvent: path(ROOTS_EVENT, '/create'),
  editEvent: path(ROOTS_EVENT, '/edit'),
};
