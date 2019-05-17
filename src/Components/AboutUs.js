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

class Header extends React.Component {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    درباره ما
                </Text>
            </View>
        );
    }
}

export default class AboutUsScreen extends React.Component {

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
                        رد پا
                    </Text>
                    <Text style={styles.aboutUsScreenCardTextDescription}>
                        {`
در «رد پا» ما می‌خواهیم با ترویج استفا‌ده از حمل و نقل عمومی، دوچرخه‌سواری و پیاده‌روی، شهری پاک‌تر، با ترافیک کمتر و بدون آلودگی داشته باشیم و برای این کار جایزه بگیریم!

ردپا، در اینجا کوتاه شده‌ی عبارت ردپای کربن است. ردپای کربن به معنی:
 
میزان کربن‌دی‌اکسیدی است که به علت نیازها و سبک زندگی ما در هوا منتشر می‌شود. این نیازها شامل نیاز به حمل و نقل، برق، غذا، لباس و سایر کالاها هستند.  
                            `}
                    </Text>
                    <Text style={styles.aboutUsScreenCardTextDescription}>
                        {` 
در حال حاضر، حمل و نقل یکی از اصلی‌ترین منابع انتشار کربن‌دی‌اکسیدی در بسیاری از کشورها، از جمله ایران است. همچنین در کلان‌شهر تهران، استفاده از خودرو شخصی بزرگترین عامل آلوده‌کننده هواست.
   
هدف ما در ردپای کربن تشویق شهروندان به انتخاب گزینه‌های پاک‌تری است که می‌تواند جایگزین استفاده از خودرو شخصی شود. این گزینه‌ها عبارتند از:
‏o پیاده‌روی 
‏o دوچرخه‌سواری 
‏o حمل و نقل عمومی (مترو و اتوبوس) 
                            `}
                    </Text>
                    <Text style={styles.aboutUsScreenCardTextDescription}>
                        {`
با انتخاب هر کدام از این روش‌های دوست‌دار محیط زیست به شما امتیازهایی تعلق می‌گیرد که می‌توانید از آن‌ها به عنوان پول نقد در فروشگاه‌های انتخابی یا دیگر گزینه‌های موجود در این اپ استفاده کنید.

با استفاده از این اپ، شما نه تنها باعث کاهش ردپای کربن خود می‌شوید، بلکه به کاهش ترافیک و پاک‌شدن هوای شهرمان نیز کمک می‌کنید.

                            `}
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