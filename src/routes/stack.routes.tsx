import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedulling } from '../screens/Schedulling';
import { SchedullingComplete } from '../screens/SchedullingComplete';
import { SchedullingDetails } from '../screens/SchedullingDetails';

const {Navigator, Screen} = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="Home" component={Home}/>
      <Screen name="CarDetails" component={CarDetails}/>
      <Screen name="Schedulling" component={Schedulling}/>
      <Screen name="SchedullingDetails" component={SchedullingDetails}/>
      <Screen name="SchedullingComplete" component={SchedullingComplete}/>
    </Navigator>
  )
}