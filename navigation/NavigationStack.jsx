import React from 'react';
import Home from '../screen/Home';
import {createStackNavigator} from '@react-navigation/stack';
import Create from '../screen/Create';
import Completed from '../screen/Completed';

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="CreateScreen" component={Create} />
      <Stack.Screen name="CompletedScreen" component={Completed} />
    </Stack.Navigator>
  );
}
