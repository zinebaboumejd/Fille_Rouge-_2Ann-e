import { useNavigation, useRoute } from '@react-navigation/native';
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
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Corps() {
  const navigate = useNavigation();
  const route = useRoute();
  const { _id } = route.params.data;



  console.log('iduser', _id)
  const [data, setData] = useState({
    iduser: _id,
    age: '',
    sexe: '',
    poits: '',
    taille: ''
  });

  const handleSubmit = () => {
    console.log(data);

    AsyncStorage.getItem('token')
      .then((token) => {
        axios.post('http://192.168.9.46:9000/client/createRepas', {
          iduser: data.iduser,
          age: data.age,
          sexe: data.sexe,
          poits: data.poits,
          taille: data.taille
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then((res) => {
            console.log(res.data);
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Success',
              text2: 'Votre compte a été crée avec succès',
              visibilityTime: 4000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
            navigate.navigate('Home');
          })
          .catch((err) => {
            console.log(err);
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error',
              text2: 'Une erreur est survenue',
              visibilityTime: 4000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
          });
      })
      .catch((error) => {
        console.log('Error retrieving token from AsyncStorage: ', error);
      });
  };

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
          <Text style={{ color: '#4A7B59', fontSize: 25, paddingTop: '5%' }}>  Welcome  To Healthy Body </Text>
          {/* afficher params */}
          <Text style={{ color: 'red', fontSize: 20, paddingBottom: '5%' }}>  {_id} </Text>
          {/* form input view */}
          <View style={{ marginTop: 50 }}>
            <Text style={{ color: '#4A7B59', fontSize: 20, paddingBottom: '5%' }}>  Veuillez remplir les champs suivants </Text>
            <TextInput
              style={styles.input}
              placeholder="iduser"
              value={data.iduser}
            // onChangeText={(value) => handleChange("iduser", value)}

            />
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
    backgroundColor: '#FFF'
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
    position: "absolute",
    top: "10%",

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
