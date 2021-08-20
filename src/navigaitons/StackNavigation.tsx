import CategoriesScreen from '../screens/mainScreens/CategoriesScreen';
import CityDetails from '../screens/netstedScreens/CityDetails';
import DestinationDetails from '../screens/netstedScreens/DestinationDetails';
import DestinationScreen from '../screens/mainScreens/DestinationScreen';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import ListCites from '../screens/mainScreens/CitesScreen';
import ListToCategory from '../screens/netstedScreens/ListToCategory';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from '../screens/mainScreens/HomeScreen/HomeScreen';



const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="cityDetails"
        component={CityDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="categories"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="destinations"
        component={DestinationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="destinationDetails"
        component={DestinationDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="listToCategory"
        component={ListToCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="cites"
        component={ListCites}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
