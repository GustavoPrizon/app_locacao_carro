import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedulling } from '../screens/Schedulling';
import { SchedullingComplete } from '../screens/SchedullingComplete';
import { SchedullingDetails } from '../screens/SchedullingDetails';
import { Mycars } from '../screens/Mycars';
import { Splash } from '../screens/Splash';

const {Navigator, Screen} = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator initialRouteName='Splash' screenOptions={{
      headerShown: false
    }}>
      <Screen name="Splash" component={Splash}/>
      <Screen name="Home" component={Home} options={{
        gestureEnabled: false,
      }}/>
      <Screen name="CarDetails" component={CarDetails}/>
      <Screen name="Schedulling" component={Schedulling}/>
      <Screen name="SchedullingDetails" component={SchedullingDetails}/>
      <Screen name="SchedullingComplete" component={SchedullingComplete}/>
      <Screen name="MyCars" component={Mycars}/>
    </Navigator>
  )
}