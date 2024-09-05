import {Medium} from '@/fonts'
import Images from '@assets/images/images'
import {FullGradientButton, LoadingButton} from '@components/Button'
import Gradient, {Radial} from '@components/Gradient'
import Input from '@components/Input'
import {PaddingTop} from '@components/SafePadding'
import {sendOtp_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import Colors from '@utils/colors'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Alert, Image, ToastAndroid, View} from 'react-native'

export default function EnterPhone({navigation}: NavProp) {
  const [phone, setPhone] = React.useState('')

  const {mutate, isPending} = useMutation({
    mutationFn: () => sendOtp_f({mobileNumber: phone}),
    onError: (error) => ToastAndroid.show(error.message, ToastAndroid.SHORT),
    onSuccess: (data) => {
      console.log(data)
      if (data.status) navigation.replace('OTP', {phone})
      else Alert.alert('Error', data.message || 'Error occurred')
    },
  })

  function sendOtp() {
    if (phone.length < 10) return ToastAndroid.show('Enter a valid phone number', ToastAndroid.SHORT)
    mutate()
  }

  return (
    <Radial>
      <View className='flex-1 items-center justify-center px-5'>
        <PaddingTop />
        <Gradient
          className='w-full items-center justify-center rounded-2xl border border-border px-5 py-10 pt-7'
          style={{gap: 30}}
          colors={[Colors.g1, Colors.g2]}>
          <Image source={Images.logo} className='h-24 w-24' />
          <Input
            placeholder='Enter Phone Number'
            keyboardType='phone-pad'
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
          <View>
            {isPending ? (
              <LoadingButton />
            ) : (
              <FullGradientButton title='Login' className='rounded-full px-10' onPress={sendOtp} />
            )}
          </View>
        </Gradient>
        <Medium className='mt-5 text-white opacity-50'>Terms and Condition Applied</Medium>
      </View>
    </Radial>
  )
}
