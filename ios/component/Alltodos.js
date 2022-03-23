import {LogBox, ScrollView, TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  Text,
  Box,
  Input,
  Stack,
  Button,
  View,
  Checkbox,
  HStack,
} from 'native-base';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterTask from './FilterTask';
const Alltodos = props => {
  const [CompleteTasksFlag, setCompleteTask] = useState(false);
  const [uncompleteTaskFlag, setUncompleteTask] = useState(false);

  return (
    <>
      {CompleteTasksFlag ? (
        <FilterTask
          flag="completeTask"
          data={props.data}
          setUncompleteTasksFlag={setUncompleteTask}
          setAllTaskFlag={props.setAllTaskFlag}
          setCompleteTasksFlag={setCompleteTask}
          setData={props.setData}
          setTaskCheck={props.setTaskCheck}></FilterTask>
      ) : uncompleteTaskFlag ? (
        <FilterTask
          flag="uncompleteTask"
          data={props.data}
          setAllTaskFlag={props.setAllTaskFlag}
          setTaskCheck={props.setTaskCheck}
          setCompleteTasksFlag={setCompleteTask}
          setData={props.setData}
          setUncompleteTasksFlag={setUncompleteTask}></FilterTask>
      ) : (
        <>
          <Text marginTop="30%" fontSize="2xl" marginLeft="40%">
            All Todos
          </Text>
          <View flex={0} flexDirection="row" justifyContent="space-evenly">
            <Text
              bold
              color="green.700"
              onPress={() => {
                setCompleteTask(true);
              }}>
              Complete Task
            </Text>
            <Text
              bold
              color="green.700"
              onPress={() => setUncompleteTask(true)}>
              Uncomplete Task
            </Text>
            <Text
              onPress={() => {
                props.setAllTaskFlag(false);
              }}
              bold
              color="green.700">
              Home
            </Text>
          </View>
          {props.data.length == 0 ? (
            <Text fontSize="2xl" marginLeft="40%" color="green">
              No Todos
            </Text>
          ) : (
            <ScrollView
              maxW="200"
              h="100"
              flex={1}
              bg="#fff"
              alignItems="center"
              marginTop="10%">
              {props.data.map((e, index) => {
                return (
                  <>
                    <View
                      key={index}
                      height="140"
                      width="300"
                      backgroundColor="red.100"
                      marginBottom="3"
                      flex={1}
                      alignItems="center">
                      <HStack space={6} marginRight="92%">
                        <Checkbox
                          value={e.taskCheck}
                          isChecked={e.taskCheck}
                          accessibilityLabel="This is a dummy checkbox"
                          onChange={async check => {
                            props.setAllTaskFlag(check);
                            let copyData = [];
                            for (let i = 0; i < props.data.length; i++) {
                              if (props.data[i].id == e.id) {
                                props.data[i].taskCheck = check;
                              }
                              copyData.push(props.data[i]);
                            }
                            storageDataString = JSON.stringify(copyData);
                            try {
                              await AsyncStorage.setItem(
                                '@MySuperStore:key',
                                storageDataString,
                              );
                            } catch (error) {
                              // Error saving data
                            }
                            props.setData(copyData);
                            props.setAllTaskFlag(true);
                          }}
                        />
                      </HStack>

                      <Text color="cyan.500" fontSize="lg">
                        Name:{e.name} {e.surname}
                      </Text>
                      <Text color="danger.500" fontSize="lg">
                        Priority:{e.taskPriority}
                      </Text>
                      <Text fontSize="lg">Task: {e.content}</Text>
                      <Text>{e.taskCheck}</Text>
                      <TouchableOpacity
                        onPress={async () => {
                          let copyData = [];
                          for (let i = 0; i < props.data.length; i++) {
                            if (props.data[i].id != e.id) {
                              copyData.push(props.data[i]);
                            }
                          }

                          storageDataString = JSON.stringify(copyData);
                          try {
                            await AsyncStorage.setItem(
                              '@MySuperStore:key',
                              storageDataString,
                            );
                          } catch (error) {
                            // Error saving data
                          }
                          props.setData(copyData);
                        }}>
                        <Text
                          marginLeft="80%"
                          color="blue.800"
                          backgroundColor="blue">
                          {' '}
                          Delete{' '}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              })}
            </ScrollView>
          )}
        </>
      )}
    </>
  );
};
export default Alltodos;
