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
/*

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
*/
function CountdownScreen ({navigation, route}){
const { startpunktVal } = route.params;
const { destinationVal } = route.params;
const closingVar = "fromCountdown"

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
                                  //  onPress={this.onConnectPress}
                                  onPress={() => navigation.replace('Closing', {closingVar1: closingVar, destination: destinationVal})}
                                  />
                              </View>
            </View>
        </ScrollView>
    )
//}
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

export default CountdownScreen;

