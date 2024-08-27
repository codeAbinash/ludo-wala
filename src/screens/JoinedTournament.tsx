import {Medium} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {GradientButton} from '@components/Button'
import {get_user_f} from '@query/api'
import {useQuery} from '@tanstack/react-query'
import {W} from '@utils/dimensions'
import type {NavProp} from '@utils/types'
import LottieView from 'lottie-react-native'
import React, {useEffect} from 'react'
import {View} from 'react-native'

export default function JoinedTournament({navigation}: NavProp) {
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
      <Medium className='text-center text-lg text-white'>You have successfully joined the tournament</Medium>
      <LottieView
        hardwareAccelerationAndroid
        cacheComposition
        source={require('@/assets/animations/payment.json')}
        autoPlay
        style={{width: W * 1.5, height: W * 1}}
      />
      <GradientButton title='Go to Home' onPress={() => navigation.pop(3)} className='mt-10 rounded-full px-10 py-3' />
    </View>
  )
}
