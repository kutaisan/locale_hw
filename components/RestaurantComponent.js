import React from 'react';
import {ListItem, Rating} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function RestaurantComponent({item}) {
  return (
    <ListItem
      leftAvatar={{source: {uri: item.picture.url}}}
      title={item.name}
      subtitle={item.open ? 'Open' : 'Closed'}
      subtitleStyle={{color: item.open ? 'green' : 'red'}}
      rightElement={
        <Rating readonly imageSize={wp('5%')} startingValue={item.avgScore} />
      }
    />
  );
}

export default RestaurantComponent;
