import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditItemScreen from '../screens/EditItemScreen'; // Ensure this is imported correctly
// ... import other screens as needed

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddItem" component={AddItemScreen} />
    <Stack.Screen name="EditItem" component={EditItemScreen} />
    {/* ... other screens as needed */}
  </Stack.Navigator>
);

export default AppNavigator;