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

function ClosingScreen ({navigation, route}) {
const { closingVar1 } = route.params;
const { destination } = route.params;



    return (

       <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               style={styles.scrollView}>
                 <View style={styles.sectionContainer}>
                   <Text style={styles.sectionTitle}>Luk lågen efter dig</Text>

                 </View>
                   <View style={styles.sectionContainer}>
                   <ActivityIndicator size="large" color="#0000ff" />

                 </View>
                 <View style = {styles.button}>
                         <Button
                             title="Meld lågen lukket"
                               onPress={() => {
                                if (closingVar1=="fromCountdown")
                                    navigation.replace("Deliver", {destinationVal: destination})
                                else
                                    navigation.replace("Finish")
                                }

                               }


                           />
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
        marginTop: 100,
        fontSize: 40,
        fontWeight: "400"
    },

});

export default ClosingScreen;