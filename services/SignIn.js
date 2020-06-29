import {API_URL} from '../config/config';
import {SignInQuery} from '../utils/queries';
import axios from 'axios';

const SignInAsync = async (email, password) => {
  const query = SignInQuery(email, password);
  try {
    const response = await axios.post(API_URL, {
      query,
    });
    console.log(response);

    const token = response.data.data.loginWithEmail.token;
    console.log('Token: ', token);
    return token;
  } catch (error) {
    console.log('Error detected: ', error);
  }
};

export default SignInAsync;
