import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet,View,Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigator from './src/MainNavigator';
import {store, persistor} from './src/store';
import messaging from '@react-native-firebase/messaging';
import FlashMessage from 'react-native-flash-message';
import KeepAwake from 'react-native-keep-awake';
{/* <Text style={styles.text}>{this.formatTime().slice(3,this.formatTime().length-1)}</Text> */}

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const remote = await messaging().registerDeviceForRemoteMessages();
    // console.log(remote, 'await messaging().registerDeviceForRemoteMessages();');
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
         {/* <Text
         style={{
          flex:1,
          height:100,width:100,backgroundColor:"red"
         }}>hamza</Text> */}
          <MainNavigator />
          {/* <FlashMessage
            position="top"
            statusBarHeight="10"
            style={styles.flashMessage}
          /> */}
        </PersistGate>
        <KeepAwake/>
      </Provider>
  );
};

const styles = StyleSheet.create({
  flashMessage: {
    position: 'absolute',
    zIndex: 9999,
    borderRadius: 12,
    top: 30,
    width: '96%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default App;
