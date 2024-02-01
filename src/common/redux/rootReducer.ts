import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import registerReducer from 'src/auth/register/reducer/register.slice';
import forgotPasswordReducer from 'src/auth/forgot-password/reducer/forgot-password.slice';
import filterUserReducer from 'src/user/user.slice';
import eventReducer from 'src/event-merchant/event.slice';
import merchantSliceReducer from '../../merchant/reducer/merchant.slice';
import adminReducer from 'src/admin/admin.slice';
import giftReducer from 'src/gift/gift.slice';
import productReducer from 'src/product/product.slice';
import { reducer as administrationListReducer } from 'src/administration/administration-list/reducer';
import { reducer as administrationEditReducer } from 'src/administration/administration-edit/reducer';
import administrationCreateGroup from 'src/administration/administration-create-group/reducer';
// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin', 'login', 'forgotPassword', 'merchant'],
};

const rootReducer = combineReducers({
  authLogin: authLoginReducer,
  login: loginReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  filterUser: filterUserReducer,
  event: eventReducer,
  merchant: merchantSliceReducer,
  admin: adminReducer,
  administrationListReducer,
  administrationEditReducer,
  administrationCreateGroup,
  gift: giftReducer,
  product: productReducer
});

export { rootPersistConfig, rootReducer };
