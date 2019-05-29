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
    Linking,
    ActivityIndicator,
    SafeAreaView,
    ScrollView, Dimensions
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
                    مسیر شما
                </Text>
            </View>
        );
    }
}

const corp_API_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI2M2U4M2RjMzJhMWM1ZjhhZTgxNTA4YWFhNDFkM2ZiNmJmY2NlNTZmYWVjOTllMjdjMmM5ZmI4NDc2OWFiM2ViM2Q2Y2NjODgyYTQ3NDgzIn0.eyJhdWQiOiJteWF3ZXNvbWVhcHAiLCJqdGkiOiIyNjNlODNkYzMyYTFjNWY4YWU4MTUwOGFhYTQxZDNmYjZiZmNjZTU2ZmFlYzk5ZTI3YzJjOWZiODQ3NjlhYjNlYjNkNmNjYzg4MmE0NzQ4MyIsImlhdCI6MTU1ODU1MzEzNywibmJmIjoxNTU4NTUzMTM3LCJleHAiOjE1NTg1NTY3MzcsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyIsImVtYWlsIl19.SmwlAhP_Lwit5fDAvaJTq5w3CwGJEqB65EBOLwmndcwtnLhNZYWyw1GFj3aSpNY7tZ8GJdOhDVyGHZy99et409ytgPkGw1yuiN2X0A5xh1pOkXktIblB20fX8Kp4PXSBgCChhknnOrr_4dixq231a5G_m6hSY6AvAwe8U5s_j8zkDAyCDWYRYEhYADpfsygORJTYBSUeP_lmCdSZjutqA0dravM3yoVN-rSElMiyfOwAU3j4QQ2dbxYBRbmbgWCI4OVWqtUiYyG_rRwh6G3u-FLdLqn5-GdYiobc2-7NYJ5unRbI6f3Uev1un9iqwffESckriviquz6ot6W2kpPRJg";

const {width, height} = Dimensions.get('window');
export default class RoutingDetailsScreen extends React.Component {

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

    constructor(props) {
        super(props);
        this.getRouteStatus();
        // this.loadAddresses();


        this.state = {
            markers: [],
            loading1: true,
            loading2: true,
            loading3: true,
            dataSource: '',
            dataDestination: '',
            dataRouteDistance: 0.0,
            dataRouteDuration: 0.0,
            dataRouteOuterLinkGoogle: '',
            dataRouteOuterLinkWaze: '',
            dataRouteOuterLinkNamaa: '',
        };
    }


