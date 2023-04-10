import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from './src/Auth/Login';
import Register from './src/Auth/Register';
import Home from './src/pages/Home';
import Corps from "./src/pages/Corps";
import Detail from './src/pages/Detail'
import COLORS from './src/views/navigation/BottomNavigator';
import DetailsScreen from './src/views/screens/DetailsScreen'
import BottomNavigator from './src/views/navigation/BottomNavigator';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={false}
      initialRouteName="Home"   options={{ headerShown: false }}
      >  
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Corps" component={Corps} />
        
      
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}


