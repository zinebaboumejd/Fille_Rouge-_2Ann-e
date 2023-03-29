import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState,useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation}) => {
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  
  function handleChange(key, value) {
    setData(prevState => ({
      ...prevState,
      [key]: value
    }));
  }
  
  //  handleSubmit
  const handleSubmit = () => {
    setLoading(true);
    axios({
        method: "post",
        url: "http://192.168.9.46:9000/auth/register",
        data: {
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            password: data.password,
        },
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            setLoading(false);
            console.log(res.data);
            
AsyncStorage.setItem('token', res.data.token)
.then(() => {
  console.log('Token stored successfully.');
})
.catch((error) => {
  console.log('Error storing token: ', error);
});
       // Pass the data as a parameter to the 'Corps' screen
            navigation.navigate('Corps', { data: res.data });
        // console.log(res.data._id)
        }
        )
        .catch((err) => {
            setLoading(false);
            console.log(err);
        }
        );
        

  }

  console.log(data)
  

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../assets/imglogin.png")}
        style={{ height: Dimensions.get("window").height / 2.5 }} >
        <View style={styles.brandView}>
          <Text style={styles.brandViewText}>Healthy body</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>

          <Text style={{ color: "#4A7B59", fontSize: 50 }}> Welcome </Text>
          <Text> Dont't have an account?</Text>
          <Text
            style={{ color: "red", fontStyle: "italic" }}
            onPress={() => navigate.navigate("Login")}
          >
            Login
          </Text>
{/*  */}
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#4A7B59",
                paddingBottom: 10,
                marginTop: 20,
              }}
              placeholder="Nom"
              value={data.nom}
              onChangeText={(value) => handleChange("nom", value)}
            />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#4A7B59",
                paddingBottom: 10,
                marginTop: 20,
              }}
              placeholder="Prenom"
              value={data.prenom}
              onChangeText={(value) => handleChange("prenom", value)}
            />
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: '#4A7B59', paddingBottom: 10, marginTop: 20 }}
              placeholder='Email'
              onChangeText={(value) => handleChange("email", value)}
            />
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: '#4A7B59', paddingBottom: 10, marginTop: 20 }}
              placeholder='Password'
              onChangeText={(value) => handleChange("password", value)}
              secureTextEntry={true}
            />
            <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
              <Text style={{ color: 'red', fontStyle: 'italic' }}>Forgot Password?</Text>
            </View>
            <View style={{ marginTop: 50 }}>
              <Button title='Register' color='#4A7B59'
              onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default Register;

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,

  },

})
