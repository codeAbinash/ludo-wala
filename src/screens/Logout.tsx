import {Medium} from '@/fonts'
import Animations from '@assets/animations/animations'
import {Radial} from '@components/Gradient'
import {ls, secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import {oneSignalInit} from '@utils/utils'
import LottieView from 'lottie-react-native'
import React, {useEffect} from 'react'
import {OneSignal} from 'react-native-onesignal'

export default function Logout({navigation}: NavProp) {
  useEffect(() => {
    secureLs.clearAll()
    ls.clearAll()
    // Reset zustand store
    setTimeout(() => {
      try {
        oneSignalInit()
        OneSignal.logout()
        console.log('Logged out')
      } catch (e) {
        console.log(e)
      } finally {
        navigation.reset({index: 0, routes: [{name: 'Splash'}]})
      }
    })
  }, [navigation])

  return (
    <Radial className='flex-1 items-center justify-center'>
      <LottieView
        hardwareAccelerationAndroid
        cacheComposition
        source={Animations.diceLoading}
        style={{width: 50, height: 50}}
        autoPlay
        loop
      />
      <Medium className='mt-5 text-lg text-white'>Logging out...</Medium>
    </Radial>
  )
}
