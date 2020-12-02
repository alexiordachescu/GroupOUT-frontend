const initialState = {
  adminGroups: [],
  memberGroups: [],
};

export default function userGroupsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH-ADMIN-SUCCESS":
      return { adminGroups: action.payload };
    case "FETCH-MEMBER-SUCCESS":
      return { ...state, memberGroups: action.payload };
    default:
      return state;
  }
}
