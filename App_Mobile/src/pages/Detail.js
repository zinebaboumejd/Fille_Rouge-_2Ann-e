import React ,{useEffect,useState}from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '.././consts/colors';
import img from '../assets/loaf-2796393_1920.jpg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

// import {SecondaryButton} from '../components/Button';
function Detail({ navigation, route }) {

  const [category, setCategory] = useState(null); // State pour stocker la catégorie

  useEffect(() => {
    // Utiliser getCategoryById pour récupérer la catégorie associée au repas
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://192.168.1.18:9000/admin/getCategoryById/${item.categoryId}`);
        setCategory(response.data);
        console.log(
          'category',
          response.data
        )
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, []);

  // fetrch repabyId
  const item  = route.params.item;
  const [repas, setRepas] = useState([]);

  useEffect(() => {
   console.log(item)
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: COLORS.white }}>

          {/* map data */}
          <View style={style.header}>
          
         
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={img} style={{ height: 200, width: 200,
            borderRadius: 100,
            borderWidth: 4,
            borderColor: COLORS.white
            }} />
        </View>
        <View style={style.details}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.nom}</Text>
          <Text style={{ fontSize: 18, color: 'black', marginTop: 5 }}>
          {item.preparation}
          </Text>
          <Text style={{ fontSize: 18, color: COLORS.grey, marginTop: 5 }}>
           {/* map Categorys byid */}
           {category ? category.nom : ''}
    
          </Text>
          <Text style={{ fontSize: 18, color: COLORS.grey, marginTop: 5 }}>
          {/* aliment */}
         
          </Text>
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
export default Detail