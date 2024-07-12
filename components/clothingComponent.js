import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const addToCart = async (item, setItem) => {
    
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      cart.push(item);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Success', 'Product added to cart');
    } catch (error) {
      console.error(error);
    }
};

const Item = ({ item, navigation }) => (
    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
        <Pressable onPress={() => navigation.navigate('ProductDetail', { itemId: item.id })}>
            <Image
                source={{ uri: item.image }}
                style={{ objectFit: 'contain', justifyContent: 'center', alignItems: 'center', height: 100, marginBottom: 25 }}
            />
            <Pressable style={{ top: -30, left: 150 }} onPress={() => {addToCart(item)}}>
                <Ionicons name="add-circle-outline" size={25} color="black" />
            </Pressable>
            <Text style={styles.flatlistcontainer}>{item.title}</Text>
            <View style={{ height: 30 }}>
                <Text style={styles.flatlistdescription}>{item.description}</Text>
            </View>
            <Text style={styles.flatlistprice}>${item.price}</Text>
        </Pressable>
    </View>
);

function ClothingComponent({ category }) {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function fetchData(category = null) {
        try {
            let url = 'https://fakestoreapi.com/products';
            if (category) {
                url += `/category/${category}`; // Append category to URL if provided
            }
            const response = await fetch(url);
            const data = await response.json();
            if (!category) { // Only store in AsyncStorage if fetching all products
                await AsyncStorage.setItem('products', JSON.stringify(data));
            }
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    useEffect(() => {
        const getData = async () => {
            const storedData = await AsyncStorage.getItem('products');
            if (storedData && !category) {
                setData(JSON.parse(storedData));
            } else {
                fetchData(category);
            }
        };

        getData();
    }, [category]);

    // const handleLoadMore = () => {
    //     if (!loading) {
    //         setLoading(true);
    //         setPage((prevPage) => prevPage + 1);
    //         fetchData(category, page + 1);
    //     }
    // };

    return (
        <>
        <View>
        <View style={styles.positioning}>
        <View style={{flexDirection: 'right', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 30, right:120, top: -25}}> Our Story</Text>
        <View style={{left:50}}>
        <Pressable style={styles.filter}><Ionicons name="filter-outline" size={25} color="orange"/></Pressable>
        <Pressable style={styles.list}>
            <Ionicons name="list-outline" size={25} color="black"/>
        </Pressable>
        </View>
        </View>
        </View>
        </View>
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <Item
                    id={item.id}
                    item={item}
                    navigation={navigation} // Pass the navigation object as a prop
                />
            )}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.5}
        />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dresses: {
        left: 10,
        marginHorizontal: 10,
    },
    flatlistcontainer: {
        fontSize: 16,
        left: 20,
        top: -20,
    },
    flatlistdescription: {
        fontSize: 11,
        left: 20,
        color: 'grey',
        top: -20,
    },
    flatlistprice: {
        left: 20,
        fontSize: 20,
        color: 'orange',
        top: -20,
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
});

export default ClothingComponent;
