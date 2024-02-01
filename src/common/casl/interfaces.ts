export type Actions = 'manage' | 'read' | 'write' | 'create' | 'delete';
export type ActionAbility = 'can' | 'cannot';
export type Resource =
  | 'all'
  | 'admin'
  | 'merchant'
  | 'client'
  | 'policy'
  | 'gift'
  | 'event';

export interface Policy {
  id: string;
  action: Actions;
  resource: Resource;
  name: string;
  actionAbility: ActionAbility;
}
export interface IAdminRoleInfos {
  createdAt: string;
  deletedAt: string | null;
  userId: number;
  groupPolicyKey: string;
  groupPolicy: {
    createdAt: string;
    deletedAt: string | null;
    updatedAt: string;
    version: number;
    key: string;
    name: string;
    description: string;
    groupToPolicies: IAdminRoleGroupPolicy[];
  };
}
export interface IAdminRoleGroupPolicy {
  createdAt: string;
  deletedAt: null | string;
  policyId: number;
  groupPolicyKey: string;
  policy: {
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    version: number;
    id: number;
    action: string;
    resource: string;
    actionAbility: string;
    name: string;
  };
}
