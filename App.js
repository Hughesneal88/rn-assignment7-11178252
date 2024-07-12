import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import DrawerNav from './components/drawerNav.js';
import StackNav from './components/StackNav.js';
// import HomeScreen from './screens/HomeScreen.js';
// import CartScreen from './screens/CartScreen.js';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      
        <StatusBar/>
        <SafeAreaView style={{flex: 1}}>
          <StackNav />
        </SafeAreaView>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
