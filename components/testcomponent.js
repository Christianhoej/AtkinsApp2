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
const uid2 = "00000000-4462-4E45-0028-901000000042";
const uid5 = "10222";
const uid3 = "00000000-4044-4e45-0039-50130000003c";
const uid4 = "4044"
const token = "eyJraWQiOiJidm8yMDJGRjJTMTZSdmVveXRQWFFycGVLaWlCOFVtWjlGZVBqXC9LV05IRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NDVjODQ5Ny1jNjNhLTQwYTctYTE2NS0wMzFkYzg2OGZiZmQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfVVdFanYxQ3dHIiwiY29nbml0bzp1c2VybmFtZSI6Ik1BWnRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJNQVp0ZXN0IiwiYXVkIjoiMW83bGI2bXVocHJtMGNsaGE5bHF1aHE1MmciLCJldmVudF9pZCI6ImQyNDg5MWI2LTM5NzctNDYwNy1iZWRlLWJkOWVkNmUxMDE1MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTYzNDMyNTQ1LCJuYW1lIjoidGVzdDEyIiwiZXhwIjoxNTYzNDM2MTQ1LCJpYXQiOjE1NjM0MzI1NDUsImZhbWlseV9uYW1lIjoibWFpbnRlbmFuY2VfcHJvdmlkZXJfMzMiLCJlbWFpbCI6InpvaGFpYmFicmFyNzNAZ21haWwuY29tIn0.ZYpjO033rkSnthNnCOaKur_NuUkmOnKXKPl7Naaef0XA79Aqr7DQasb9JtcxFqU_cQWkUfBaAqX4eGkfuZ0SmzBmOkG4-KYYRBOzB4XeE0LJqW9XQabwI2r1hXRbx5ng_5x3oLVFZcsGcHAwFDC3mMxEJ-RxKq-QxN0tVtAvY83G4MBibyBU75u28ZCbd0C5Obia7v_PtvDmS-5JvIvP9jtG-ed4p9oui2EAjrD30f6vM2FHf7VAoi-Afd8YR0iTTEx1GH0FFm9guPNmZDvSC0ZHFb6DUlM27_9B9YxCOv-GlIz5sausxJ2mwvrj93RHILL2RcAJVGb8MTrOxmtJSg"
const token2 = "b39bd726-8643-4748-aeb4-62aeae814746,11e4a689-2108-438d-9bf1-412e057c4673"

function testcomponent({navigation}) {

  return (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

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


export default testcomponent;