import React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {THEME_COLOR} from '../config/config';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/local_e_logo.png')}
        resizeMode="contain"
        style={{width: hp('25%')}}
      />
      <ActivityIndicator size={wp('25%')} color={THEME_COLOR} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: THEME_COLOR,
          padding: hp('5%'),
        }}>
        Loading...
      </Text>
    </View>
  );
}
