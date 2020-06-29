import React, {createContext} from 'react';

export const AuthContext = createContext();

export const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};
