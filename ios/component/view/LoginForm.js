import React from "react";
import { create } from "react-test-renderer";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { NativeBaseProvider, Text, Box,Input,Stack ,Button, View,Radio} from 'native-base';
import InputField from "../InputField";
import CustomButton from "../CustomButton";
import {LogBox, ScrollView, TouchableOpacity} from 'react-native';
import Alltodos from "../Alltodos";
import { IconFill, IconOutline } from "@ant-design/icons-react-native"
LogBox.ignoreLogs(['NativeBase:']);
const LoginForm=(props)=>{
 
    const[name,setName]=useState();
    const[surname,setSurname]=useState();
    const[data,setData]=useState([]);
    const[content,setContent]=useState([]);
    const[allTaskFlag,setAllTaskFlag]=useState(false);
    const[taskPriority,setTaskPriority]=useState("")
    const[taskCheck,setTaskCheck]=useState("");
    const id=uuidv4()
    const userData={
       name,surname,content,id,taskPriority,taskCheck
    }
    console.log(data, "i nam in")
   console.log(content)
    return (
      <NativeBaseProvider>
        {allTaskFlag ? (
          <Alltodos
            data={data}
            setAllTaskFlag={setAllTaskFlag}
            setData={setData}
            setTaskCheck={setTaskCheck}
            ></Alltodos>
        ) : (
          <Box
            flex={1}
            bg="#fff"
            alignItems="center"
            style={{marginTop: '50%', alignItems: 'center'}}>
            <Text fontSize="xl" bold>
              TODO
            </Text>
            <Stack space={4} w="75%" maxW="300px">
              <InputField flag="Name" setName={setName} />
              <InputField flag="surName" setSurname={setSurname} />
              <InputField flag="content" setContent={setContent} />
              <Text marginLeft="2" bold color="primary">Select Priorty</Text>
              <Radio.Group
                name="exampleGroup"
                defaultValue="1"
                accessibilityLabel="pick a size"
                onChange={e => {
                  setTaskPriority(e);
                }}>
                <Stack
                  direction={{
                    base: 'row',
                    md: 'column',
                  }}
                  alignItems="center"
                  space={1}
                  w="75%"
                  maxW="300px">
                  <Radio value="Important" colorScheme="red" size="sm" my={1}>
                    Important
                  </Radio>
                  <Radio
                    value="Very Important"
                    colorScheme="green"
                    size="sm"
                    my={1}>
                    Very Important
                  </Radio>
                  <Radio value="Normal" colorScheme="yellow" size="sm" my={1}>
                    Normal
                  </Radio>
                </Stack>
              </Radio.Group>
              <CustomButton
                flag="addTask"
                variant="solid"
                color="primary"
                userData={userData}
                setData={setData}
              />
              <CustomButton
                flag="Get All Todos"
                variant="outline"
                color="primary"
                userData={userData}
                setData={setData}
                setAllTaskFlag={setAllTaskFlag}
              />
            </Stack>
          </Box>
        )}
      </NativeBaseProvider>
    );
}

// const styles=StyleSheet.create({
//     name:{
//         height:33,
//         width:390,
//         borderWidth: 1,
//         marginTop:10
       

//     },
//     surname:{
//         height:33,
//         width:390,
//         borderWidth: 1,
//         marginTop:10
       

//     }
    
// })
export default LoginForm