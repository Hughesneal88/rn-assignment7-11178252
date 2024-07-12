import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <Pressable onPress={()=> navigation.dispatch(DrawerActions.openDrawer())}>
        <Image source={require('../assets/Close.png')} style={{marginVertical: 10, left: 20}}/>
      </Pressable>
      <View style={styles.header}>
        <Text style={styles.title}>Allison</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
