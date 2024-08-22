/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Images from '@assets/images/images'
import Gradient from '@components/Gradient'
import {PaddingBottom} from '@components/SafePadding'
import {get_user_f, showErr} from '@query/api'
import {NavigationContainer} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator, type StackNavigationOptions} from '@react-navigation/stack'
import AddCash from '@screens/AddCash'
import EnterName from '@screens/auth/EnterName'
import EnterPhone from '@screens/auth/EnterPhone'
import OTP, {type OTPParamList} from '@screens/auth/Otp'
import HomeScreen from '@screens/HomeScreen'
import Home from '@screens/index'
import PaymentSuccessful from '@screens/PaymentSuccessful'
import Refer from '@screens/Refer'
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import {secureLs} from '@utils/storage'
import {DarkTheme, DefaultTheme} from '@utils/themes'
import type {NavProp} from '@utils/types'
import LottieView from 'lottie-react-native'
import React, {useEffect} from 'react'
import {Dimensions, Image, StatusBar, useColorScheme, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

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
      <GestureHandlerRootView style={{flex: 1}} className='bg-g1'>
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

function NavigationDetector({navigation}: NavProp) {
  const {isPending, data} = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      if (secureLs.getString('token')) return get_user_f()
      else {
        navigation.replace('EnterPhone')
      }
    },
  })

  useEffect(() => {
    if (data) navigation.replace('Home')
  }, [data, navigation])

  useEffect(() => {}, [navigation])

  // useEffect(() => {
  //   if (secureLs.getString('token')) navigation.replace('Home')
  //   else navigation.replace('EnterPhone')
  // }, [navigation])

  return (
    <Gradient className='flex-1 items-center justify-center'>
      <Image source={Images.logo} className='mt-52 h-44 w-44' />
      <View className='mt-40'>
        <LottieView source={require('@assets/animations/dice-loading.json')} style={{width: 50, height: 50}} autoPlay loop />
        <PaddingBottom />
      </View>
    </Gradient>
  )
}

export type RootStackParamList = {
  Home: undefined
  EnterPhone: undefined
  EnterName: undefined
  OTP: OTPParamList
  AddCash: undefined
  Nav: undefined
  Refer: undefined
  HomeScreen: undefined
  PaymentSuccessful: undefined
}
function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,gestureDirection: 'horizontal', gestureResponseDistance: width,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name='Nav' component={NavigationDetector} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='EnterPhone' component={EnterPhone} />
      <Stack.Screen name='EnterName' component={EnterName} />
      <Stack.Screen name='OTP' component={OTP} />
      <Stack.Screen name='AddCash' component={AddCash} />
      <Stack.Screen name='Refer' component={Refer} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='PaymentSuccessful' component={PaymentSuccessful} />
    </Stack.Navigator>
  )
}

export default App
