import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import QrGeneratorScreen from './Screens/QrGeneratorScreen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import VehicleRegistration from './Screens/VehicleRegistration';
import DriverForm from './Screens/DriverForm';
import productFormScreen from './Screens/ProductFormScreen';
import EmployeeRegistration from './Screens/EmployeeRegistration';

enableScreens();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Product form"
          component={productFormScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Driver form"
          component={DriverForm}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Vehicle registration"
          component={VehicleRegistration}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Employee"
          component={EmployeeRegistration}
        />

        <Stack.Screen name="Profile" component={QrGeneratorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
