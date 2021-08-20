import DrawerContent from './DrawerContent';
import React from 'react';
import StackNavigation from './StackNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Drawernavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}

            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={StackNavigation} />
        </Drawer.Navigator>
    );
};

export default Drawernavigation;
