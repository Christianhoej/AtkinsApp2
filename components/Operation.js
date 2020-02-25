import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    NativeEventEmitter,
    NativeModules,
    BackHandler,
    ToastAndroid
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import LockerManager from '../LockerManager';

let UUID = '00000000-4462-4E45-0028-901000000042';
let isAuthenticated = false;

let errorListener;
let tokenAvailableListener;
let statusAvailableListener;
let connectionStatusChangedListener;
let compartmentStatusChangedListener;
let authenticationStatusChangedListener;

let apiErrorListener;
let apiDataAvailable;

export default class Operation extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Operation Screen',
            headerLeft: (
                <HeaderBackButton
                    onPress={ ()=>{
                            console.log('HeaderBackButton');
                            ToastAndroid.show("Disconnected", ToastAndroid.LONG);
                            LockerManager.disconnect(UUID);
                            LockerManager.startScan();
                            navigation.goBack();
                        }}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.handleOnBackPress = this.handleOnBackPress.bind(this);
        this.onAuthenticatePress = this.onAuthenticatePress.bind(this);
        this.onCompartmentOpenPress = this.onCompartmentOpenPress.bind(this);

        this.state = {
            loadingData: false,
            token: '',
            authenticationToken: '',
            authenticationResponse: ''
        }

        //UUID = this.props.navigation.getParam('uid', '');
        UUID = '00000000-4462-4E45-0028-901000000042';
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');

        apiErrorListener.remove();
        apiDataAvailable.remove();

        errorListener.remove();
        tokenAvailableListener.remove();
        statusAvailableListener.remove();
        connectionStatusChangedListener.remove();
        compartmentStatusChangedListener.remove();
        authenticationStatusChangedListener.remove();
        BackHandler.removeEventListener("hardwareBackPress", this.handleOnBackPress);
    }

    componentDidMount() {
        console.log('componentDidMount');

        BackHandler.addEventListener("hardwareBackPress", this.handleOnBackPress);

        const eventEmitter = new NativeEventEmitter(NativeModules.LockerManager);
        connectionStatusChangedListener = eventEmitter.addListener('onConnectionStatusChanged', (event) => {
            console.log('uid: ' + event.uid + ', status: ' + event.status);
            if (event.status === LockerManager.STATUS_DEVICE_TIME_OUT) {
                console.log('Device timeout');
                ToastAndroid.show("Deice timeout", ToastAndroid.LONG);
                LockerManager.startScan();
                this.props.navigation.goBack();
            } else if (event.status === LockerManager.STATUS_DEVICE_OUT_OF_RANGE) {
                console.log('Device out of range');
                ToastAndroid.show("Device out of range", ToastAndroid.LONG);
                LockerManager.startScan();
                this.props.navigation.goBack();
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

    handleOnBackPress() {
        console.log('handleOnBackPress');
        ToastAndroid.show("Disconnected", ToastAndroid.LONG);
        LockerManager.disconnect(UUID);
        LockerManager.startScan();
        this.props.navigation.goBack();
        return true;
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
            //"AEAAIABAb9wgs/va55/7hp62W29wLVPDbP8BVDPenJroDAKrpZNikKpDMBdQZaex1aAgtFuChyV28bMfg9aGuHr8fxVATHt4x79r8CAiAvJFqPPGnGSMZZTRLnK/3ihcpRt2WbZLqM1YQ0FHHCnsD1jjo4LqIfmGQx32Xsiob9xGrQkJ7Zaa8z/RhDYDo6xROaHuPAzYwJx85MJndMP4Qi4nEGRZkg==",
            this.state.authenticationToken,
            //"TIMkaRx+8n4="
            this.state.authenticationResponse
        );
    }

    onCompartmentOpenPress() {
        LockerManager.openCompartment(
            UUID,
            //"AEAAIABAUdWMvVRzjJGdBoBGeKJu3K3OJn/nG6HzCwIdkuUi3dDg4oW9nl0z+5VpzA2t8KX7pIOnax4htZPda2ZUIbhTGlFPIKj0rAAaO99S9wE7WsobP298WG9MLYYxbFhk0cUbpTGsa2QWWwjgZWmyTuG8460Cc/fICCkN7gE24x5623fwQYX/y9L14oCvxlOK/DxwE5YGkm8ZHGWexf3uGpeYEg=="

            this.state.token
        );
    }

    onDisconnect() {
        LockerManager.startScan();
        LockerManager.disconnect(UUID);
        this.props.navigation.goBack();
    }


    render() {
        return (
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
                    //value={this.state.authenticationToken}
                    value="AEAAIABAb9wgs/va55/7hp62W29wLVPDbP8BVDPenJroDAKrpZNikKpDMBdQZaex1aAgtFuChyV28bMfg9aGuHr8fxVATHt4x79r8CAiAvJFqPPGnGSMZZTRLnK/3ihcpRt2WbZLqM1YQ0FHHCnsD1jjo4LqIfmGQx32Xsiob9xGrQkJ7Zaa8z/RhDYDo6xROaHuPAzYwJx85MJndMP4Qi4nEGRZkg=="
                    //value="eyJraWQiOiJidm8yMDJGRjJTMTZSdmVveXRQWFFycGVLaWlCOFVtWjlGZVBqXC9LV05IRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NDVjODQ5Ny1jNjNhLTQwYTctYTE2NS0wMzFkYzg2OGZiZmQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfVVdFanYxQ3dHIiwiY29nbml0bzp1c2VybmFtZSI6Ik1BWnRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJNQVp0ZXN0IiwiYXVkIjoiMW83bGI2bXVocHJtMGNsaGE5bHF1aHE1MmciLCJldmVudF9pZCI6ImQyNDg5MWI2LTM5NzctNDYwNy1iZWRlLWJkOWVkNmUxMDE1MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTYzNDMyNTQ1LCJuYW1lIjoidGVzdDEyIiwiZXhwIjoxNTYzNDM2MTQ1LCJpYXQiOjE1NjM0MzI1NDUsImZhbWlseV9uYW1lIjoibWFpbnRlbmFuY2VfcHJvdmlkZXJfMzMiLCJlbWFpbCI6InpvaGFpYmFicmFyNzNAZ21haWwuY29tIn0.ZYpjO033rkSnthNnCOaKur_NuUkmOnKXKPl7Naaef0XA79Aqr7DQasb9JtcxFqU_cQWkUfBaAqX4eGkfuZ0SmzBmOkG4-KYYRBOzB4XeE0LJqW9XQabwI2r1hXRbx5ng_5x3oLVFZcsGcHAwFDC3mMxEJ-RxKq-QxN0tVtAvY83G4MBibyBU75u28ZCbd0C5Obia7v_PtvDmS-5JvIvP9jtG-ed4p9oui2EAjrD30f6vM2FHf7VAoi-Afd8YR0iTTEx1GH0FFm9guPNmZDvSC0ZHFb6DUlM27_9B9YxCOv-GlIz5sausxJ2mwvrj93RHILL2RcAJVGb8MTrOxmtJSg=="

                />
                <TextInput
                    style={{textAlign: 'center'}}
                    id="textInputAuthenticationResponse"
                    placeholder="Enter authentication reponse"
                    underlineColorAndroid="black"
                    onChangeText={(text) => this.setState({authenticationResponse: text})}
                    multiline={true}
                    //value={this.state.authenticationResponse}
                    value="TIMkaRx+8n4="
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
                    //value={this.state.token}
                    value="AEAAIABAUdWMvVRzjJGdBoBGeKJu3K3OJn/nG6HzCwIdkuUi3dDg4oW9nl0z+5VpzA2t8KX7pIOnax4htZPda2ZUIbhTGlFPIKj0rAAaO99S9wE7WsobP298WG9MLYYxbFhk0cUbpTGsa2QWWwjgZWmyTuG8460Cc/fICCkN7gE24x5623fwQYX/y9L14oCvxlOK/DxwE5YGkm8ZHGWexf3uGpeYEg=="
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
        )
    }
}

const styles = StyleSheet.create({
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
})