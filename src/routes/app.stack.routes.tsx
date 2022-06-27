import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Schedulling } from "../screens/Schedulling";
import { Confirmation } from "../screens/Confirmation";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { Mycars } from "../screens/Mycars";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Index" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedulling" component={Schedulling} />
      <Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={Mycars} />
    </Navigator>
  );
}
