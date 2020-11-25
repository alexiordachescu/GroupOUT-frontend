const initialState = {
  adminGroups: [],
  memberGroups: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH-ADMIN-SUCCESS":
      return { adminGroups: action.payload };

    default:
      return state;
  }
};
