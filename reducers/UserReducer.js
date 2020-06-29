const UserReducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...prevState,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        profilePicture: action.user.profilePicture,
        mobileNumber: action.user.mobileNumber,
        email: action.user.email,
        city: action.user.addresses[0].city.name,
        country: action.user.addresses[0].country.name,
        points: action.user.points,
        pointsExpires: action.user.pointsExpires,
        notificationSettings: action.user.notificationSettings,
      };
    case 'CLEAR_USER':
      return {
        ...prevState,
        firstName: null,
        lastName: null,
        profilePicture: null,
        mobileNumber: null,
        email: null,
        address: null,
        points: null,
        pointsExpires: null,
        notificationSettings: null,
      };
    default:
      return prevState;
  }
};

export default UserReducer;
