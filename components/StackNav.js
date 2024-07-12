import { createStackNavigator } from "@react-navigation/stack";
import DrawerNav from "./drawerNav";
import ProductDetail from "../screens/ProductDetail";
import Cart from "../screens/CartScreen";

const Stack= createStackNavigator();
function StackNav(){
    return (
      <Stack.Navigator initialRouteName="Drawer" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Drawer" component={DrawerNav} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
    );
}
export default StackNav;