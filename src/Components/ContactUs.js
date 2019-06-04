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
    SafeAreaView,
    ScrollView
} from 'react-native';

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
                    ارتباط با ما
                </Text>
            </View>
        );
    }
}

export default class ContactUsScreen extends React.Component {

    static navigationOptions = {
        // header: null,
        headerTitle: <Header/>,
        // title: 'تنظیمات',
        headerStyle: {
            backgroundColor: color1,
            textAlign: 'right',
            // color: color4,
            // height: 100,
            // alignItems: 'flex-end',
            // alignSelf: 'right',
            // flex: 1,
            // justifyContent: 'flex-end',
        },
        headerTintColor: 'white',
    };

    render() {
        return (
            <View style={styles.container}>

                <ScrollView style={styles.aboutUsScreenCard}
                            showsVerticalScrollIndicator={false}>
                    <Text style={styles.aboutUsScreenCardTextTitle}>
                        «ارتباط با ما»
                    </Text>
                </ScrollView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    aboutUsScreenCardTextTitle: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 27,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        // fontStyle: "normal",
        // width: 100,
        // he: '100%',
        // lineHeight: 40,
        // letterSpacing: 5,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color2,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        // backgroundColor: color4,
    },
    aboutUsScreenCardTextDescription: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "Calibri",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        // fontStyle: "normal",
        // width: 100,
        // he: '100%',
        lineHeight: 20,
        // letterSpacing: 5,
        maxHeight: '100%',
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color2,
        marginRight: 5,
        // marginBottom: 20,
        // backgroundColor: color4,
    },
    aboutUsScreenCardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    aboutUsScreenCard: {
        height: '100%',
        width: '100%',
        padding: 5,
        // borderRadius: 5,
        backgroundColor: color4,
        // borderWidth: 1,
        // borderColor: color2
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
    icInfoTabBar: {
        height: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10
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