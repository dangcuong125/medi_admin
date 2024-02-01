import { AbilityBuilder, Ability } from '@casl/ability';
import { Policy, Actions, IAdminRoleInfos } from './interfaces';

export type AppAbility = Ability<[Actions, Policy]>;
export const AppAbility = Ability;
import { store } from '../redux/store';

const ability = new Ability();
const isSuperAdmin = 'super_admin';

export default (action: string, subject: string) => {
  return ability.can(action, subject);
};
const defineRulesFor = (auth: IAdminRoleInfos) => {
  const { can, rules } = new AbilityBuilder(AppAbility);

  if (auth?.groupPolicyKey === isSuperAdmin) {
    can(['manage'], 'all');
  }

  return rules;
};

store.subscribe(() => {
  const auth = store.getState().administrationListReducer.authorizationAdmin;
  ability.update(defineRulesFor(auth));
});
