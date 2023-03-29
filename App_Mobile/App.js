import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from './src/Auth/Login';
import Register from './src/Auth/Register';
import Home from './src/pages/Home';
import Corps from "./src/pages/Corps";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>  
        <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Corps" component={Corps} />
        <Stack.Screen name="Login" component={Login} />
      
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


