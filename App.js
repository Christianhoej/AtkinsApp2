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


import HomeScreen from './components/HomeScreen'
import LockerManager from './LockerManager'
import CountdownScreen from './components/CountdownScreen';
import DeliverScreen from './components/DeliverScreen';
import ClosingScreen from './components/ClosingScreen';
import FinishScreen from './components/FinishScreen';



function TestScreen({ navigation }) {
  return (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Test Screen</Text>
      <Button
        title="Go to Home"
        sty
        onPress={() => navigation.navigate('Home')}
      />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Test connection</Text>
        <Button
                title="Test Connection"
                //onPress={ () => console.log("Test connection")}

                onPress={ () => LockerManager.connect("00000000-4281-4e45-0039-50130000003c") ||
                LockerManager.startScan() ||
                console.log("Test connection")}
              />
      </View>
    </View>
    </ScrollView>

  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
              title="Go back to first screen in stack"
              onPress={() => navigation.popToTop()}
            />
    </View>
  );
}

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          //{props => <HomeScreen {...props} extraData={someData} />}
          options={{ title: 'Start' }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detaljer' }}/>
        <Stack.Screen name="Countdown" component={CountdownScreen} options={{ title: 'Hent pakke' }}/>
        <Stack.Screen name="Deliver" component={DeliverScreen} options={{ title: 'Aflever pakke'}}/>
        <Stack.Screen name="Closing" component={ClosingScreen} options={{ title: 'Luk lågen'}}/>
        <Stack.Screen name="Finish" component={FinishScreen} options={{ title: 'Færdig', headerLeft: null}}/>
      </Stack.Navigator>
    </NavigationContainer>




  );
}
/*
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
*/
const styles = StyleSheet.create({
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
});



export default App;
