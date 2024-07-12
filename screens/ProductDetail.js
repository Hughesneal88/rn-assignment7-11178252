
import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';


const ProductDetail = ({ route, navigation }) => {
    // const { product } = route.params || {};
    // const navigation = useNavigation();
    const [item, setItem] = useState(null)
    const { itemId } = route.params || {};
  
    useEffect(() => {
      fetchItem()
    }, [])
  
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${itemId}`)
        const data = await response.json()
        setItem(data)
      } catch (error) {
        console.error('Error fetching item:', error)
      }
    };
  
    if (!item) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    };
    const addToCart = async (item) => {
      try {
        const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
        cart.push(item);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        Alert.alert('Success', 'Product added to cart');
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <ScrollView style={styles.container}>
           <View style={styles.positioning}>
       <Image style={{top:25, left: -5}}source={require('../assets/Logo.png')}/>
       <Pressable style={{right: 150}} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={40} color="black"/>
       </Pressable>
       <Pressable style={{left: 110, top: -35}}><Ionicons name="search-outline" size={30} color="black"/></Pressable>
       <Pressable style={{left: 150, top: -67}} onPress={() => navigation.navigate('Checkout')}>  
            <View>
                <Ionicons name="bag-outline" size={30} color="black" />
            </View>
        </Pressable>
        </View>
    
                <>
                    <Image source={{uri: item.image}} style={styles.productImage} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.productTitle}>{item.title.split(' ', 1)[0]}</Text>
                        <Text style={styles.productSubtitle}>{item.title}</Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
                        <Text style={styles.productDescription}>
                            {item.description}
                        </Text>
                        <Text style={styles.materialsTitle}>MATERIALS</Text>
                        <Text style={styles.productDescription}>
                            Do not use bleach{'\n'}
                            Do not tumble dry{'\n'}
                            Dry clean with tetrachloroethylene{'\n'}
                            Iron at a maximum of 110ºC/230ºF{'\n'}
                        </Text>
                        <Text style={styles.shippingInfo}>
                            Free Flat Rate Shipping{'\n'}
                            Estimated to be delivered on 09/11/2021 - 12/11/2021.
                        </Text>
                        <TouchableOpacity style={styles.addButton} onPress={()=> addToCart(item)}>
                            <Text style={styles.addButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </>
           
        </ScrollView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',        
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#FFF',
        marginTop: 30,
        paddingBottom: 20,
        marginTop: 30,
    },
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
    },
    icon: {
        width: 24,
        height: 24,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    detailsContainer: {
        padding: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productSubtitle: {
        fontSize: 18,
        color: '#666',
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 20,
        color: 'red',
        marginVertical: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        marginVertical: 10,
    },
    materialsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    shippingInfo: {
        fontSize: 16,
        color: '#666',
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: '#000',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    positioning: {
        alignItems:'center',
        top: 40
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        top:-40
      }
});

