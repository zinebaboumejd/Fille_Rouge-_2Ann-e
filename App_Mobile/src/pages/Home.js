import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '.././consts/colors';
import img from '../assets/loaf-2796393_1920.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const Home = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [repat, setRepas] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [user, setUser] = useState([])
  const [corpbyuser, setCorpbyuser] = useState([])




  // getcategorys
  const getcategorys = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: 'http://192.168.1.18:9000/admin/getCategory'
    })
      .then((res) => {
        setLoading(false);
        console.log('categorys', res.data);
        setCategorys(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // // getUserById
  const getUserById = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      console.log('id_user', id)
    
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

  // getCorpsByIdUser
  const getCorpsByIdUser = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const iduser = await AsyncStorage.getItem('id');
      axios({
        method: 'get',
        url: `http://192.168.1.18:9000/client/getCorpsByIdUser/${iduser}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((res) => {
          setLoading(false);
          console.log('corps', res.data);
          setCorpbyuser(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const filterRepas = (imc, calorie) => {
    if (imc < 18) {
      // Filtrer les repas avec moins de 500 calories
      return calorie < 500;
    } else if (imc >= 18 && imc <= 25) {
      // Filtrer les repas avec moins de 800 calories
      return calorie < 800;
    } else if (imc > 25) {
      // Filtrer les repas avec moins de 1000 calories
      return calorie < 1000;
    } else {
      return false;
    }
  };
  const getRepas = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: 'http://192.168.1.18:9000/admin/getRepas',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setLoading(false);
        console.log('Repas', res.data);
        setRepas(res.data);
        const filteredRepas = res.data.filter((item) =>
          filterRepas(corpbyuser.imc, item.calorie)
        );
        setRepas(filteredRepas);
     
        
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  



        




  useEffect(() => {
    getUserById();
    getcategorys();
    getCorpsByIdUser();
setTimeout(
  function() {
    getRepas();
  }
  .bind(this),
  1000
  
)

  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            placeholder="Search for food"
            style={{ fontSize: 18, width: '100%', paddingHorizontal: 20 }}
          />
        </View>
        <TouchableOpacity style={style.sortBtn}>
          <Icon name="sort" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.categoriesListContainer}>
          {
            categorys.map((category, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setSelectedCategoryIndex(index)}>
                <View
                  style={{
                    backgroundColor:
                      selectedCategoryIndex == index
                        ? COLORS.primary
                        : COLORS.secondary,
                    ...style.categoryBtn,
                  }}>
                  <View style={style.categoryBtnImgCon}>
                    {/* <Image
                      source={category.image}
                      style={{height: 35, width: 35, resizeMode: 'cover'}}
                    /> */}
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginLeft: 6,
                      color:
                        selectedCategoryIndex == index
                          ? COLORS.white
                          : COLORS.primary,
                    }}>
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          }

        </ScrollView>
        {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Popular Foods
        </Text> */}
       <FlatList
  data={repat}
  renderItem={({ item }) => (
    <TouchableHighlight
    underlayColor={COLORS.white}
    activeOpacity={0.9}
    onPress={() => navigation.navigate('Detail', { item : item})}
    // onPress={
    //   // condole data 
    //   () => console.log(item)
    // }
    >
    <View style={style.card}>
    <TouchableOpacity 
    // onPress={handleCardPress} 
    activeOpacity={0.8}>
      <View style={{alignItems: 'center', top: -40
    }}>
        <Image source={img} style={{height: 120, width: 120,
        // circcle
        borderRadius: 60,
        borderWidth: 4,
        borderColor: COLORS.white

        }} />
      </View>
      </TouchableOpacity>
      <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {item.name}
        </Text>
        <Text style={{fontSize: 14, color: COLORS.primary, marginTop: 2}}>
          {item.description}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {item.nom} 
        </Text>
        <View style={style.addToCartBtn}>
          <Icon name="bookmark" size={20} color={COLORS.white} />
        </View>
      </View>

      </View>
    </TouchableHighlight>
  )}
  numColumns={2}
  // keyExtractor={(item) => item.id.toString()} // Add a unique key extractor
/>

      </View>


      {/* affiche repate */}


    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    borderColor: 'red',
    elevation: 13,
    backgroundColor: COLORS.white,

  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;