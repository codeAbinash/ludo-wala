import {userStore} from '@/zustand/userStore'
import Images from '@assets/images/images'
import Gradient from '@components/Gradient'
import {PaddingBottom} from '@components/SafePadding'
import {get_user_f} from '@query/api'
import {useMutation, useQuery} from '@tanstack/react-query'
import {secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import LottieView from 'lottie-react-native'
import React from 'react'
import {useEffect} from 'react'
import {Image, View} from 'react-native'

export default function Splash({navigation}: NavProp) {
  const setUser = userStore((state) => state.setUser)

  const {mutate} = useMutation({
    mutationKey: ['user'],
    mutationFn: get_user_f,
    onSuccess: (data) => {
      setUser(data)
      if (data.data?.fname === null || data.data?.lname === null) {
        navigation.replace('EnterName')
        return
      }
      navigation.replace('Home')
    },
  })

  useEffect(() => {
    const token = secureLs.getString('token')
    console.log(token)
    if (token) {
      mutate()
    } else {
      navigation.replace('EnterPhone')
    }
  }, [mutate, navigation])

  return (
    <Gradient className='flex-1 items-center justify-center'>
      <Image source={Images.logo} className='mt-52 h-44 w-44' />
      <View className='mt-40'>
        <LottieView source={require('@assets/animations/dice-loading.json')} style={{width: 50, height: 50}} autoPlay loop />
        <PaddingBottom />
      </View>
    </Gradient>
  )
}
