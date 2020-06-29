import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {UserContext} from '../contexts/UserContext';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Button, Icon, ListItem, Divider} from 'react-native-elements';
import ProfileInfoAsync from '../services/ProfileInfo';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {THEME_COLOR, LIGHT_COLOR} from '../config/config';
function HomeScreen() {
  const {signOut} = useContext(AuthContext);
  const {user, dispatch} = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ProfileInfo = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const User = await ProfileInfoAsync(token);
      console.log(User);
      dispatch({type: 'SET_USER', user: User});
      setLoading(false);
    };
    ProfileInfo();
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flex: 0.3,
          width: '100%',
          backgroundColor: THEME_COLOR,
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: hp('2.5%'),
        }}>
        <Button
          title="Sign out"
          onPress={signOut}
          icon={
            <Icon name="logout" type="material-community" color={THEME_COLOR} />
          }
          buttonStyle={{backgroundColor: '#fff'}}
          titleStyle={{color: THEME_COLOR, padding: 5}}
          containerStyle={{
            width: wp('30%'),
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Icon
            name="star"
            type="material-community"
            color={THEME_COLOR}
            raised
            size={15}
          />
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            {user.points} Points
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.7,
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Avatar
          source={
            user.profilePicture
              ? {
                  uri: user.profilePicture,
                }
              : require('../assets/no-photo.png')
          }
          rounded
          size={hp('20%')}
          containerStyle={{marginTop: -hp('10%')}}
        />
        {isLoading ? (
          <ActivityIndicator color={THEME_COLOR} size={wp('10%')} />
        ) : (
          <ScrollView style={{width: '100%'}}>
            <ListItem title={'First Name'} rightTitle={user.firstName} />
            <ListItem title={'Last Name'} rightTitle={user.lastName} />
            <ListItem title={'Mobile Number'} rightTitle={user.mobileNumber} />
            <ListItem
              title={'Location'}
              rightTitle={user.city + '/' + user.country}
              bottomDivider
            />
            {user.notificationSettings && (
              <>
                <View
                  style={{backgroundColor: '#eee', width: '100%', padding: 10}}>
                  <Text style={{color: '#555'}}>Notification Settings</Text>
                </View>

                <ListItem
                  title={'Order Updates'}
                  rightElement={
                    <Switch
                      value={user.notificationSettings.orderUpdates}
                      trackColor={{true: LIGHT_COLOR}}
                      thumbColor={THEME_COLOR}
                    />
                  }
                />
                <ListItem
                  title={'In-App Promotions'}
                  rightElement={
                    <Switch
                      value={user.notificationSettings.promotionAppNotification}
                      trackColor={{true: LIGHT_COLOR}}
                      thumbColor={THEME_COLOR}
                    />
                  }
                />
                <ListItem
                  title={'E-mail Promotion'}
                  rightElement={
                    <Switch
                      value={user.notificationSettings.promotionEmail}
                      trackColor={{true: LIGHT_COLOR}}
                      thumbColor={THEME_COLOR}
                    />
                  }
                />
                <ListItem
                  title={'Text Promotion'}
                  rightElement={
                    <Switch
                      value={user.notificationSettings.promotionTextMessage}
                      trackColor={{true: LIGHT_COLOR}}
                      thumbColor={THEME_COLOR}
                    />
                  }
                />
              </>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
