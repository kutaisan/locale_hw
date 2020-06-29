import {API_URL} from '../config/config';
import {RestaurantQuery} from '../utils/queries';
import axios from 'axios';

const RestaurantsAsync = async token => {
  const query = RestaurantQuery;
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
    console.log(response);
    return response.data.data.restaurants;
  } catch (error) {
    console.log('Error detected: ', error);
  }
};

export default RestaurantsAsync;
