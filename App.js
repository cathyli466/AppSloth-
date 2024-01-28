import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
// import Clock from './Timer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/homescreen';
import ShopScreen from './screens/shop';

const screen = Dimensions.get('window');

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Clock />
        <Text style={styles.sliderValue}>Slider Value</Text>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ title: 'home' }}
        />
        <Stack.Screen name="shop" component={ShopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
