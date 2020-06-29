export const SignInQuery = (email, password) => {
  return `mutation{
    loginWithEmail(email: "${email}", password: "${password}"){
      token
    }
  }`;
};

export const ProfileInfoQuery = `query{
  user{
    firstName,
    lastName,
    profilePicture {url}
    mobileNumber
    addresses {city {name} country {name}}
    points
    pointsExpires{expiresAt}
    email
    notificationSettings{orderUpdates promotionAppNotification promotionEmail promotionTextMessage }
  }
}`;

export const RestaurantQuery = `query{
  restaurants(showOffline: true, limit: 100, delivery: false, index: 0){
    name avgScore distance picture{url} open types{name} uid
  }
}`;

export const PastOrdersQery = (index, limit) => {
  return `query{
    pastOrders(index:${index}, limit: ${limit}){
      items{name amount quantity totalAmount 
        options{values{name, amount, quantity}}}
      earnedPoints
      deliveryFee
      status
      orderDate
      usedPoints
      tip {amount}
      restaurant { name }
      total
      uid
      usedPoints
      orderDeclineReason
      refund{amount}
    }
  }`;
};
