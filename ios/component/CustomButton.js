import React from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeBaseProvider, Text, Box, Input, Stack, Button} from 'native-base';
const CustomButton = props => {
  _storeData = async () => {
    let dataArr = [];
    let storageDataString;
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        // We have data!!
        const parseArr = JSON.parse(value);
        dataArr = [...parseArr];
        dataArr.push(props.userData);
      } else {
        const str = JSON.stringify(props.userData);
        dataArr.push(props.userData);

        console.warn(dataArr);
      }
    } catch (error) {
      // Error retrieving data
    }

    storageDataString = JSON.stringify(dataArr);
    try {
      await AsyncStorage.setItem('@MySuperStore:key', storageDataString);
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        // We have data!!
        const data = JSON.parse(value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _clearAll = async () => {
    await AsyncStorage.clear();
  };
  return (
    <Button
      variant={props.variant}
      colorScheme={props.color}
      size="sm"
      onPress={async () => {
        let g;
        if (props.flag === 'addTask') {
          console.warn(props.userData);
          _storeData();
        } else {
          props.setAllTaskFlag(true);
          const todoPromise = await _retrieveData();
          const todos = JSON.parse(todoPromise);
          props.setData(todos);
        }
      }}>
      {props.flag}
    </Button>
  );
};
export default CustomButton;
