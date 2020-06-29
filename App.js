/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useReducer, useEffect, useContext, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './views/SplashScreen';
import SignInScreen from './views/SignInScreen';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SignInAsync from './services/SignIn';
import TabNavigator from './navigations/TabNavigator';
import {AuthContext, initialState} from './contexts/AuthContext';
import UserContextProvider from './contexts/UserContext';
import RestaurantContextProvider from './contexts/RestaurantContext';
import OrderContextProvider from './contexts/OrderContext';
import AuthReducer from './reducers/auth';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const getTokenAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log('Token already declared: ', userToken);
      } catch (e) {
        console.log('Error on storage: ', e);
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    getTokenAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          const token = await SignInAsync(email, password);
          if (token) {
            AsyncStorage.setItem('userToken', token);
            dispatch({type: 'SIGN_IN', token});
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          throw new Error('Login failed');
        }
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar backgroundColor="#157fb2" />
      <UserContextProvider>
        <RestaurantContextProvider>
          <OrderContextProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {state.isLoading ? (
                  <Stack.Screen name="Splash" component={SplashScreen} />
                ) : state.userToken == null ? (
                  <Stack.Screen name="Sign In" component={SignInScreen} />
                ) : (
                  <Stack.Screen name="Home" component={TabNavigator} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </OrderContextProvider>
        </RestaurantContextProvider>
      </UserContextProvider>
    </AuthContext.Provider>
  );
};

export default App;
