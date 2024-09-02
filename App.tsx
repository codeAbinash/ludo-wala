/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Medium, SemiBold} from '@/fonts'
import Animations from '@assets/animations/animations'
import Wrap from '@components/Screen'
import {useNetInfo} from '@react-native-community/netinfo'
import {NavigationContainer} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator, type StackNavigationOptions} from '@react-navigation/stack'
import AddCash from '@screens/Tournament/AddCash'
import EnterName from '@screens/Auth/EnterName'
import EnterPhone from '@screens/Auth/EnterPhone'
import OTP, {type OTPParamList} from '@screens/Auth/Otp'
import EditProfile from '@screens/Profile/EditProfile'
import Game from '@screens/Game/Game'
import Home from '@screens/Home'
import Wallet from '@screens/Home/Wallet'
import HomeScreen from '@screens/Home/HomeScreen'
import JoinedTournament from '@screens/Tournament/JoinedTournament'
import Maintenance, {type MaintenanceParamList} from '@screens/Extra/Maintenance'
import PaymentSuccessful, {type PaymentSuccessfulParamList} from '@screens/Extra/PaymentSuccessful'
import Leaderboard from '@screens/Refer/Leaderboard'
import MyReferrals from '@screens/Refer/MyReferrals'
import Refer from '@screens/Refer/Refer'
import Splash from '@screens/Extra/Splash'
import Tournament from '@screens/Tournament/Tournament'
import TournamentDetails, {type TournamentDetailsParamList} from '@screens/Tournament/TournamentDetails'
import UpdateAvailable from '@screens/Extra/UpdateAvailable'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {W} from '@utils/dimensions'
import {DarkTheme, DefaultTheme} from '@utils/themes'
import LottieView from 'lottie-react-native'
import React from 'react'
import {Dimensions, StatusBar, useColorScheme, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Blank from '@screens/Extra/Blank'

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
  const netInfo = useNetInfo()
  const scheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}} className='bg-primary'>
        {/* <SafeAreaView style={{flex: 1, height: height, backgroundColor: 'red'}}> */}
        <StatusBar barStyle='light-content' backgroundColor={'transparent'} />
        {netInfo.isConnected === false ? (
          <NoInternet />
        ) : (
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Navigation />
          </NavigationContainer>
        )}
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

const size = W * 0.8

function NoInternet() {
  return (
    <Wrap>
      <View className='flex-1 items-center justify-center px-5'>
        <LottieView source={Animations.noInternet} autoPlay loop style={{width: size, height: size, backgroundColor: 'transparent'}} />
        <SemiBold className='mt-4 text-center text-3xl text-white/90'>No Internet</SemiBold>
        <Medium className='mt-4 text-center text-base text-white/70'>
          Please check your internet connection! Check if you are connected to a Wi-Fi network or mobile data.
        </Medium>
      </View>
    </Wrap>
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
  Leaderboard: undefined
  MyReferrals: undefined
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
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='EnterName' component={EnterName} />
      <Stack.Screen name='AddCash' component={AddCash} />
      <Stack.Screen name='Blank' component={Blank} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='EnterPhone' component={EnterPhone} />
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
      <Stack.Screen name='Leaderboard' component={Leaderboard} />
      <Stack.Screen name='MyReferrals' component={MyReferrals} />
    </Stack.Navigator>
  )
}

export default App
