import {Medium, SemiBold} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {ArrowUpDownIcon, Copy01Icon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import {GradientButton, OutlineButton} from '@components/Button'
import Gradient from '@components/Gradient'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Wrap from '@components/Screen'
import SmallProfile from '@components/SmallProfile'
import Clipboard from '@react-native-clipboard/clipboard'
import type {NavProp} from '@utils/types'
import {refer} from '@utils/utils'
import React from 'react'
import {Image, ToastAndroid, TouchableOpacity, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'

export default function Refer({navigation}: NavProp) {
  // const {isPending, data, refetch} = useQuery({
  //   queryKey: ['user'],
  //   queryFn: () => get_user_f(),
  // })

  // useEffect(() => {}, [data])

  const user = userStore((state) => state.user)

  // refetch on focus
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     refetch()
  //   })

  //   return unsubscribe
  // }, [navigation])

  return (
    <Wrap>
      <PaddingTop />
      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>
        <SmallProfile navigation={navigation} />
        <Gradient className='mt-5 flex-1 rounded-2xl border border-border p-5 pb-7 pt-7'>
          <Medium className='text-center text-base text-white opacity-70'>
            Refer your friends and earn cash prizes!
          </Medium>
          <Image source={Images.refer} className='mx-auto h-40 w-40' />
          <SemiBold className='mt-7 text-center text-lg text-b1 underline underline-offset-1'>Referral Rank</SemiBold>
          <SemiBold className='mt-7 text-center text-3xl text-white'>Get 2%</SemiBold>
          <SemiBold className='mt-2 text-center text-base text-white opacity-70'>
            of your referral’s every deposit
          </SemiBold>
          <SemiBold className='mt-7 text-center text-lg text-white'>Referral code</SemiBold>
          <View className='flex-row items-center justify-center'>
            <TouchableOpacity
              onPress={() => {
                // Copy
                Clipboard.setString(user?.data?.referCode || '')
                ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT)
              }}
              activeOpacity={0.7}
              style={{borderWidth: 1, borderColor: '#ffffff88', borderStyle: 'dashed'}}
              className='mt-5 flex-row items-center rounded-full py-3 pl-8 pr-6'>
              <Medium className='text-center text-sm text-b1'>{user?.data?.referCode || 'Loading...'}</Medium>
              <Copy01Icon className='ml-3 text-white opacity-80' height={16} width={16} />
            </TouchableOpacity>
          </View>
          <View className='mt-7 w-full flex-row' style={{gap: 15}}>
            <OutlineButton className='rounded-full p-3.5' onPress={() => navigation.navigate('MyReferrals')}>
              <ArrowUpDownIcon className='text-b1' height={15} width={15} />
            </OutlineButton>
            <View style={{flexGrow: 1}}>
              <OutlineButton title='Leaderboard' className='p-4' onPress={() => navigation.navigate('Leaderboard')} />
            </View>
            <View style={{flexGrow: 1}}>
              <GradientButton className='p-4' title='Invite' onPress={() => refer(user)} />
            </View>
          </View>
        </Gradient>
        <PaddingBottom />
      </ScrollView>
    </Wrap>
  )
}
