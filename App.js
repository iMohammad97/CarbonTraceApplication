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
    SafeAreaView, Animated, TouchableHighlight
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
import ContactUsScreen from "./src/Components/ContactUs.js";
import RoutingDetailsScreen from "./src/Components/RoutingDetails.js";
import RoutingCheckInScreen from "./src/Components/RoutingCheckIn.js";
import PointsScreen from "./src/Components/Points.js";
import RoutesScreen from "./src/Components/Routes.js";
import SettingsScreen from "./src/Components/Settings.js";
// import {RoutingButton} from "./src/Components/RoutingButton/RoutingButton.js";
import RoutingScreen from "./src/Components/Routing.js";

const color1 = '#44678c';
const color2 = '#424242';
const color3 = '#b8b8b8';
const color4 = '#ffffff';
const color5 = '#eaebec';



const ProfileStack = createStackNavigator({
    Profile: {screen: ProfileScreen},
});

const PointsStack = createStackNavigator({
    Points: {screen: PointsScreen},
});

const RoutingStack = createStackNavigator({
    Routing: {screen: RoutingScreen},
    RoutingDetails: {screen: RoutingDetailsScreen},
    RoutingCheckIn: {screen: RoutingCheckInScreen},
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
            screen: RoutingStack,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor}) => (
                    <View
                        underlayColor="#2882D8"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: 80 / 2,
                            backgroundColor: '#48A2F8',
                        }}
                    >
                        <View>
                            <Image
                                style={{height: 80-10, width: 80-10, borderRadius: (80-10) / 2}}
                                source={require('./src/Assets/Icons/icRoutingTabBar.png')}
                            />
                            {/*<Icon name="plus" size={24} color="#F8F8F8"/>*/}
                        </View>
                    </View>
                ) // Plus button component
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
        initialRouteName: "Routing",
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
