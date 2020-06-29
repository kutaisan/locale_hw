import React, {useState, useContext} from 'react';
import {View, SafeAreaView, Image, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {AuthContext} from '../contexts/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {THEME_COLOR} from '../config/config';

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [signInError, setSignInError] = useState('');

  const {signIn} = useContext(AuthContext);

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/local_e_logo.png')}
          resizeMode="contain"
          style={{width: hp('25%')}}
        />
      </View>
      <View
        style={{flex: 0.75, justifyContent: 'center', alignItems: 'center'}}>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={email => {
            setEmail(email);
            setEmailError('');
          }}
          leftIcon={<Icon name="email" type="fontisto" color="#777" />}
          containerStyle={{
            width: wp('80%'),
          }}
          inputContainerStyle={style.inputStyle}
          errorMessage={emailError}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          leftIcon={<Icon name="lock" type="font-awesome" color="#777" />}
          rightIcon={
            <Icon
              name={secureText ? 'eye' : 'eye-with-line'}
              type="entypo"
              color={THEME_COLOR}
              onPress={() => setSecureText(!secureText)}
            />
          }
          containerStyle={{width: wp('80%')}}
          inputContainerStyle={style.inputStyle}
          errorMessage={signInError}
        />
        <Button
          title="Sign in"
          disabled={!email || !password}
          onPress={async () => {
            console.log(validateEmail(email));
            if (!validateEmail(email.trim())) {
              return setEmailError('Please enter a valid e-mail.');
            }
            try {
              await signIn(email.trim(), password);
            } catch (error) {
              setSignInError('Incorrect e-mail or password');
            }
          }}
          containerStyle={{width: wp('80%')}}
          buttonStyle={{backgroundColor: THEME_COLOR}}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: THEME_COLOR,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
  },
});

export default SignInScreen;
