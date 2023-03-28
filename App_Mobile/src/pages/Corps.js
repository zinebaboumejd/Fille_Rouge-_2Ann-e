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
export default function Corps(navigation) {

  const [data, setData] = useState({
    username: '',
    sexe: '',
    poits:'',
    taille:''
  });

  const handleSubmit = () => {
    console.log(data);
  }

  const handleChange = (key, value) => {
    setData({
      ...data,
      [key]: value
    });
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#8DBFA9' }}
    showsVerticalScrollIndicator={false} >
    <ImageBackground source={require('../../assets/system-bro.png')}
      style={{ height: Dimensions.get('window').height / 2.5 }}>
      <View style={styles.brandView}>
      
        <Text style={styles.brandViewText}>Healthy Body</Text>
      </View>
    </ImageBackground>
    <View style={styles.bottomView}>
      <View style={{ padding: 40 }}>
        <Text style={{ color: '#4A7B59', fontSize: 25 ,paddingTop:'5%'}}>  Welcome  To Healthy Body </Text>
      
        {/* form input view */}
        <View style={{ marginTop: 50 }}>
        <TextInput
        style={styles.input}
        placeholder="Age d'utilisateur"
        value={data.age}
        onChangeText={(value) => handleChange("age", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sexe"
        value={data.sexe}
        onChangeText={(value) => handleChange("sexe", value)}
      />
        <TextInput
        style={styles.input}
        placeholder="Poits"
        value={data.poits}
        onChangeText={(value) => handleChange("poits", value)}
      />
        <TextInput
        style={styles.input}
        placeholder="Taille"
        value={data.taille}
        onChangeText={(value) => handleChange("taille", value)}
      />
    
          <View style={{ marginTop: 50 }}>
            <Button title='Envoyer' color='#4A7B59'
              onPress={handleSubmit}             
             />
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#FFF'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    width: '100%',
    padding: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  image: {
    width: "50%",
    height: "20%",
    position:"absolute",
    top:"10%",

  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 20,
    width: '100%',
    padding: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
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
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
});
