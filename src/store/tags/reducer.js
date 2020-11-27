const initialState = { tagList: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "typeName":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
