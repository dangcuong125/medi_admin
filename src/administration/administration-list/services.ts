import { ADMIN_ROLE, API_GROUP_POLICY } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IGetGroupParam } from './interface';

const enumStatusAll = 'ALL';

export const getGroupList = (
  searchText: string,
  status: string,
  page: number,
  limit: number
) => {
  const params: IGetGroupParam = {
    searchText: searchText.length > 0 ? searchText : '',
    status,
    page,
    limit,
  };
  if (status === enumStatusAll) delete params.status;
  else params.status = status;
  return axiosInstance.get(API_GROUP_POLICY, { params });
};

export const deleteGroupById = (key: string | null) => {
  return axiosInstance.delete(API_GROUP_POLICY + `/${key}`);
};
// export const deleteMultipleAdmin = (adminToDelete: IAdminToDeleteParams) => {
//   // @ts-ignore
//   return axiosInstance.delete(ADMIN, { data: adminToDelete });
// };
export const getAdminAuthorization = () => {
  return axiosInstance.get(ADMIN_ROLE);
};
