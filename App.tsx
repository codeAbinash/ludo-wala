/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Dimensions, StatusBar, useColorScheme, View} from 'react-native'
import {Medium} from './src/fonts'
import LottieView from 'lottie-react-native'
import {Home01Icon} from './src/assets/icons/icons'
import React from 'react'
import {CardStyleInterpolators, createStackNavigator, type StackNavigationOptions} from '@react-navigation/stack'
import {SafeAreaView} from 'react-native-safe-area-context'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native'
import EnterPhone from '@screens/EnterPhone'
import EnterName from '@screens/EnterName'

export type RootStackParamList = {
  Home: undefined
  EnterPhone: undefined
  EnterName: undefined
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
      <NavigationContainer>
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
    </Stack.Navigator>
  )
}

export default App
