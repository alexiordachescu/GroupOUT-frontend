const initialState = {
  groups: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GROUPS_FETCH_SUCCESS":
      return { groups: action.payload };
    case "JOIN-SUCCESS":
      const groupPayloadId = action.payload.id;
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === groupPayloadId) {
            return action.payload;
          }
          return group;
        }),
      };

    default:
      return state;
  }
};

// return { ...state, groups: [...state.groups, action.payload] };
