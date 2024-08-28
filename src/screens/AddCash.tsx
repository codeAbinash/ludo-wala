import {Bold, Medium, MediumS, SemiBold} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {SecurityCheckSolidIcon} from '@assets/icons/icons'
import BackHeader from '@components/BackHeader'
import {FullGradientButton, GradientButton, LoadingButton} from '@components/Button'
import Gradient from '@components/Gradient'
import Input from '@components/Input'
import Screen from '@components/Screen'
import {deposit_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import Colors from '@utils/colors'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Alert, TouchableOpacity, View} from 'react-native'
import RazorpayCheckout from 'react-native-razorpay'

const amounts = ['50', '100', '500', '1000', '1500', '2000']

export default function AddCash({navigation}: NavProp) {
  const [amount, setAmount] = React.useState(amounts[0])

  const user = userStore((state) => state.user)

  const {isPending, mutate} = useMutation({
    mutationFn: () => deposit_f({amount}),
    onSuccess: (data) => {
      if (!data.status) Alert.alert('Error', data.message || 'Something went wrong')
      else {
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: 'Ludo Wala',
          description: 'Test Transaction',
          image: 'https://system.ludowalagames.com/logo256.png',
          order_id: data.razorpay_order_id,
          // handler: successHandler,
          prefill: {
            name: user?.data?.fname + ' ' + user?.data?.lname,
            // email: user?.data?.email,
            contact: user?.data?.mobileNumber,
          },
          notes: {address: ''},
          theme: {color: '#153D4B'},
        }

        RazorpayCheckout.open(options).then((d) => {
          // handle success
          // Alert.alert(`Success: ${d.razorpay_payment_id}`)
          navigation.navigate('PaymentSuccessful', {
            amount,
            ...d,
          })
        })
      }
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Something went wrong')
    },
  })

  function addMoney() {
    let amountInt = parseFloat(amount)
    if (isNaN(amountInt)) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }
    if (amountInt < 1) {
      Alert.alert('Error', 'Minimum Deposit is 1 Rupee.')
      return
    }
    mutate()
  }

  function successHandler(response: any) {
    Alert.alert(`Success: ${response.razorpay_payment_id}`)
  }

  return (
    <Screen className='flex-1'>
      <BackHeader title='Add Cash' navigation={navigation} />
      <View className='p-5'>
        <Gradient className='rounded-2xl border border-border p-5' style={{gap: 15}}>
          <Medium className='text-lg text-white'>Amount</Medium>
          <Input
            placeholder='Enter Amount'
            keyboardType='number-pad'
            className='border border-border text-lg'
            style={MediumS}
            value={amount}
            onChangeText={setAmount}
          />
          <View className='flex-row flex-wrap justify-between' style={{rowGap: 10}}>
            {amounts.map((item, index) => (
              <TouchableOpacity className='w-[31%]' onPress={() => setAmount(item)} key={index}>
                <Gradient
                  key={index}
                  className={`items-center rounded-full border ${amount === item ? 'border-bb' : 'border-border'} p-3 px-1`}
                  colors={amount === item ? [Colors.b1, Colors.b2] : [Colors.g1, Colors.g1]}>
                  <SemiBold className={`${amount === item ? 'text-black' : 'text-white'}`}>+ ₹ {item}</SemiBold>
                </Gradient>
              </TouchableOpacity>
            ))}
          </View>
        </Gradient>
        <View className='mt-10'>{isPending ? <LoadingButton /> : <FullGradientButton title='Add Money' onPress={addMoney} />}</View>
        <View className='mt-10 flex-row items-center justify-center' style={{gap: 10}}>
          <SecurityCheckSolidIcon width={20} height={20} className='text-green-500' />
          <SemiBold className='text-base text-green-500'>Your Payment is Safe and Secure.</SemiBold>
        </View>
      </View>
    </Screen>
  )
}
