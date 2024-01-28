import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from "react";

const screen = Dimensions.get("window");
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const mins = Math.floor(time/60);
  const secs = time - mins*60;
  return { mins: formatNumber(mins), secs: formatNumber(secs)};
}

export default function Clock() {

  

  const [remainingSecs, setRemainingSecs] = useState(600)
  const [isActive, setIsActive] = useState(false)
  const {mins, secs} = getRemaining(remainingSecs)

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () => {
    setRemainingSecs(600);
    setIsActive(false);
  }

  useEffect(() =>{
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs -1);
      }, 1000)
    } else if(!isActive && remainingSecs !==0){
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs])

 
  return (
    <View style={styles.container}>
      <StatusBar style = "light-content"/>
      <Text style = {styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style = {styles.buttonText}>{isActive ? 'Pause' : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
        <Text style = {[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: "center",
      justifyContent: 'space-around',
  },
  button: {
    borderWidth:10,
    borderColor: "#B9AAFF",
    width: screen.width/2,
    height: screen.width/2,
    borderRadius: screen.width/2,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 45,
    color: "#B9AAFF",
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    transform: [{ translateY: -30}],
  },
  timerText: {
    color: "#000000",
    fontSize: 90,
    marginBottom: 20,
    alignSelf: 'center', // added to ensure text is centered in its container
  },
  buttonReset:{
    marginTop: 20,
    borderColor: "#FF851B",
    borderWidth: 10, // added borderWidth to match the start button
    width: screen.width / 2, // smaller width than the start button
    height: screen.width / 2, // smaller height than the start button
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden', // added to prevent children from rendering outside
  },
  buttonTextReset: {
    color: '#FF851B',
    fontSize: 45,
    position: 'absolute', // position it over the button
    top: '50%',
    alignSelf: 'center',
    transform: [{ translateY: -30 }], // adjust the translateY value to center the text
  }
});

