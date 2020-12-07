const globalDataReducer = (state, action) => {
  switch (action.type) {
    case "fetch": {
      return action.product;
    }

    case "change": {
      let newState = state;
      let arr = Object.keys(action.product);
      action.product[arr[0]] === 0
        ? delete newState.cartData[arr[0]]
        : (newState.cartData[arr[0]] = action.product[arr[0]]);

      return newState;
    }

    default:
      return state;
  }
};

export default globalDataReducer;
