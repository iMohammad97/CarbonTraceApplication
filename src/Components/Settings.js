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

const color1 = '#44678c';
const color2 = '#424242';
const color3 = '#b8b8b8';
const color4 = '#ffffff';
const color5 = '#eaebec';

class Header extends React.Component {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    تنظیمات
                </Text>
            </View>
        );
    }
}

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.containerOut}>
                <View style={styles.container11}>
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
                                          onPress={() => this.props.navigation.navigate('AppGuide')}>
                            <View style={styles.rowContainer}>
                                <View style={styles.columnLabel}>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.labelText}>راهنمای استفاده از ردپا</Text>
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

                        <TouchableOpacity style={styles.row}
                                          onPress={() => this.props.navigation.navigate('ContactUs')}>
                            <View style={styles.rowContainer}>
                                <View style={styles.columnLabel}>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.labelText}>ارتباط با ما</Text>
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
                </View>
                <View style={styles.container2}>
                    <View style={styles.container21}>
                        <Text>
                            توسعه یافته توسط iMohammad97@
                        </Text>
                    </View>
                </View>

            </View>
        );
    }

    static navigationOptions = {
        // header: null,
        headerTitle: <Header/>,
        // title: 'تنظیمات',
        headerStyle: {
            backgroundColor: color1,
            textAlign: 'right',
            // height: 100,
            // alignItems: 'flex-end',
            // alignSelf: 'right',
            // flex: 1,
            // justifyContent: 'flex-end',
        },
        // // alignSelf: 'center',
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //     fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        //     fontSize: 22,
        //     fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        //     textAlign: "right",
        //     alignSelf: 'center'
        // },
    };
}

const styles = StyleSheet.create({
    container11: {
        width: '100%',
        height: 300
    },
    container2: {
        width: '100%',
        height: 30,
        marginBottom: 20,
    },
    headerText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 30,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: "right",
        alignSelf: 'center',
        color: color4
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10
    },
    labelText: {
        // transform: [{rotate: '270deg'}],
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 20,
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
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "Calibri",
        fontSize: 20,
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
        maxWidth: '100%',
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
    container21: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    containerOut: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
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