import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';

const OrderDelivery = () => {
  const renderMap = () => {
    return (
      <View>
        <Text>Map goes here.</Text>
      </View>
    );
  };
  return <SafeAreaView style={styles.container}>{renderMap()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderDelivery;
