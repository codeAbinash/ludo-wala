import {Bold, Medium, SemiBold} from '@/fonts'
import Images from '@assets/images/images'
import {FullGradientButton} from '@components/Button'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Screen from '@components/Screen'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Image, Linking, View} from 'react-native'

export default function UpdateAvailable({navigation}: NavProp) {
  return (
    <Screen>
      <View className='flex-1 items-center justify-center p-5'>
        <PaddingTop />
        <Image
          source={Images.update}
          style={{
            width: '80%',
            height: 300,
          }}
        />
        <Bold className='text-2xl uppercase text-white'>Update Available</Bold>
        <Medium className='mt-2 text-base text-white/50'>{'A new version of Figma is ready to installed'}</Medium>
        <View className='mt-10 w-full'>
          <FullGradientButton
            onPress={() => {
              Linking.openURL('https://ludowala.co/download/')
            }}
            title='Update Now'
          />
        </View>
        <PaddingBottom />
      </View>
    </Screen>
  )
}
