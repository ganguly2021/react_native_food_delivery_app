import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import React, {useState} from 'react';

import {COLORS, icons, images, FONTS, SIZES} from './../constants';
import {initialCurrentLocation, restaurantData, categoryData} from './../data';
import {color} from 'react-native-reanimated';

const Home = () => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState({
    ...initialCurrentLocation,
  });

  const onSelectCategory = category => {
    // filter restaurant based on category selected
    const restaurantList = restaurantData.filter(a =>
      a.categories.includes(category.id),
    );

    // update restaurant
    setRestaurants(restaurantList);

    // update category state
    setSelectedCategory(category);
  };

  const getCategoryNameById = categoryId => {
    let category = categories.filter(category => category.id === categoryId);

    if (category.length >= 0) {
      return category[0].name;
    } else {
      return '';
    }
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{
            width: 50,
            padding: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>Location</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            paddingRight: SIZES.padding * 2,
            width: 50,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainCategories = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          </View>
          <View>
            <Text
              style={{
                marginTop: SIZES.padding,
                color:
                  selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
                ...FONTS.body5,
              }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={{...FONTS.h1}}>Main</Text>
        <Text style={{...FONTS.h1}}>Categories</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  };

  // Render restaurant list
  const renderRestaurantList = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
          }}
          // onPress -> Navigate to restaurant page
        >
          <View style={{marginBottom: SIZES.padding}}>
            <View>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{width: '100%', height: 200, borderRadius: SIZES.radius}}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <Text style={{...FONTS.h4}}>{item.duration}</Text>
            </View>
          </View>
          {/* Restaurant Info */}

          <Text style={{...FONTS.h4}}>{item.name}</Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
            }}>
            {/* Rating */}
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>

            {/* Category Labels */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              {item.categories.map(categoryId => {
                return (
                  <View key={categoryId} style={{flexDirection: 'row'}}>
                    <Text style={{...FONTS.body3}}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.darkgray,
                      }}>
                      .
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Price */}
            {[1, 2, 3].map(priceRating => {
              return (
                <Text
                  key={priceRating}
                  style={{
                    ...FONTS.body3,
                    color:
                      priceRating <= item.priceRating
                        ? COLORS.black
                        : COLORS.darkgray,
                  }}>
                  ${}
                </Text>
              );
            })}
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
        renderItem={renderItem}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

// custom styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
