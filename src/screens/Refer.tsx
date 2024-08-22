import {Bold, Medium, SemiBold} from '@/fonts'
import {ArrowUpDownIcon, Copy01Icon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import {GradientButton, OutlineButton} from '@components/Button'
import Gradient from '@components/Gradient'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import {get_user_f} from '@query/api'
import Clipboard from '@react-native-clipboard/clipboard'
import {useQuery} from '@tanstack/react-query'
import React, {useEffect} from 'react'
import {Image, ToastAndroid, TouchableOpacity, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'

export default function Refer() {
  const {isPending, data, refetch} = useQuery({
    queryKey: ['user'],
    queryFn: () => get_user_f(),
  })

  useEffect(() => {}, [data])

  // refetch on focus
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     refetch()
  //   })

  //   return unsubscribe
  // }, [navigation])

  return (
    <View className='flex-1 bg-primary'>
      <PaddingTop />
      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>
        <View className='flex-row justify-between pt-2'>
          <View>
            <Image source={Images.logo} className='h-14 w-14' />
          </View>
          <View className='flex-row items-center justify-between' style={{gap: 15}}>
            <GradientButton className='rounded-full px-7'>
              <Bold className='text-base'>₹ {data?.data?.deposit_wallet}</Bold>
            </GradientButton>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/1c/c5/35/1cc535901e32f18db87fa5e340a18aff.jpg',
              }}
              className='h-12 w-12 rounded-full bg-white'
            />
          </View>
        </View>
        <Gradient className='mt-5 flex-1 rounded-2xl border border-border p-5'>
          <Medium className='text-center text-lg text-white opacity-70'>Refer your friends and earn cash prizes!</Medium>
          <Image source={Images.refer} className='mx-auto h-60 w-60' />
          <SemiBold className='mt-7 text-center text-xl text-b1 underline underline-offset-1'>Referral Rank</SemiBold>
          <SemiBold className='mt-7 text-center text-4xl text-white'>Get 2%</SemiBold>
          <SemiBold className='mt-2 text-center text-lg text-white opacity-70'>of your referral’s every deposit</SemiBold>
          <SemiBold className='mt-7 text-center text-xl text-white'>Referral code</SemiBold>
          <View className='flex-row items-center justify-center'>
            <TouchableOpacity
              onPress={() => {
                // Copy
                Clipboard.setString(data?.data?.referCode || '')
                ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT)
              }}
              activeOpacity={0.7}
              style={{
                borderWidth: 1,
                borderColor: '#ffffff88',
                borderStyle: 'dashed',
              }}
              className='mt-5 flex-row items-center rounded-full py-3 pl-8 pr-6'>
              <Medium className='text-center text-base text-b1'>{data?.data?.referCode || 'Loading...'}</Medium>
              <Copy01Icon className='ml-3 text-white opacity-80' height={18} width={18} />
            </TouchableOpacity>
          </View>
          <View className='mt-7 flex-row' style={{gap: 15}}>
            <OutlineButton className='rounded-full p-4'>
              <ArrowUpDownIcon className='text-b1' height={18} width={18} />
            </OutlineButton>
            <View className='flex-1'>
              <OutlineButton title='Leaderboard' className='p-4' />
            </View>
            <View className='flex-1'>
              <GradientButton className='p-4' title='Invite' />
            </View>
          </View>
        </Gradient>
        <PaddingBottom />
      </ScrollView>
    </View>
  )
}
