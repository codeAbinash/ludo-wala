import {Medium} from '@/fonts'
import {Radial} from '@components/Gradient'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import type {NavProp} from '@utils/types'
import React from 'react'
import {View} from 'react-native'

export default function Blank({navigation}: NavProp) {
  return (
    <View className='flex-1'>
      <PaddingTop />
      <Radial>
        <Medium className='text-white'>Blank</Medium>
      </Radial>
      <PaddingBottom />
    </View>
  )
}
