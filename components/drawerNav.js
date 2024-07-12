import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { useState, useEffect } from 'react';
import CustomDrawerContent from './customDrawerContent';
import ProductDetail from '../screens/ProductDetail';

const Drawer = createDrawerNavigator();


const DrawerNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}  initialRouteName="HomeScreen" screenOptions={{ headerShown: false, drawerStyle: {paddingVertical: 20}}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      {categories.map(category => (
        <Drawer.Screen 
          key={category} 
          name={category} 
          component={HomeScreen} 
          initialParams={category} 
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
