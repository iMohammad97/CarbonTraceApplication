/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    AsyncStorage,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    DrawerItems,
    createBottomTabNavigator
} from 'react-navigation';

import ProfileScreen from "./src/Components/Profile";
import PointsScreen from "./src/Components/Points";
import RoutesScreen from "./src/Components/Routes.js";
import SettingsScreen from "./src/Components/Settings.js";

const color1 = '#45BB49';
const color2 = '#424242';
const color3 = '#00adf5';
const color4 = '#ffffff';
const color5 = '#a0a0a0';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});






class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}

const ProfileStack = createStackNavigator({
    Profile: { screen: ProfileScreen },
    Details: { screen: DetailsScreen },
});

const PointsStack = createStackNavigator({
    Points: { screen: PointsScreen },
    Details: { screen: DetailsScreen },
});

const RoutesStack = createStackNavigator({
    Routes: { screen: RoutesScreen },
    Details: { screen: DetailsScreen },
});

const SettingsStack = createStackNavigator({
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen },
});

export default createAppContainer(createBottomTabNavigator(
    {
        Settings: { screen: SettingsStack },
        Routes: { screen: RoutesStack },
        Points: { screen: PointsStack },
        Profile: { screen: ProfileStack },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Profile') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                // return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
));


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
