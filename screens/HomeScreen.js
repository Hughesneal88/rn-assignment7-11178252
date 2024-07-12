// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, Image} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/header';
import ClothingComponent from '../components/clothingComponent';

export default function HomeScreen ({navigation, route}) {
  const category = route.params?.category || null;

  return(
    <>
    <View style={styles.container}>
      <Header />
      <ClothingComponent category={category} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});