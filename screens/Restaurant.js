import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {isIphoneX} from 'react-native-iphone-x-helper';

import {icons, COLORS, SIZES, FONTS} from './../constants';

const Restaurant = ({route, navigation}) => {
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // componentDidMount
  useEffect(() => {
    const {item, currentLocation} = route.params;

    // update state
    setRestaurant(item);
    setCurrentLocation(currentLocation);

    // cleanup
    return () => {};
  }, []);

  // header
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: 'center',
            paddingLeft: SIZES.padding * 2,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        {/* Restaurant Name Section */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}>
            <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
          </View>
        </View>

        {/* Menu Button */}
        <TouchableOpacity
          style={{
            width: 50,
            justifyContent: 'center',
            // paddingLeft: SIZES.padding * 2,
          }}
          >
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return <SafeAreaView style={styles.container}>{renderHeader()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
  },
});

export default Restaurant;
