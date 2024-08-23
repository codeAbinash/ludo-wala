import {Medium} from '@/fonts'
import {secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'

export default function Profile({navigation}: NavProp) {
  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <TouchableOpacity
        onPress={() => {
          secureLs.clearAll()
          navigation.reset({index: 0, routes: [{name: 'EnterPhone'}]})
        }}
        className='mt-10'>
        <Medium className='text-xl text-white'>Log Out</Medium>
      </TouchableOpacity>
    </View>
  )
}
