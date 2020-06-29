import React, {createContext, useReducer} from 'react';
import RestaurantReducer from '../reducers/RestaurantReducer';

export const RestaurantContext = createContext();

const RestaurantContextProvider = props => {
  const [restaurants, dispatch] = useReducer(RestaurantReducer, []);

  return (
    <RestaurantContext.Provider value={{restaurants, dispatch}}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;
