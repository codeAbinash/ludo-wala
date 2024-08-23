import {View, Text} from 'react-native'
import React, {useEffect} from 'react'
import {Medium} from '@/fonts'
import {get_user_f} from '@query/api'
import {useQuery} from '@tanstack/react-query'
import {userStore} from '@/zustand/userStore'
import LottieView from 'lottie-react-native'
import {W} from '@utils/dimensions'
import type {SuccessResponse} from 'react-native-razorpay'
import type {RouteProp} from '@react-navigation/native'
import type {StackNav} from '@utils/types'
import Gradient from '@components/Gradient'
import {GradientButton} from '@components/Button'

type ParamList = {
  PaymentSuccessful: PaymentSuccessfulParamList
}

export type PaymentSuccessfulParamList = {
  amount: string
} & SuccessResponse

export default function PaymentSuccessful({navigation, route}: {navigation: StackNav; route: RouteProp<ParamList, 'PaymentSuccessful'>}) {
  const setUser = userStore((state) => state.setUser)

  const {isPending, data} = useQuery({
    queryKey: ['user'],
    queryFn: () => get_user_f(),
  })

  useEffect(() => {
    console.log(data)
    if (data) setUser(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <View className='flex-1 items-center justify-center bg-primary p-5'>
      <Medium className='text-lg text-white'>Payment Successful</Medium>
      <LottieView source={require('@/assets/animations/payment.json')} autoPlay loop style={{width: W * 1.5, height: W * 1}} />
      <Gradient
        className='w-full rounded-2xl border border-border p-5'
        style={{
          gap: 5,
        }}>
        <Medium className='text-lg text-white'>Amount: ₹{route.params.amount}</Medium>
        <Medium className='text-lg text-white'>Transaction ID: {route.params.razorpay_payment_id}</Medium>
        <Medium className='text-lg text-white'>Order ID: {route.params.razorpay_order_id}</Medium>
      </Gradient>
      <GradientButton title='Go to Home' onPress={() => navigation.pop(2)} className='mt-10 rounded-full px-10 py-3' />
    </View>
  )
}
