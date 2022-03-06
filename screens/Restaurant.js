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
  const scrollX = new Animated.Value(0);

  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [quantity, setQuantity] = useState(0);

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
          }}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {restaurant?.menu.map((item, index) => {
          return (
            <View
              key={`menu-${index}`}
              style={{
                alignItems: 'center',
              }}>
              <View style={{height: SIZES.height * 0.35}}>
                {/* Food Image */}
                <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width,
                    height: '100%',
                  }}
                />

                {/* Quantity */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    justifyContent: 'center',
                    width: SIZES.width,
                    height: 50,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    disabled={quantity === 0 ? true : false}
                    style={{
                      width: 50,
                      backgroundColor:
                        quantity === 0 ? COLORS.lightGray : COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                    }}
                    onPress={() => setQuantity(prev => prev - 1)}>
                    <Text style={{...FONTS.body1}}>-</Text>
                  </TouchableOpacity>

                  {/* Quantity Text */}
                  <View
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{...FONTS.h2}}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25,
                    }}
                    onPress={() => setQuantity(prev => prev + 1)}>
                    <Text style={{...FONTS.body1}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Name & Description */}
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: SIZES.padding * 2,
                }}>
                <Text
                  style={{
                    marginVertical: 10,
                    textAlign: 'center',
                    ...FONTS.h2,
                  }}>
                  {item.name} - {item.price.toFixed(2)}
                </Text>
                <Text style={{...FONTS.body2}}>{item.description}</Text>
              </View>

              {/* Calories */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={icons.fire}
                  style={{
                    width: 10,
                    height: 10,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.darkgray,
                    marginTop: -5,
                  }}>
                  {item.calories} cal
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    console.log(dotPosition);
    return (
      <View
        style={{
          height: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderOrder = () => {
    return <View>{renderDots()}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
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
