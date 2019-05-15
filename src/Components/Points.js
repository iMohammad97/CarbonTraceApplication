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
const color1LL = '#52ff56';
const color1L = '#5ae35e';
const color2 = '#424242';
const color3 = '#00adf5';
const color4 = '#ffffff';
const color5 = '#e3e3e3';

export default class PointsScreen extends React.Component {

    static navigationOptions = {
        // header: null,
        title: 'امتیاز های شما',
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

                <View style={styles.pointsScreenTitleLabel}>
                    <View style={styles.pointsScreenTitleLabelContainer}>
                        <Text style={styles.pointsScreenTitleLabelPointText}>
                            امتیاز
                        </Text>
                        <Text style={styles.pointsScreenTitleLabelPointText}>
                            ۱۰۰
                        </Text>
                        <Text style={styles.pointsScreenTitleLabelText}>
                            موجودی :
                        </Text>
                    </View>
                </View>

                <View style={styles.pointsScreenSpend}>
                    <View style={styles.pointsScreenSpendContainer}>

                        <View style={styles.pointsScreenSpendLabel}>
                            <View style={styles.pointsScreenSpendLabelContainer}>
                                <Text style={styles.pointsScreenTitleLabelText}>
                                    چگونه می خواهید این امتیاز ها را خرج کنید؟
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.pointsScreenSpendOption}>
                            <View style={styles.pointsScreenSpendOptionContainer}>
                                <Text style={styles.pointsScreenOptionText}>
                                    اینترنت همراه اول
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pointsScreenSpendOption}>
                            <View style={styles.pointsScreenSpendOptionContainer}>
                                <Text style={styles.pointsScreenOptionText}>
                                    اینترنت ایرانسل
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pointsScreenSpendOption}>
                            <View style={styles.pointsScreenSpendOptionContainer}>
                                <Text style={styles.pointsScreenOptionText}>
                                    اعتبار فروشگاه شهروند
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    pointsScreenTitleLabelPointText: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 17,
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
    pointsScreenTitleLabelText: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
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
    pointsScreenOptionText: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        // marginLeft: 5,
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
    pointsScreenTitleLabelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    pointsScreenSpendContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pointsScreenSpendLabelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    pointsScreenSpendOptionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    pointsScreenTitleLabel: {
        height: 50,
        width: '100%',
        padding: 5,
        borderRadius: 5,
        backgroundColor: color1,
    },
    pointsScreenSpend: {
        height: 270,
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: color1,
    },
    pointsScreenSpendOption: {
        height: 50,
        width: '90%',
        marginRight: 20,
        marginTop: 10,
        // padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color1LL,
        backgroundColor: color1L,
    },
    pointsScreenSpendLabel: {
        height: 70,
        width: '100%',
        // marginTop: 10,
        // padding: 5,
        // borderRadius: 5,
        // backgroundColor: color1,
    },
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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