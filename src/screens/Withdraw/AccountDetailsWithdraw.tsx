import {Medium, MediumS, SemiBold} from '@/fonts'
import {SecurityCheckSolidIcon} from '@assets/icons/icons'
import BackHeader from '@components/BackHeader'
import {FullGradientButton} from '@components/Button'
import Input from '@components/Input'
import {PaddingBottom} from '@components/SafePadding'
import Wrap from '@components/Screen'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Alert, ScrollView, View} from 'react-native'

const amounts = ['50', '100', '500', '1000', '1500', '2000']

export default function AccountDetailsWithdraw({navigation}: NavProp) {
  const [holderName, setHolderName] = React.useState('')
  const [accountNumber, setAccountNumber] = React.useState('')
  const [reAccountNumber, setReAccountNumber] = React.useState('')
  const [ifscCode, setIfscCode] = React.useState('')
  const [bankName, setBankName] = React.useState('')

  function handelSubmit() {
    // Check all possible conditions
    if (!accountNumber) return Alert.alert('Message', 'Please enter account number')
    if (!holderName) return Alert.alert('Message', 'Please enter holder name')
    if (!reAccountNumber) return Alert.alert('Message', 'Please re-enter account number')
    if (!ifscCode) return Alert.alert('Message', 'Please enter IFSC code')
    if (!bankName) return Alert.alert('Message', 'Please enter bank name')
    if (accountNumber !== reAccountNumber) return Alert.alert('Message', 'Account number does not match')

    // Navigate to WithdrawRequest

    navigation.navigate('WithdrawRequest')
  }

  return (
    <Wrap className='flex-1'>
      <BackHeader title='Bank Account Details' navigation={navigation} />
      <ScrollView>
        <View className='px-5 pb-10'>
          <View style={{gap: 15}}>
            <Medium className='text-base text-white'>Holder Name</Medium>
            <Input
              placeholder='Enter Holder Name'
              className='border border-border text-base'
              style={MediumS}
              value={holderName}
              onChangeText={setHolderName}
            />
            <Medium className='text-base text-white'>Account Number</Medium>
            <Input
              placeholder='Enter Account Number'
              keyboardType='number-pad'
              className='border border-border text-base'
              style={MediumS}
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
            <Medium className='text-base text-white'>Re-enter Account Number</Medium>
            <Input
              placeholder='Re-enter Account Number'
              keyboardType='number-pad'
              className='border border-border text-base'
              style={MediumS}
              value={reAccountNumber}
              onChangeText={setReAccountNumber}
            />
            <Medium className='text-base text-white'>IFSC Code</Medium>
            <Input
              placeholder='Enter IFSC Code'
              className='border border-border text-base'
              style={MediumS}
              value={ifscCode}
              onChangeText={setIfscCode}
            />
            <Medium className='text-base text-white'>Bank Name</Medium>
            <Input
              placeholder='Enter Bank Name'
              className='border border-border text-base'
              style={MediumS}
              value={bankName}
              onChangeText={setBankName}
            />
            <FullGradientButton title='Withdraw' className='mt-5' onPress={handelSubmit} />
          </View>
          <View className='mt-10'></View>
          <View className='mt-10 flex-row items-center justify-center' style={{gap: 10}}>
            <SecurityCheckSolidIcon width={20} height={20} className='text-green-500' />
            <SemiBold className='text-base text-green-500'>Your Payment is Safe and Secure.</SemiBold>
          </View>
          <PaddingBottom />
        </View>
      </ScrollView>
    </Wrap>
  )
}
