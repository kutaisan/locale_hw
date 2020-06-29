const UserReducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return {
        ...prevState,
        restaurants: action.restaurants,
      };
    default:
      return prevState;
  }
};

export default UserReducer;
