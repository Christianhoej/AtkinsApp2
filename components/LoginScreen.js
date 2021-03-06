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
  ActivityIndicator
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
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Loginscreen ({navigation}) {
const [loginEmail, onChangeLoginEmail] = React.useState('');
const [loginCode, onChangeLoginCode] = React.useState('');
const [signupEmail, onChangeSignupEmail] = React.useState('');
const [signupCode, onChangeSignupCode] = React.useState('');

    return (

       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
          <View style={styles.sectionContainer}>
                     <Text style={styles.sectionTitle}>Log ind</Text>
                     <TextInput
                           style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                           onChangeLoginEmail={text => onChangeLoginEmail(text)}
                           loginEmail={loginEmail}
                           placeholder='Email'
                           textAlign='center'
                         />
                     <TextInput
                       style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                       onChangeLoginCode={text => onChangeLoginCode(text)}
                       loginCode={loginCode}
                       placeholder='Kode'
                       textAlign='center'
                     />
                         <View style = {styles.button}>
                           <Button
                               title="Log ind"
                                 onPress={() => {navigation.replace('Home')}}
                             />
                           </View>
                   </View>
                   <View style={styles.sectionContainer}>
                      <Text style={styles.sectionTitle}>Opret bruger</Text>
                      <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeSignupEmail={text => onChangeSignupEmail(text)}
                            signupEmail={signupEmail}
                            placeholder='Email'
                            textAlign='center'
                          />
                      <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeSignupCode={text => onChangeSignupCode(text)}
                        signupCode={signupCode}
                        placeholder='Kode'
                        textAlign='center'
                      />
                    <View style = {styles.button}>
                            <Button
                                title="Opret"
                                  onPress={() => console.log("Opret")}
                              />
                    </View>
                    </View>


        </ScrollView>
    )
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
      textAlign: 'center'
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
      textAlign: 'center'
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
        marginTop: 30,
        fontSize: 40,
        fontWeight: "400"
    },
});

export default Loginscreen;