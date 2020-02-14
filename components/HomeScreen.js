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
  NativeModules
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import LockerManager from '../LockerManager'
//import ApiClient from 'com.atkinsapp2.communications.retrofit.ApiClient'
//module.import = NativeModules.ApiClient
//import (AtkinsApp2.android.app.src.main.java.com.atkinsapp2.communications.retrofit.ApiClient)

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountdownScreen from '../components/CountdownScreen';
import ClosingScreen from '../components/ClosingScreen';


const stations = [
  {label: 'Nørreport',
    value: 'nørreport'
    },
  {label: 'Hovedbanegården',
   value: 'hovedbanegården'
   },
  {label: 'Lyngby',
    value: 'lyngby'
    },
];

const uid = "00000000-4281-4e45-0039-50130000003c";
const token = "eyJraWQiOiJidm8yMDJGRjJTMTZSdmVveXRQWFFycGVLaWlCOFVtWjlGZVBqXC9LV05IRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NDVjODQ5Ny1jNjNhLTQwYTctYTE2NS0wMzFkYzg2OGZiZmQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfVVdFanYxQ3dHIiwiY29nbml0bzp1c2VybmFtZSI6Ik1BWnRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJNQVp0ZXN0IiwiYXVkIjoiMW83bGI2bXVocHJtMGNsaGE5bHF1aHE1MmciLCJldmVudF9pZCI6ImQyNDg5MWI2LTM5NzctNDYwNy1iZWRlLWJkOWVkNmUxMDE1MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTYzNDMyNTQ1LCJuYW1lIjoidGVzdDEyIiwiZXhwIjoxNTYzNDM2MTQ1LCJpYXQiOjE1NjM0MzI1NDUsImZhbWlseV9uYW1lIjoibWFpbnRlbmFuY2VfcHJvdmlkZXJfMzMiLCJlbWFpbCI6InpvaGFpYmFicmFyNzNAZ21haWwuY29tIn0.ZYpjO033rkSnthNnCOaKur_NuUkmOnKXKPl7Naaef0XA79Aqr7DQasb9JtcxFqU_cQWkUfBaAqX4eGkfuZ0SmzBmOkG4-KYYRBOzB4XeE0LJqW9XQabwI2r1hXRbx5ng_5x3oLVFZcsGcHAwFDC3mMxEJ-RxKq-QxN0tVtAvY83G4MBibyBU75u28ZCbd0C5Obia7v_PtvDmS-5JvIvP9jtG-ed4p9oui2EAjrD30f6vM2FHf7VAoi-Afd8YR0iTTEx1GH0FFm9guPNmZDvSC0ZHFb6DUlM27_9B9YxCOv-GlIz5sausxJ2mwvrj93RHILL2RcAJVGb8MTrOxmtJSg"
const token2 = "b39bd726-8643-4748-aeb4-62aeae814746,11e4a689-2108-438d-9bf1-412e057c4673"

//const url = ApiClient.getRetrofitClient();


const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);

connectionStatusChangedListener = eventEmitter.addListener('onConnectionStatusChanged',
(event) => {
//Check for different statuses of the connection * And Responsed accordingly
if (event.status === LockerManager.STATUS_DEVICE_CONNECTED) {
console.log("Connected!")
//We can access params of the tiggered event by . operator
} });

authenticationStatusChangedListener = eventEmitter.addListener('onAuthenticationStatusChanged',
(event) => { //Check for authentication status
});

compartmentStatusChangedListener= eventEmitter.addListener('onCompartmentStatusChanged',
(event) => {
//Check for compartment status: open, close
});

statusAvailableListener = eventEmitter.addListener('onStatusAvailable',
(event) => {
//Receive different device statuses here
});

tokenAvailableListener = eventEmitter.addListener('onTokenAvailable',
(event) => {
//Receive token here
});

errorListener = eventEmitter.addListener('onError',
(event) => {
//Receive different errors here
});

apiErrorListener = eventEmitter.addListener('onApiError',
(event) => {
//Receive API error here while fetching data from server
});

apiDataAvailable = eventEmitter.addListener('onApiDataAvailable',
(event) => {
//Receive data here that is fetched from server
});


var startpunkt = null;
var destination = null;

