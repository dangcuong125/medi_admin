export interface IResPolicies {
  id: number;
  action: 'manage' | 'read' | 'write';
  resource: 'all' | 'admin' | 'merchant' | 'client' | 'policy' | 'gift' | 'event';
  actionAbility: 'can' | 'cannot';
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  version: number;
}

export interface IPostGroupPolicy {
  description: string;
  name: string;
  policiesIds: number[];
}

export interface IStateProps {
  postGroupPolicy: IPostGroupPolicy;
  confirmPopup: boolean;
}

export interface ICreateGroupCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
