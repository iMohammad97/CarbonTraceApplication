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
// import {Icon} from 'native-base';

import ProfileScreen from "./src/Components/Profile.js";
import AboutUsScreen from "./src/Components/AboutUs.js";
import PointsScreen from "./src/Components/Points.js";
import RoutesScreen from "./src/Components/Routes.js";
import SettingsScreen from "./src/Components/Settings.js";
import {RoutingButton} from "./src/Components/RoutingButton/RoutingButton.js";
import RoutingScreen from "./src/Components/Routing.js";

const color1 = '#44678c';
const color2 = '#424242';
const color3 = '#b8b8b8';
const color4 = '#ffffff';
const color5 = '#eaebec';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});



const ProfileStack = createStackNavigator({
    Profile: {screen: ProfileScreen},
});

const PointsStack = createStackNavigator({
    Points: {screen: PointsScreen},
});

const RoutingStack = createStackNavigator({
    Points: {screen: RoutingScreen},
});

const RoutesStack = createStackNavigator({
    Routes: {screen: RoutesScreen},
});

const SettingsStack = createStackNavigator({
    Settings: {screen: SettingsScreen},
    AboutUs: {screen: AboutUsScreen},
});

export default createAppContainer(createBottomTabNavigator(
    {
        Settings: {
            screen: SettingsStack,
            navigationOptions: () => ({
                // header: null,
                title: 'Billboard',
                // label: 'hoooo',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={{height: 30, width: 30, tintColor: tintColor}}
                        source={require('./src/Assets/Icons/icSettingsTabBar.png')}
                    />
                ),
            })
        },
        Routes: {
            screen: RoutesStack,
            navigationOptions: () => ({
                label: 'hoooo',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={{height: 30, width: 30, tintColor: tintColor}}
                        source={require('./src/Assets/Icons/icRouteTabBar.png')}
                    />
                ),
            })
        },
        Routing: {
            screen: RoutingStack, // Empty screen
            navigationOptions: () => ({
                tabBarIcon: () => (<RoutingButton />) // Plus button component
            })
        },
        Points: {
            screen: PointsStack,
            navigationOptions: () => ({
                label: 'hoooo',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={{height: 30, width: 30, tintColor: tintColor}}
                        source={require('./src/Assets/Icons/icPointsTabBar.png')}
                    />
                ),
            })
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: () => ({
                label: 'hoooo',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        style={{height: 30, width: 30, tintColor: tintColor}}
                        source={require('./src/Assets/Icons/icInfoTabBar.png')}
                    />
                ),
            })
        },
    },
    {
        initialRouteName: "Profile",
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: '#73cbfc', // active icon color
            inactiveTintColor: '#FFFFFF',  // inactive icon color
            style: {
                backgroundColor: color1, // TabBar background
                height: 50
            }
        },
    }
));


const styles = StyleSheet.create({
    icInfoTabBar: {
        height: 30,
        width: 30
    },
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
