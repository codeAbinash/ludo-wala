import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {Bold, Medium, SemiBold} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {PaddingTop} from '@components/SafePadding'
import {GradientButton, OutlineButton} from '@components/Button'
import {ArrowDown02Icon} from '@assets/icons/icons'
import Gradient from '@components/Gradient'
import Colors from '@utils/colors'
import type {NavProp} from '@utils/types'

function getTotal(s1: string, s2: string, s3: string) {
  return (parseFloat(s1) + parseFloat(s2) + parseFloat(s3)).toFixed(2)
}

export default function Wallet({navigation}: NavProp) {
  const user = userStore((state) => state.user)
  return (
    <View className='flex-1 bg-primary px-5'>
      <PaddingTop />
      <View className='mt-5'>
        <Medium className='text-lg text-white'>Total Balance</Medium>
        <Bold className='mt-3 text-5xl text-white'>
          ₹ {getTotal(user?.data?.deposit_wallet || '0', user?.data?.winning_wallet || '0', user?.data?.bonus_wallet || '0')}
        </Bold>
      </View>
      <View className='mt-5'>
        <View className='flex-row items-end justify-between py-6'>
          <View>
            <Medium className='text-lg text-white opacity-60'>Deposit</Medium>
            <SemiBold className='mt-1 text-3xl text-white'>₹ {user?.data?.deposit_wallet}</SemiBold>
          </View>
          <View>
            <GradientButton
              title='+ Add Cash'
              className='rounded-full px-5'
              onPress={() => {
                navigation.navigate('AddCash')
              }}
            />
          </View>
        </View>
        <Hr />
        <View className='flex-row items-end justify-between py-6'>
          <View>
            <Medium className='text-lg text-white opacity-60'>Winnings</Medium>
            <SemiBold className='mt-1 text-3xl text-white'>₹ {user?.data?.winning_wallet}</SemiBold>
          </View>
          <View>
            <TouchableOpacity className='flex-row rounded-full border border-b1 px-5 py-2.5'>
              <ArrowDown02Icon className='text-b1' height={18} width={18} />
              <SemiBold className='pl-1 text-b1'>Withdraw</SemiBold>
            </TouchableOpacity>
          </View>
        </View>
        <Hr />
        <View className='flex-row items-end justify-between py-6'>
          <View>
            <Medium className='text-lg text-white opacity-60'>Bonus Reward</Medium>
            <SemiBold className='mt-1 text-3xl text-white'>₹ {user?.data?.bonus_wallet}</SemiBold>
          </View>
        </View>
        <Hr />
      </View>
    </View>
  )
}

function Hr() {
  return <View className='h-px w-full bg-border' />
}
