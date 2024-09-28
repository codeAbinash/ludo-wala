import {Medium, MediumS, SemiBold} from '@/fonts'
import {SecurityCheckSolidIcon} from '@assets/icons/icons'
import BackHeader from '@components/BackHeader'
import {FullGradientButton} from '@components/Button'
import Gradient from '@components/Gradient'
import Input from '@components/Input'
import Wrap from '@components/Screen'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Alert, View} from 'react-native'

export default function Withdraw({navigation}: NavProp) {
  const [amount, setAmount] = React.useState('')

  function handelSubmit() {
    if (amount === '') {
      return Alert.alert('Error', 'Please enter amount to withdraw')
    }

    const amountNum = Number(amount)

    if (isNaN(amountNum)) {
      return Alert.alert('Error', 'Please enter a valid amount')
    }

    if (amountNum <= 0) {
      return Alert.alert('Error', 'Amount should be greater than 0')
    }

    navigation.navigate('AccountDetailsWithdraw')
  }

  return (
    <Wrap className='flex-1'>
      <BackHeader title='Withdraw' navigation={navigation} />
      <View className='p-5'>
        <Gradient className='rounded-2xl border border-border p-5' style={{gap: 15}}>
          <Medium className='text-base text-white'>Amount</Medium>
          <Input
            placeholder='Enter Amount to Withdraw'
            keyboardType='number-pad'
            className='border border-border text-lg'
            style={MediumS}
            value={amount}
            onChangeText={setAmount}
          />
          <FullGradientButton title='Withdraw' className='mt-5' onPress={handelSubmit} />
        </Gradient>
        <View className='mt-10'></View>
        <View className='mt-10 flex-row items-center justify-center' style={{gap: 10}}>
          <SecurityCheckSolidIcon width={20} height={20} className='text-green-500' />
          <SemiBold className='text-base text-green-500'>Your Payment is Safe and Secure.</SemiBold>
        </View>
      </View>
    </Wrap>
  )
}
