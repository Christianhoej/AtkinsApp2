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
  Picker
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
import CountdownScreen from '../components/CountdownScreen';


const stations = [
  {
    label: 'Nørreport',
    value: 'nørreport',
  },
  {
    label: 'Københavns Hovedbanegård',
    value: 'københavns hovedbanegård',
  },
  {
    label: 'Lyngby',
    value: 'lyngby',
  },
];

function HomeScreen({navigation}) {
  return (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Vælg startpunkt</Text>
              < RNPickerSelect
                  onValueChange={(value) => console.log(value)}
                  style={pickerSelectStyles}

                  items={stations}
                  placeholder={ {label: 'Vælg station', value: null, color: '#9EA0A4' }}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Vælg destination</Text>
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

       <View style = {styles.button}>
        <Button
            title="OK"
            onPress={() => navigation.navigate('Countdown')}
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
        paddingHorizontal: 30
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