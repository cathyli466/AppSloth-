import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

const formatNumber = number => `0${number}`.slice(-2);
const screen = Dimensions.get("window");

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

const Timer = ({ studyTime }) => {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [coins, setCoins] = useState(0);

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

  const updateCoins = async (newCoins) => {
    try {
      await AsyncStorage.setItem('userCoins', newCoins.toString());
      setCoins(newCoins);
    } catch (error) {
      console.error('Error updating coins in AsyncStorage:', error);
    }
  };

  const getCoinsFromStorage = async () => {
    try {
      const userCoins = await AsyncStorage.getItem('userCoins');
      if (userCoins !== null) {
        setCoins(parseInt(userCoins));
      }
    } catch (error) {
      console.error('Error retrieving coins from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getCoinsFromStorage();
  }, []);

  useEffect(() => {
    let timerInterval = null;

    const updateTimer = () => {
      if (isActive && remainingSecs > 1) {
        setRemainingSecs(remainingSecs => remainingSecs - 1);
        setSliderValue2(remainingSecs);
      } else {
        setIsActive(false);
        clearInterval(timerInterval);

        // Timer reached 0, show message and update coins
        if (coins > 0) {
          Alert.alert('Coins Received', `You received ${coins} coins!`);
          updateCoins(coins + 1);
        }
      }
    };

    if (isActive) {
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isActive, remainingSecs, coins]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#D3FFCE' }}>
      <StatusBar style="light-content" />
      <View>
        <Image source={require('./assets/tree.png')} style={{ bottom: '10%' }} />
        <Slider
          style={{ transform: [{ rotate: '90deg' }], position: 'absolute', bottom: '50%', right: '-7%', width: screen.width / 1.2, justifyContent: 'center', alignItems: 'center', flex: 1 }}
          thumbImage={require('./assets/climbing_tree_sloth.png')}
          maximumValue={3600}
          minimumValue={0}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          step={60}
          value={sliderValue2}
          onValueChange={(value) => setRemainingSecs(value)}
        />
      </View>
      <Text style={{ color: '#000000', fontSize: 90, position: 'absolute', bottom: '20%', alignSelf: 'center' }}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={ButtonPress}>
        <Image source={require('./assets/sloth_image.png')} style={{ bottom: '-2%', width: screen.width / 3.5, height: screen.width / 3.5 }} />
        <Text style={{ fontSize: 30, color: 'white', position: 'absolute', bottom: '15%', alignSelf: 'center', transform: [{ translateY: -30 }] }}>{isActive ? 'Reset' : 'Start'}</Text>
      </TouchableOpacity>
      <View style={{ position: 'absolute', top: 10, right: -60 }}>
        <Text>Coins: {coins}</Text>
      </View>
    </View>
  );
};

export default Timer;
