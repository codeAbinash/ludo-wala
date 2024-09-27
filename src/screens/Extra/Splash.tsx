import {navigationStore} from '@/zustand/navigationStore'
import {userStore} from '@/zustand/userStore'
import Animations from '@assets/animations/animations'
import Images from '@assets/images/images'
import {Radial} from '@components/Gradient'
import {PaddingBottom} from '@components/SafePadding'
import {get_settings_f, get_user_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import {APP_VERSION} from '@utils/constants'
import {secureLs} from '@utils/storage'
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
    const token = secureLs.getString('token')
    if (updateData) {
      // Decide navigation here
      const version = updateData.apkVersion
      const isForceUpdate = updateData.forceUpdate === '1'

      // Check for Update
      if (APP_VERSION !== version && isForceUpdate) {
        navigation.reset({index: 0, routes: [{name: 'Update'}]})
        return
      }

      if (data?.data?.fname === null || data?.data?.lname === null) {
        navigation.replace('EnterName')
        return
      }

      // Navigate to EnterPhone if token is not available
      if (!token) navigation.replace('EnterPhone')
      else navigation.replace('Home')
    }
  }, [data, getSettingsMutation.data, navigation])

  useEffect(() => {
    getSettingsMutation.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const token = secureLs.getString('token')
    token && mutate()
  }, [mutate])

  useEffect(() => {
    setNavigation(navigation)
  }, [navigation, setNavigation])

  return (
    <Radial className='flex-1 items-center justify-center'>
      <Image source={Images.logo} className='mt-52 h-44 w-44' />
      <View className='mt-40'>
        <View className='opacity-70'>
          <LottieView
            hardwareAccelerationAndroid
            cacheComposition
            source={Animations.diceLoading}
            style={{width: 50, height: 50}}
            autoPlay
            loop
          />
        </View>
        <PaddingBottom />
      </View>
    </Radial>
  )
}
