import {Medium, MediumS, SemiBold} from '@/fonts'
import BackHeader from '@components/BackHeader'
import {FullGradientButton, GradientButton, LoadingButton} from '@components/Button'
import Gradient from '@components/Gradient'
import Input from '@components/Input'
import {deposit_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import Colors from '@utils/colors'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Alert, TouchableOpacity, View} from 'react-native'
import RazorpayCheckout from 'react-native-razorpay'

const amounts = ['100', '500', '1000', '1500', '2000', '2500']

export default function AddCash({navigation}: NavProp) {
  const [amount, setAmount] = React.useState('100')

  const {isPending, mutate} = useMutation({
    mutationFn: () => deposit_f({amount}),
    onSuccess: (data) => {
      console.log(data)
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
          // prefill: { name: data.name, email: data.email, contact: data.mobile_number },
          notes: {address: 'Razorpay Corporate Office'},
          theme: {color: '#153D4B'},
        }

        RazorpayCheckout.open(options).then((d) => {
          // handle success
          // Alert.alert(`Success: ${d.razorpay_payment_id}`)
          navigation.replace('PaymentSuccessful')
        })
      }
    },
  })

  function addMoney() {
    let amountInt = parseFloat(amount)
    if (isNaN(amountInt)) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }
    if (amountInt < 1) {
      Alert.alert('Error', 'Amount should be greater than 0')
      return
    }
    mutate()
  }

  return (
    <View className='flex-1 bg-g1'>
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
        <View className='mt-16'>{isPending ? <LoadingButton /> : <FullGradientButton title='Add Money'  onPress={addMoney} />}</View>
      </View>
    </View>
  )
}
