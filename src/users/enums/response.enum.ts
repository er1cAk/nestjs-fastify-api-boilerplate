export enum UsersResponse {
  USERS_FOUND = 'USERS fetched successfully',
  USERS_NOT_FOUND = 'Unable to fetch USERS',

  USER_FOUND = 'USER fetched successfully',
  USER_NOT_FOUND = 'Unable to fetch USER',

  USER_CREATED = 'User has been successfully CREATED',
  USER_CREATE_FAILED = 'Failed to CREATE the USER',

  USER_UPDATED = 'User has been successfully UPDATED',
  USER_UPDATE_FAILED = 'Failed to UPDATE the USER',

  USER_DELETED = 'User has been successfully DELETED',
  USER_DELETE_FAILED = 'Failed to DELETE the USER',
}
