const initialState = {
  groups: [],
};

export default function groupsReducer(state = initialState, action) {
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
    case "CREATE-GROUP-SUCCESS":
      return { ...state, message: action.payload };

    default:
      return state;
  }
}
