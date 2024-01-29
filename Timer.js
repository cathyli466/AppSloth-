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

  const ButtonPress = () => {
    if (isActive){
      setIsActive(false);
      reset();
    }
    else{
      setIsActive(true)
    }
  }

  const reset = () => {
    setRemainingSecs(0);
    setSliderValue2(0);
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
          setIsActive(false);
           }
        if (remainingSecs>1){
          setRemainingSecs(remainingSecs => remainingSecs -1)
          setSliderValue2(remainingSecs);
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
      <View>
      <Image source = {require("./assets/tree.png")} style={styles.treeImage}/>
      <Slider style = {styles.slider}
      thumbImage={require("./assets/climbing_tree_sloth.png")}
      maximumValue={3600}
      minimumValue={0}
      minimumTrackTintColor="transparent"
      maximumTrackTintColor="transparent"
      step={60}
      value={sliderValue2}
      onValueChange={(value) => setRemainingSecs(value)}
      />
      </View>
    
       <Text style = {styles.timerText}>{`${mins}:${secs}`}</Text>
       <TouchableOpacity onPress={ButtonPress} >
         <Image source= {require("./assets/sloth_image.png")} style={styles.imageSlothButton} />
          <Text style = {styles.buttonText}>{isActive ? 'Reset' : "Start"}</Text>
      </TouchableOpacity>
     
     
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
  treeImage:{
    bottom:"10%",
  },
  imageSlothButton: {
    
    bottom:"-2%",
    width: screen.width/3.5,
    height: screen.width/3.5,
  },
  imageSlothClimbing: {
    width: screen.width/2,
    height: screen.width/2,
  }
  ,

  button: {
    width: screen.width/4,
    height: screen.width/4,
    borderRadius: screen.width/2,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 30,
    color: "white",
    position: 'absolute',
    bottom: '15%',
    alignSelf: 'center',
    transform: [{ translateY: -30}],
  },
  timerText: {
    color: "#000000",
    fontSize: 90,
    position: 'absolute',
    bottom: "20%",
    alignSelf: 'center', // added to ensure text is centered in its container
  },

  slider: {
    transform: [{rotate: '90deg'}],
    position: 'absolute',
    bottom: "50%",
    right: "-7%",
    width: screen.width/1.2,
    justifyContent: "center", 
    alignItems: "center",
    flex:1
  }
});
