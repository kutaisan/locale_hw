import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PastOrderAsync from '../services/PastOrders';
import AsyncStorage from '@react-native-community/async-storage';
import {OrderContext} from '../contexts/OrderContext';
import OrderComponent from '../components/OrderComponent';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {THEME_COLOR, PAST_ORDERS_LIMIT} from '../config/config';

function PastOrderScreen() {
  const {orders, dispatch} = useContext(OrderContext);
  const [index, setIndex] = useState(0);
  const [token, setToken] = useState('');
  const [doneFetching, setDoneFetching] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const limit = PAST_ORDERS_LIMIT;

  useEffect(() => {
    const PastOrdersList = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setToken(token);
      // save token for loadMore function to prevent unnecessary async call
      const Orders = await PastOrderAsync(token, index, limit);
      dispatch({type: 'SET_ORDERS', orders: Orders});
      setLoading(false);
    };
    PastOrdersList();
  }, []);

  // Pagination function
  const loadMore = async () => {
    if (doneFetching) return; // Prevent fetch loop
    setFetching(true);
    const newIndex = index + limit;
    const NewOrders = await PastOrderAsync(token, newIndex, limit);

    if (NewOrders.length) {
      dispatch({type: 'LOAD_MORE', orders: NewOrders});
    } else {
      setDoneFetching(true);
    }

    setIndex(newIndex);
    setFetching(false);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={wp('25%')} color={THEME_COLOR} />
        </View>
      ) : (
        <>
          <FlatList
            data={orders.orders}
            renderItem={({item}) => <OrderComponent item={item} />}
            keyExtractor={item => item.uid}
            onEndReached={loadMore}
          />
          {isFetching && (
            <View style={{backgroundColor: THEME_COLOR}}>
              <Text style={{color: '#fff', textAlign: 'center', padding: 5}}>
                Loading items...
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

export default PastOrderScreen;
