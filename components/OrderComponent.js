import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {THEME_COLOR} from '../config/config';
import {v1 as uuidv1} from 'uuid';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function OrderComponent({item}) {
  const [show, setShow] = useState(false);

  const TextWrapper = ({title, value}) => (
    <View style={style.textWrapper}>
      <Text style={style.textStyle}>{title}</Text>
      <Text style={style.textStyle}>{value}</Text>
    </View>
  );

  const PointWrapper = ({icon, title, value}) => (
    <View
      style={[
        style.textWrapper,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Text style={style.textStyle}>{title}</Text>
      <Icon name={icon} type="material-community" color="#fff" />

      <Text style={style.textStyle}>{value}</Text>
    </View>
  );

  const ItemWrapper = ({it}) => (
    <View
      style={[
        style.textWrapper,
        {borderBottomColor: '#fff', borderBottomWidth: 0.5},
      ]}>
      <Text style={[style.textStyle, {fontWeight: 'bold', fontSize: 16}]}>
        {it.quantity}x
      </Text>
      <Text style={[style.textStyle, {fontSize: 16}]}>{it.name}</Text>
      <Text style={[style.textStyle, {fontSize: 16}]}>
        £{it.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <ListItem
          title={item.restaurant.name}
          subtitle={moment(item.orderDate)
            .utc()
            .format('DD/MM/YYYY')}
          rightTitle={'£' + item.total.toFixed(2)}
          chevron
          rightTitleStyle={{color: THEME_COLOR, fontWeight: 'bold'}}
          titleStyle={{color: THEME_COLOR}}
        />
      </TouchableOpacity>
      {show && (
        <View
          style={{
            backgroundColor: THEME_COLOR,
            borderWidth: wp('1%'),
            borderColor: '#fff',
            borderRadius: 20,
            elevation: 10,
            margin: wp('2.5%'),
          }}>
          <Text style={style.detailTitleStyle}>Details</Text>
          {item.items.map((it, index) => (
            <ItemWrapper it={it} key={index} />
          ))}
          <TextWrapper
            title={'+ Delivery Fee'}
            value={`£${item.deliveryFee.toFixed(2)}`}
          />
          <TextWrapper
            title={'+ Tip'}
            value={`£${item.tip.amount.toFixed(2)}`}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <PointWrapper
              icon={'star'}
              title={'Earned'}
              value={item.earnedPoints}
            />
            <PointWrapper
              icon={'star-off'}
              title={'Used'}
              value={item.usedPoints}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  textWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  detailTitleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
    letterSpacing: 2,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OrderComponent;
