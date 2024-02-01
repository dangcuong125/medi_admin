
export interface IFormMerchant {
    id: number;
    email: string;
    name?: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    rank: string;
    status: string;
    userId?: number;
    version?: number;
  }
  
  export type IAdminCallback = {
    onSuccess: VoidFunction;
    onError: VoidFunction;
  };
  
  export type IMerchants = Array<IFormMerchant>;
  
  export interface IMerchantParams {
    page?: number;
    searchText?: string;
    limit?: number;
    status?: string;
    rank?: string;
  }
  export interface IResMerchants {
      items: IFormMerchant[],
      meta: {
        currentPage: number;
        itemCount: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
      }
  }
  export interface IMerchantParams {
    page?: number;
    searchText?: string;
    size?: number;
    status?: string;
    rank?: string;
  }
  export interface IResMerchants {
      items: IFormMerchant[],
      meta: {
        currentPage: number;
        itemCount: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
      }
  }

  export type IPropsAdminTableRow = {
    row: IFormMerchant;
    selected: boolean;
    onEditRow: VoidFunction;
    onSelectRow: (checked: boolean) => void;
    onDeleteRow: VoidFunction;
  };
  
  export interface IResEditMerchant {
    response: {
      id: string;
      name: string;
      registrationDate: Date;
      merchantRank: string;
      status: string;
    };
  }
  