const initialState = { tagList: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "TAGS_FETCH_SUCCESS":
      return { tagList: action.payload };

    default:
      return state;
  }
};
