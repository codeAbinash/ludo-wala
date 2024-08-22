import {Medium} from '@/fonts'
import Images from '@assets/images/images'
import {GradientButton} from '@components/Button'
import Gradient from '@components/Gradient'
import Input from '@components/Input'
import {PaddingTop} from '@components/SafePadding'
import Colors from '@utils/colors'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Image, View} from 'react-native'

export default function EnterPhone({navigation}: NavProp) {
  return (
    <View className='flex-1 items-center justify-center bg-primary px-5'>
      <PaddingTop />
      <Gradient
        className='w-full items-center justify-center rounded-2xl border border-border px-5 py-10 pt-7'
        style={{gap: 30}}
        colors={[Colors.g1, Colors.g2]}>
        <Image source={Images.logo} className='h-24 w-24' />
        <Input placeholder='Enter Phone Number' keyboardType='phone-pad' />
        <View>
          <GradientButton title='Login' color='primary' onPress={() => navigation.navigate('EnterName')} />
        </View>
      </Gradient>
      <Medium className='mt-5 text-white opacity-50'>Terms and Condition Applied</Medium>
    </View>
  )
}
