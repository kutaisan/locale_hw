const OrderReducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...prevState,
        orders: action.orders,
      };
    case 'LOAD_MORE':
      return {
        ...prevState,
        orders: [...prevState.orders, ...action.orders],
      };
    default:
      return prevState;
  }
};

export default OrderReducer;
