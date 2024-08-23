import {ArrowLeft01Icon} from '@assets/icons/icons'
import {StackNav} from '@utils/types'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {PaddingTop} from './SafePadding'
import {Medium} from '@/fonts'

export default function BackHeader({
  navigation,
  title,
  RightComponent,
}: {
  navigation: StackNav
  title: React.ReactNode
  RightComponent?: React.ReactNode
}) {
  return (
    <>
      <PaddingTop />
      <View className='flex-row items-center justify-between p-2 px-3 pr-4 pt-0'>
        <View className='flex-row items-center gap-3'>
          <TouchableOpacity className='p-2.5' onPress={() => navigation.goBack()}>
            <ArrowLeft01Icon height={25} width={25} className='text-white' />
          </TouchableOpacity>
          <Medium className='font-medium text-white' style={{fontSize: 20}}>
            {title}
          </Medium>
        </View>
        {RightComponent ? RightComponent : null}
      </View>
    </>
  )
}

export function RightSettingIcon({navigation}: {navigation: StackNav}) {
  return (
    <TouchableOpacity className='p-2' onPress={() => navigation.navigate('Home')}>
      <ArrowLeft01Icon height={20} width={20} className='text-white' />
    </TouchableOpacity>
  )
}
