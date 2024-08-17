export interface IStorageRbac {
  roles: string[];
  permissions: object;
  grants: object;
}

export const RBAC: IStorageRbac = {
  roles: ['admin', 'user'],
  permissions: {
    permission1: ['create', 'update', 'delete'],
    permission2: ['create', 'update', 'delete'],
    permission3: ['filter1', 'filter2'],
    permission4: ['create', 'update', 'delete'],
    permission5: ['ASYNC_filter1', 'ASYNC_filter2'],
  },
  grants: {
    admin: ['&user', 'permission1', 'permission3', 'permission5'],
    user: [
      '&userRoot',
      'permission2',
      'permission@create',
      'permission1@create',
      'permission3@filter1',
      'permission5@ASYNC_filter1',
    ],
    userRoot: ['permission4'],
  },
};
