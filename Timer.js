import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

const formatNumber = number => `0${number}`.slice(-2);
const screen = Dimensions.get("window");

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

const Timer = ({ studyTime = 1800 }) => {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showCoinsMessage, setShowCoinsMessage] = useState(false);
  const [secondCounter, setSecondCounter] = useState(0);

  const ButtonPress = () => {
    if (isActive) {
      setIsActive(false);
      reset();
    } else {
      setIsActive(true);
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

   // Retrieve coins from storage when the app launches
   useEffect(() => {
    const getCoinsFromStorage = async () => {
      try {
        const userCoins = await AsyncStorage.getItem('userCoins');
        if (userCoins !== null) {
          setCoins(parseInt(userCoins, 10));
        }
      } catch (error) {
        console.error('Error retrieving coins from AsyncStorage:', error);
      }
    };

    getCoinsFromStorage();
  }, []);
  
  // Save coins to storage when coin count changes
  useEffect(() => {
    const saveCoinsToStorage = async () => {
      try {
        await AsyncStorage.setItem('userCoins', coins.toString());
      } catch (error) {
        console.error('Error saving coins to AsyncStorage:', error);
      }
    };

    saveCoinsToStorage();
  }, [coins]);

  useEffect(() => {
    let timerInterval = null;

    if (isActive && remainingSecs >= 0) {
      timerInterval = setInterval(() => {
        setSecondCounter(secondCounter => secondCounter + 1);
        setRemainingSecs(remainingSecs => {
          if (remainingSecs === 0) {
            handleTimerEnd();
            clearInterval(timerInterval);
          }
          setSliderValue2(remainingSecs);
          return remainingSecs - 1;
        });

      }, 1000); 
    } else if (!isActive) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isActive, remainingSecs]);

  const handleTimerEnd = () => {
    const newCoinsEarned = Math.floor(secondCounter / 60);
    console.log(`Coins Earned: ${newCoinsEarned}`); // Add this before the alert
    alert(`You earned ${newCoinsEarned} coin(s) for your study session!`);
    setCoins(coins => coins + newCoinsEarned)
    setIsActive(false);
    setRemainingSecs(0);
    setSecondCounter(0);
};
 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#D3FFCE' }}>
      <StatusBar style="light-content" />
      <View>
        <Image source={require('./assets/tree.png')} style={{ bottom: '10%' }} />
        <Slider
          style={{ transform: [{ rotate: '90deg' }], position: 'absolute', bottom: '50%', right: '-7%', width: screen.width / 1.2, justifyContent: 'center', alignItems: 'center', flex: 1 }}
          thumbImage={require('./assets/climbing_tree_sloth.png')}
          maximumValue={3600} // Change max time
          minimumValue={0}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          step={60} // HERE TO ADJUST THE INTERVAL
          value={sliderValue2}
          onValueChange={(value) => setRemainingSecs(value)}
        />
      </View>
      <Text style={{ color: '#000000', fontSize: 90, position: 'absolute', bottom: '20%', alignSelf: 'center' }}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={ButtonPress}>
        <Image source={require('./assets/sloth_image.png')} style={{ bottom: '-2%', width: screen.width / 3.5, height: screen.width / 3.5 }} />
        <Text style={{ fontSize: 30, color: 'white', position: 'absolute', bottom: '15%', alignSelf: 'center', transform: [{ translateY: -30 }] }}>{isActive ? 'Reset' : 'Start'}</Text>
      </TouchableOpacity>

      {/* Display coins in the top right corner */}
      <View style={{ position: 'absolute', top: 10, right: -60, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 5 }}>
        <Text style={{ fontSize: 16, color: '#000000' }}>Coins: {coins}</Text>
        
      </View>
    </View>
  );
};

export default Timer;
