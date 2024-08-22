/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator, type StackNavigationOptions} from '@react-navigation/stack'
import EnterName from '@screens/auth/EnterName'
import EnterPhone from '@screens/auth/EnterPhone'
import OTP from '@screens/auth/Otp'
import {DarkTheme, DefaultTheme} from '@utils/themes'
import React from 'react'
import {Dimensions, StatusBar, useColorScheme} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export type RootStackParamList = {
  Home: undefined
  EnterPhone: undefined
  EnterName: undefined
  OTP: undefined
}

const {height} = Dimensions.get('window')

const Stack = createStackNavigator<RootStackParamList>()

const IOS_BOTTOM_STYLE: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  gestureResponseDistance: height,
}

const NO_ANIMATION: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <SafeAreaView style={{flex: 1, height: height, backgroundColor: 'red'}}> */}
      <StatusBar barStyle='light-content' backgroundColor={'transparent'} />
      <NavigationContainer theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
        <Navigation />
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </GestureHandlerRootView>
  )
}

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,gestureDirection: 'horizontal', gestureResponseDistance: width,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name='EnterPhone' component={EnterPhone} />
      <Stack.Screen name='EnterName' component={EnterName} />
      <Stack.Screen name='OTP' component={OTP} />
    </Stack.Navigator>
  )
}

export default App
