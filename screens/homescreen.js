import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Clock from '../Timer';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Timer component */}
      <Clock/>

      {/* Button to navigate to 'shop' */}
      <TouchableOpacity onPress={() => navigation.navigate('shop')} style={styles.button}>
        <View>
          <Text style={styles.buttonText}>shop</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#D3FFCE"

  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'blue', // Add your desired background color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Add your desired text color
    fontSize: 18,
  },
});

export default Home;