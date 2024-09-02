import {Bold} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import Images from '@assets/images/images'
import React from 'react'
import {Image, View} from 'react-native'
import {GradientButton} from './Button'
import type {NavProp} from '@utils/types'
import {getTotal} from '@utils/utils'
import {ppUrl} from '@utils/constants'

export default function SmallProfile({navigation}: NavProp) {
  const user = userStore((state) => state.user)
  return (
    <View className='flex-row justify-between pt-2'>
      <View>
        <Image source={Images.logo} className='h-12 w-12' />
      </View>
      <View className='flex-row items-center justify-between' style={{gap: 15}}>
        <GradientButton
          className='rounded-full px-7'
          onPress={() => {
            navigation.navigate('Wallet')
          }}>
          <Bold className='text-base text-black'>
            ₹{' '}
            {getTotal(
              user?.data?.deposit_wallet || '0',
              user?.data?.winning_wallet || '0',
              user?.data?.bonus_wallet || '0',
            )}
          </Bold>
        </GradientButton>
        <Image
          source={{uri: `https://avatar.iran.liara.run/username?username=${user?.data?.fname} ${user?.data?.lname}`}}
          className='h-10 w-10 rounded-full bg-white'
        />
      </View>
    </View>
  )
}
