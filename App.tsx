/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StatusBar, View} from 'react-native'
import {Medium} from './src/fonts'
import LottieView from 'lottie-react-native'
import {Home01Icon} from './src/assets/icons/icons'
import React from 'react'

function App(): React.JSX.Element {
  return (
    <View className='flex-1 bg-black'>
      <StatusBar barStyle='light-content' backgroundColor={'transparent'} />
      <Medium className='mt-10 text-4xl text-white'>Hello</Medium>
      <LottieView source={require('./src/assets/animations/earth.lottie')} autoPlay loop style={{width: 200, height: 200}} />
      <Home01Icon className='h-10 w-10 text-white' />
    </View>
  )
}

export default App
