import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '~screens/auth';
import { Loader } from '~components';
import ScreenNames from './routes';
import { HomeScreen } from '~screens/app';



const Stack = createNativeStackNavigator();

export default function Routes() {
 
 
  return (
    <NavigationContainer>

  
        <Stack.Navigator
          initialRouteName={ScreenNames.LOGIN}
          screenOptions={{ header: () => false }}
        >
          <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
          <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
        </Stack.Navigator>
     
    </NavigationContainer>
  );
}