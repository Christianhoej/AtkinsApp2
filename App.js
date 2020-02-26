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
  BackHandler,
  Dimensions, Animated, TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './components/HomeScreen'
import LockerManager from './LockerManager'
import CountdownScreen from './components/CountdownScreen';
import DeliverScreen from './components/DeliverScreen';
import ClosingScreen from './components/ClosingScreen';
import FinishScreen from './components/FinishScreen';
import LoginScreen from './components/LoginScreen';
import PickupScreen from './components/PickUpScreen';
import Operation from './components/Operation';
import testcomponent from './components/testcomponent';
import Index from './components/index';



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
/*
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
*/


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
/*
const count = 0;

BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  if (count == 0) {
    this.goBack();
    return true;
  }
  else if (count == 1)
  return false;
});
*/

var backPressedOnce = false;

BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  if (backPressedOnce==true) {

//    BackHandler.exitApp()
    return false;
  }
  else {

    backPressedOnce = true
    ToastAndroid.show('Tryk tilbage igen for at lukke appen', ToastAndroid.SHORT);

    setTimeout(function(){
                  backPressedOnce=false}, 2000);
    return true
    }



});






//function App() {
export default class App extends Component {

render() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pickup">
        <Stack.Screen name="Test" component={testcomponent} />
        <Stack.Screen name="Operation" component={Operation} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
              //{props => <HomeScreen {...props} extraData={someData} />}
          options={{ title: 'Book pakke'}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detaljer'}}/>
        <Stack.Screen name="Countdown" component={CountdownScreen} options={{ title: 'Afhent pakke' }}/>
        <Stack.Screen name="Deliver" component={DeliverScreen} options={{ title: 'Aflever pakke'}}/>
        <Stack.Screen name="Closing" component={ClosingScreen} options={{ title: 'Luk lågen', headerLeft: null}}/>
        <Stack.Screen name="Finish" component={FinishScreen} options={{ title: 'Afslut', headerLeft: null}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerLeft: null}}/>
        <Stack.Screen name="Pickup" component={PickupScreen} options={{ title: 'Afhent pakke', headerLeft: null}}/>
      </Stack.Navigator>
    </NavigationContainer>




  );
  }
}

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



//export default App;

/*
const RootStack = createStackNavigator({
    Pickup: PickupScreen
  },
  {
    initialRouteName: 'Pickup',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
*/