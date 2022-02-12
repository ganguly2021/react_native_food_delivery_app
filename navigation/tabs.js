import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import {Home} from './../screens';
import {COLORS, icons} from './../constants';

// create bottom tab navigator
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            <Image
              source={icons.cutlery}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
