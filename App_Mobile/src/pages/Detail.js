import React ,{useEffect,useState}from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '.././consts/colors';
import img from '../assets/loaf-2796393_1920.jpg'

// import {SecondaryButton} from '../components/Button';
function Detail({ navigation, route }) {

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
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            onPress={() => navigation.goBack()}
          />
          <View style={style.iconContainer}>
            <Icon name="favorite" size={28} color={COLORS.primary} />
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={img} style={{ height: 200, width: 200,
            borderRadius: 100,
            borderWidth: 4,
            borderColor: COLORS.white
           }} />
        </View>
        <View style={style.details}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>nom</Text>
          <Text style={{ fontSize: 18, color: 'black', marginTop: 5 }}>
          nom 
          </Text>
          <Text style={{ fontSize: 18, color: COLORS.grey, marginTop: 5 }}>
            description
          </Text>
          </View>
          {
            repas.map((item) => {
            <Text style={{ color:"red"}}>
              {item.nom}
            </Text>
          }
          )
          }
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