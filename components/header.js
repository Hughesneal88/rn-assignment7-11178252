import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function Header() {
    const navigation = useNavigation();
    return (
    <View>
    <View style={styles.positioning}>
       <Image style={{top:25, left: -5}}source={require('../assets/Logo.png')}/>
       <Pressable style={{right: 150}} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={40} color="black"/>
       </Pressable>
       <Pressable style={{left: 110, top: -35}}><Ionicons name="search-outline" size={30} color="black"/></Pressable>
       <Pressable style={{left: 150, top: -67}} onPress={() => navigation.navigate('Checkout')}>  
            <View>
                {/* <Text style={{ position: 'absolute', top: -8, right: -8, backgroundColor: 'red', color: 'white', borderRadius: 10, paddingHorizontal: 6, fontSize: 12 }}>
                </Text> */}
                <Ionicons name="bag-outline" size={30} color="black" />
            </View>
        </Pressable>
        <View style={{flexDirection: 'right', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 30, right:120, top: -25}}> Our Story</Text>
        <View style={{left:50}}>
        <Pressable style={styles.filter}><Ionicons name="filter-outline" size={25} color="orange"/></Pressable>
        <Pressable style={styles.list}>
            <Ionicons name="list-outline" size={25} color="black"/>
        </Pressable>
        </View>
        </View>
        <StatusBar style="auto" />
    </View>
    </View>
    );
};
const styles = StyleSheet.create({
    ScrollView:{
 backgroundColor: '#fff'
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    top:-40
  },
  positioning: {
    alignItems:'center',
    top: 40
  },
  filter: {
    left: 150,
    top: -57,
    backgroundColor: '#F2F2F3',
    borderRadius:20,
    width:40,
    height: 40,
    justifyContent:'center',
    alignItems:'center'
},
list: {
    left: 100,
    top: -78,
    backgroundColor: '#F2F2F3',
    borderRadius:20,
    width:40,
    height: 40,
    justifyContent:'center',
    alignItems:'center',
    marginTop: -20
  }
}
);

export default Header;