import {Bold, Medium} from '@/fonts'
import Images from '@assets/images/images'
import {FullGradientButton} from '@components/Button'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Wrap from '@components/Screen'
import type {RouteProp} from '@react-navigation/native'
import type {StackNav} from '@utils/types'
import React from 'react'
import {Image, View} from 'react-native'

type ParamList = {
  Maintenance: MaintenanceParamList
}

export type MaintenanceParamList = {
  message: string
}

export default function Maintenance({navigation, route}: {navigation: StackNav; route: RouteProp<ParamList, 'Maintenance'>}) {
  return (
    <Wrap>
      <View className='flex-1 items-center justify-center p-5'>
        <PaddingTop />
        <Image
          source={Images.robot_setting}
          style={{
            width: '80%',
            height: 300,
          }}
        />
        <Bold className='text-2xl text-white'>APP UNDER MAINTENANCE</Bold>
        <Medium className='mt-2 text-center text-base text-white/50'>{route.params.message || 'Something is wrong. Try again after sometime'}</Medium>
        <View className='mt-10 w-full'>
          <FullGradientButton
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Splash'}],
              })
            }}
            title='Try Again'
          />
        </View>
        <PaddingBottom />
      </View>
    </Wrap>
  )
}
