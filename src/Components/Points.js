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

const color1 = '#45BB49';
const color2 = '#424242';
const color3 = '#00adf5';
const color4 = '#ffffff';
const color5 = '#a0a0a0';

export default class PointsScreen extends React.Component {

    static navigationOptions = {
        // header: null,
        title: 'امتیاز ها',
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>PointsScreen!</Text>
                <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

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