import {Medium} from '@/fonts'
import Animations from '@assets/animations/animations'
import {GradientButton} from '@components/Button'
import Gradient from '@components/Gradient'
import {W} from '@utils/dimensions'
import type {StackNav} from '@utils/types'
import LottieView from 'lottie-react-native'
import React from 'react'
import {View} from 'react-native'

export default function WithdrawRequest({navigation}: {navigation: StackNav}) {
  return (
    <View className='flex-1 items-center justify-center bg-primary p-5'>
      <Medium className='text-lg text-white'>Request for Withdrawal</Medium>
      <LottieView
        hardwareAccelerationAndroid
        cacheComposition
        source={Animations.payment}
        loop={false}
        autoPlay
        style={{width: W * 1.5, height: W * 1}}
      />
      <Gradient
        className='w-full rounded-2xl border border-border p-5'
        style={{
          gap: 5,
        }}>
        <Medium className='text-center text-base text-white'>
          Your Request For Withdrawal Has Been Submitted. Transaction Will Be Process Within 24 Hours.
        </Medium>
      </Gradient>
      <GradientButton title='Go Back' onPress={() => navigation.pop(3)} className='mt-10 rounded-full px-10 py-3' />
    </View>
  )
}
