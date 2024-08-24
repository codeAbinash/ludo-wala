import {navigationStore} from '@/zustand/navigationStore'
import {userStore} from '@/zustand/userStore'
import Images from '@assets/images/images'
import Gradient from '@components/Gradient'
import {PaddingBottom} from '@components/SafePadding'
import {get_settings_f, get_user_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import {APP_VERSION} from '@utils/constants'
import {ls, secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import LottieView from 'lottie-react-native'
import React, {useEffect} from 'react'
import {Image, View} from 'react-native'

export default function Splash({navigation}: NavProp) {
  const setUser = userStore((state) => state.setUser)
  const setNavigation = navigationStore((state) => state.setNavigation)

  const {mutate, data} = useMutation({
    mutationKey: ['user'],
    mutationFn: get_user_f,
    onSuccess: setUser,
  })

  const getSettingsMutation = useMutation({
    mutationKey: ['settings'],
    mutationFn: get_settings_f,
  })

  useEffect(() => {
    const updateData = getSettingsMutation.data
    if (data && updateData) {
      // Decide navigation here

      // Check for Update
      const version = updateData.apkVersion
      const isForceUpdate = updateData.forceUpdate === '1'

      if (APP_VERSION !== version && isForceUpdate) {
        navigation.reset({index: 0, routes: [{name: 'Update'}]})
        return
      }

      if (data?.data?.fname === null || data?.data?.lname === null) {
        navigation.replace('EnterName')
        return
      }
      navigation.replace('Home')
    }
  }, [data, getSettingsMutation.data, navigation])

  useEffect(() => {
    getSettingsMutation.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const token = secureLs.getString('token')
    console.log(token)
    if (token) {
      mutate()
    } else {
      navigation.replace('EnterPhone')
    }
  }, [mutate, navigation])

  useEffect(() => {
    setNavigation(navigation)
  }, [navigation, setNavigation])

  return (
    <Gradient className='flex-1 items-center justify-center'>
      <Image source={Images.logo} className='mt-52 h-44 w-44' />
      <View className='mt-40'>
        <View className='opacity-70'>
          <LottieView source={require('@assets/animations/dice-loading.json')} style={{width: 50, height: 50}} autoPlay loop />
        </View>
        <PaddingBottom />
      </View>
    </Gradient>
  )
}
