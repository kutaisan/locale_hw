import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Header, SearchBar, Icon, CheckBox, Button} from 'react-native-elements';
import RestaurantsAsync from '../services/Restaurants';
import {RestaurantContext} from '../contexts/RestaurantContext';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {THEME_COLOR, LIGHT_COLOR} from '../config/config';
import RestaurantComponent from '../components/RestaurantComponent';

function RestaurantScreen() {
  const {restaurants, dispatch} = useContext(RestaurantContext);
  const [restaurantsToRender, setRestaurantsToRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  useEffect(() => {
    const RestaurantsList = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const Restaurants = await RestaurantsAsync(token);
      dispatch({type: 'SET_RESTAURANTS', restaurants: Restaurants});
      setRestaurantsToRender(Restaurants);
      if (Restaurants.length) {
        setNoData(false);
      }
      setLoading(false);
    };

    RestaurantsList();
  }, []);

  const handleOpenFilter = () => {
    setShowOpen(!showOpen);
  };

  const searchRestaurants = e => {
    console.log(e);
    setSearchText(e);
    let text = e.toLowerCase();
    let fullList = restaurants.restaurants;
    let filteredList = fullList.filter(item => {
      if (item.name.toLowerCase().match(text)) return item;
    });
    if (!text || text === '') {
      setRestaurantsToRender(fullList);
      setNoData(false);
    } else if (!filteredList.length) {
      setNoData(true);
    } else if (Array.isArray(filteredList)) {
      setNoData(false);
      setRestaurantsToRender(filteredList);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        containerStyle={{backgroundColor: THEME_COLOR, paddingTop: 0}}
        placement="left"
        centerComponent={
          <SearchBar
            containerStyle={style.searchContainer}
            inputContainerStyle={{
              backgroundColor: LIGHT_COLOR,
              borderBottomWidth: 0,
            }}
            placeholder="Search"
            round
            onChangeText={searchRestaurants}
            value={searchText}
          />
        }
        rightComponent={
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => setShowFilter(true)}>
            <Icon
              name="filter-variant"
              type="material-community"
              color="#fff"
            />
          </TouchableOpacity>
        }
      />
      <View style={{flex: 1}}>
        {loading && (
          <View style={style.container}>
            <ActivityIndicator size={wp('25%')} color={THEME_COLOR} />
          </View>
        )}
        {showFilter && (
          <View style={{backgroundColor: THEME_COLOR}}>
            <Text style={style.filtertitle}>Filters</Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CheckBox
                title="Currently open"
                containerStyle={{
                  padding: 0,
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                textStyle={{color: '#fff'}}
                uncheckedColor="#fff"
                checkedColor="#fff"
                checked={showOpen}
                onPress={handleOpenFilter}
              />
              <Button
                icon={
                  <Icon name="up" type="antdesign" color="#fff" size={16} />
                }
                iconRight
                title="Hide"
                type="clear"
                onPress={() => setShowFilter(false)}
                titleStyle={{color: '#fff', padding: 5}}
              />
            </View>
          </View>
        )}
        {noData ? (
          <View style={style.container}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'gray'}}>
              No restaurants found
            </Text>
          </View>
        ) : (
          <FlatList
            data={restaurantsToRender}
            renderItem={({item}) => {
              if (
                (showOpen === true && item.open === true) ||
                showOpen === false
              ) {
                return <RestaurantComponent item={item} />;
              }
            }}
            keyExtractor={item => item.uid}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  searchContainer: {
    width: '100%',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    backgroundColor: THEME_COLOR,
    padding: 0,
  },
  filtertitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default RestaurantScreen;
