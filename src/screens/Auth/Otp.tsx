import {Medium} from '@/fonts'
import Images from '@assets/images/images'
import {FullGradientButton, GradientButton, LoadingButton} from '@components/Button'
import Gradient, {Radial} from '@components/Gradient'
import Input from '@components/Input'
import {PaddingTop} from '@components/SafePadding'
import {setAuthToken, verifyOtp_f} from '@query/api'
import type {RouteProp} from '@react-navigation/native'
import {useMutation} from '@tanstack/react-query'
import Colors from '@utils/colors'
import {ls, secureLs} from '@utils/storage'
import type {StackNav} from '@utils/types'
import React from 'react'
import {Alert, Image, View} from 'react-native'

type ParamList = {
  OTP: OTPParamList
}

export type OTPParamList = {phone: string}

export default function OTP({navigation, route}: {navigation: StackNav; route: RouteProp<ParamList, 'OTP'>}) {
  const [otp, setOtp] = React.useState('')

  const {mutate, isPending} = useMutation({
    mutationFn: () => verifyOtp_f({otp, mobileNumber: route.params.phone}),
    onSuccess: (data) => {
      console.log(data)
      if (!data.status) return Alert.alert('Error', data.message || 'Error occurred')
      secureLs.set('token', data.token)
      setAuthToken()
      if (data.profileRequired) navigation.replace('EnterName')
      else navigation.replace('Home')
    },
  })

  function verifyOtp() {
    if (otp.length !== 6) return
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
          {/* <SemiBold className='w-full text-white opacity-60'>Enter OTP</SemiBold> */}
          {/* <OTPInputView pinCount={4} style={{width: '80%', height: 200}} /> */}
          <Input placeholder='Enter OTP' keyboardType='number-pad' maxLength={6} value={otp} onChangeText={setOtp} />
          <View>
            {isPending ? (
              <LoadingButton />
            ) : (
              <FullGradientButton className='rounded-full px-10' title='Verify' onPress={verifyOtp} />
            )}
          </View>
        </Gradient>
        <Medium className='mt-5 text-white opacity-50'>Terms and Condition Applied</Medium>
      </View>
    </Radial>
  )
}
