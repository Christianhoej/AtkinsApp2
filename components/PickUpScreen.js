import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    ProgressBarAndroid,
    NativeEventEmitter,
    NativeModules,
    ToastAndroid,
    Colors,
    BackHandler,
    ScrollView
} from 'react-native';
import LockerManager from '../LockerManager'
import {PermissionsAndroid} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';


let UUID = '';
let isAuthenticated = false;

let errorListener;
let tokenAvailableListener;
let statusAvailableListener;
let connectionStatusChangedListener;
let compartmentStatusChangedListener;
let authenticationStatusChangedListener;

let apiErrorListener;
let apiDataAvailable;


async function requestPermissions() {
    try {
    //const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
        title: 'Cool Photo App Camera Permission',
        message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
        },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permssion Granted');
        LockerManager.startScan();
        return true;
    } else {
        console.log('Permission Rejected');
    }
    } catch (err) {
    console.warn(err);
    }
    return false;
}

let uuid = '';

export default class PickupScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Test Screen',
        }
    };





    constructor(props) {
        super(props);
        this.onConnectPress = this.onConnectPress.bind(this);
        this.getData = this.getData.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        //this.handleOnBackPress = this.handleOnBackPress.bind(this);
        this.onAuthenticatePress = this.onAuthenticatePress.bind(this);
        this.onCompartmentOpenPress = this.onCompartmentOpenPress.bind(this);

        this.state = {
            isConnecting: false,
            loadingData: false,
            token: '',
            authenticationToken: '',
            authenticationResponse: ''
        }


        if (requestPermissions()) {
            console.log('permission granted');
            LockerManager.startScan();
        }

        UUID = "00000000-4462-4E45-0028-901000000042";
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');

        apiErrorListener.remove();
        apiDataAvailable.remove();

        errorListener.remove();
        tokenAvailableListener.remove();
        statusAvailableListener.remove();
        connectionStatusChangedListener.remove();
        compartmentStatusChangedListener.remove();
        authenticationStatusChangedListener.remove();
        //BackHandler.removeEventListener("hardwareBackPress", this.handleOnBackPress);
    }

    componentDidMount() {
        console.log('componentDidMount');

        const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);

        connectionStatusChangedListener = eventEmitter.addListener('onConnectionStatusChanged', (event) => {
            console.log('uid: ' + event.uid + ', status: ' + event.status);

this.setState({isConnecting: false});
if (event.status === LockerManager.STATUS_DEVICE_CONNECTED) {
console.log('connected');
LockerManager.stopScan();
} else {
console.log('connection failed');
ToastAndroid.show('connection failed status code ' + event.status, ToastAndroid.SHORT);
}

            if (event.status === LockerManager.STATUS_DEVICE_TIME_OUT) {
                console.log('Device timeout');
                ToastAndroid.show("Deice timeout", ToastAndroid.LONG);
                LockerManager.startScan();
            } else if (event.status === LockerManager.STATUS_DEVICE_OUT_OF_RANGE) {
                console.log('Device out of range');
                ToastAndroid.show("Device out of range", ToastAndroid.LONG);
                LockerManager.startScan();
            }
        });

        authenticationStatusChangedListener = eventEmitter.addListener('onAuthenticationStatusChanged', (event) => {
                    console.log('uid: ' + event.uid + ', isAuthenticated: ' + event.isAuthenticated);
                    isAuthenticated = event.isAuthenticated;
                    ToastAndroid.show(isAuthenticated ? "Authenticated" : "Authentication failed", ToastAndroid.LONG);
                });

                compartmentStatusChangedListener= eventEmitter.addListener('onCompartmentStatusChanged', (event) => {
                    console.log('uid: ' + event.uid + ', compartmentId: ' + event.compartmentId + ', compartmentState: ' + event.compartmentState);
                    ToastAndroid.show("Compartment id " + event.compartmentId + (event.compartmentState == 1 ? " opened" : " closed"), ToastAndroid.LONG);
                });

                statusAvailableListener = eventEmitter.addListener('onStatusAvailable', (event) => {
                    console.log('uid: ' + event.uid + ', status: ' + event.status);
                    //ToastAndroid.show(event.status, ToastAndroid.LONG);
                });

                tokenAvailableListener = eventEmitter.addListener('onTokenAvailable', (event) => {
                    console.log('uid: ' + event.uid + ', token: ' + event.token);
                    ToastAndroid.show(event.token, ToastAndroid.LONG);
                });

                errorListener = eventEmitter.addListener('onError', (event) => {
                    console.log('uid: ' + event.uid + ', errorCode: ' + event.errorCode);
                    ToastAndroid.show("Error Code: " + event.errorCode, ToastAndroid.LONG);
                });


                apiErrorListener = eventEmitter.addListener('onApiError', (event) => {
                    this.setState({loadingData: false});

                    console.log('API: errorCode: ' + event.errorCode);
                    ToastAndroid.show("Error Code: " + event.errorCode, ToastAndroid.LONG);
                });

                apiDataAvailable = eventEmitter.addListener('onApiDataAvailable', (event) => {
                    this.setState({
                        loadingData: false,
                        token: event.token,
                        authenticationToken: event.authenticationToken,
                        authenticationResponse: event.authenticationResponse
                    });

                    console.log('API TOKEN: ' + event.token);
                    console.log('API AUTHENTICATION: ' + event.authenticationToken);
                    console.log('API AUTHENTICATION RESPONSE: ' + event.authenticationResponse);
                });
    }

    onConnectPress() {
        console.log('pressed');

        uuid = this.textInputUUID._lastNativeText;

        if (uuid == null || uuid.length == 0) {
            ToastAndroid.show('Empty uuid', ToastAndroid.SHORT);
        } else {
            console.log(uuid);
            //LockerManager.startScan();
            this.setState({isConnecting: true});
            LockerManager.connect(uuid);

        }
    }

    getData() {
            LockerManager.getData('00000000-4462-4E45-0028-901000000042');
            this.setState({
                    loadingData: !this.state.loadingData
                });
        }

        onAuthenticatePress() {
            LockerManager.authenticate(
                UUID,
                this.state.authenticationToken,
                this.state.authenticationResponse
            );
        }

        onCompartmentOpenPress() {
            LockerManager.openCompartment(
                UUID,
                this.state.token
            );
        }

        onDisconnect() {
            LockerManager.startScan();
            LockerManager.disconnect(UUID);
        }

    render() {
       return (
       <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               >
            <View style = {styles.container}>
                <Text>SwipBox Sample App</Text>
                <TextInput
                    style={{textAlign: 'center'}}
                    id="textInputUUID"
                    placeholder="Enter UUID to connect"
                    underlineColorAndroid="black"
                    multiline={true}
                    ref={input => this.textInputUUID = input}
                    //value="00000000-4281-4e45-0039-50130000003c"
                    value="00000000-4462-4e45-0028-901000000042"
                    //value=LockerManager.
                />
                <Button
                    title="Connect!"
                    onPress={this.onConnectPress}
                />
            </View>
            <View style = {styles.container}>
                {this.state.loadingData ? null :
                    <Button
                        title="Get Data"
                        onPress={this.getData}
                        hide={this.state.loadingData}
                    />
                }
                <TextInput
                    style={{textAlign: 'center'}}
                    id="textInputAuthenticationToken"
                    placeholder="Enter authentication token"
                    underlineColorAndroid="black"
                    onChangeText={(text) => this.setState({authenticationToken: text})}
                    multiline={true}
                    value={this.state.authenticationToken}
                    //value="AEAAIABAb9wgs/va55/7hp62W29wLVPDbP8BVDPenJroDAKrpZNikKpDMBdQZaex1aAgtFuChyV28bMfg9aGuHr8fxVATHt4x79r8CAiAvJFqPPGnGSMZZTRLnK/3ihcpRt2WbZLqM1YQ0FHHCnsD1jjo4LqIfmGQx32Xsiob9xGrQkJ7Zaa8z/RhDYDo6xROaHuPAzYwJx85MJndMP4Qi4nEGRZkg=="
                />
                <TextInput
                    style={{textAlign: 'center'}}
                    id="textInputAuthenticationResponse"
                    placeholder="Enter authentication reponse"
                    underlineColorAndroid="black"
                    onChangeText={(text) => this.setState({authenticationResponse: text})}
                    multiline={true}
                    value={this.state.authenticationResponse}
                    //value="TIMkaRx+8n4="
                />
                <Button
                    title="Authenticate"
                    onPress={this.onAuthenticatePress}
                />

                <TextInput
                    style={{textAlign: 'center'}}
                    id="textInputCompartmentOpenToken"
                    placeholder="Enter token to open compartment"
                    underlineColorAndroid="black"
                    onChangeText={(text) => this.setState({token: text})}
                    multiline={true}
                    value={this.state.token}
                    //value="AEAAIABAUdWMvVRzjJGdBoBGeKJu3K3OJn/nG6HzCwIdkuUi3dDg4oW9nl0z+5VpzA2t8KX7pIOnax4htZPda2ZUIbhTGlFPIKj0rAAaO99S9wE7WsobP298WG9MLYYxbFhk0cUbpTGsa2QWWwjgZWmyTuG8460Cc/fICCkN7gE24x5623fwQYX/y9L14oCvxlOK/DxwE5YGkm8ZHGWexf3uGpeYEg=="
                />
                <Button
                    title="Open Compartment"
                    onPress={this.onCompartmentOpenPress}
                />

                <View style={styles.test}>
                    <Button
                        title="Disconnect"
                        onPress={this.onDisconnect}
                    />
                </View>
            </View>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

})