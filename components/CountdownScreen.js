import CountDown from 'react-native-countdown-component';
import 'react-native-gesture-handler';

//import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Picker,
  TextInput,
  NativeEventEmitter,
      NativeModules,
      ToastAndroid,
      PermissionsAndroid
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import LockerManager from '../LockerManager'


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as React from 'react';
import { useState, Component } from 'react';
import { NavigationContainer, StackActions, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//let UUID = '';
let         UUID = "00000000-4462-4e45-0028-901000000042";

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

export default class CountdownScreen extends Component{
/*const { startpunktVal } = route.params;
const { destinationVal } = route.params;
const closingVar = "fromCountdown"
*/

/*static navigationOptions = ({navigation}) => {
        return {
            title: 'Countdown'
        }
    };
*/

constructor(props) {
        super(props);
        this.onConnectPress = this.onConnectPress.bind(this);
        this.state = {
            isConnecting: false
        }

        if (requestPermissions()) {
            console.log('permission granted');
            LockerManager.startScan();
        }
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

        //UUID = this.props.navigation.getParam('uid', '');
        UUID = "00000000-4462-4e45-0028-901000000042";

    }

    componentDidMount() {
        const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);
        eventEmitter.addListener('onConnectionStatusChanged', (event) => {
            this.setState({isConnecting: false});
            if (event.status === LockerManager.STATUS_DEVICE_CONNECTED) {
                console.log('connected');
                LockerManager.stopScan();
                //this.props.navigation.navigate('Operation', {uid: event.uid});
            } else {
                console.log('connection failed');
                ToastAndroid.show('connection failed status code ' + event.status, ToastAndroid.SHORT);
            }
        })

        console.log('componentDidMount');

                //BackHandler.addEventListener("hardwareBackPress", this.handleOnBackPress);

                connectionStatusChangedListener = eventEmitter.addListener('onConnectionStatusChanged', (event) => {
                    console.log('uid: ' + event.uid + ', status: ' + event.status);
                    if (event.status === LockerManager.STATUS_DEVICE_TIME_OUT) {
                        console.log('Device timeout');
                        ToastAndroid.show("Deice timeout", ToastAndroid.LONG);
                        LockerManager.startScan();
                        //this.props.navigation.goBack();
                    } else if (event.status === LockerManager.STATUS_DEVICE_OUT_OF_RANGE) {
                        console.log('Device out of range');
                        ToastAndroid.show("Device out of range", ToastAndroid.LONG);
                        LockerManager.startScan();
                        //this.props.navigation.goBack();
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

    getData() {
            LockerManager.getData(UUID);
                    console.log("Get data method")

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
            //this.props.navigation.goBack();
        }

    /*onConnectPress() {
        console.log('åben pressed');

        uuid = this.textInputUUID._lastNativeText;

        if (uuid == null || uuid.length == 0) {
            ToastAndroid.show('Empty uuid', ToastAndroid.SHORT);
        } else {
            console.log(uuid);
            //LockerManager.startScan();
            this.setState({isConnecting: true});
            LockerManager.connect(uuid);
        }
    }*/

    onConnectPress() {
            console.log('åben pressed');

            uuid = "00000000-4462-4e45-0028-901000000042"

            if (uuid == null || uuid.length == 0) {
                ToastAndroid.show('Empty UUID', ToastAndroid.SHORT);
            } else {
                console.log(uuid);
                //LockerManager.startScan();
                this.setState({isConnecting: true});
                LockerManager.connect(uuid);
            }
        }

render(){
    return (

       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Din pakke er reseveret i:</Text>


          </View>

            <View style={styles.countdownStyle}>
              <CountDown
                until={60 * 30}
                size={30}
                style={styles.countdownStyle}
                onFinish={() => {navigation.replace('Home') || alert('Din reservation løb ud...')}}
                digitStyle={{backgroundColor: 'lightgrey'}}
                digitTxtStyle={{color: '#000'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'M', s: 'S'}}
              />
              </View>

              <View style={styles.butttonContainer}>

          <View style = {styles.button2}>
                <Button
                    title="Annuller"

                    onPress={() => navigation.replace('Home')}
                    />

            </View>

            <View style = {styles.button2}>
                              <Button
                                  title="Åben"
                                    onPress={this.onConnectPress}
                                  //onPress={() => navigation.replace('Closing', {closingVar1: closingVar, destination: destinationVal})}
                                  />
                              </View>
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
sectionContainer: {
      marginTop: 32,
  },
  scrollView: {
      backgroundColor: Colors.white,
    },
countdownStyle: {
      paddingHorizontal: 20,
      marginTop: 20
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    butttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
      },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
      textAlign: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    button: {
        paddingHorizontal: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 60,
        fontSize: 40,
        fontWeight: "400"
    },
    button2: {
        width: '40%',
        height: 40,
        paddingHorizontal: 20
      },
      container: {
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
          },
          test: {
              marginTop: 16,
              backgroundColor: 'black'
          }

});

