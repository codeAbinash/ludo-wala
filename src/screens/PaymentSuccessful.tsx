import {View, Text} from 'react-native'
import React, {useEffect} from 'react'
import {Medium} from '@/fonts'
import {get_user_f} from '@query/api'
import {useQuery} from '@tanstack/react-query'
import {userStore} from '@/zustand/userStore'

export default function PaymentSuccessful() {
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
    <View className='flex-1 items-center justify-center'>
      <Medium className='text-lg text-white'>PaymentSuccessful</Medium>
    </View>
  )
}