    loadAddressesSource = async (lat, long) => {
        fetch("https://map.ir/fast-reverse?lat=" + String(lat) + "&lon=" + String(long), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-api-key': corp_API_key
            },
        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    loading1: false,
                    dataSource: responseJson.address_compact
                })
            })
            .catch(error => console.log(error));//to catch the errors if any

    };
    loadAddressesDestination = async (lat, long) => {
        fetch("https://map.ir/fast-reverse?lat=" + String(lat) + "&lon=" + String(long), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-api-key': corp_API_key
            },
        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    loading2: false,
                    dataDestination: responseJson.address_compact
                })
            })
            .catch(error => console.log(error));//to catch the errors if any

    };
    loadRouteDistanceDuration = async (lat1, long1, lat2, long2) => {
        fetch("https://map.ir/distancematrix?origins=b%2C" + String(lat1) + "%2C" + String(long1) + "&destinations=c%2C" + String(lat2) + "%2C" + String(long2) + "&sorted=true", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-api-key': corp_API_key
            },
        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    loading3: false,
                    dataRouteDistance: (responseJson.distance[0].distance) / 1000,
                    dataRouteDuration: (responseJson.duration[0].duration) / 60,
                    dataRouteOuterLinkGoogle: "https://www.google.com/maps/dir/?api=1&origin="+String(lat1)+","+String(long1)+"&destination="+String(lat2)+","+String(long2),
                    dataRouteOuterLinkWaze: "https://waze.com/ul?ll="+String(lat2)+","+String(long2)+"&z=10",
                    dataRouteOuterLinkNamaa: "https://namaa.ir/?ll="+String(lat1)+","+String(long1)+";"+String(lat2)+","+String(long2)+"&type=direction",
            })
            })
            .catch(error => console.log(error));//to catch the errors if any

    };


    getRouteStatus = async () => {
        let markers = [];
        let routing_status = '';
        let markers_1_coordinate_latitude, markers_1_coordinate_longitude, markers_1_key, markers_1_title,
            markers_1_color;
        let markers_2_coordinate_latitude, markers_2_coordinate_longitude, markers_2_key, markers_2_title,
            markers_2_color;
        try {
            markers_1_coordinate_latitude = parseFloat(await AsyncStorage.getItem('markers-1-coordinate-latitude'));
            markers_1_coordinate_longitude = parseFloat(await AsyncStorage.getItem('markers-1-coordinate-longitude'));
            markers_1_key = parseInt(await AsyncStorage.getItem('markers-1-key'));
            markers_1_title = await AsyncStorage.getItem('markers-1-title');
            markers_1_color = await AsyncStorage.getItem('markers-1-color');

            markers_2_coordinate_latitude = parseFloat(await AsyncStorage.getItem('markers-2-coordinate-latitude'));
            markers_2_coordinate_longitude = parseFloat(await AsyncStorage.getItem('markers-2-coordinate-longitude'));
            markers_2_key = parseInt(await AsyncStorage.getItem('markers-2-key'));
            markers_2_title = await AsyncStorage.getItem('markers-2-title');
            markers_2_color = await AsyncStorage.getItem('markers-2-color');


            routing_status = await AsyncStorage.getItem('routing_status') || 'not_routing';
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        if (routing_status === 'routing') {
            markers = [
                {
                    'coordinate': {
                        'latitude': markers_1_coordinate_latitude,
                        'longitude': markers_1_coordinate_longitude
                    },
                    'key': markers_1_key,
                    'title': markers_1_title,
                    'color': markers_1_color
                },
                {
                    'coordinate': {
                        'latitude': markers_2_coordinate_latitude,
                        'longitude': markers_2_coordinate_longitude
                    },
                    'key': markers_2_key,
                    'title': markers_2_title,
                    'color': markers_2_color
                }
            ];
            this.setState({
                markers: markers
            });
        } else {
            this.setState({markers: []})
        }
        this.loadAddressesSource(markers_1_coordinate_latitude, markers_1_coordinate_longitude);
        this.loadAddressesDestination(markers_2_coordinate_latitude, markers_2_coordinate_longitude);
        this.loadRouteDistanceDuration(markers_1_coordinate_latitude, markers_1_coordinate_longitude, markers_2_coordinate_latitude, markers_2_coordinate_longitude);
        console.log('on read (detailsScreen):', markers);
    };


    render() {

        return (
            <View style={styles.container}>

                <View style={styles.routesScreenRouteBox}>
                    <View style={styles.routesScreenRouteBoxContainer}>

                        <View style={styles.routesScreenRouteBoxRow1}>
                            <View style={styles.routesScreenRouteBoxRow1Container}>

                                <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                    مبدا :
                                </Text>
                                <Text style={styles.routesScreenRouteBoxRow1SmallText}>
                                    {this.state.dataSource}
                                </Text>
                                <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                    مقصد :
                                </Text>
                                <Text style={styles.routesScreenRouteBoxRow1SmallText}>
                                    {this.state.dataDestination}
                                </Text>
                                <View style={styles.rowInfo}>
                                    <View style={styles.rowInfoContainer}>
                                        <View style={styles.rowInfoContainerInner}>
                                            <Text style={styles.routesScreenRouteBoxRow1SmallTextDistance}>
                                                {this.state.dataRouteDuration.toFixed(1)} دقیقه
                                            </Text>
                                            <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                                زمان :
                                            </Text>
                                        </View>
                                        <View  style={styles.rowInfoContainerInner}>
                                            <Text style={styles.routesScreenRouteBoxRow1SmallTextDistance}>
                                                {this.state.dataRouteDistance.toFixed(2)} کیلومتر
                                            </Text>
                                            <Text style={styles.routesScreenRouteBoxRow1BoldText}>
                                                مسافت :
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={styles.routesScreenRouteBoxRow2}>
                            <View style={styles.routesScreenRouteBoxRow2Container}>

                                <TouchableOpacity
                                    onPress={() => Linking.openURL(this.state.dataRouteOuterLinkGoogle).catch(err => console.error('An error occurred', err))}
                                    style={styles.routesScreenRouteBoxRow2GoogleMapsButton}>
                                    <View style={styles.routesScreenRouteBoxRow2VehicleContainer}>

                                        <Image
                                            style={{width: width*0.38, height: (33*width*0.38)/180}}
                                            source={require('../Assets/Icons/icGoogleMaps.png')}
                                        />

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(this.state.dataRouteOuterLinkWaze).catch(err => console.error('An error occurred', err))}
                                    style={styles.routesScreenRouteBoxRow2WazeButton}>
                                    <View style={styles.routesScreenRouteBoxRow2WazeButtonContainer}>

                                        <Image
                                            style={{width: 30, height: 30, marginRight: 5}}
                                            source={require('../Assets/Icons/icWaze.png')}
                                        />
                                        <Image
                                            style={{width: width*0.2, height: (666*width*0.2)/2717}}
                                            source={require('../Assets/Icons/icWazeName.png')}
                                        />

                                    </View>
                                </TouchableOpacity>


                            </View>
                        </View>

                    </View>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    rowInfoContainerInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rowInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowInfo: {
        height: 40,
        width: '100%',
    },
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
    routesScreenRouteBoxRow2WazeButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    routesScreenRouteBoxRow2VehicleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    routesScreenRouteBoxRow2GoogleMapsButton: {
        height: 40,
        width: '46%',
        borderRadius: 5,
        backgroundColor: color4
    },
    routesScreenRouteBoxRow2WazeButton: {
        height: 40,
        width: '46%',
        borderRadius: 5,
        backgroundColor: color4
    },
    routesScreenRouteBoxRow2Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    routesScreenRouteBoxRow1SmallText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRII",
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        fontStyle: "normal",
        marginLeft: 8,
        // width: 100,
        height: 50,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color4,
        // backgroundColor: color4,
    },
    routesScreenRouteBoxRow1SmallTextDistance: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRII",
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        fontStyle: "normal",
        marginLeft: 8,
        // width: 100,
        height: 25,
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
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        marginLeft: 8,
        // width: 100,
        height: 30,
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
        flexDirection: 'column',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        flexWrap: 'wrap'
    },
    routesScreenRouteBoxRow1: {
        height: 200,
        width: '100%',
    },
    routesScreenRouteBoxRow2: {
        height: 100,
        width: '100%',
    },
    routesScreenRouteBoxContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flex: 1,
        // flexDirection: 'column',
        // // justifyContent: 'flex-end',
        // // alignItems: 'center',
        // flexWrap: 'wrap'
    },
    routesScreenRouteBox: {
        height: 400,
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: color1,
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