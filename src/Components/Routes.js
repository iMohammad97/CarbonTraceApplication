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

export default class RoutesScreen extends React.Component {

    static navigationOptions = {
        // header: null,
        title: 'مسیر ها',
        headerStyle: {
            backgroundColor: color1,
            textAlign: 'right',
            // alignSelf: 'right'
        },
        // alignSelf: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
            fontSize: 22,
            fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
            textAlign: "right",
            alignSelf: 'center'
        },
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.routesScreenTitleLabel}>
                    <View style={styles.routesScreenTitleLabelContainer}>
                        <Text style={styles.routesScreenTitleLabelRoutesText}>
                            مسیر
                        </Text>
                        <Text style={styles.routesScreenTitleLabelRoutesText}>
                            ۱۰۰
                        </Text>
                        <Text style={styles.routesScreenTitleLabelText}>
                            مسیر های طی شده شما :
                        </Text>
                    </View>
                </View>

                <View style={styles.routesScreenRouteBox}>
                    <View style={styles.routesScreenRouteBoxContainer}>

                        <View style={styles.routesScreenRouteBoxRow1}>
                            <View style={styles.routesScreenRouteBoxRow1Container}>

                                <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                    انقلاب
                                </Text>
                                <Text style={styles.routesScreenRouteBoxRow1SmallText}>
                                    به
                                </Text>
                                <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                    تجریش
                                </Text>

                            </View>
                        </View>

                        <View style={styles.routesScreenRouteBoxRow1}>
                            <View style={styles.routesScreenRouteBoxRow2Container}>

                                <View style={styles.routesScreenRouteBoxRow2Vehicle}>
                                    <View style={styles.routesScreenRouteBoxRow2VehicleContainer}>

                                        <Image
                                            style={{height: 15, width: 15, marginLeft: 5}}
                                            source={require('../Assets/Icons/icPerson.png')}
                                        />
                                        <Text style={styles.routesScreenRouteBoxBarText}>
                                            ۲۱ کیلومتر
                                        </Text>

                                    </View>
                                </View>

                                <Text style={styles.routesScreenRouteBoxRow1SmallText}>
                                    ۵ روز پیش
                                </Text>

                            </View>
                        </View>

                    </View>
                </View>

                <View style={styles.routesScreenRouteBox}>
                    <View style={styles.routesScreenRouteBoxContainer}>

                        <View style={styles.routesScreenRouteBoxRow1}>
                            <View style={styles.routesScreenRouteBoxRow1Container}>

                                <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                    جردن
                                </Text>
                                <Text style={styles.routesScreenRouteBoxRow1SmallText}>
                                    به
                                </Text>
                                <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                    ونک
                                </Text>

                            </View>
                        </View>

                        <View style={styles.routesScreenRouteBoxRow1}>
                            <View style={styles.routesScreenRouteBoxRow2Container}>

                                <View style={styles.routesScreenRouteBoxRow2Vehicle}>
                                    <View style={styles.routesScreenRouteBoxRow2VehicleContainer}>

                                        <Image
                                            style={{height: 15, width: 15, marginLeft: 5}}
                                            source={require('../Assets/Icons/ic‌Bike.png')}
                                        />
                                        <Text style={styles.routesScreenRouteBoxBarText}>
                                            ۶ کیلومتر
                                        </Text>

                                    </View>
                                </View>

                                <Text style={styles.routesScreenRouteBoxRow1SmallText}>
                                    ۱۱ روز پیش
                                </Text>

                            </View>
                        </View>

                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    routesScreenRouteBoxBarText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRII",
        fontSize: 10,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        fontStyle: "normal",
        // marginLeft: 8,
        marginRight: 5,
        // width: 100,
        // height: 40,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color4,
        // backgroundColor: color4,
    },
    routesScreenRouteBoxRow1SmallText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRII",
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        fontStyle: "normal",
        marginLeft: 8,
        // width: 100,
        // height: 40,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color4,
        // backgroundColor: color4,
    },
    routesScreenRouteBoxRow1BoldText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 22,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        marginLeft: 8,
        // width: 100,
        // height: 40,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color4,
        // backgroundColor: color4,
    },
    routesScreenRouteBoxRow1Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    routesScreenRouteBoxRow2VehicleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    routesScreenRouteBoxRow2Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    routesScreenRouteBoxContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    routesScreenTitleLabelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    routesScreenTitleLabelText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIZ",
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        marginLeft: 3,
        // width: 100,
        // height: 40,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color4,
        // backgroundColor: color4,
    },
    routesScreenTitleLabelRoutesText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "Calibri",
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        fontStyle: "normal",
        // width: 100,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 5,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color4,
        marginRight: 5,
        // backgroundColor: color4,
    },
    routesScreenRouteBoxRow1: {
        height: 40,
        width: '100%',
    },
    routesScreenRouteBoxRow2Vehicle: {
        height: 20,
        width: '30%',
        borderRadius: 10,
        backgroundColor: color2
    },
    routesScreenRouteBox: {
        height: 100,
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: color1,
    },
    routesScreenTitleLabel: {
        height: 50,
        width: '100%',
        padding: 5,
        borderRadius: 5,
        backgroundColor: color1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
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