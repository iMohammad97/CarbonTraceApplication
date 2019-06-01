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
    Dimensions, TextInput, Linking
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
import MapView, {PROVIDER_GOOGLE, Marker, ProviderPropType} from "react-native-maps";
import Modal from "react-native-modal";

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
                    مسیریابی
                </Text>
            </View>
        );
    }
}

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 35.732474329636865;
const LONGITUDE = 51.42287135124207;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

export default class RoutingScreen extends React.Component {

    static navigationOptions = {
        // header: null,
        headerTitle: <Header/>,
        // title: 'مسیریابی',
        headerStyle: {
            backgroundColor: color1,
            textAlign: 'right',
            // height: 100,
            // alignItems: 'flex-end',
            // alignSelf: 'right',
            // flex: 1,
            // justifyContent: 'flex-end',
        },
    };

    constructor(props) {
        super(props);
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
                stores.map((result, i, store) => {
                    console.log({[store[i][0]]: store[i][1]});
                    return true;
                });
            });
        });
        // console.log('ddd', new Date());
        this.getRouteStatus();
        // this.checkIfUser();


        this.state = {
            // region: {
            //     latitude: LATITUDE,
            //     longitude: LONGITUDE,
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA,
            // },
            markers: [],
            isModalVisibleUserLogIn: false,
            isModalVisibleEvent: false
        };
    }

    componentDidMount() {
        this.checkIfUser();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    currentLatitude: position.coords.latitude,
                    currentLongitute: position.coords.longitude,
                    currentTimestamp: position.timestamp,
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                })
            },
            (error) => {
                console.log(error);
            },
            {enableHighAccuracy: true, timeout: 30000}
        )
    };

    checkIfUser = async () => {
        let user, email, name;
        try {
            user = await AsyncStorage.getItem('user');
            email = await AsyncStorage.getItem('email');
            name = await AsyncStorage.getItem('name');
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        if (!user) {
            this.toggleModalUserLogIn();
        } else {
            let date = new Date();
            let dateArr = String(date).split(' ').slice(1,4);
            let dateStr = String(dateArr);
            console.log('dateeeee',dateStr);
            this.checkIfEvent(dateStr);
        }
    };
    checkIfEvent = async (date) => {
        fetch("http://198.143.182.41/v1/events/" + date, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
                // 'x-api-key': corp_API_key
            },
        })
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.length !== 0) {
                    if (responseJson[0].is_active) {
                        this.setState({
                            events: (<View style={styles.modalContainer}>
                                <Text style={styles.eventModalTitleText}>
                                    {responseJson[0].title}
                                </Text>
                                <Text style={styles.eventModalDescriptionText}>
                                    {responseJson[0].description}
                                </Text>
                                <View style={styles.eventModalButtonsContainer}>
                                    <TouchableOpacity
                                        onPress={this.toggleModalEvent}
                                        style={styles.eventModalOkButton}>
                                        <View style={styles.routesScreenRouteBoxRow2VehicleContainer}>

                                            <Text style={styles.routesScreenModalNoButtonText}>
                                                خواندم
                                            </Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(responseJson[0].web_link).catch(err => console.error('An error occurred', err))}
                                        style={styles.eventModalLinkButton}>
                                        <View style={styles.routesScreenRouteBoxRow2VehicleContainer}>

                                            <Text style={styles.routesScreenModalNoButtonText}>
                                                ادامه
                                            </Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>),
                            isModalVisibleEvent: true
                        });
                    }
                }
            })
            .catch(error => console.log(error));//to catch the errors if any

    };
    toggleModalUserLogIn = () => {
        this.setState({isModalVisibleUserLogIn: !this.state.isModalVisibleUserLogIn});
    };
    toggleModalEvent = () => {
        this.setState({isModalVisibleEvent: !this.state.isModalVisibleEvent});
    };
    saveUserData = async () => {
        if (!this.state.textInputUserEmail) {
            alert('آدرس ایمیل نمی تواند خالی باشد!')
        } else if (!this.state.textInputUserFullName) {
            alert('نام نمی تواند خالی باشد!')
        } else {
            try {
                await AsyncStorage.setItem('user', this.state.textInputUserEmail);
                await AsyncStorage.setItem('email', this.state.textInputUserEmail);
                await AsyncStorage.setItem('name', this.state.textInputUserFullName);
                this.toggleModalUserLogIn();
            } catch (error) {
                // Error retrieving data
                console.log(error.message);
            }
        }
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
    };
    saveRouteStatus = async markers => {
        try {
            await AsyncStorage.setItem('markers-1-coordinate-latitude', String(markers[0].coordinate.latitude));
            await AsyncStorage.setItem('markers-1-coordinate-longitude', String(markers[0].coordinate.longitude));
            await AsyncStorage.setItem('markers-1-key', String(markers[0].key));
            await AsyncStorage.setItem('markers-1-title', String(markers[0].title));
            await AsyncStorage.setItem('markers-1-color', String(markers[0].color));

            await AsyncStorage.setItem('markers-2-coordinate-latitude', String(markers[1].coordinate.latitude));
            await AsyncStorage.setItem('markers-2-coordinate-longitude', String(markers[1].coordinate.longitude));
            await AsyncStorage.setItem('markers-2-key', String(markers[1].key));
            await AsyncStorage.setItem('markers-2-title', String(markers[1].title));
            await AsyncStorage.setItem('markers-2-color', String(markers[1].color));

            await AsyncStorage.setItem('routing_status', 'routing');
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        if (this.state.markers.length === 2) {
            this.props.navigation.navigate('RoutingDetails');
        } else if (this.state.markers.length === 1) {
            alert('لطفا مقصد خود را انتخاب کنید!')
        } else if (this.state.markers.length === 0) {
            alert('لطفا مبدا و مقصد خود را انتخاب کنید!')
        }
    };
    deleteRouteStatus = async () => {
        try {
            // await AsyncStorage.clear();
            await AsyncStorage.removeItem('markers-1-coordinate-latitude');
            await AsyncStorage.removeItem('markers-1-coordinate-longitude');
            await AsyncStorage.removeItem('markers-1-key');
            await AsyncStorage.removeItem('markers-1-title');
            await AsyncStorage.removeItem('markers-1-color');

            await AsyncStorage.removeItem('markers-2-coordinate-latitude');
            await AsyncStorage.removeItem('markers-2-coordinate-longitude');
            await AsyncStorage.removeItem('markers-2-key');
            await AsyncStorage.removeItem('markers-2-title');
            await AsyncStorage.removeItem('markers-2-color');


            await AsyncStorage.removeItem('routing_status');
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        this.setState({markers: []});
    };


    onMapPress(e) {
        if (this.state.markers.length < 1) {
            this.setState({
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        key: id++,
                        title: 'مبدا',
                        color: '#cca2a8',
                    },
                ],
            });
        } else if (this.state.markers.length === 1) {
            this.setState({
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        key: id++,
                        title: 'مقصد',
                        color: '#0087ff',
                    },
                ],
            });
            console.log(this.state.markers[0].coordinate);
            // this.saveRouteStatus(this.state.markers);
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={this.state.region}
                    onPress={e => this.onMapPress(e)}
                >
                    {this.state.markers.map(marker => (
                        <Marker
                            key={marker.key}
                            title={marker.title}
                            coordinate={marker.coordinate}
                            pinColor={marker.color}
                        />
                    ))}
                </MapView>
                <View style={styles.mainBubblesContainer}>
                    <View style={styles.buttonContainer}>
                        {/*<View style={styles.buttonRowContainer}>*/}
                        {/*    */}
                        {/*</View>*/}
                        <View
                            style={styles.bubbleNotif}
                        >
                            <Text style={{color: 'white', fontSize: 12}}>لطفا مبدا و مقصد خود را "روی نقشه" انتخاب
                                کنید</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.saveRouteStatus(this.state.markers)}
                            style={styles.bubble}
                        >
                            <Text>مسیریابی</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('RoutingCheckIn')}
                            style={styles.bubble}
                        >
                            <Text>چک این</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainerDown}>
                        <TouchableOpacity
                            onPress={() => this.deleteRouteStatus()}
                            style={styles.bubbleCancel}
                        >
                            <Text style={{color: 'white'}}>پاک کردن</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                    // animationInTiming={600}
                    // animationOutTiming={600}
                    hideModalContentWhileAnimating={true}
                    // onBackdropPress={() => this.setState({isModalVisibleUserLogIn: false})}
                    isVisible={this.state.isModalVisibleUserLogIn}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                >
                    <View style={{
                        height: 295,
                        width: '70%',
                        backgroundColor: '#fff',
                        borderRadius: 4,
                    }}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.routesScreenModalTitleText}>
                                خوش آمدید
                            </Text>
                            <Text style={styles.routesScreenModalLowerTextStartTravel}>
                                لطفا برای استفاده از ردپا ابتدا وارد حساب کاربری خود شوید.
                            </Text>
                            <TextInput style={styles.textInputStyle}
                                       placeholder="نام و نام خانوادگی"
                                       autoCapitalize='none'
                                       placeholderTextColor={color3}
                                       autoCorrect={false}
                                       onChangeText={(textInputUserFullName) => this.setState({textInputUserFullName})}/>
                            <TextInput style={styles.textInputStyle2}
                                       placeholder="آدرس ایمیل"
                                       autoCapitalize='none'
                                       placeholderTextColor={color3}
                                       autoCorrect={false}
                                       onChangeText={(textInputUserEmail) => this.setState({textInputUserEmail})}/>
                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity
                                    onPress={this.saveUserData}
                                    style={styles.routesScreenModalOkButton}>
                                    <View style={styles.routesScreenRouteBoxRow2VehicleContainer}>

                                        <Text style={styles.routesScreenModalNoButtonText}>
                                            ورود
                                        </Text>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>
                <Modal
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                    // animationInTiming={600}
                    // animationOutTiming={600}
                    hideModalContentWhileAnimating={true}
                    onBackdropPress={() => this.setState({isModalVisibleEvent: false})}
                    isVisible={this.state.isModalVisibleEvent}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                >
                    <View style={{
                        height: 415,
                        width: '90%',
                        backgroundColor: '#fff',
                        borderRadius: 4,
                    }}>
                        {this.state.events}
                    </View>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    textInputStyle: {
        width: '90%',
        borderRadius: 5,
        height: 40,
        backgroundColor: color5,
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        borderColor: color4,
        textAlign: 'right',
        color: color2,
        paddingRight: 5,
        borderBottomWidth: 2,
        borderWidth: 0
    },
    textInputStyle2: {
        width: '90%',
        borderRadius: 5,
        height: 40,
        backgroundColor: color5,
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        borderColor: color4,
        textAlign: 'right',
        color: color2,
        paddingRight: 5,
        marginTop: 8,
        borderBottomWidth: 2,
        borderWidth: 0
    },
    routesScreenModalNoButtonText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 19,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        // marginLeft: 8,
        // width: '100%',
        // height: 40,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "center",
        // textAlignVertical: 'bottom',
        color: color4,
        // backgroundColor: color2,
    },
    routesScreenRouteBoxRow2VehicleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    routesScreenModalOkButton: {
        height: 40,
        width: '90%',
        // margin: 5,
        borderRadius: 5,
        // borderColor: color4,
        // borderWidth: 1,
        backgroundColor: "green"
    },
    eventModalOkButton: {
        height: 40,
        width: '40%',
        // margin: 5,
        borderRadius: 5,
        marginRight: 5,
        // borderColor: color4,
        // borderWidth: 1,
        backgroundColor: "green"
    },
    eventModalLinkButton: {
        height: 40,
        width: '40%',
        // margin: 5,
        marginLeft: 5,
        borderRadius: 5,
        // borderColor: color4,
        // borderWidth: 1,
        backgroundColor: "blue"
    },
    modalButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    eventModalButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    routesScreenModalLowerTextStartTravel: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        // marginLeft: 8,
        width: '100%',
        height: 80,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color1,
        // backgroundColor: color2,
    },
    eventModalDescriptionText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        // marginLeft: 8,
        width: '100%',
        height: 300,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "right",
        // textAlignVertical: 'bottom',
        color: color1,
        // backgroundColor: color2,
    },
    routesScreenModalTitleText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 25,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        // marginLeft: 8,
        width: '100%',
        height: 40,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "center",
        // textAlignVertical: 'bottom',
        color: color1,
        // backgroundColor: color2,
    },
    eventModalTitleText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "CALIBRIB",
        fontSize: 25,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        fontStyle: "normal",
        // marginLeft: 8,
        width: '100%',
        height: 40,
        // maxHeight: '100%',
        // lineHeight: 40,
        letterSpacing: 1,
        textAlign: "center",
        // textAlignVertical: 'bottom',
        color: color1,
        // backgroundColor: color2,
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    mainBubblesContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 5,
        paddingVertical: 12,
        borderRadius: 10,
        margin: 5
    },
    bubbleNotif: {
        backgroundColor: 'rgba(0,0,0,0.69)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
        margin: 5
    },
    bubbleCancel: {
        backgroundColor: 'rgba(255,1,0,0.57)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
        margin: 5
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
        marginTop: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        // marginVertical: 20,
        backgroundColor: 'transparent',
    },
    buttonContainerDown: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // marginVertical: 20,
        backgroundColor: 'transparent',
    },
    headerText: {
        fontFamily: Platform.OS === 'ios' ? "Calibri" : "B Bardiya",
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
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