function HomeScreen({navigation}) {

  return (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Vælg startpunkt</Text>
              < RNPickerSelect
                  onValueChange={(value) => {startpunkt=value, console.log(startpunkt) }}
                  style={pickerSelectStyles}

                  items={stations}
                  placeholder={ {label: 'Vælg station', value: null, color: '#9EA0A4' }}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Vælg destination</Text>
              <RNPickerSelect
                    onValueChange={(value) => {destination=value, console.log(destination) }}
                    style={pickerSelectStyles}

                    items={stations}
                    placeholder={ {label: 'Vælg station', value: null, color: '#9EA0A4'}}
                />
            </View>

       <View style = {styles.button}>
        <Button
            title="OK"
            onPress={() => {
                if(startpunkt==null || destination==null || startpunkt==destination)
                    alert('Indtast venligst både Startpunkt og Destination. Bemærk disse må ikke være ens')
                else
                    navigation.replace('Countdown', {startpunktVal: startpunkt, destinationVal: destination})}
            }
          />
        </View>

        <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Scan</Text>
                        <Button
                                title="Scan"
                                onPress={ () =>
                                LockerManager.startScan() ||
                                console.log("Scan")
                                }
                              />
                <Text style={styles.sectionTitle}>Stop Scan</Text>
                        <Button
                                title="Stop Scan"
                                onPress={ () =>
                                LockerManager.stopScan() ||
                                console.log("Stop Scan")
                                }
                              />
                <Text style={styles.sectionTitle}>Authenticate</Text>
                        <Button
                                title="Authenticate"
                                onPress={ () =>
                                LockerManager.authenticate(uid, token2, "2") ||
                                console.log("Authenticate")
                                }
                              />
                <Text style={styles.sectionTitle}>Test connection</Text>
                <Button
                        title="Connect"
                        onPress={ () =>
                        LockerManager.connect("00000000-4281-4e45-0039-50130000003c") ||
                        console.log("Connect") ||
                        /*console.log(LockerManager.STATUS_DEVICE_CONNECTED) ||
                        console.log(LockerManager.STATUS_DEVICE_TIME_OUT) ||
                        console.log(LockerManager.STATUS_DEVICE_NOT_FOUND) ||
                        console.log(LockerManager.STATUS_COMPARTMENT_CLOSE) ||
                        console.log(LockerManager.STATUS_COMPARTMENT_OPEN) ||
                        console.log(LockerManager.ERROR_CODE_EXPIRE_TOKEN) ||
                        console.log(LockerManager.STATUS_DEVICE_OUT_OF_RANGE) ||
                        console.log(LockerManager.ERROR_CODE_DATA_NOT_RETRIEVED)*/

                        console.log(LockerManager.getConstants())

                        }

                      />
                <Text style={styles.sectionTitle}>Test disconnection</Text>
                <Button
                        title="Disconnect"
                        onPress={ () =>
                        LockerManager.disconnect("00000000-4281-4e45-0039-50130000003c") ||
                        console.log("Disconnect pressed")
                        //console.log(LockerManager.getConstants())
                        }

                      />
                <Text style={styles.sectionTitle}>Open</Text>
                <Button
                        title="Open"
                        onPress={ () =>
                        LockerManager.openCompartment(uid, token2) ||
                        console.log("Open pressed")
                        //console.log(LockerManager.getConstants())
                        }

                      />
                <Text style={styles.sectionTitle}>Get data</Text>
                <Button
                        title="Get data"
                        onPress={ () =>
                        LockerManager.getData(uid) ||
                        console.log("GetData pressed")
                        //console.log(LockerManager.getConstants())
                        }

                      />
              </View>
    </ScrollView>




/*

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>

      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />

        <View style={styles.sectionContainer}>


        <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    style={pickerSelectStyles}

                    items={[
                        { label: 'Nørreport', value: 'nørreport' },
                        { label: 'Københavns Hovedbanegård', value: 'hovedbanegården' },
                        { label: 'Lyngby', value: 'lyngby' },
                    ]}
                    placeholder={ {label: 'Vælg station', value: null, color: '#9EA0A4' }}
                />
        </View>
    </View>*/
  );
}

const styles = StyleSheet.create({
sectionContainer: {
      marginTop: 32,
  },
  scrollView: {
      backgroundColor: Colors.white,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
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
        paddingVertical: 20
    }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }

});


export default HomeScreen;