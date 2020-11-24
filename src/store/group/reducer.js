const initialState = {
  groups: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GROUPS_FETCH_SUCCESS":
      return { groups: action.payload };

    default:
      return state;
  }
};
