/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Blank from '@/Blank'
import {NavigationContainer} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator, type StackNavigationOptions} from '@react-navigation/stack'
import AddCash from '@screens/AddCash'
import EnterName from '@screens/auth/EnterName'
import EnterPhone from '@screens/auth/EnterPhone'
import OTP, {type OTPParamList} from '@screens/auth/Otp'
import EditProfile from '@screens/EditProfile'
import Game from '@screens/Game/Game'
import Home from '@screens/Home'
import Refer from '@screens/Home/Refer'
import Wallet from '@screens/Home/Wallet'
import HomeScreen from '@screens/HomeScreen'
import JoinedTournament from '@screens/JoinedTournament'
import Maintenance, {type MaintenanceParamList} from '@screens/Maintenance'
import PaymentSuccessful, {type PaymentSuccessfulParamList} from '@screens/PaymentSuccessful'
import Splash from '@screens/Splash'
import Tournament from '@screens/Tournament/Tournament'
import TournamentDetails, {type TournamentDetailsParamList} from '@screens/Tournament/TournamentDetails'
import UpdateAvailable from '@screens/UpdateAvailable'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {DarkTheme, DefaultTheme} from '@utils/themes'
import React from 'react'
import {Dimensions, StatusBar, useColorScheme} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1,
      // onError: showErr,
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
      <GestureHandlerRootView style={{flex: 1}} className='bg-primary'>
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

export type RootStackParamList = {
  Home: undefined
  EnterPhone: undefined
  EnterName: undefined
  OTP: OTPParamList
  AddCash: undefined
  Splash: undefined
  Refer: undefined
  HomeScreen: undefined
  Wallet: undefined
  PaymentSuccessful: PaymentSuccessfulParamList
  EditProfile: undefined
  Profile: undefined
  Tournament: undefined
  Maintenance: MaintenanceParamList
  Update: undefined
  TournamentDetails: TournamentDetailsParamList
  JoinedTournament: undefined
  Blank: undefined
  Game: undefined
}
function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,gestureDirection: 'horizontal', gestureResponseDistance: width,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name='Game' component={Game} />
      <Stack.Screen name='AddCash' component={AddCash} />
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='Blank' component={Blank} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='EnterPhone' component={EnterPhone} />
      <Stack.Screen name='EnterName' component={EnterName} />
      <Stack.Screen name='OTP' component={OTP} />
      <Stack.Screen name='Refer' component={Refer} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='Wallet' component={Wallet} />
      <Stack.Screen name='PaymentSuccessful' component={PaymentSuccessful} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Profile' component={EditProfile} />
      <Stack.Screen name='Tournament' component={Tournament} />
      <Stack.Screen name='TournamentDetails' component={TournamentDetails} />
      <Stack.Screen name='Maintenance' component={Maintenance} options={NO_ANIMATION} />
      <Stack.Screen name='Update' component={UpdateAvailable} />
      <Stack.Screen name='JoinedTournament' component={JoinedTournament} />
    </Stack.Navigator>
  )
}

export default App
