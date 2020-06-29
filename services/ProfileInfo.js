import {API_URL} from '../config/config';
import {ProfileInfoQuery} from '../utils/queries';
import axios from 'axios';

const ProfileInfoAsync = async token => {
  const query = ProfileInfoQuery;
  try {
    const response = await axios.post(
      API_URL,
      {
        query,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data.user;
  } catch (error) {
    console.log('Error detected: ', error);
  }
};

export default ProfileInfoAsync;
