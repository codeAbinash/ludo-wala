import {Medium} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {get_user_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import {secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import React, {useEffect} from 'react'
import {TouchableOpacity, View} from 'react-native'

export default function HomeScreen({navigation}: NavProp) {
  const setUser = userStore((state) => state.setUser)

  const {mutate} = useMutation({
    mutationKey: ['user'],
    mutationFn: get_user_f,
    onSuccess: setUser,
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Medium className='text-5xl text-white'>Home</Medium>
      <TouchableOpacity onPress={() => navigation.navigate('AddCash')} className='mt-10'>
        <Medium className='text-xl text-white'>Add Cash (Deposit)</Medium>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Refer')} className='mt-10'>
        <Medium className='text-xl text-white'>Refer</Medium>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          secureLs.clearAll()
          navigation.reset({index: 0, routes: [{name: 'EnterPhone'}]})
        }}
        className='mt-10'>
        <Medium className='text-xl text-white'>Log Out</Medium>
      </TouchableOpacity>
    </View>
  )
}
