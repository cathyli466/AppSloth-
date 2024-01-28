import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from "react";
import Clock from './Timer.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Clock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});