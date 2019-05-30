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
    Dimensions
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
const LATITUDE_DELTA = 0.0922;
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
        this.getRouteStatus();


        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
        };
    }

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
        console.log('on read:', markers);
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
            console.log('saved');
            console.log('stateee', this.state.markers);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        console.log('state before if navigate', this.state.markers);
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
            await AsyncStorage.clear();
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
                            <Text style={{color: 'white'}}>لطفا مبدا و مقصد خود را انتخاب کنید</Text>
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
                            <Text style={{color: 'white'}}>لغو سفر</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
// DefaultMarkers.propTypes = {
//     provider: ProviderPropType,
// };


const styles = StyleSheet.create({
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