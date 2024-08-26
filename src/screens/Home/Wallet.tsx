import { Bold, Medium, SemiBold } from '@/fonts'
import { userStore } from '@/zustand/userStore'
import { ArrowDown02Icon, ArrowRight01Icon } from '@assets/icons/icons'
import { GradientButton } from '@components/Button'
import Gradient, { Radial } from '@components/Gradient'
import { PaddingTop } from '@components/SafePadding'
import type { NavProp } from '@utils/types'
import { getTotal } from '@utils/utils'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

export default function Wallet({navigation}: NavProp) {
  const user = userStore((state) => state.user)
  return (
    <Radial>
      <View className='flex-1 px-5'>
        <PaddingTop />
        <Gradient className='mt-5 rounded-3xl border border-border p-5 pb-0'>
          <View className='mb-3 mt-2'>
            <Medium className='text-center text-lg text-white'>Total Balance</Medium>
            <Bold className='mt-3 text-center text-4xl text-white'>
              ₹ {getTotal(user?.data?.deposit_wallet || '0', user?.data?.winning_wallet || '0', user?.data?.bonus_wallet || '0')}
            </Bold>
          </View>
          <Hr />
          <View className='mt-0'>
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
            {/* <Hr /> */}
          </View>
        </Gradient>
        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={() => navigation.navigate('TransactionHistory')}
        >
          <Gradient className='mt-5 flex-row justify-between rounded-3xl border border-border px-4 py-5'>
            <SemiBold className='text-lg text-white'>Transaction History</SemiBold>
            <ArrowRight01Icon className='text-white' height={30} width={30} />
          </Gradient>
        </TouchableOpacity>
      </View>
    </Radial>
  )
}

function Hr() {
  return <View className='h-px w-full bg-border' />
}
