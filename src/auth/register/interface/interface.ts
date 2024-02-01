export type IRegisterFormValuesProps = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    afterSubmit?: string;
};

export type IResRegisterMerchant = {
  email: string;
  userId: number;
  user?: {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
    id: number;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;
  id: number;
};