import React from 'react';
import {useState} from 'react';
import {NativeBaseProvider, Text, Box, Input, Stack, Button} from 'native-base';
const InputField = (props) => {
  return (
    <Input
      mx="3"
      placeholder={props.flag==="Name"?"Enter Username":props.flag==="surName"?"Enter Last Name":"Enter Content"}
      w="90%"
      maxWidth="300px"
      sapce={3}
      onChangeText={e => {
        props.flag==="Name"?props.setName(e):
        props.flag==="content"?props.setContent(e):props.setSurname(e);
      }}
    />
  );
};
export default InputField;
