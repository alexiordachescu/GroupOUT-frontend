export const selectAdminGroups = (state) => state.userGroupReducer.adminGroups;

export const selectMemberGroups = (state) =>
  state.userGroupReducer.memberGroups;
