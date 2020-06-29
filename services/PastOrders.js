import {API_URL} from '../config/config';
import {PastOrdersQery} from '../utils/queries';
import axios from 'axios';

const PastOrdersAsync = async (token, index, limit) => {
  const query = PastOrdersQery(index, limit);
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
    console.log('resssssssp', response.data.data.pastOrders);
    return response.data.data.pastOrders;
  } catch (error) {
    console.log('Error detected: ', error);
  }
};

export default PastOrdersAsync;
