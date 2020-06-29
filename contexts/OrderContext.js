import React, {createContext, useReducer} from 'react';
import OrderReducer from '../reducers/OrderReducer';

export const OrderContext = createContext();

const OrderContextProvider = props => {
  const [orders, dispatch] = useReducer(OrderReducer, []);

  return (
    <OrderContext.Provider value={{orders, dispatch}}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
