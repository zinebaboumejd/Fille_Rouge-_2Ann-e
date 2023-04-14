import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {View} from 'react-native';
import Home from '../../pages/Home'
import Profile from '../../pages/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
import { useNavigation } from "@react-navigation/native";
const BottomNavigator = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      // Naviguer vers la page de connexion ou la page d'accueil
      navigation.navigate('Login');

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="LocalMall"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="bookmark" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}>
              <Icon name="search" color={COLORS.primary} size={28} />
            </View>
          ),
        }}
      />

{/* profil */}

<Tab.Screen
  name="Profile"
  component={Profile}
  options={{
    tabBarIcon: ({color}) => (
      <Icon name="person" color={color} size={28} />
    ),
  }}
/>
      
      <Tab.Screen
  name="Logout"
  component={Home}
  options={{
    tabBarIcon: ({color}) => (
      <Icon name="logout" color={color} size={28} onPress={handleLogout} />
    ),
  }}
/>

   
    </Tab.Navigator>
  );
};

export default BottomNavigator;
