import React, {Component} from 'react';
import {
    AsyncStorage,
    Platform,
    StyleSheet,
    // Text,
    View,
    // Button,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView, Text, Button
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
// import FontAwesome, {Icons} from "react-native-fontawesome";

const color1 = '#45BB49';
const color2 = '#424242';
const color3 = '#00adf5';
const color4 = '#ffffff';
const color5 = '#a0a0a0';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.row}>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnOption}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.optionText}>فارسی</Text>
                            </View>
                        </View>
                        <View style={styles.columnLabel}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.labelText}>زبان :</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row}
                                  onPress={() => this.props.navigation.navigate('AboutUs')}>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnLabel}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.labelText}>درباره ما</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row}>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnLabel}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.labelText}>خروج</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
    static navigationOptions = {
        // header: null,
        title: 'تنظیمات',
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
}

const styles = StyleSheet.create({
    labelText: {
        // transform: [{rotate: '270deg'}],
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        // width: 100,
        // height: 20,
        // lineHeight: 20,
        letterSpacing: 5,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        // color: color4,
        // backgroundColor: color2,
    },
    optionText: {
        // transform: [{rotate: '270deg'}],
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        fontStyle: "normal",
        // width: 100,
        // height: 20,
        // lineHeight: 20,
        letterSpacing: 5,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        // color: color4,
        // backgroundColor: color2,
    },
    columnOption: {
        maxWidth: '70%',
        height: 60,
        // backgroundColor: '#F5FCFF',
        // borderBottomColor: '#a1a1a1',
        // borderBottomWidth: 0.5,
        // marginLeft: 10
    },
    columnLabel: {
        maxWidth: '30%',
        height: 60,
        // backgroundColor: '#F5FCFF',
        // borderBottomColor: '#a1a1a1',
        // borderBottomWidth: 0.5,
        marginLeft: 10
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    row: {
        width: '100%',
        height: 60,
        // backgroundColor: '#F5FCFF',
        borderBottomColor: '#a1a1a1',
        borderBottomWidth: 0.5,
        marginRight: 40
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