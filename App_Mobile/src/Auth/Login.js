
import {useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  Linking
} from "react-native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [erroe,setError]=useState("")
 

  const toastConfig = {
    success: ({ text1, ...rest }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'green' }}>
        <Text style={{ color: 'white' }}>{text1}</Text>
      </View>
    ),
    error: ({ text1, ...rest }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'red' }}>
        <Text style={{ color: 'white' }}>{text1}</Text>
      </View>
    ),
  };




  const handleSubmit = () => {
    setLoading(true);
    axios({
      method: "post",
      // url: "http://192.168.9.46:9000/auth/login",
     url: "http://192.168.1.18:9000/auth/login",
      data: {
        email: email,
        password: password,
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
    
AsyncStorage.setItem('id', res.data._id)
.then(() => {
  console.log('id stored successfully.');
})
.catch((error) => {
  console.log('Error storing id: ', error);
});
      navigate.navigate("Home");
      Toast.show({
        type: 'success',
        text1: 'Connexion réussie',
        visibilityTime: 3000,
        autoHide: true,
      });
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
      setError(err.response.data.message);
      Toast.show({
        type: 'error',
        text1: 'Erreur de connexion',
        visibilityTime: 3000,
        autoHide: true,
      });
    });
  }
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={false} >
      <ImageBackground source={require('../../assets/imglogin.png')}
        style={{ height: Dimensions.get('window').height / 2.5 }}>
        <View style={styles.brandView}>
          {/* <Icon name='Location-sharp'
           style={{color:'#ffffff',fontSize:100}}/> */}
          <Text style={styles.brandViewText}>MFN</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: '#4A7B59', fontSize: 50 }}>  Welcome  </Text>
          
          <Text>  Dont't have an account? </Text>

          <Text style={{ color: 'red', fontStyle: 'italic' }} onPress={() => navigation.navigate('Register')}
          
          >Register</Text>
          {/* form input view */}
          <View style={{ marginTop: 50 }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: '#4A7B59', paddingBottom: 10 }}
              placeholder='Email'
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: '#4A7B59', paddingBottom: 10, marginTop: 20 }}
              placeholder='Password'
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
            <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
              <Text style={{ color: 'red', fontStyle: 'italic' }}>Forgot Password?</Text>
            </View>
            <View style={{ marginTop: 50 }}>
              <Button
                title='Login'
                color='#4A7B59'
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default Login;

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
