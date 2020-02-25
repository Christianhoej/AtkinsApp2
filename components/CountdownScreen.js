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
  NativeEventEmitter,
      NativeModules,
      ToastAndroid
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


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

export default class CountdownScreen extends Component{
/*const { startpunktVal } = route.params;
const { destinationVal } = route.params;
const closingVar = "fromCountdown"
*/
constructor(props) {
        super(props);
        this.onConnectPress = this.onConnectPress.bind(this);
        /*this.state = {
            isConnecting: false
        }*/


        if (requestPermissions()) {
            console.log('permission granted');
            //LockerManager.startScan();
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

        UUID = this.props.navigation.getParam('uid', '');

    }

    componentDidMount() {
        const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);
        eventEmitter.addListener('onConnectionStatusChanged', (event) => {
            this.setState({isConnecting: false});
            if (event.status === LockerManager.STATUS_DEVICE_CONNECTED) {
                console.log('connected');
                LockerManager.stopScan();
                this.props.navigation.navigate('Operation', {uid: event.uid});
            } else {
                console.log('connection failed');
                ToastAndroid.show('connection failed status code ' + event.status, ToastAndroid.SHORT);
            }
        })
    }

    getData() {
            LockerManager.getData(UUID);
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
            this.props.navigation.goBack();
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

            //uuid = this.textInputUUID._lastNativeText;

            if (UUID == null || UUID.length == 0) {
                ToastAndroid.show('Empty UUID', ToastAndroid.SHORT);
            } else {
                console.log(UUID);
                //LockerManager.startScan();
                this.setState({isConnecting: true});
                LockerManager.connect(UUID);
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

});

