const initialState = [];
const MessagesReducer = (state = initialState, action) => {
  if (action.type) {
    return [...state, action.payload];
  }
  return state;
};
