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

const color1 = '#44678c';
const color2 = '#424242';
const color3 = '#b8b8b8';
const color4 = '#ffffff';
const color5 = '#eaebec';

export default class AboutUsScreen extends React.Component {

    static navigationOptions = {
        // header: null,
        title: 'درباره ما',
        headerStyle: {
            backgroundColor: color1,
            textAlign: 'right',
            // alignSelf: 'right'
        },
        // alignSelf: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
            fontSize: 20,
            fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
            textAlign: "right",
            alignSelf: 'center'
        },
    };

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    icInfoTabBar: {
        height: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
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