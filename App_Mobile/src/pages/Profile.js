
import React,{
  useState,
  useEffect
} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import img from '../assets/loaf-2796393_1920.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const Profile = () => {
  const navigation = useNavigation();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
   // // getUserById
   const getUserById = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      console.log('iduser', id)
      // ou en utilisant des promesses
      // AsyncStorage.getItem('id').then((id) => {
      //   // Utilisez la valeur de id ici
      // });
      axios({
        method: 'get',
        url: `http://192.168.1.18:9000/admin/getUserById/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((res) => {
          setLoading(false);
          console.log('user', res.data);
          setUser(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return(


  <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
    <View style={style.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={28} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
      </View>
      <TouchableOpacity>
        <Icon name="more-vert" size={28} />
      </TouchableOpacity>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.details}>
        <View style={{ alignItems: 'center' }}>
          <Image

            source={img}
            style={{ height: 120, width: 120, borderRadius: 60 }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
            {user.name}
          </Text>
      
      </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};




const style = StyleSheet.create({
header: {
  paddingVertical: 20,
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
},
details: {
  paddingHorizontal: 20,
  paddingTop: 40,
  paddingBottom: 60,
  backgroundColor: COLORS.primary,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
  height:800
},
iconContainer: {
  backgroundColor: COLORS.white,
  height: 50,
  width: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
},
detailsText: {
  marginTop: 10,
  lineHeight: 22,
  fontSize: 16,
  color: COLORS.white,
},
});
export default Profile;