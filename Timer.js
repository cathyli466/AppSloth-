import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from "react";
import Slider from '@react-native-community/slider';

const screen = Dimensions.get("window");
const formatNumber = number => `0${number}`.slice(-2);


const getRemaining = (time) => {
  const mins = Math.floor(time/60);
  const secs = time - mins*60;
  return { mins: formatNumber(mins), secs: formatNumber(secs)};
}

export default function Clock({studyTime}) {
  
  const [remainingSecs, setRemainingSecs] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const {mins, secs} = getRemaining(remainingSecs)
  const [sliderValue2, setSliderValue2] = useState(0);

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  }
 
  const setTimer = () => {
    setRemainingSecs(0);
    setIsActive(false);
  }

  useEffect(() =>{
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        // when you start the clock at 0, stop it
        if (remainingSecs ==0){
          console.log("remaining secs =0")
          setIsActive(false);
          
           }
          
        if (remainingSecs>1){
          console.log("Countdown")
          setRemainingSecs(remainingSecs => remainingSecs -1);
          //IsZero(true)
          console.log()
          };
        
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
        <View>
        <Image source= {require("./assets/sloth_image.png")} style={styles.image} />
          <Text style = {styles.buttonText}>{isActive ? 'Pause' : "Start"}</Text>
        </View>
       
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
        <Text style = {[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
      </TouchableOpacity>
      
      <Slider style = {styles.slider}
      maximumValue={3600}
      minimumValue={0}
      minimumTrackTintColor="#ff6347"
      maximumTrackTintColor="#000000"
      step={60}
      value={sliderValue2}
      onValueChange={(value) => setRemainingSecs(value)}
      />
     <Image source= {require("./assets/climbing_tree_sloth.png")} style={styles.image} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'space-around',
      backgroundColor: "#D3FFCE"
  },
  image: {
    
    width: screen.width/2,
    height: screen.width/2,
  },
  button: {
   
    borderWidth:0,
    borderColor: "#B9AAFF",
    width: screen.width/2.1,
    height: screen.width/2.1,
    borderRadius: screen.width/2,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 45,
    color: "white",
    position: 'absolute',
    top: '40%',
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
  },
  slider: {
    position: 'absolute',
    top: 150,
    width: screen.width/2,
    justifyContent: "center", 
    alignItems: "center",
    flex:1
  }
});