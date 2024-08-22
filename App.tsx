/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {showErr} from '@query/api'
import {NavigationContainer} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator, type StackNavigationOptions} from '@react-navigation/stack'
import EnterName from '@screens/auth/EnterName'
import EnterPhone from '@screens/auth/EnterPhone'
import OTP, {type OTPParamList} from '@screens/auth/Otp'
import Home from '@screens/Home'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {DarkTheme, DefaultTheme} from '@utils/themes'
import React from 'react'
import {Dimensions, StatusBar, useColorScheme} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export type RootStackParamList = {
  Home: undefined
  EnterPhone: undefined
  EnterName: undefined
  OTP: OTPParamList
}
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1,
      onError: showErr,
    },
    queries: {
      retry: 1,
    },
  },
})

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
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <SafeAreaView style={{flex: 1, height: height, backgroundColor: 'red'}}> */}
        <StatusBar barStyle='light-content' backgroundColor={'transparent'} />
        <NavigationContainer theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
          <Navigation />
        </NavigationContainer>
        {/* </SafeAreaView> */}
      </GestureHandlerRootView>
    </QueryClientProvider>
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
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default App
