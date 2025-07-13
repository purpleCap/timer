/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { store } from './store/redux.js/store';
import CustomToast from './components/CustomToast';
const {height} = Dimensions.get('screen')
function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ToastProvider
        placement="bottom"
        duration={4000}
        animationType="zoom-in"
        animationDuration={250}
        textStyle={{ fontSize: 20 }}
        offset={0} // offset for both top and bottom toasts
        offsetTop={0}
        offsetBottom={height * 0.09}
        swipeEnabled={true}
        renderToast={toastOptions => {
          const { status, heading, describe = '' } = toastOptions.data;
          return (
            <CustomToast
              status={status}
              heading={heading}
              describe={describe}
            />
          );
        }}
      >
        <View style={styles.container}>
          <StatusBar
            barStyle={'dark-content'}
            translucent={true}
            backgroundColor={'transparent'}
          />
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </View>
      </ToastProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
